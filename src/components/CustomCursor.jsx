import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const cursorTrailRef = useRef(null);

    const [cursorState, setCursorState] = useState({
        isHovering: false,
        isClicking: false,
        isHidden: false,
        cursorType: 'default' // default, link, button, input
    });

    useEffect(() => {
        const dot = cursorDotRef.current;
        const ring = cursorRingRef.current;
        const trail = cursorTrailRef.current;

        // Position tracking
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let ringX = mouseX;
        let ringY = mouseY;

        // Trail particles
        const trailParticles = [];
        const maxTrailParticles = 8;

        // Instant dot movement
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update dot position instantly
            if (dot) {
                dot.style.left = `${mouseX}px`;
                dot.style.top = `${mouseY}px`;
            }

            // Create trail particle
            createTrailParticle(mouseX, mouseY);
        };

        // Create trail particle effect
        const createTrailParticle = (x, y) => {
            if (!trail) return;

            const particle = document.createElement('div');
            particle.className = 'cursor-trail-particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;

            trail.appendChild(particle);
            trailParticles.push(particle);

            // Remove old particles
            if (trailParticles.length > maxTrailParticles) {
                const oldParticle = trailParticles.shift();
                if (oldParticle && oldParticle.parentNode) {
                    oldParticle.remove();
                }
            }

            // Fade out and remove particle
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 50);

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
                const index = trailParticles.indexOf(particle);
                if (index > -1) {
                    trailParticles.splice(index, 1);
                }
            }, 400);
        };

        // Smooth ring animation with easing
        const animateRing = () => {
            const speed = 0.15; // Smooth lag effect

            ringX += (mouseX - ringX) * speed;
            ringY += (mouseY - ringY) * speed;

            if (ring) {
                ring.style.left = `${ringX}px`;
                ring.style.top = `${ringY}px`;
            }

            requestAnimationFrame(animateRing);
        };

        // Mouse event handlers
        const handleMouseDown = () => {
            setCursorState(prev => ({ ...prev, isClicking: true }));
        };

        const handleMouseUp = () => {
            setCursorState(prev => ({ ...prev, isClicking: false }));
        };

        const handleMouseEnter = () => {
            setCursorState(prev => ({ ...prev, isHidden: false }));
        };

        const handleMouseLeave = () => {
            setCursorState(prev => ({ ...prev, isHidden: true }));
        };

        // Interactive element detection
        const updateCursorState = (e) => {
            const target = e.target;

            if (target.closest('a')) {
                setCursorState(prev => ({ ...prev, isHovering: true, cursorType: 'link' }));
            } else if (target.closest('button, [role="button"]')) {
                setCursorState(prev => ({ ...prev, isHovering: true, cursorType: 'button' }));
            } else if (target.closest('input, textarea, select')) {
                setCursorState(prev => ({ ...prev, isHovering: true, cursorType: 'input' }));
            } else if (target.closest('.clickable, [data-cursor="pointer"]')) {
                setCursorState(prev => ({ ...prev, isHovering: true, cursorType: 'default' }));
            } else {
                setCursorState(prev => ({ ...prev, isHovering: false, cursorType: 'default' }));
            }
        };

        // Event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousemove', updateCursorState);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Start ring animation
        const animationFrame = requestAnimationFrame(animateRing);

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousemove', updateCursorState);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrame);

            // Clean up trail particles
            trailParticles.forEach(particle => {
                if (particle.parentNode) {
                    particle.remove();
                }
            });
        };
    }, []);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorDotRef}
                className={`cursor-dot ${cursorState.isClicking ? 'clicking' : ''} ${cursorState.isHidden ? 'hidden' : ''}`}
            />

            {/* Cursor ring/outline */}
            <div
                ref={cursorRingRef}
                className={`cursor-ring ${cursorState.isHovering ? 'hovering' : ''} ${cursorState.isClicking ? 'clicking' : ''} ${cursorState.isHidden ? 'hidden' : ''} cursor-${cursorState.cursorType}`}
            />

            {/* Trail container */}
            <div ref={cursorTrailRef} className="cursor-trail" />
        </>
    );
};

export default CustomCursor;