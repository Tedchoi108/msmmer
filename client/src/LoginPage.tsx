import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Chrome, MessageCircle } from 'lucide-react';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            console.log('Login success:', response.data.user.name);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || '로그인 중 오류가 발생했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = (provider: string) => {
        console.log(`Redirecting to ${provider} login...`);
    };

    return (
        <div className="app-container">
            <div className="bg-blur"></div>

            <div className="login-card">
                <header className="header">
                    <h1 className="logo">MSMMER</h1>
                    <p className="subtitle">B2B Manufacturing Platform</p>
                </header>

                <div className="social-container">
                    <button
                        className="social-button google-btn"
                        onClick={() => handleSocialLogin('Google')}
                    >
                        <Chrome size={20} />
                        <span>Google로 시작하기</span>
                    </button>

                    <button
                        className="social-button kakao-btn"
                        onClick={() => handleSocialLogin('Kakao')}
                    >
                        <MessageCircle size={20} fill="#3c1e1e" />
                        <span>카카오로 시작하기</span>
                    </button>
                </div>

                <div className="divider">
                    <span>또는 이메일로 로그인</span>
                </div>

                {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label className="input-label">이메일</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="email"
                                className="input-field"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                            <Mail size={18} color="#a0a0a0" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="input-label">비밀번호</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ paddingLeft: '44px' }}
                                required
                            />
                            <Lock size={18} color="#a0a0a0" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                        </div>
                    </div>

                    <button type="submit" className="login-btn" disabled={loading}>
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <div className="footer-links">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </div>

                <p className="privacy-notice">
                    저희 플랫폼은 사용자의 개인정보 보로를 위해 불필요한 개인 정보를 서버에 남기지 않으며, 안전한 SNS 인증을 적극 권장합니다.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
