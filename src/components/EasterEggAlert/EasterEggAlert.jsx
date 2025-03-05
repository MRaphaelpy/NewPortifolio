import React, { useState } from 'react';
import styles from './EasterEggAlert.module.css';

const EasterEggAlert = ({ onClose }) => {
    const [btnPosition, setBtnPosition] = useState({ top: '50%', left: '50%' });

    const moveCloseButton = () => {
        const newTop = Math.floor(Math.random() * 80) + 10;
        const newLeft = Math.floor(Math.random() * 80) + 10;
        setBtnPosition({ top: `${newTop}%`, left: `${newLeft}%` });
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p>Tente clicar no botão "Fechar"...</p>
                <button
                    onClick={onClose}
                    onMouseEnter={moveCloseButton}
                    className={styles.closeButton}
                    style={{ position: 'absolute', top: btnPosition.top, left: btnPosition.left }}
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default EasterEggAlert;