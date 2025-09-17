import React, { useRef, useState, useEffect } from 'react';

const Carousel = () => {
    const [isDetailVisible, setDetailVisible] = useState(false);
    const [currentTransition, setCurrentTransition] = useState('');
    const listRef = useRef(null);
    const nextButtonRef = useRef(null);
    const prevButtonRef = useRef(null);
    let unAcceptClickTimeout;

    // Auto change slide every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            showSlider('next');
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleNext = () => showSlider('next');
    const handlePrev = () => showSlider('prev');

    const showSlider = (type) => {
        if (nextButtonRef.current && prevButtonRef.current) {
            nextButtonRef.current.style.pointerEvents = 'none';
            prevButtonRef.current.style.pointerEvents = 'none';
        }

        setCurrentTransition(type);
        setTimeout(() => setCurrentTransition(''), 1200);

        const items = listRef.current.querySelectorAll('.carousel-item');
        if (type === 'next') {
            listRef.current.appendChild(items[0]);
        } else {
            listRef.current.prepend(items[items.length - 1]);
        }

        clearTimeout(unAcceptClickTimeout);
        unAcceptClickTimeout = setTimeout(() => {
            if (nextButtonRef.current && prevButtonRef.current) {
                nextButtonRef.current.style.pointerEvents = 'auto';
                prevButtonRef.current.style.pointerEvents = 'auto';
            }
        }, 2000);
    };

    const handleSeeMore = () => setDetailVisible(true);
    const handleBack = () => setDetailVisible(false);

    const carouselData = [
        { id: 1, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", title: "Premium Headphones" },
        { id: 2, image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop", title: "Smart Watch" },
        { id: 3, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop", title: "Wireless Speaker" },
        { id: 4, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=300&fit=crop", title: "Gaming Controller" },
        { id: 5, image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop", title: "Smartphone" },
        { id: 6, image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop", title: "Tablet Device" }
    ];

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
            fontFamily: 'ui-sans-serif, system-ui, sans-serif',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Gradient Background */}
            <div
                style={{
                    position: 'absolute',
                    width: '24rem',
                    height: '18rem',
                    opacity: '0.8',
                    zIndex: -1,
                    borderRadius: '20% 30% 80% 10%',
                    filter: 'blur(150px)',
                    top: '50%',
                    left: '50%',
                    background: 'linear-gradient(135deg, #ef4444, #9333ea, #2563eb)',
                    transition: 'all 1s ease-in-out',
                    transform: isDetailVisible
                        ? 'translateX(-100%) translateY(-50%) rotate(90deg)'
                        : 'translateX(-0.5rem) translateY(-50%)',
                    ...(isDetailVisible && { filter: 'blur(130px)' })
                }}
            />

            {/* Main Carousel */}
            <div style={{
                position: 'relative',
                height: '100vh',
                overflow: 'hidden',
                marginTop: '-3rem'
            }}>
                {/* Carousel Items */}
                <div ref={listRef} style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: '72rem',
                    height: '80%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0 1rem'
                }}>
                    {carouselData.map((item, index) => (
                        <div
                            key={item.id}
                            className="carousel-item"
                            style={{
                                position: 'absolute',
                                left: '0',
                                width: isDetailVisible && index === 1 ? '100%' : '75%',
                                height: '100%',
                                fontSize: '0.875rem',
                                transition: 'all 0.5s ease-in-out',
                                opacity: index >= 5 ? '0' : (
                                    index === 0 ? '0' :
                                    index === 4 ? '0' : '1'
                                ),
                                transform: (() => {
                                    if (index === 0) return 'translateX(-100%) translateY(-0.5rem) scale(1.5)';
                                    if (index === 1) return 'translateX(0)';
                                    if (index === 2) return 'translateX(50%) translateY(1rem) scale(0.75)';
                                    if (index === 3) return 'translateX(75%) translateY(2rem) scale(0.5)';
                                    if (index === 4) return 'translateX(100%) translateY(3rem) scale(0.25)';
                                    return 'translateX(0)';
                                })(),
                                filter: (() => {
                                    if (index === 0) return 'blur(30px)';
                                    if (index === 2) return 'blur(10px)';
                                    if (index === 3) return 'blur(30px)';
                                    if (index === 4) return 'blur(40px)';
                                    return 'none';
                                })(),
                                zIndex: (() => {
                                    if (index === 1) return 20;
                                    if (index === 0 || index === 2) return 10;
                                    return 0;
                                })(),
                                pointerEvents: index === 0 || index === 4 || (isDetailVisible && index >= 2) ? 'none' : 'auto',
                                ...(isDetailVisible && index >= 2 && { left: '100%', opacity: '0' }),
                                ...(window.innerWidth < 1024 && { width: index === 1 && !isDetailVisible ? '66.666667%' : '75%' })
                            }}
                        >
                            {/* Product Image */}
                            <img
                                src={item.image}
                                alt={`Slide ${index + 1}`}
                                style={{
                                    width: window.innerWidth < 1024 ? '40%' : '50%',
                                    position: 'absolute',
                                    right: isDetailVisible && index === 1 ? '50%' : '0',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    transition: 'all 1s ease-in-out',
                                    borderRadius: '0.5rem',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                }}
                            />

                            {/* Intro Text */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: window.innerWidth < 768 ? '20rem' : '24rem',
                                transition: 'all 0.5s ease-in-out',
                                marginLeft: window.innerWidth < 1024 ? '1rem' : '0',
                                opacity: index === 1 && !isDetailVisible ? '1' : '0',
                                pointerEvents: index === 1 && !isDetailVisible ? 'auto' : 'none'
                            }}>
                                <div style={{
                                    fontSize: window.innerWidth < 768 ? '1.5rem' : '1.875rem',
                                    fontWeight: '500',
                                    lineHeight: '1.25',
                                    marginBottom: '0.5rem'
                                }}>
                                    Welcome to
                                </div>
                                <div style={{
                                    fontSize: window.innerWidth < 768 ? '2.25rem' : '3.75rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem',
                                    background: 'linear-gradient(45deg, #9333ea, #2563eb)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    TST Electronics
                                </div>
                                <div style={{
                                    color: '#4b5563',
                                    marginBottom: '1.5rem',
                                    fontSize: window.innerWidth < 768 ? '0.875rem' : '1rem'
                                }}>
                                    Empowering your Tech Journey - Discover, Choose, Connect
                                </div>
                                <button
                                    onClick={handleSeeMore}
                                    style={{
                                        borderBottom: '2px solid #4b5563',
                                        backgroundColor: 'transparent',
                                        fontWeight: '700',
                                        letterSpacing: '0.05em',
                                        padding: '0.5rem 0',
                                        transition: 'all 0.3s ease-in-out',
                                        fontSize: window.innerWidth < 768 ? '0.875rem' : '1rem',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    SEE MORE
                                </button>
                            </div>

                            {/* Detail View */}
                            <div style={{
                                position: 'absolute',
                                right: '0',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                width: '50%',
                                textAlign: 'right',
                                transition: 'all 0.5s ease-in-out',
                                opacity: isDetailVisible && index === 1 ? '1' : '0',
                                pointerEvents: isDetailVisible && index === 1 ? 'auto' : 'none'
                            }}>
                                <div style={{
                                    fontSize: window.innerWidth < 768 ? '1.875rem' : window.innerWidth < 1024 ? '2.25rem' : '3.75rem',
                                    fontWeight: '700',
                                    marginBottom: '1rem'
                                }}>{item.title}</div>
                                <div style={{
                                    color: '#4b5563',
                                    marginBottom: '1.5rem',
                                    fontSize: window.innerWidth < 768 ? '0.875rem' : '1rem',
                                    maxHeight: window.innerWidth < 768 ? '6rem' : 'none',
                                    overflow: 'auto'
                                }}>
                                    Experience premium quality and cutting-edge technology.
                                    Designed for performance and built to last, this product delivers
                                    exceptional value for tech enthusiasts and professionals alike.
                                </div>

                                {/* Specs */}
                                <div style={{
                                    display: 'flex',
                                    gap: window.innerWidth < 768 ? '0.5rem' : '1rem',
                                    width: '100%',
                                    borderTop: '1px solid #d1d5db',
                                    marginTop: '1.25rem',
                                    paddingTop: '1.25rem',
                                    overflow: 'auto'
                                }}>
                                    {[
                                        { label: 'Battery', value: '6 hours' },
                                        { label: 'Charging', value: 'Type-C' },
                                        { label: 'Compatible', value: 'Android' },
                                        { label: 'Bluetooth', value: '5.3' },
                                        { label: 'Control', value: 'Touch' }
                                    ].map((spec, i) => (
                                        <div key={i} style={{
                                            width: window.innerWidth < 768 ? '4rem' : '5rem',
                                            textAlign: 'center',
                                            flexShrink: 0
                                        }}>
                                            <p style={{
                                                fontWeight: '700',
                                                fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem'
                                            }}>{spec.label}</p>
                                            <p style={{
                                                fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem'
                                            }}>{spec.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div style={{
                                    marginTop: '1.5rem',
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    gap: '0.5rem',
                                    flexWrap: 'wrap'
                                }}>
                                    <button style={{
                                        backgroundColor: 'transparent',
                                        border: '1px solid #9ca3af',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem',
                                        letterSpacing: '0.05em',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                    >
                                        ADD TO CART
                                    </button>
                                    <button style={{
                                        backgroundColor: '#9333ea',
                                        color: 'white',
                                        padding: '0.5rem 0.75rem',
                                        fontSize: window.innerWidth < 768 ? '0.75rem' : '0.875rem',
                                        letterSpacing: '0.05em',
                                        fontWeight: '500',
                                        transition: 'all 0.3s ease-in-out',
                                        cursor: 'pointer',
                                        border: 'none'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#7c3aed'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#9333ea'}
                                    >
                                        CHECKOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation */}
                <div style={{
                    position: 'absolute',
                    bottom: '2.5rem',
                    width: '100%',
                    maxWidth: '72rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '0 1rem',
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: isDetailVisible ? '0' : '1',
                    pointerEvents: isDetailVisible ? 'none' : 'auto'
                }}>
                    <button
                        id="prev"
                        ref={prevButtonRef}
                        onClick={handlePrev}
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            border: '1px solid #9ca3af',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas',
                            fontSize: '1.125rem',
                            backgroundColor: 'white',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        ‹
                    </button>
                    <button
                        id="next"
                        ref={nextButtonRef}
                        onClick={handleNext}
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            borderRadius: '50%',
                            border: '1px solid #9ca3af',
                            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas',
                            fontSize: '1.125rem',
                            backgroundColor: 'white',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                    >
                        ›
                    </button>
                </div>

                {/* Back Button */}
                <button
                    onClick={handleBack}
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 50,
                        border: 'none',
                        borderBottom: '1px solid #4b5563',
                        fontWeight: '700',
                        letterSpacing: '0.05em',
                        backgroundColor: 'transparent',
                        padding: '0.5rem 1rem',
                        transition: 'opacity 0.5s ease-in-out',
                        opacity: isDetailVisible ? '1' : '0',
                        cursor: 'pointer'
                    }}
                >
                    BACK
                </button>
            </div>
        </div>
    );
};

export default Carousel;