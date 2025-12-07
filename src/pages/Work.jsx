import React, { useEffect, useRef, useState } from 'react';
import './Work.css';
import WorkCase from '../components/WorkCase';
import Process from './Process';

// Import images
import koaHome1 from '../assets/home/home-1.png';
import koaHome2 from '../assets/home/home-2.png';
import koaHome3 from '../assets/home/home-3.png';

import eventlyImg1 from '../assets/evently/evently-01.png';
import eventlyImg2 from '../assets/evently/evently-02.png';
import eventlyImg3 from '../assets/evently/evently-03.png';

import zenflowImg1 from '../assets/zenflow/zenflow-1.png';
import zenflowImg2 from '../assets/zenflow/zenflow-2.png';
import zenflowImg3 from '../assets/zenflow/zenflow-3.png';

import foodlogImg1 from '../assets/foodlog/food-01.png';
import foodlogImg2 from '../assets/foodlog/food-02.png';
import foodlogImg3 from '../assets/foodlog/food-03.png';

import doitImg1 from '../assets/do-it/do-it-img1.jpg';
import doitImg2 from '../assets/do-it/do-it-img2.jpg';
import doitImg3 from '../assets/do-it/do-it-img3.jpg';

const Work = () => {
  // Define your project data
  const projects = [
    {
      id: 1,
      title: "Do-It",
      tags: ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"],
      description:
        "A task management app that helps users stay organized and productive by allowing them to create, prioritize, and track their tasks in one place.",
      showDevices: true,
      className: "doitproject",
      images: [doitImg1, doitImg2, doitImg3]
    },
    {
      id: 2,
      title: "KOA",
      tags: ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"],
      description:
        "A comprehensive personal finance tracker that simplifies money management by automating expense categorization, visualizing financial trends, and helping users plan smarter savings goals with clarity-driven dashboards.",
      showDevices: true,
      className: "koaproject",
      images: [koaHome1, koaHome2, koaHome3]
    },
    {
      id: 3,
      title: "EVENTLY",
      tags: ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"],
      description:
        "A real-time event and team management platform that streamlines collaboration, integrates live updates via Socket.io, and provides intuitive task visualization with role-based access control for distributed teams.",
      showDevices: true,
      deviceCount: 3,
      className: "eventlyproject",
      images: [eventlyImg1, eventlyImg2, eventlyImg3]
    },
    {
      id: 4,
      title: "ZENFLOW",
      tags: ["UI/UX", "ANDROID", "IOS", "REACT NATIVE", "PASSION PROJECT"],
      description:
        "A minimalist journaling app designed around emotional resonance and mindfulness. Built for seamless daily reflection with real-time sync, intuitive animations, and privacy-focused architecture.",
      showDevices: true,
      className: "zenflowproject",
      images: [zenflowImg1, zenflowImg2, zenflowImg3]
    },
    // {
    //   id: 5,
    //   title: "FOODLOG",
    //   tags: ["UI/UX", "WEB", "REACT", "NODE.JS", "PASSION PROJECT"],
    //   description:
    //     "A modern food blogging and recipe discovery platform that merges culinary storytelling with personalized meal tracking. Designed with warm, clean food aesthetics and intuitive tag-based filtering to make food blogging accessible, engaging, and seamless for creators and readers alike.",
    //   showDevices: true,
    //   className: "Foodlogproject",
    //   images: [foodlogImg1, foodlogImg2, foodlogImg3]
    // }
  ];

  // Page load animation
  const [pageLoaded, setPageLoaded] = useState(false);

  // Track which projects are visible (for scroll-into-view animation)
  const [visibleProjects, setVisibleProjects] = useState({});
  const itemRefs = useRef({});

  useEffect(() => {
    // Slight delay to make the entrance smoother
    const timer = setTimeout(() => setPageLoaded(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If no window (SSR), just show everything
    if (typeof window === 'undefined') {
      const allVisible = {};
      projects.forEach((p) => {
        allVisible[p.id] = true;
      });
      setVisibleProjects(allVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-project-id');
          if (entry.isIntersecting && id) {
            setVisibleProjects((prev) => ({
              ...prev,
              [id]: true
            }));
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    Object.entries(itemRefs.current).forEach(([id, el]) => {
      if (el) {
        el.setAttribute('data-project-id', id);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <div className={`work-container ${pageLoaded ? 'work-loaded' : ''}`}>
      <section className="work-intro">
        <h2 className="intro-subtitle">Welcome to my space</h2>
        <h1 className="intro-title">See My Work & Projects</h1>
        <p className="intro-text">
          I design and build digital products that combine aesthetics, usability, and technology.
          Each project below reflects a blend of creativity, problem-solving, and precision —
          crafted to inspire and deliver real-world value.
        </p>
      </section>

      <div className="work-wrapper">
        {projects.map((project) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) {
                itemRefs.current[project.id] = el;
              }
            }}
            className={`work-item ${visibleProjects[project.id] ? 'work-item-visible' : ''
              }`}
          >
            <WorkCase
              title={project.title}
              tags={project.tags}
              description={project.description}
              showDevices={project.showDevices}
              deviceCount={project.deviceCount || 3}
              images={project.images}
              className={project.className}
            />
          </div>
        ))}
      </div>


    </div>
  );
};

export default Work;
