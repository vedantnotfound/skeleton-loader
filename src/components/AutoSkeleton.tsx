import React, { useRef } from 'react';
import '../styles/skeleton.css';
import { useSkeletonAnalyzer } from '../hooks/useSkeletonAnalyzer';

export interface AutoSkeletonProps {
    loading: boolean;
    children: React.ReactNode;
    animate?: boolean;
}

export const AutoSkeleton: React.FC<AutoSkeletonProps> = ({
    loading,
    children,
    animate = true,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const skeletons = useSkeletonAnalyzer(containerRef, loading);

    return (
        <div
            ref={containerRef}
            className="auto-skeleton-wrapper"
        >
            <div className={loading ? 'auto-skeleton-content-hidden' : ''}>
                {children}
            </div>

            {loading && (
                <div className="auto-skeleton-overlay" aria-hidden="true">
                    {skeletons.map((sk) => (
                        <div
                            key={sk.id}
                            className={`skeleton-block ${!animate ? 'skeleton-no-animate' : ''}`}
                            style={{
                                top: `${sk.top}px`,
                                left: `${sk.left}px`,
                                width: `${sk.width}px`,
                                height: `${sk.height}px`,
                                borderRadius: sk.borderRadius,
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
