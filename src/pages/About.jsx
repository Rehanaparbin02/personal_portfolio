import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import aboutme from '../assets/aboutme.jpg';

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.dataset.section]: true,
            }));
            observerRef.current.unobserve(entry.target); // observe once
          }
        });
      },
      { threshold: 0.15 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);


  return (
    <div className="about-container">
      <div
        className={`about-hero ${isVisible.hero ? 'reveal' : ''}`}
        data-section="hero"
      >
        <div className="hero-content">
          <h1 className="about-title">About Me</h1>
          <p className="about-intro cursive">
            Hi there, this is <span className="highlighted-name">Rehana Parbin</span> – a designer, developer, and creative thinker passionate about crafting digital experiences that feel effortless.
          </p>
          <p className="about-tagline">
            I believe great code comes from excellent design. From concept to deployment, I create digital products that work well and resonate.
          </p>
        </div>

        <div className="hero-photo">
          <div className="photo-frame">
            <img
              src={aboutme}
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>
      </div>

      <div
        className={`about-intro-card ${isVisible.intro ? 'reveal' : ''}`}
        data-section="intro"
      >
        <p className="about-text-large">
          My development philosophy, <span className="highlighted-name">"Design First, Function Always"</span>, focuses on <span className="highlighted-name"> learning </span> and <span className="highlighted-name">exploration</span>. 
          I strive to create <span className="highlighted-name">elegant</span>, <span className="highlighted-name">efficient</span> code and <span className="highlighted-name">user-friendly experiences</span>. My process begins with 
          <span className="highlighted-name"> UI/UX prototyping</span> using <span className="highlighted-name"> Figma</span> and <span className="highlighted-name">Webflow</span>, followed by the 
          development of <span className="highlighted-name">high-performance front-end applications</span> in <span className="highlighted-name"> React.js</span> and <span className="highlighted-name">React Native</span>. 
          I am also devoted to building <span className="highlighted-name">dependable back-end systems</span> using <span className="highlighted-name"> Node.js</span>, <span className="highlighted-name">Express.js</span>, and <span className="highlighted-name">PostgreSQL</span>/<span className="highlighted-name">Supabase</span>, as well as 
          integrating <span className="highlighted-name"> AI</span> and <span className="highlighted-name">machine learning</span> to enhance my 
          digital products.
        </p>

      </div>

      <div className="two-column-grid">
        <section
          className={`about-card education-card ${isVisible.education ? 'reveal' : ''}`}
          data-section="education"
        >
          <div className="card-header">
            <h2 className="section-title">Education</h2>
          </div>
          <div className="education-item hover-lift">
            <h3 className="degree-title"><span className="highlighted-name">Bachelor of Computer Science</span></h3>
            <p className="institution">Barak Valley Engineering College</p>
            <p className="year">2019 - 2023</p>
          </div>
        </section>

        <section
          className={`about-card skills-card ${isVisible.skills ? 'reveal' : ''}`}
          data-section="skills"
        >
          <div className="card-header">
            <h2 className="section-title">Skills</h2>
          </div>
          <ul className="about-skills-list">
            <li className="skill-item"><span className="highlighted-name">Web Design & Development</span></li>
            <li className="skill-item"><span className="highlighted-name">UI/UX Design</span></li>
            <li className="skill-item"><span className="highlighted-name">Brand Identity</span></li>
            <li className="skill-item"><span className="highlighted-name">React & Modern JavaScript</span></li>
            <li className="skill-item"><span className="highlighted-name">Responsive Design</span></li>
            <li className="skill-item"><span className="highlighted-name">Node.js / Express.js</span></li>
            <li className="skill-item"><span className="highlighted-name">RESTful APIs & GraphQL</span></li>
            <li className="skill-item"><span className="highlighted-name">PostgreSQL / MongoDB / Supabase</span></li>
            <li className="skill-item"><span className="highlighted-name">Authentication & Security (JWT, OAuth)</span></li>
            <li className="skill-item"><span className="highlighted-name">Version Control (Git)</span></li>
            <li className="skill-item"><span className="highlighted-name">Machine Learning</span></li>
          </ul>

        </section>
      </div>

      <section
          className={`about-card tools-card ${isVisible.tools ? 'reveal' : ''}`}
          data-section="tools"
        >
          <div className="card-header">
            <h2 className="section-title">Favorite Tools</h2>
          </div>

          <div className="tools-grid">
            {/* Figma */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z"/>
                  <path fill="currentColor" d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z"/>
                  <path fill="currentColor" d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z"/>
                  <path fill="currentColor" d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z"/>
                  <path fill="currentColor" d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z"/>
                </svg>
              </div>
              <p className="tool-name">Figma</p>
            </div>

            {/* React */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="11" ry="4.2"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                    <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                  </g>
                </svg>
              </div>
              <p className="tool-name">React</p>
            </div>

            {/* Webflow */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M100 0L150 50L100 100L50 50L100 0Z"/>
                  <path fill="currentColor" d="M50 50L100 100L50 150L0 100L50 50Z"/>
                  <path fill="currentColor" d="M150 50L200 100L150 150L100 100L150 50Z"/>
                  <path fill="currentColor" d="M100 100L150 150L100 200L50 150L100 100Z"/>
                </svg>
              </div>
              <p className="tool-name">Webflow</p>
            </div>

            {/* GitHub */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M12 .5C5.73.5.5 5.73.5 12c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56v-2.03c-3.2.7-3.87-1.38-3.87-1.38-.53-1.35-1.3-1.71-1.3-1.71-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.22 1.8 1.22 1.05 1.8 2.76 1.28 3.43.98.1-.76.41-1.28.75-1.57-2.55-.29-5.24-1.27-5.24-5.63 0-1.24.44-2.25 1.16-3.04-.12-.29-.5-1.45.11-3.03 0 0 .96-.31 3.15 1.16a10.97 10.97 0 0 1 2.87-.39c.97 0 1.95.13 2.87.39 2.19-1.47 3.15-1.16 3.15-1.16.61 1.58.23 2.74.11 3.03.72.79 1.16 1.8 1.16 3.04 0 4.37-2.7 5.34-5.27 5.63.42.36.8 1.09.8 2.21v3.28c0 .31.21.68.8.56A10.5 10.5 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5z"/>
                </svg>
              </div>
              <p className="tool-name">GitHub</p>
            </div>

            {/* VS Code */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M3.59 7.36 2 8.74v6.52l1.59 1.38L9 12 3.59 7.36zM15 3l-8.94 8.17L15 19V3zM21 5v14l-2-.01V5L21 5z"/>
                </svg>
              </div>
              <p className="tool-name">VS Code</p>
            </div>

            {/* Postman */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="4"/>
                  <path fill="currentColor" d="M24 32h16v4H24zM30 24h4v16h-4z"/>
                </svg>
              </div>
              <p className="tool-name">Postman</p>
            </div>

            {/* Expo */}
            <div className="tool-item hover-lift">
              <div className="tool-icon">
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M100 432L256 80l156 352h-64l-92-224-92 224z"/>
                </svg>
              </div>
              <p className="tool-name">Expo</p>
            </div>
          </div>
        </section>


      <section
        className={`about-card experience-card-full ${isVisible.experience ? 'reveal' : ''}`}
        data-section="experience"
      >
        <div className="card-header">
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="experience-grid">
          <div className="experience-item hover-lift">
            <div className="experience-timeline">
              <span className="timeline-dot"></span>
              <span className="timeline-line"></span>
            </div>
            <div className="experience-content">
              <h3 className="job-title">
                <span className="highlighted-name">UI/UX Designer & Frontend Developer</span>
              </h3>
              <p className="company">Freelance</p>
              <p className="duration">Jun 2024 – Present</p>
              <p className="job-description">
                Designed and developed responsive, user-focused web and mobile apps for clients in retail and construction.
                Built scalable design systems and interactive prototypes in Figma, improving development handoff efficiency by 40%.
                Implemented usability-first interfaces in React.js and React Native, ensuring accessibility and visual consistency.
              </p>
            </div>
          </div>

          <div className="experience-item hover-lift">
            <div className="experience-timeline">
              <span className="timeline-dot"></span>
              <span className="timeline-line"></span>
            </div>
            <div className="experience-content">
              <h3 className="job-title">
                <span className="highlighted-name">Research Intern (Quantum Machine Learning)</span>
              </h3>
              <p className="company">Centre for Development of Advanced Computing (CDAC)</p>
              <p className="duration">Aug 2022 – Nov 2022</p>
              <p className="job-description">
                Conducted research on quantum-enhanced machine learning algorithms for computational optimization.
                Analyzed over 50+ academic papers and implemented performance improvements achieving 40% higher efficiency.
                Presented results to senior researchers and contributed to optimization models for high-complexity tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

     <section
        className={`about-card interests-card ${isVisible.interests ? 'reveal' : ''}`}
        data-section="interests"
      >
        <div className="card-header">
          <h2 className="section-title">Beyond Work</h2>
        </div>
        <p className="about-text">
          When I'm not immersed in <span className="highlighted-name">code</span> or <span className="highlighted-name">design grids</span>, 
          I turn to <span className="highlighted-name">sketching</span> – my quiet space to translate thoughts into lines and forms. 
          I draw inspiration from <span className="highlighted-name">anime</span>, and I love watching <span className="highlighted-name"> historical shows</span>, <span className="highlighted-name">documentaries</span>, 
          and listening to <span className="highlighted-name">podcasts</span> across <span className="highlighted-name"> various genres</span>. 
          I enjoy exploring how <span className="highlighted-name">art</span>, <span className="highlighted-name">culture</span>, and <span className="highlighted-name">technology</span> mirror each other, constantly shaping the way we see and build the world. 
          Those explorations often find their way back into my designs – as <span className="highlighted-name"> emotion</span>, <span className="highlighted-name">balance</span>, and <span className="highlighted-name"> rhythm</span>.
        </p>
      </section>


    </div>
  );
};

export default About;

