// import React, { useState, useEffect, useRef } from "react";
// import './Contact.css';

// const Contact = () => {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [isVisible, setIsVisible] = useState({});
//   const [status, setStatus] = useState({ type: '', message: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const observerRef = useRef(null);

//   useEffect(() => {
//     observerRef.current = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible((prev) => ({
//               ...prev,
//               [entry.target.dataset.section]: true,
//             }));
//             observerRef.current.unobserve(entry.target);
//           }
//         });
//       },
//       { threshold: 0.2 }
//     );

//     const sections = document.querySelectorAll('[data-section]');
//     sections.forEach((section) => observerRef.current.observe(section));

//     return () => observerRef.current?.disconnect();
//   }, []);

//   const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setStatus({ type: '', message: '' });

//     try {
//       // Using EmailJS
//       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             service_id: 'service_wrjynm8', // Replace with your EmailJS service ID
//             template_id: 'template_0jarhvb', // Replace with your EmailJS template ID
//             user_id: 'rPWIVQwRIj3eG6Rto', // Replace with your EmailJS public key
//           template_params: {
//             from_name: formData.name,
//             from_email: formData.email,
//             message: formData.message,
//             to_email: 'rehanaparbin0210@gmail.com',
//           },
//         }),
//       });

//       if (response.ok) {
//         setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
//         setFormData({ name: '', email: '', message: '' });
//       } else {
//         throw new Error('Failed to send message');
//       }
//     } catch (error) {
//       setStatus({ type: 'error', message: 'Failed to send message. Please try again or email me directly.' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="contact-wrapper">
//       {/* Intro Section */}
//       <section className={`contact-header ${isVisible.intro ? 'reveal' : ''}`} data-section="intro">
//         <h1 className="contact-title">Let's Connect</h1>
//         <p className="contact-tagline">
//           Whether you want to <span className="highlighted-text">collaborate</span>, discuss ideas, 
//           or just say hi — I'm always open to <span className="highlighted-text">meaningful conversations</span>.
//         </p>
//       </section>

//       {/* Contact Form */}
//       <div 
//         className={`contact-form ${isVisible.form ? 'reveal' : ''}`}
//         data-section="form"
//       >
//         {status.message && (
//           <div className={`status-message ${status.type}`}>
//             {status.message}
//           </div>
//         )}

//         <div className="form-group">
//           <label htmlFor="name" className="form-label">Name</label>
//           <input 
//             id="name" 
//             type="text" 
//             name="name" 
//             value={formData.name}
//             onChange={handleChange}
//             required 
//             className="form-input"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="email" className="form-label">Email</label>
//           <input 
//             id="email" 
//             type="email" 
//             name="email" 
//             value={formData.email}
//             onChange={handleChange}
//             required 
//             className="form-input"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="message" className="form-label">Message</label>
//           <textarea 
//             id="message"
//             name="message"
//             value={formData.message}
//             onChange={handleChange}
//             rows="6"
//             required
//             className="form-textarea"
//           />
//         </div>

//         <button 
//           type="button" 
//           onClick={handleSubmit} 
//           disabled={isSubmitting} 
//           className="submit-btn"
//         >
//           {isSubmitting ? 'Sending...' : 'Send Message →'}
//         </button>
// {/* 
//         <p className="direct-email">
//           Or email me directly at: <a href="mailto:rehanaparbin0210@gmail.com" className="email-link">rehanaparbin0210@gmail.com</a>
//         </p> */}
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useState, useEffect, useRef } from "react";
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isVisible, setIsVisible] = useState({});
  const [toast, setToast] = useState({ show: false, type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            observerRef.current.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observerRef.current.observe(section));

    return () => observerRef.current?.disconnect();
  }, []);

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using EmailJS
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_wrjynm8',
          template_id: 'template_0jarhvb',
          user_id: 'rPWIVQwRIj3eG6Rto',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'rehanaparbin0210@gmail.com',
          },
        }),
      });

      if (response.ok) {
        showToast('success', "Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      showToast('error', 'Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeToast = () => {
    setToast({ show: false, type: '', message: '' });
  };

  return (
    <div className="contact-wrapper">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification ${toast.type} ${toast.show ? 'toast-show' : ''}`}>
          <div className="toast-content">
            <span className="toast-icon">
              {toast.type === 'success' ? '✓' : '✕'}
            </span>
            <p className="toast-message">{toast.message}</p>
          </div>
          <button className="toast-close" onClick={closeToast} aria-label="Close notification">
            ×
          </button>
        </div>
      )}

      {/* Intro Section */}
      <section className={`contact-header ${isVisible.intro ? 'reveal' : ''}`} data-section="intro">
        <h1 className="contact-title">Let's Connect</h1>
        <p className="contact-tagline">
          Whether you want to <span className="highlighted-text">collaborate</span>, discuss ideas, 
          or just say hi — I'm always open to <span className="highlighted-text">meaningful conversations</span>.
        </p>
      </section>

      {/* Contact Form */}
      <div 
        className={`contact-form ${isVisible.form ? 'reveal' : ''}`}
        data-section="form"
      >
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            id="name" 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea 
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
            className="form-textarea"
          />
        </div>

        <button 
          type="button" 
          onClick={handleSubmit} 
          disabled={isSubmitting} 
          className="submit-btn"
        >
          {isSubmitting ? 'Sending...' : 'Send Message →'}
        </button>
      </div>
    </div>
  );
};

export default Contact;