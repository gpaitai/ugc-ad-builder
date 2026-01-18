import React from 'react';
import './Samples.css';

const samplesData = [
    {
        id: 1,
        category: 'E-commerce',
        image: '/images/sample_ugc_fashion.png',
        title: 'Spring Collection Haul',
        subtitle: 'Fashion • Clothing',
        views: '1.2M',
        likes: '45k',
        ctr: '4.2%'
    },
    {
        id: 2,
        category: 'Health & Wellness',
        image: '/images/sample_ugc_food.png',
        title: 'Healthy Meal Prep Hack',
        subtitle: 'Food • Lifestyle',
        views: '850k',
        likes: '32k',
        ctr: '3.8%'
    },
    {
        id: 3,
        category: 'Tech & Gadgets',
        image: '/images/hero_ugc_2.png',
        title: 'New Headphones Unboxing',
        subtitle: 'Tech • Unboxing',
        views: '2.1M',
        likes: '102k',
        ctr: '5.1%'
    }
];

const Samples = () => {
    return (
        <section id="samples" className="samples-section">
            <div className="container">
                <div className="section-header text-center">
                    <div className="pill-badge">Inspiration</div>
                    <h2 className="section-title">See What's Possible</h2>
                    <p className="section-desc">High-performing creative generated in seconds.</p>
                </div>

                <div className="samples-grid">
                    {samplesData.map((sample) => (
                        <div key={sample.id} className="sample-card">
                            <div className="sample-thumbnail">
                                <span className="category-pill">{sample.category}</span>
                                <img src={sample.image} alt={sample.title} />
                                <div className="play-overlay">
                                    <div className="play-button">▶</div>
                                </div>
                            </div>

                            <div className="sample-content">
                                <div className="sample-header">
                                    <h3 className="sample-title">{sample.title}</h3>
                                    <div className="ctr-pill">CTR {sample.ctr}</div>
                                </div>
                                <p className="sample-subtitle">{sample.subtitle}</p>

                                <div className="sample-metrics">
                                    <div className="metric">
                                        <span className="metric-icon">👁</span>
                                        {sample.views}
                                    </div>
                                    <div className="metric">
                                        <span className="metric-icon">♥</span>
                                        {sample.likes}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Samples;
