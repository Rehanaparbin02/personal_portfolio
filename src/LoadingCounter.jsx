import { useEffect, useState, useRef } from "react";

const LoadingCounter = ({ onFinish }) => {
    const [count, setCount] = useState(0);
    const [isHiding, setIsHiding] = useState(false);
    const onFinishRef = useRef(onFinish);

    // Update ref when onFinish changes
    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        const totalDuration = 3000;
        const steps = 100;
        const intervalTime = totalDuration / steps;
        let hasFinished = false;

        const interval = setInterval(() => {
            setCount((prev) => {
                if (prev < 100) {
                    return prev + 1;
                }

                if (!hasFinished) {
                    hasFinished = true;
                    clearInterval(interval);

                    // Start hiding animation
                    setIsHiding(true);

                    // Wait for fade-out transition before calling onFinish
                    setTimeout(() => {
                        if (onFinishRef.current) {
                            onFinishRef.current();
                        }
                    }, 1000); // Match the CSS transition duration
                }

                return 100;
            });
        }, intervalTime);

        return () => {
            clearInterval(interval);
        };
    }, []); // Empty dependency array - only run once on mount

    return (
        <div className={`loading-counter ${isHiding ? 'hidden' : 'visible'}`} style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) ${isHiding ? 'translateY(40px)' : 'translateY(0)'}`,
            zIndex: 9999,
            transition: 'opacity 1s ease, transform 1s ease',
            opacity: isHiding ? 0 : 1
        }}>
            <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#f4efe3',
                border: '2px solid #1d2342',
                color: '#1d2342',
                fontFamily: "'Koulen', sans-serif",
                fontSize: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 25px rgba(29, 35, 66, 0.3)',
                animation: 'pulse 3s ease-in-out infinite'
            }}>
                {count}%
            </div>
            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
        </div>
    );
};

export default LoadingCounter;