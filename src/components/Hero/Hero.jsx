import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
   
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  

  useEffect(() => {
    if (!titleRef.current || !isLoaded) return;
    
    const titleSpans = titleRef.current.querySelectorAll('span');
    titleSpans.forEach((span, index) => {
      setTimeout(() => {
        span.classList.add(styles.visible);
      }, 100 * index);
    });
  }, [isLoaded]);


  const prepareTitle = (title) => {
    return title.split('').map((char, index) => (
      <span key={index} className={styles.titleChar}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section 
      className={`${styles.container} ${isLoaded ? styles.loaded : ''}`} 
      ref={containerRef}
    >
      <div className={styles.backgroundElements}>
        <div 
          className={styles.topBlur} 
          style={{ 
            transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15}px)` 
          }}
        />
        <div 
          className={styles.bottomBlur} 
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)` 
          }}
        />
        <div className={styles.grid}></div>
        <div className={styles.sparkles}></div>
      </div>
      
      <div className={styles.content} ref={textRef}>
        <div className={styles.badgeContainer}>
          <span className={styles.badge}>
            <span className={styles.badgeDot}></span>
            <h1 className={styles.title}>{t('hero.title')}</h1>
          </span>
        </div>
        
        <h1 className={styles.title} ref={titleRef}>
          {prepareTitle(t('hero.title'))}
          <span className={styles.cursor}></span>
        </h1>
        
        <div 
          className={styles.description} 
          ref={descriptionRef}
          dangerouslySetInnerHTML={{ __html: t('hero.description') }}
        ></div>
        
        <div className={styles.buttons} ref={buttonsRef}>
          <a 
            href="https://drive.google.com/file/d/1acuU2e1nhxiGa1zjTt7bhQcmWim8S8oQ/view?usp=sharing" 
            className={styles.resumeBtn} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <span className={styles.btnIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span className={styles.btnText}>{t('hero.resumeBtn')}</span>
            <div className={styles.btnHighlight}></div>
          </a>
          
          <a 
            href="mailto:mraphael.py@gmail.com" 
            className={styles.contactBtn}
          >
            <span className={styles.btnIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </span>
            <span className={styles.btnText}>{t('hero.contactBtn')}</span>
            <div className={styles.btnGlow}></div>
            <div className={styles.btnParticles}>
              <span></span><span></span><span></span><span></span><span></span>
            </div>
          </a>
        </div>
      </div>
      
      <div className={styles.heroImgContainer} ref={imageRef}>
        <div className={styles.imageOrbit}>
          <div className={styles.orbitItem} style={{ animationDelay: "0s" }}>
            <img src={getImageUrl("skills/node.png")} alt="Node" />
          </div>
          <div className={styles.orbitItem} style={{ animationDelay: "-2s" }}>
            <img src={getImageUrl("skills/java.png")} alt="Java" />
          </div>
          <div className={styles.orbitItem} style={{ animationDelay: "-4s" }}>
            <img src={getImageUrl("skills/kotlin.png")} alt="Kotlin" />
          </div>
          <div className={styles.orbitItem} style={{ animationDelay: "-6s" }}>
            <img src={getImageUrl("skills/flutter.png")} alt="Flutter" />
          </div>
        </div>
        
        <div 
          className={styles.heroImgInner}
          style={{ 
            transform: `perspective(1000px) rotateY(${mousePosition.x * 5}deg) rotateX(${mousePosition.y * -5}deg)` 
          }}
        >
          <div className={styles.imageGlow}></div>
          <img
            src={getImageUrl("hero/heroImage.png")}
            alt={t('hero.imageAlt')}
            className={styles.heroImg}
            loading="eager"
          />
          <div className={styles.imageReflection}></div>
        </div>
      </div>
    </section>
  );
};