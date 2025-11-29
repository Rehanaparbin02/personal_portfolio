import React, { useEffect, useRef, useState } from 'react';
import './Process.css';

const processSteps = [
    {
        id: '01',
        title: 'Discover',
        subtitle: 'Research & Strategy',
        description: 'Every great project starts with understanding. I dive deep into the "why" and "who" to uncover user needs, market gaps, and core objectives. This foundation ensures every decision is data-driven and purpose-led.',
    },
    {
        id: '02',
        title: 'Define',
        subtitle: 'Architecture & Planning',
        description: 'Chaos needs structure. I map out user flows, information architecture, and technical requirements. This blueprint phase eliminates guesswork and sets a clear path for the creative and technical journey ahead.',
    },
    {
        id: '03',
        title: 'Design',
        subtitle: 'Visuals & Prototyping',
        description: 'Where logic meets magic. I craft high-fidelity designs and interactive prototypes that breathe life into the concept. Focusing on aesthetics, accessibility, and intuitive interactions to create a premium feel.',
    },
    {
        id: '04',
        title: 'Develop',
        subtitle: 'Code & Implementation',
        description: 'Translating pixels into performance. Using modern frameworks like React and robust backends, I build scalable, clean, and efficient code. The focus is on speed, responsiveness, and seamless functionality.',
    },
    {
        id: '05',
        title: 'Deliver',
        subtitle: 'Testing & Launch',
        description: 'Perfection is in the details. Rigorous testing across devices and browsers ensures a flawless launch. But it doesn’t end there—I provide support and iteration to keep the product evolving.',
    },
];

const Process = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.disconnect();
        };
    }, []);

    return (
        <section className="process-section" ref={sectionRef}>
            <div className={`process-container ${isVisible ? 'reveal' : ''}`}>
                <div className="process-header">
                    <h2 className="process-title">My Approach</h2>
                    <p className="process-intro">
                        A systematic workflow where <span className="highlight">creativity</span> meets <span className="highlight">engineering</span>.
                    </p>
                </div>

                <div className="process-grid">
                    {processSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-card"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="card-number">{step.id}</div>
                            <div className="card-content">
                                <h3 className="card-title">{step.title}</h3>
                                <h4 className="card-subtitle">{step.subtitle}</h4>
                                <p className="card-description">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
