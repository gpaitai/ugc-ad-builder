import React, { useState } from 'react';
import './Builder.css';

const Builder = () => {
    const [formData, setFormData] = useState({
        description: '',
        platform: 'tiktok',
        adType: 'ugc_testimonial',
        tone: 'energetic',
        ratio: '9:16',
        email: '',
        consent: false
    });
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [isSuccess, setIsSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            handleFileSelect(droppedFile);
        }
    };

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please upload an image first.');
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('description', formData.description);
            data.append('platform', formData.platform);
            data.append('adType', formData.adType);
            data.append('tone', formData.tone);
            data.append('ratio', formData.ratio);
            data.append('email', formData.email);
            // Convert boolean to string if needed, or just append
            data.append('consent', formData.consent);
            data.append('image', file);

            // Send to n8n webhook
            const response = await fetch('https://n8n.geovault.org/webhook/UGC-Ad-Builder', {
                method: 'POST',
                body: data
            });

            if (response.ok) {
                setIsSuccess(true);
                // Optional: Reset form data here if needed, but we start fresh on "Create another" anyway
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setIsSuccess(false);
        setFormData({
            description: '',
            platform: 'tiktok',
            adType: 'ugc_testimonial',
            tone: 'energetic',
            ratio: '9:16',
            email: '',
            consent: false
        });
        setFile(null);
        setPreview(null);
    };

    if (isSuccess) {
        return (
            <section id="builder" className="builder-section">
                <div className="builder-bg-accent"></div>
                <div className="container">
                    <div className="builder-card text-center" style={{ padding: '4rem 2rem' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
                        <h2 className="builder-title">Success!</h2>
                        <p className="builder-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                            Thank you for submitting your AI UGC ad. You'll receive the video link at your email shortly.
                        </p>
                        <button onClick={resetForm} className="submit-btn" style={{ minWidth: '200px' }}>
                            Create another ad
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="builder" className="builder-section">
            <div className="builder-bg-accent"></div>
            <div className="container">
                <div className="builder-card">
                    <div className="builder-header text-center">
                        <h2 className="builder-title">Create Your Ad</h2>
                        <p className="builder-subtitle">Describe your goal, upload an asset, and let AI do the rest.</p>
                    </div>

                    <form className="builder-form" onSubmit={handleSubmit}>
                        <div className="form-layout">
                            {/* Left Column: Upload */}
                            <div className="upload-column">
                                <div
                                    className={`upload-zone ${preview ? 'has-file' : ''}`}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleFileDrop}
                                    onClick={() => document.getElementById('file-upload').click()}
                                >
                                    <input
                                        type="file"
                                        id="file-upload"
                                        hidden
                                        accept="image/*"
                                        onChange={(e) => e.target.files[0] && handleFileSelect(e.target.files[0])}
                                    />
                                    {preview ? (
                                        <img src={preview} alt="Upload preview" className="upload-preview" />
                                    ) : (
                                        <div className="upload-placeholder">
                                            <div className="upload-icon">☁️</div>
                                            <p className="upload-text">Drag & drop image or click to upload</p>
                                            <span className="upload-subtext">JPG, PNG up to 10MB</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="details-column">
                                <div className="form-group full-width">
                                    <label>Ad Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="e.g. A young woman unboxing our new skincare serum, highlighting the glow effect..."
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Platform</label>
                                        <select name="platform" value={formData.platform} onChange={handleInputChange}>
                                            <option value="tiktok">TikTok</option>
                                            <option value="instagram">Instagram Reels</option>
                                            <option value="youtube">YouTube Shorts</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Ad Type</label>
                                        <select name="adType" value={formData.adType} onChange={handleInputChange}>
                                            <option value="ugc_testimonial">UGC Testimonial</option>
                                            <option value="how_to">How-to / Tutorial</option>
                                            <option value="unboxing">Unboxing</option>
                                            <option value="skit">Skit / Comedy</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Tone</label>
                                        <select name="tone" value={formData.tone} onChange={handleInputChange}>
                                            <option value="energetic">Energetic & Fun</option>
                                            <option value="calm">Calm & Minimalist</option>
                                            <option value="informative">Informative</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Aspect Ratio</label>
                                        <select name="ratio" value={formData.ratio} onChange={handleInputChange}>
                                            <option value="9:16">9:16 (Vertical)</option>
                                            <option value="1:1">1:1 (Square)</option>
                                            <option value="16:9">16:9 (Landscape)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group full-width">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="you@company.com"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-checkbox">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label htmlFor="consent">I confirm I have rights to the uploaded assets.</label>
                                </div>

                                <button type="submit" className={`submit-btn ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                                    {isSubmitting ? 'Generating...' : 'Generate Ad Magic ✨'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Builder;
