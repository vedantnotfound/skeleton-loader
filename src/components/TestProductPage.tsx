import React, { useState, useEffect } from 'react';
import { AutoSkeleton } from '../components/AutoSkeleton';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}

export function TestProductPage() {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (loading) {
            // Simulate API delay
            const timer = setTimeout(() => {
                setProduct({
                    id: 1,
                    name: "Premium Wireless Headphones",
                    price: 299.99,
                    description: "Experience high-fidelity sound with our latest noise-cancelling technology. Perfect for travel, work, or relaxation. 30-hour battery life and ultra-comfortable ear cushions.",
                    image: "https://via.placeholder.com/600x400",
                    category: "Electronics"
                });
                setLoading(false);
            }, 2500); // 2.5s delay
            return () => clearTimeout(timer);
        } else {
            setProduct(null);
        }
    }, [loading]);

    return (
        <div style={{ padding: 40, fontFamily: 'Arial, sans-serif', maxWidth: 1000, margin: '0 auto' }}>
            <button
                onClick={() => setLoading(!loading)}
                style={{ marginBottom: 30, padding: '8px 16px', cursor: 'pointer' }}
            >
                {loading ? 'Stop Loading' : 'Reload Page'}
            </button>

            {/* The Wrapper. Notice we just wrap the whole layout! */}
            <AutoSkeleton loading={loading}>
                <div style={{ display: 'flex', gap: 40, alignItems: 'start' }}>
                    {/* Left Column: Image */}
                    <div style={{ flex: '1' }}>
                        <div style={{
                            width: '100%',
                            aspectRatio: '3/2',
                            borderRadius: 16,
                            overflow: 'hidden',
                            background: '#f4f4f4',
                            border: '1px solid #ddd'
                        }}>
                            <img
                                src={product?.image || 'https://via.placeholder.com/600x400'}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                alt="Product"
                            />
                        </div>
                        <div style={{ display: 'flex', gap: 10, marginTop: 15 }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} style={{ width: 80, height: 80, borderRadius: 8, background: '#eee' }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Details */}
                    <div style={{ flex: '1', paddingTop: 10 }}>
                        <span style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: '#e0f2fe',
                            color: '#0369a1',
                            borderRadius: 100,
                            fontSize: 12,
                            fontWeight: 'bold',
                            marginBottom: 10
                        }}>
                            {product?.category || 'Category'}
                        </span>

                        <h1 style={{ fontSize: 36, margin: '0 0 15px 0', textTransform: 'capitalize' }}>
                            {product?.name || 'Product Name Placeholder'}
                        </h1>

                        <h2 style={{ fontSize: 24, color: '#333', marginBottom: 20 }}>
                            ${product?.price || '000.00'}
                        </h2>

                        <p style={{ lineHeight: 1.6, color: '#555', marginBottom: 30, fontSize: 16 }}>
                            {product?.description ||
                                'This is a long description placeholder. It is intentionally long to verify that the auto-skeleton can handle multi-line text blocks correctly and generate nice looking bars for paragraphs.'}
                        </p>

                        <div style={{ display: 'flex', gap: 15 }}>
                            <button style={{
                                flex: 1,
                                background: 'black',
                                color: 'white',
                                height: 50,
                                border: 'none',
                                borderRadius: 8,
                                fontWeight: 'bold',
                                fontSize: 16
                            }}>
                                Add to Cart
                            </button>
                            <button style={{
                                width: 50,
                                height: 50,
                                border: '1px solid #ddd',
                                borderRadius: 8,
                                background: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                ♥
                            </button>
                        </div>

                        <div style={{ marginTop: 30, paddingTop: 30, borderTop: '1px solid #eee' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#ddd' }}></div>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold' }}>Free Shipping</p>
                                    <p style={{ margin: 0, fontSize: 12, color: '#666' }}>On all orders over $50</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AutoSkeleton>
        </div>
    );
}
