import { useState, useEffect, useCallback } from 'react';

export interface SkeletonItem {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
    borderRadius: string;
}

export function useSkeletonAnalyzer(
    containerRef: React.RefObject<HTMLElement | null>,
    enabled: boolean
) {
    const [skeletons, setSkeletons] = useState<SkeletonItem[]>([]);

    const analyze = useCallback(() => {
        if (!containerRef.current || !enabled) return;

        const root = containerRef.current;
        const rootRect = root.getBoundingClientRect();
        const newSkeletons: SkeletonItem[] = [];

        // Walker function
        const walk = (node: Element) => {
            // 1. Check visibility
            const style = window.getComputedStyle(node);
            if (style.display === 'none') return;

            // Note: We ignore visibility: hidden here because WE set it on the parent.
            // But if a node specifically has opacity: 0 from user CSS, maybe we should skip?
            // For now, let's assume structure is what matters.

            // 2. Determine if this node should be a skeleton
            let shouldDraw = false;
            let borderRadius = style.borderRadius;
            const tagName = node.tagName.toLowerCase();
            const rect = node.getBoundingClientRect();

            // Skip elements with 0 dimensions
            if (rect.width === 0 || rect.height === 0) return;

            // Heuristics
            if (tagName === 'img' || tagName === 'video' || tagName === 'svg') {
                shouldDraw = true;
            } else if (/^h[1-6]$/.test(tagName)) {
                shouldDraw = true;
                // Adjust for headings slightly? No, stick to rect.
            } else if (tagName === 'button' || tagName === 'input' || tagName === 'textarea' || tagName === 'select') {
                shouldDraw = true;
            } else if (tagName === 'p') {
                // For P, we might want to just draw the block for MVP
                shouldDraw = true;
            } else {
                // Generic elements (div, span, article, section...)
                // Check if it has direct text content that isn't whitespace
                let hasDirectText = false;
                node.childNodes.forEach((child) => {
                    if (child.nodeType === Node.TEXT_NODE && child.textContent && child.textContent.trim().length > 0) {
                        hasDirectText = true;
                    }
                });

                if (hasDirectText) {
                    shouldDraw = true;
                    // If it's a block with text, we verify it doesn't have huge padding that makes the block look weird?
                    // MVP: just draw it.
                } else {
                    // Check for background color/image
                    if (
                        (style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent') ||
                        (style.backgroundImage !== 'none')
                    ) {
                        // Check if it has no children? Or if it has children we might overlay them?
                        // If it has children, we probably want to traverse children instead.
                        // Unless it's a card card with background.
                        // Let's traverse children for containers to be safe.
                        shouldDraw = false;
                    }
                }
            }

            if (shouldDraw) {
                newSkeletons.push({
                    id: Math.random().toString(36).substring(2) + Date.now().toString(36),
                    top: rect.top - rootRect.top,
                    left: rect.left - rootRect.left,
                    width: rect.width,
                    height: rect.height,
                    borderRadius: borderRadius === '0px' ? '4px' : borderRadius,
                });
                // Do not traverse children if we drew this block? 
                // Example: <button><span>Text</span></button>. We draw button. We ignore span.
                return;
            }

            // Continue to children
            for (let i = 0; i < node.children.length; i++) {
                walk(node.children[i]);
            }
        };

        // Start analysis
        // We iterate over the children of the wrapper, not the wrapper itself (unless wrapper has content?)
        // The wrapper acts as the "Relative" parent.
        for (let i = 0; i < root.children.length; i++) {
            // The overlay is also a child! We must skip it.
            const child = root.children[i];
            if (child.classList.contains('auto-skeleton-overlay')) continue;
            walk(child);
        }

        setSkeletons(newSkeletons);
    }, [enabled, containerRef]);

    useEffect(() => {
        if (enabled) {
            analyze();

            // Observers
            if (!containerRef.current) return;

            const resizeObserver = new ResizeObserver(() => analyze());
            resizeObserver.observe(containerRef.current);

            const mutationObserver = new MutationObserver(() => analyze());
            mutationObserver.observe(containerRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });

            return () => {
                resizeObserver.disconnect();
                mutationObserver.disconnect();
            };
        }
    }, [enabled, analyze, containerRef]);

    return skeletons;
}
