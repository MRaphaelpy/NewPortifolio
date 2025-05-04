import React, { useState, useEffect, useRef } from 'react';
import styles from './EasterEggAlert.module.css';
import messageData from '../../easterEggMessages.json';
import confetti from 'canvas-confetti';

const EasterEggAlert = ({ onClose }) => {
    const [btnPosition, setBtnPosition] = useState({ top: '50%', left: '50%' });
    const [attempts, setAttempts] = useState(0);
    const [messages, setMessages] = useState(['Tente clicar no botão "Fechar"...']);
    const contentRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [buttonSpeed, setButtonSpeed] = useState('medium');
    const [showFakeButtons, setShowFakeButtons] = useState(false);
    const [buttonOpacity, setButtonOpacity] = useState(1);
    const [buttonSize, setButtonSize] = useState(1);
    const [zigzagMode, setZigzagMode] = useState(false);
    const [predictMode, setPredictMode] = useState(false);
    const [fakeButtonPositions, setFakeButtonPositions] = useState([]);
    const [showCrashScreen, setShowCrashScreen] = useState(false);

    const [quitting, setQuitting] = useState(false);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [mousePrediction, setMousePrediction] = useState({ x: 0, y: 0, dx: 0, dy: 0 });

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });


            setMousePrediction(prev => {
                const dx = e.clientX - prev.x;
                const dy = e.clientY - prev.y;
                return {
                    x: e.clientX,
                    y: e.clientY,
                    dx: dx,
                    dy: dy
                };
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const mainMessage = messageData.easterEggMessages.find(item => item.attempts === attempts);

        if (mainMessage) {
            setMessages(prev => [...prev, mainMessage.message]);
        }
        else if (Math.random() < messageData.settings.randomMessageProbability && attempts > 3 && attempts % 3 === 0) {
            const randomIndex = Math.floor(Math.random() * messageData.randomMessages.length);
            setMessages(prev => [...prev, messageData.randomMessages[randomIndex]]);
        }


        const specialEvent = messageData.specialEvents?.find(event => event.attempts === attempts);
        if (specialEvent) {
            setMessages(prev => [...prev, specialEvent.message]);


            handleSpecialEvent(specialEvent.effect);
        }
    }, [attempts]);


    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                handleClose();
            }


            checkKonamiCode(e.key);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const handleSpecialEvent = (effect) => {
        switch (effect) {
            case 'super_speed':
                setButtonSpeed('fast');
                break;

            case 'button_duplicate':
                createFakeButtons();
                break;

            case 'zigzag_mode':
                setZigzagMode(true);
                setTimeout(() => setZigzagMode(false), 10000);
                break;

            case 'shrink_button':
                animateButtonShrink();
                break;

            case 'predict_movement':
                setPredictMode(true);
                setTimeout(() => setPredictMode(false), 15000);
                break;

            case 'invisible_button':
                setButtonOpacity(0);
                setTimeout(() => setButtonOpacity(0.2), 3000);
                setTimeout(() => setButtonOpacity(1), 6000);
                break;

            case 'fake_crash':
                showFakeCrashScreen();
                break;

            default:
                break;
        }
    };


    const createFakeButtons = () => {
        if (!contentRef.current) return;

        const contentRect = contentRef.current.getBoundingClientRect();
        const positions = [];

        for (let i = 0; i < 3; i++) {
            positions.push({
                top: `${Math.random() * 80 + 10}%`,
                left: `${Math.random() * 80 + 10}%`
            });
        }

        setShowFakeButtons(true);
        setFakeButtonPositions(positions);

        setTimeout(() => {
            setShowFakeButtons(false);
        }, 7000);
    };


    const animateButtonShrink = () => {
        setButtonSize(1);

        const shrinkInterval = setInterval(() => {
            setButtonSize(prev => {
                if (prev <= 0.5) {
                    clearInterval(shrinkInterval);


                    setTimeout(() => setButtonSize(1), 5000);
                    return prev;
                }
                return prev - 0.05;
            });
        }, 500);
    };


    const showFakeCrashScreen = () => {
        setShowCrashScreen(true);
        setTimeout(() => setShowCrashScreen(false), 3000);
    };


    const konamiSequence = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const [konamiProgress, setKonamiProgress] = useState([]);

    const checkKonamiCode = (key) => {
        const newProgress = [...konamiProgress, key];


        const isCorrect = newProgress.every((k, i) => k === konamiSequence[i]);

        if (isCorrect) {
            setKonamiProgress(newProgress);


            if (newProgress.length === konamiSequence.length) {
                activateKonamiCode();
                setKonamiProgress([]);
            }
        } else {
            setKonamiProgress([]);
        }
    };

    const activateKonamiCode = () => {
        setMessages(prev => [...prev, "🎮 KONAMI CODE ATIVADO! Você pode clicar no botão agora!"]);
        setButtonSpeed('none');
    };

    const moveCloseButton = () => {
        if (!contentRef.current || buttonSpeed === 'none') return;


        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const buttonWidth = 80;
        const buttonHeight = 36;


        const maxX = windowWidth - buttonWidth - 20;
        const maxY = windowHeight - buttonHeight - 20;


        const relMouseX = mousePos.x;
        const relMouseY = mousePos.y;

        let newX, newY;

        if (predictMode) {

            const predictedX = relMouseX + mousePrediction.dx * 5;
            const predictedY = relMouseY + mousePrediction.dy * 5;


            if (predictedX > windowWidth / 2) {
                newX = Math.max(20, Math.random() * (windowWidth / 3 - buttonWidth));
            } else {
                newX = Math.min(maxX - 20, windowWidth * 2 / 3 + Math.random() * (windowWidth / 3 - buttonWidth));
            }

            if (predictedY > windowHeight / 2) {
                newY = Math.max(20, Math.random() * (windowHeight / 3 - buttonHeight));
            } else {
                newY = Math.min(maxY - 20, windowHeight * 2 / 3 + Math.random() * (windowHeight / 3 - buttonHeight));
            }
        } else if (zigzagMode) {

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.min(windowWidth, windowHeight) * 0.4;

            newX = Math.min(maxX, Math.max(20, relMouseX + Math.cos(angle) * distance));
            newY = Math.min(maxY, Math.max(20, relMouseY + Math.sin(angle) * distance));
        } else {

            if (relMouseX > windowWidth / 2) {

                newX = Math.max(20, Math.random() * (windowWidth / 2 - buttonWidth));
            } else {

                newX = Math.min(maxX - 20, windowWidth / 2 + Math.random() * (windowWidth / 2 - buttonWidth));
            }

            if (relMouseY > windowHeight / 2) {

                newY = Math.max(20, Math.random() * (windowHeight / 2 - buttonHeight));
            } else {

                newY = Math.min(maxY - 20, windowHeight / 2 + Math.random() * (windowHeight / 2 - buttonHeight));
            }
        }


        let speedFactor = 1;
        switch (buttonSpeed) {
            case 'slow': speedFactor = 0.5; break;
            case 'fast': speedFactor = 2; break;
            default: speedFactor = 1;
        }


        if (speedFactor < 1) {

            const currentX = parseFloat(btnPosition.left) / 100 * windowWidth;
            const currentY = parseFloat(btnPosition.top) / 100 * windowHeight;

            newX = currentX + (newX - currentX) * speedFactor;
            newY = currentY + (newY - currentY) * speedFactor;
        }

        setAttempts(prev => prev + 1);
        setBtnPosition({
            top: `${(newY / windowHeight) * 100}%`,
            left: `${(newX / windowWidth) * 100}%`
        });
    };

    const handleClose = () => {

        const element = document.querySelector(`.${styles.container}`);
        element.classList.add(styles.closeAnimation);


        if (messageData.settings.enableConfetti) {
            confetti({
                particleCount: 200,
                spread: 70,
                origin: { y: 0.6 }
            });
        }


        const endMessageIndex = Math.floor(Math.random() * messageData.endGameMessages.length);
        alert(messageData.endGameMessages[endMessageIndex]);

        setTimeout(() => {
            onClose();
        }, 500);
    };

    const handleGiveUp = () => {
        setQuitting(true);


        if (messageData.ragequitMessages && messageData.ragequitMessages.length > 0) {
            const quitMessageIndex = Math.floor(Math.random() * messageData.ragequitMessages.length);
            alert(messageData.ragequitMessages[quitMessageIndex]);
        }

        setTimeout(() => {
            onClose();
        }, 500);
    };

    return (
        <div className={styles.container} onClick={(e) => e.target === e.currentTarget && handleClose()}>
            {showCrashScreen && (
                <div className={styles.crashScreen}>
                    <div className={styles.crashContent}>
                        <h2>⚠️ ERRO: Task_ClickButton.exe parou de funcionar</h2>
                        <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                        </div>
                        <p>Diagnosticando o problema... Por favor, aguarde.</p>
                    </div>
                </div>
            )}

            <div className={styles.content} ref={contentRef}>
                <div className={styles.messageWrapper}>
                    <div className={styles.messageContainer}>
                        {messages.map((message, index) => (
                            <p key={index} className={`${styles.message} ${index > 0 ? styles.newMessage : ''}`}>
                                {message}
                            </p>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Botões falsos que aparecem quando showFakeButtons é verdadeiro */}
                {showFakeButtons && fakeButtonPositions.map((pos, index) => (
                    <button
                        key={`fake-${index}`}
                        onMouseEnter={moveCloseButton}
                        className={`${styles.closeButton} ${styles.fakeButton}`}
                        style={{
                            top: pos.top,
                            left: pos.left
                        }}
                    >
                        Fechar
                    </button>
                ))}

                {/* Botão principal de fechar - agora movendo-se por toda a viewport */}
                <button
                    onClick={handleClose}
                    onMouseEnter={moveCloseButton}
                    className={styles.closeButton}
                    style={{
                        position: 'fixed',
                        top: btnPosition.top,
                        left: btnPosition.left,
                        opacity: buttonOpacity,
                        transform: `scale(${buttonSize})`
                    }}
                    aria-label="Fechar"
                >
                    Fechar
                </button>

                <div className={styles.attemptCounter}>
                    Tentativas: <span>{attempts}</span>
                </div>

                <button
                    className={styles.giveUpButton}
                    onClick={handleGiveUp}
                    tabIndex={0}
                >
                    Desistir
                </button>

                {/* Indicador de progresso do Konami Code */}
                {konamiProgress.length > 0 && (
                    <div className={styles.konamiIndicator}>
                        Sequência: {konamiProgress.length}/{konamiSequence.length}
                    </div>
                )}

                {/* Mensagem em modo de previsão */}
                {predictMode && (
                    <div className={styles.predictModeIndicator}>
                        🔮 Modo Previsão Ativado
                    </div>
                )}

                {/* Indicador de modo zigue-zague */}
                {zigzagMode && (
                    <div className={styles.zigzagModeIndicator}>
                        🐍 Modo Cobra Ativado
                    </div>
                )}
            </div>
        </div>
    );
};

export default EasterEggAlert;