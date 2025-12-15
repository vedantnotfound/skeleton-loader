import React, { useState } from 'react';
import './landing.css';
import { AutoSkeleton } from './components/AutoSkeleton';
import { TestProductPage } from './components/TestProductPage';

export default function LandingPage() {
    const [demoLoading, setDemoLoading] = useState(true);

    const copyToClipboard = () => {
        navigator.clipboard.writeText('npm install react-auto-skeleton-magic');
        alert('Copied to clipboard!');
    };

    return (
        <div>
            <div className="container">
                <header>
                    <div className="logo">✨ AutoSkeleton</div>
                    <nav className="nav-links">
                        <a href="#features">Features</a>
                        <a href="#demo">Demo</a>
                        <a href="#docs">Docs</a>
                        <a href="https://github.com/vedantnotfound/react-auto-skeleton-magic" target="_blank">GitHub</a>
                    </nav>
                </header>

                <section className="hero">
                    <h1>
                        Stop Building <br />
                        <span>Skeleton Screens Manually</span>
                    </h1>
                    <p>
                        Wrap your component. Get a perfect skeleton loader automatically.
                        No config, no hardcoded shapes, just magic.
                    </p>
                    <div>
                        <a href="#demo" className="btn">Try the Magic</a>
                        <a href="https://github.com/vedantnotfound/react-auto-skeleton-magic" target="_blank" className="btn btn-secondary">Star on GitHub</a>
                    </div>
                </section>

                <section className="install-section">
                    <div className="code-block">
                        <span>npm install react-auto-skeleton-magic</span>
                        <button className="copy-btn" onClick={copyToClipboard} title="Copy">
                            📋
                        </button>
                    </div>
                </section>

                <section id="demo" className="demo-section">
                    <div className="demo-controls">
                        <span className="toggle-label">Toggle State:</span>
                        <button
                            className="btn"
                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                            onClick={() => setDemoLoading(!demoLoading)}
                        >
                            {demoLoading ? 'Show Content' : 'Show Skeleton'}
                        </button>
                    </div>

                    <div className="demo-card-wrapper" style={{ maxWidth: 1000, margin: '0 auto', background: 'white', borderRadius: 16 }}>
                        {/* 
                     We are using the TestProductPage component for the demo.
                     We need to control its internal loading state from outside or modify it. 
                     The TestProductPage controls its own state, let's just make a simple inline demo 
                     OR wrapping a known layout here so we have full control.
                     
                     Actually, let's build a nice little profile card demo right here 
                     to show it clearly.
                 */}
                        <AutoSkeleton loading={demoLoading}>
                            <div className="demo-inner-content" style={{ padding: 40, color: '#333' }}>
                                <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
                                    <img
                                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                                        style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }}
                                        alt="Avatar"
                                    />
                                    <div>
                                        <h2 style={{ margin: '0 0 10px 0' }}>John Doe</h2>
                                        <p style={{ margin: 0, color: '#666' }}>Senior Software Engineer at Tech Corp</p>
                                        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                                            <span style={{ background: '#eee', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>React</span>
                                            <span style={{ background: '#eee', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>TypeScript</span>
                                            <span style={{ background: '#eee', padding: '4px 8px', borderRadius: 4, fontSize: 12 }}>Three.js</span>
                                        </div>
                                    </div>
                                </div>
                                <p style={{ lineHeight: 1.6, color: '#444' }}>
                                    John is a passionate developer who loves building tools that help other developers.
                                    He specializes in frontend infrastructure and UI design. When he's not coding,
                                    he enjoys hiking and photography.
                                </p>
                                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 15 }}>
                                        <span><b>240</b> Following</span>
                                        <span><b>12.5k</b> Followers</span>
                                    </div>
                                    <button style={{
                                        background: 'black',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 20px',
                                        borderRadius: 8,
                                        cursor: 'pointer'
                                    }}>
                                        Follow
                                    </button>
                                </div>
                            </div>
                        </AutoSkeleton>
                    </div>
                </section>

                <section id="features" className="features">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Zero Configuration</h3>
                        <p>Just wrap your component and it works. No need to define heights, widths, or shapes manually.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎨</div>
                        <h3>Matches Your UI</h3>
                        <p>Automatically detects fonts, images, and buttons to create a skeleton that perfectly mirrors your layout.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔧</div>
                        <h3>Fully Customizable</h3>
                        <p>Need specific tweaks? You can still override styles or behaviors if you need to.</p>
                    </div>
                </section>

                <footer>
                    <p>
                        Created with ❤️ by <a href="https://github.com/vedantnotfound" target="_blank">Vedant</a>.
                        Released under MIT License.
                    </p>
                </footer>
            </div>
        </div>
    );
}
