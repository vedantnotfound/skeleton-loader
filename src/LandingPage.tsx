import React, { useState } from 'react';
import './landing.css';
import { AutoSkeleton } from './components/AutoSkeleton';
import {
    Zap,
    Layout,
    Settings,
    Github,
    Copy,
    ArrowRight,
    Box,
    Check
} from 'lucide-react';

export default function LandingPage() {
    const [demoLoading, setDemoLoading] = useState(true);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText('npm install react-auto-skeleton-magic');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div>
            <div className="container">
                <header>
                    <div className="logo">
                        <Box strokeWidth={2.5} />
                        skeleton-magic
                    </div>
                    <nav className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#demo">Playground</a>
                        <a href="https://github.com/vedantnotfound/react-auto-skeleton-magic" target="_blank" rel="noreferrer">GitHub</a>
                    </nav>
                </header>

                <section className="hero">
                    <h1>
                        Instant skeleton<br />
                        screens. No config.
                    </h1>
                    <p>
                        Automatically analyze your component structure and generate
                        pixel-perfect loading states. Minimal, fast, and magical.
                    </p>

                    <div className="btn-group">
                        <a href="#demo" className="btn btn-primary">
                            Try Demo <ArrowRight size={16} style={{ marginLeft: 8 }} />
                        </a>
                        <a href="https://github.com/vedantnotfound/react-auto-skeleton-magic" target="_blank" rel="noreferrer" className="btn btn-secondary">
                            <Github size={18} style={{ marginRight: 8 }} /> Star on GitHub
                        </a>
                    </div>

                    <div className="install-block" onClick={copyToClipboard}>
                        <span>npm install react-auto-skeleton-magic</span>
                        <div className="copy-icon" title="Copy">
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </div>
                    </div>
                </section>

                <section id="demo" className="demo-section">
                    <div className="demo-frame">
                        <div className="demo-controls">
                            <button className="toggle-btn" onClick={() => setDemoLoading(!demoLoading)}>
                                {demoLoading ? 'Stop Loading' : 'Start Loading'}
                            </button>
                        </div>

                        <div style={{ maxWidth: 600, margin: '0 auto' }}>
                            <AutoSkeleton loading={demoLoading}>
                                <div style={{
                                    border: '1px solid #333',
                                    padding: 24,
                                    borderRadius: 8,
                                    background: '#0a0a0a',
                                    display: 'flex',
                                    gap: 24
                                }}>
                                    <div style={{
                                        width: 100,
                                        height: 100,
                                        background: '#111',
                                        borderRadius: '50%',
                                        flexShrink: 0
                                    }}>
                                        <img
                                            src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=200&auto=format&fit=crop"
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                            alt="Profile"
                                        />
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: '1.5rem', color: '#fff' }}>Alex Morgan</h3>
                                        <p style={{ color: '#888', fontSize: '0.9rem', margin: 0, marginBottom: 16 }}>
                                            Product Designer @ Vercel. Crafting minimal interfaces and exploring 3D web experiences.
                                        </p>

                                        <div style={{ display: 'flex', gap: 12 }}>
                                            <button style={{
                                                background: '#fff',
                                                color: '#000',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: 4,
                                                fontWeight: 600,
                                                fontSize: '0.8rem'
                                            }}>Follow</button>
                                            <button style={{
                                                background: 'transparent',
                                                color: '#fff',
                                                border: '1px solid #333',
                                                padding: '8px 16px',
                                                borderRadius: 4,
                                                fontWeight: 600,
                                                fontSize: '0.8rem'
                                            }}>Message</button>
                                        </div>
                                    </div>
                                </div>
                            </AutoSkeleton>
                        </div>
                    </div>
                </section>

                <section id="features" className="features-section">
                    <div className="grid">
                        <div className="feature-item">
                            <div className="icon-box">
                                <Zap size={24} />
                            </div>
                            <h3>Zero Config</h3>
                            <p>Simply wrap your component. The library analyzes the DOM structure and generates skeletons automatically.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon-box">
                                <Layout size={24} />
                            </div>
                            <h3>Pixel Perfect</h3>
                            <p>Matches your exact layout spacing, typography, and element sizing without manual tweaking.</p>
                        </div>
                        <div className="feature-item">
                            <div className="icon-box">
                                <Settings size={24} />
                            </div>
                            <h3>Customizable</h3>
                            <p>Want to change the animation speed or color? Fully typed props for advanced use cases.</p>
                        </div>
                    </div>
                </section>

                <footer>
                    <div className="logo" style={{ fontSize: '1rem', opacity: 0.8 }}>
                        <Box size={20} />
                        skeleton-magic
                    </div>
                    <p>© 2025 Vedant. MIT License.</p>
                </footer>
            </div>
        </div>
    );
}
