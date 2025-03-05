import React from "react";
import { useInView } from "react-intersection-observer";
import styles from "./FadeInSection.module.css";

const FadeInSection = ({ children }) => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    return (
        <div ref={ref} className={`${styles.fadeInSection} ${inView ? styles.visible : ''}`}>
            {children}
        </div>
    );
};
export default FadeInSection;