import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Building, Chrome, MessageCircle, FileCheck, Upload, Sparkles } from 'lucide-react';
import axios from 'axios';

const SignupPage: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        companyName: '',
        businessNumber: '',
        businessRegistrationUrl: '',
        role: 'CLIENT',
        categories: [] as string[]
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate();

    const manufacturingTypes = ['레이저 가공', 'CNC 선반/밀링', '3D 프린팅', '금형/사출', '판금 절곡', '용접/조립'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCategoryToggle = (cat: string) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(cat)
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat]
        }));
    };

    const simulateOCR = (fileName: string) => {
        setProcessing(true);
        // Simulate AI OCR reading the document
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                businessNumber: '123-45-67890',
                companyName: '(주)엠에스엠머 테크',
                businessRegistrationUrl: `https://storage.msmmer.io/docs/${fileName}`
            }));
            setProcessing(false);
            alert('AI가 사업자등록증 정보를 성공적으로 읽어왔습니다.');
        }, 2000);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            simulateOCR(file.name);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.businessNumber || !formData.companyName) {
            return alert('사업자 정보를 등록해주세요 (업로드 또는 직접 입력)');
        }

        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/auth/signup', formData);
            alert('MSMMER 파트너 가입이 완료되었습니다.');
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || '가입 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <div className="bg-blur"></div>

            <div className="login-card" style={{ maxWidth: '600px', padding: '2rem' }}>
                <header className="header" style={{ marginBottom: '1.5rem' }}>
                    <h1 className="logo">MSMMER</h1>
                    <p className="subtitle">스마트 제조 파트너십의 시작</p>
                </header>

                {/* Social Login Section first (Optional but integrated) */}
                <div className="social-container" style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    <button className="social-button shadow" style={{ background: '#ffffff', color: '#000', padding: '8px 12px' }}>
                        <Chrome size={20} />
                    </button>
                    <button className="social-button shadow" style={{ background: '#FEE500', color: '#3C1E1E', padding: '8px 12px' }}>
                        <MessageCircle size={20} fill="#3C1E1E" />
                    </button>
                    <button className="social-button shadow" style={{ background: '#03C75A', color: '#ffffff', padding: '8px 12px' }}>
                        <span style={{ fontWeight: '900', fontSize: '1.1rem' }}>N</span>
                    </button>
                </div>

                <div className="divider" style={{ margin: '1rem 0' }}>
                    <span>사업자 정보 등록</span>
                </div>

                <form onSubmit={handleSignup}>
                    {/* STEP 1: OCR Upload at the top */}
                    <div className="input-group">
                        <div
                            className={`upload-zone ${processing ? 'processing' : ''}`}
                            style={{
                                border: '2px dashed var(--primary)',
                                borderRadius: '16px',
                                padding: '30px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: formData.businessRegistrationUrl ? 'rgba(0, 242, 255, 0.08)' : 'rgba(255,255,255,0.02)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                accept=".pdf,.jpg,.jpeg,.png"
                            />

                            {processing && (
                                <div className="processing-overlay" style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                    background: 'rgba(0,0,0,0.7)', display: 'flex', flexDirection: 'column',
                                    alignItems: 'center', justifyContent: 'center', zIndex: 10
                                }}>
                                    <Sparkles className="spin" size={32} color="var(--primary)" />
                                    <p style={{ marginTop: '10px', fontSize: '0.9rem', color: 'var(--primary)' }}>AI가 정보를 분석 중입니다...</p>
                                </div>
                            )}

                            {formData.businessRegistrationUrl ? (
                                <div style={{ color: 'var(--primary)' }}>
                                    <FileCheck size={32} style={{ marginBottom: '10px' }} />
                                    <p style={{ fontWeight: 700 }}>사업자등록증 인식 완료</p>
                                    <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>{formData.businessNumber} | {formData.companyName}</p>
                                </div>
                            ) : (
                                <div>
                                    <Upload size={32} color="var(--primary)" style={{ marginBottom: '10px', opacity: 0.6 }} />
                                    <p style={{ fontWeight: 600 }}>사업자등록증 파일을 여기에 드래그하거나 클릭하세요</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>AI가 사업자번호와 상호를 자동으로 입력해 드립니다.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                        <div className="input-group">
                            <label className="input-label">사업자 등록 번호</label>
                            <input
                                name="businessNumber"
                                className="input-field"
                                placeholder="번호 자동 인식"
                                value={formData.businessNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">회사명</label>
                            <input
                                name="companyName"
                                className="input-field"
                                placeholder="상호 자동 인식"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginTop: '1rem' }}>
                        <label className="input-label">가입 회원 유형</label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <label style={{ flex: 1, cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="CLIENT"
                                    checked={formData.role === 'CLIENT'}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: `2px solid ${formData.role === 'CLIENT' ? 'var(--primary)' : 'var(--glass-border)'}`,
                                    background: formData.role === 'CLIENT' ? 'var(--primary-glow)' : 'transparent',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>의뢰 회원 (클라이언트)</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>견적 요청 및 입찰 진행</p>
                                </div>
                            </label>
                            <label style={{ flex: 1, cursor: 'pointer' }}>
                                <input
                                    type="radio"
                                    name="role"
                                    value="FACTORY"
                                    checked={formData.role === 'FACTORY'}
                                    onChange={handleChange}
                                    style={{ display: 'none' }}
                                />
                                <div style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: `2px solid ${formData.role === 'FACTORY' ? 'var(--primary)' : 'var(--glass-border)'}`,
                                    background: formData.role === 'FACTORY' ? 'var(--primary-glow)' : 'transparent',
                                    textAlign: 'center',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <p style={{ fontWeight: 700, fontSize: '0.9rem' }}>공급 기업 (제조사)</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>견적 투찰 및 수주 활동</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Category selection for Supply Members (Factory) */}
                    {formData.role === 'FACTORY' && (
                        <div className="input-group" style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
                            <label className="input-label">보유 제조 역량 (카테고리)</label>
                            <p style={{ fontSize: '0.75rem', color: '#ffaa00', marginBottom: '8px' }}>
                                * 공급 기업은 제조 업종 등록이 필수이며, 의뢰 발송이 제한됩니다.
                            </p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {manufacturingTypes.map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => handleCategoryToggle(cat)}
                                        style={{
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            border: `1px solid ${formData.categories.includes(cat) ? 'var(--primary)' : 'var(--glass-border)'}`,
                                            background: formData.categories.includes(cat) ? 'var(--primary)' : 'transparent',
                                            color: formData.categories.includes(cat) ? '#000' : 'var(--text-muted)',
                                            fontWeight: 600,
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="divider" style={{ margin: '1.5rem 0' }}>
                        <span>담당자 정보 및 비밀번호 설정</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1rem' }}>
                        <div className="input-group">
                            <label className="input-label">이메일 ID</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="email"
                                    type="email"
                                    className="input-field"
                                    placeholder="ceo@msmmer.io"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '44px' }}
                                    required
                                />
                                <Mail size={18} color="#a0a0a0" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                            </div>
                        </div>
                        <div className="input-group">
                            <label className="input-label">담당자 이름</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    name="name"
                                    type="text"
                                    className="input-field"
                                    placeholder="홍길동"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '44px' }}
                                    required
                                />
                                <User size={18} color="#a0a0a0" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                            </div>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">비밀번호</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                name="password"
                                type="password"
                                className="input-field"
                                placeholder="로그인에 사용할 비밀번호 입력"
                                value={formData.password}
                                onChange={handleChange}
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                            <Lock size={18} color="#a0a0a0" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        </div>
                    </div>

                    <button type="submit" className="login-btn" style={{ marginTop: '1rem' }} disabled={loading}>
                        {loading ? '파트너 등록 중...' : 'MSMMER 파트너로 시작하기'}
                    </button>
                </form>

                <div className="footer-links">
                    이미 가입하셨나요? <Link to="/">로그인</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
