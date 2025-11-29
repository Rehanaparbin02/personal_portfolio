import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./WorkCase.css";

function Device({ className, image, alt }) {
  return (
    <div className={`device ${className || ''}`}>
      <img src={image} alt={alt} className="device-image" />
    </div>
  );
}

function Tag({ label }) {
  return <div className="tag">{label}</div>;
}

export default function WorkCase({ 
  title = "PROJECT TITLE",
  tags = [],
  description = "Project description goes here.",
  showDevices = true,
  deviceCount = 3,
  images = [],
  className = ""
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: "50px"
      }
    );
    
    observer.observe(el);
    
    return () => {
      if (observer && el) {
        observer.unobserve(el);
      }
    };
  }, []);

  // Map the project title to its route
  const routePath = `/showcase/${title.toLowerCase()}`;

  return (
    <div className={`work-case ${className}`} ref={ref}>
      {showDevices && (
        <div className="device-showcase">
          {images.length > 0 &&
            images.slice(0, deviceCount).map((image, index) => (
              <Device
                key={index}
                className={`device-${index + 1}`}
                image={image}
                alt={`${title} device ${index + 1}`}
              />
            ))}
        </div>
      )}

      <div className="work-case-content">
        <h1 className="work-case-title">{title}</h1>

        {tags.length > 0 && (
          <div className="tag-row">
            {tags.map((tag, index) => (
              <Tag key={index} label={tag} />
            ))}
          </div>
        )}

        <div className="work-case-description">
          <p>{description}</p>
        </div>

        <Link to={routePath} className="case-study-button">
          <span className="button-circle"></span>
          VIEW CASE STUDY
        </Link>
      </div>
    </div>
  );
}