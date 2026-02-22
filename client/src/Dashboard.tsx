import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    PlusSquare,
    ShoppingBag,
    LogOut,
    Bell,
    CheckCircle2,
    ChevronRight,
    LogIn,
    UserPlus,
    Upload,
    ArrowRight,
    Settings,
    HelpCircle,
    FolderOpen
} from 'lucide-react';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            const user = JSON.parse(userStr);
            setIsLoggedIn(true);
            setUserName(user.name);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', fontFamily: '"Noto Sans KR", sans-serif' }}>
            {/* 1. White Header */}
            <nav style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #eee',
                padding: '0 10%',
                height: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                zIndex: 1000
            }}>
                <h1 className="logo" style={{ cursor: 'pointer', margin: 0, fontWeight: 300 }} onClick={() => navigate('/dashboard')}>
                    MSMMER<span style={{ fontWeight: 800 }}>·L</span>
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    {/* 1. Login | Signup (or User status) first */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        {isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Bell size={18} style={{ color: '#666', cursor: 'pointer' }} />
                                <Settings size={18} style={{ color: '#666', cursor: 'pointer' }} onClick={() => navigate('/mypage')} />
                                <div style={{ padding: '2px 10px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 400, color: '#334155' }}>
                                    {userName}님
                                </div>
                                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ef4444', fontWeight: 400, cursor: 'pointer', fontSize: '0.75rem' }}>로그아웃</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', gap: '12px', paddingRight: '20px', borderRight: '1px solid #eee' }}>
                                <Link to="/" style={{ color: '#888', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 300 }}>로그인</Link>
                                <span style={{ color: '#eee', fontSize: '0.7rem' }}>|</span>
                                <Link to="/signup" style={{ color: '#888', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 300 }}>회원가입</Link>
                            </div>
                        )}
                    </div>

                    {/* 2. Main Menu items after Auth */}
                    <div style={{ display: 'flex', gap: '30px' }}>
                        <Link to="/request-quote" style={{ color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>견적내기</Link>
                        <Link to="/bidding-market" style={{ color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>입찰마켓</Link>
                        <Link to="/storage" style={{ color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>견적보관함</Link>
                        <Link to="/support" style={{ color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>고객센터</Link>
                    </div>
                </div>
            </nav>

            {/* 2. Navy Hero Section */}
            <section style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                padding: '100px 10%',
                color: '#ffffff',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle Background Pattern */}
                <div style={{ position: 'absolute', right: '-50px', top: '20%', opacity: 0.1 }}>
                    <PlusSquare size={400} />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                    <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
                        Fiber Laser Cutting Service<br />
                        <span style={{ color: '#2563eb' }}>MANUFACTURE</span>
                    </h2>
                    <p className="subtitle" style={{ maxWidth: '600px', marginBottom: '40px', lineHeight: 1.6 }}>
                        AI 도면 분석을 통한 **실시간 레이저 가공 견적**부터<br />
                        국내 최정상 파트너사 입찰까지, 모든 프로세스를 MSMMER에서 경험하세요.
                    </p>

                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button style={{
                            padding: '18px 40px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px',
                            fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                            boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)'
                        }}>
                            <PlusSquare size={20} /> AI 자동견적 시작하기
                        </button>
                        <button style={{
                            padding: '18px 40px', background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '8px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <ShoppingBag size={20} /> 실시간 입찰 마켓
                        </button>
                    </div>
                </div>
            </section>

            {/* 3. Partner Section (Logos Placeholder) */}
            <section style={{ padding: '40px 10%', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', gap: '60px', opacity: 0.5 }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#94a3b8' }}>PARTNER LINK</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#94a3b8' }}>MSMMER</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#94a3b8' }}>DRVALUE</div>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#94a3b8' }}>PARTNER LINK</div>
            </section>

            {/* 4. Service Process Section */}
            <section style={{ padding: '100px 10%', backgroundColor: '#fff' }}>
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <span style={{ color: '#2563eb', fontWeight: 800, letterSpacing: '2px', fontSize: '0.9rem' }}>PARTNERSHIP</span>
                    <h3 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '10px' }}>MSMMER와 함께하는 <span style={{ color: '#64748b', fontWeight: 400 }}>제조 전문 파트너</span></h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '40px' }}>
                    {[
                        { icon: <Upload size={32} />, title: '1. 도면 업로드', desc: 'DXF, PDF 등 도면을 업로드하면 AI가 실시간으로 분석하여 견적을 산출합니다.' },
                        { icon: <ShoppingBag size={32} />, title: '2. 비교 입찰 시작', desc: '등록된 의뢰건은 검증된 100여 개 파트너사에게 공개되어 경쟁 투찰이 진행됩니다.' },
                        { icon: <CheckCircle2 size={32} />, title: '3. 제작 및 배송', desc: '최적의 업체를 선택하여 발주하면 제작부터 배송까지 한 번에 완료됩니다.' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ textAlign: 'center', padding: '40px', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
                            <div style={{ color: '#2563eb', marginBottom: '25px', display: 'inline-block', padding: '20px', borderRadius: '50%', background: '#f0f7ff' }}>{item.icon}</div>
                            <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '15px' }}>{item.title}</h4>
                            <p style={{ color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. G-Talk Banner (Blue Area) */}
            <section style={{
                margin: '0 10% 100px 10%', padding: '40px 60px', background: '#0f172a', borderRadius: '30px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                    <div style={{ background: '#2563eb', padding: '10px 20px', borderRadius: '8px', fontWeight: 900, fontSize: '0.8rem' }}>GROWTOK</div>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: 800 }}>실시간 협업 메신저, 그루톡으로 더 빠르게 소통하세요</h4>
                </div>
                <button style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff',
                    padding: '12px 25px', borderRadius: '50px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                }}>
                    채팅창 열기 <ArrowRight size={18} />
                </button>
            </section>

            {/* 6. Footer */}
            <footer style={{ padding: '80px 10%', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h5 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '20px' }}>MSMMER</h5>
                        <div style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.8 }}>
                            (15588) 경기도 안산시 상록구 한양대학로 55, 창업보육센터 318호<br />
                            주식회사 디알밸류 | 사업자번호: 491-87-025850<br />
                            Tel: 02-1234-5678 | Email: laser@drvalue.co.kr
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '40px' }}>
                        <Link to="/privacy" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Privacy Policy</Link>
                        <Link to="/terms" style={{ color: '#475569', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>Terms of Service</Link>
                    </div>
                </div>
                <div style={{ marginTop: '60px', paddingTop: '30px', borderTop: '1px solid #e2e8f0', color: '#94a3b8', fontSize: '0.8rem', textAlign: 'center' }}>
                    Copyright © 2026 MSUMER Co., Ltd. All Rights Reserved.
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;
