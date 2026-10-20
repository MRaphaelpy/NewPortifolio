import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import messageData from "../../data/easterEggMessages.json";
import { KONAMI_SEQUENCE, useKonamiCode } from "../../hooks/useKonamiCode";
import { cx } from "../../utils";
import styles from "./EasterEggAlert.module.css";

const pickRandom = (items) => items[Math.floor(Math.random() * items.length)];

export const EasterEggAlert = ({ onClose }) => {
  const { t } = useTranslation();
  const [btnPosition, setBtnPosition] = useState({ top: "50%", left: "50%" });
  const [attempts, setAttempts] = useState(0);
  const [messages, setMessages] = useState(() => [t("easterEgg.intro")]);
  const [buttonSpeed, setButtonSpeed] = useState("medium");
  const [showFakeButtons, setShowFakeButtons] = useState(false);
  const [buttonOpacity, setButtonOpacity] = useState(1);
  const [buttonSize, setButtonSize] = useState(1);
  const [zigzagMode, setZigzagMode] = useState(false);
  const [predictMode, setPredictMode] = useState(false);
  const [fakeButtonPositions, setFakeButtonPositions] = useState([]);
  const [showCrashScreen, setShowCrashScreen] = useState(false);
  const [closing, setClosing] = useState(false);
  const messagesEndRef = useRef(null);
  // Posição do mouse fica em ref: só é lida ao mover o botão, então não
  // precisa re-renderizar o componente a cada mousemove.
  const mouseRef = useRef({ x: 0, y: 0, dx: 0, dy: 0 });

  const konamiProgress = useKonamiCode(() => {
    setMessages((prev) => [...prev, t("easterEgg.konamiActivated")]);
    setButtonSpeed("none");
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const previous = mouseRef.current;
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        dx: e.clientX - previous.x,
        dy: e.clientY - previous.y,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClose = useCallback(() => {
    setClosing(true);
    if (messageData.settings.enableConfetti) {
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
    }
    toast(pickRandom(messageData.endGameMessages), { duration: 4000 });
    setTimeout(onClose, 400);
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  useEffect(() => {
    const createFakeButtons = () => {
      const positions = Array.from({ length: 3 }, () => ({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      }));
      setShowFakeButtons(true);
      setFakeButtonPositions(positions);
      setTimeout(() => setShowFakeButtons(false), 7000);
    };

    const animateButtonShrink = () => {
      setButtonSize(1);
      const shrinkInterval = setInterval(() => {
        setButtonSize((prev) => {
          if (prev <= 0.5) {
            clearInterval(shrinkInterval);
            setTimeout(() => setButtonSize(1), 5000);
            return prev;
          }
          return prev - 0.05;
        });
      }, 500);
    };

    const handleSpecialEvent = (effect) => {
      switch (effect) {
        case "super_speed":
          setButtonSpeed("fast");
          break;
        case "button_duplicate":
          createFakeButtons();
          break;
        case "zigzag_mode":
          setZigzagMode(true);
          setTimeout(() => setZigzagMode(false), 10000);
          break;
        case "shrink_button":
          animateButtonShrink();
          break;
        case "predict_movement":
          setPredictMode(true);
          setTimeout(() => setPredictMode(false), 15000);
          break;
        case "invisible_button":
          setButtonOpacity(0);
          setTimeout(() => setButtonOpacity(0.2), 3000);
          setTimeout(() => setButtonOpacity(1), 6000);
          break;
        case "fake_crash":
          setShowCrashScreen(true);
          setTimeout(() => setShowCrashScreen(false), 3000);
          break;
        default:
          break;
      }
    };

    const mainMessage = messageData.easterEggMessages.find((item) => item.attempts === attempts);
    if (mainMessage) {
      setMessages((prev) => [...prev, mainMessage.message]);
    } else if (
      Math.random() < messageData.settings.randomMessageProbability &&
      attempts > 3 &&
      attempts % 3 === 0
    ) {
      setMessages((prev) => [...prev, pickRandom(messageData.randomMessages)]);
    }

    const specialEvent = messageData.specialEvents?.find((event) => event.attempts === attempts);
    if (specialEvent) {
      setMessages((prev) => [...prev, specialEvent.message]);
      handleSpecialEvent(specialEvent.effect);
    }
  }, [attempts]);

  const moveCloseButton = () => {
    if (buttonSpeed === "none") return;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const buttonWidth = 80;
    const buttonHeight = 36;
    const maxX = windowWidth - buttonWidth - 20;
    const maxY = windowHeight - buttonHeight - 20;
    const { x: mouseX, y: mouseY, dx, dy } = mouseRef.current;
    let newX, newY;
    if (predictMode) {
      const predictedX = mouseX + dx * 5;
      const predictedY = mouseY + dy * 5;
      if (predictedX > windowWidth / 2) {
        newX = Math.max(20, Math.random() * (windowWidth / 3 - buttonWidth));
      } else {
        newX = Math.min(
          maxX - 20,
          (windowWidth * 2) / 3 + Math.random() * (windowWidth / 3 - buttonWidth),
        );
      }
      if (predictedY > windowHeight / 2) {
        newY = Math.max(20, Math.random() * (windowHeight / 3 - buttonHeight));
      } else {
        newY = Math.min(
          maxY - 20,
          (windowHeight * 2) / 3 + Math.random() * (windowHeight / 3 - buttonHeight),
        );
      }
    } else if (zigzagMode) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.min(windowWidth, windowHeight) * 0.4;
      newX = Math.min(maxX, Math.max(20, mouseX + Math.cos(angle) * distance));
      newY = Math.min(maxY, Math.max(20, mouseY + Math.sin(angle) * distance));
    } else {
      if (mouseX > windowWidth / 2) {
        newX = Math.max(20, Math.random() * (windowWidth / 2 - buttonWidth));
      } else {
        newX = Math.min(
          maxX - 20,
          windowWidth / 2 + Math.random() * (windowWidth / 2 - buttonWidth),
        );
      }
      if (mouseY > windowHeight / 2) {
        newY = Math.max(20, Math.random() * (windowHeight / 2 - buttonHeight));
      } else {
        newY = Math.min(
          maxY - 20,
          windowHeight / 2 + Math.random() * (windowHeight / 2 - buttonHeight),
        );
      }
    }
    if (buttonSpeed === "slow") {
      const currentX = (parseFloat(btnPosition.left) / 100) * windowWidth;
      const currentY = (parseFloat(btnPosition.top) / 100) * windowHeight;
      newX = currentX + (newX - currentX) * 0.5;
      newY = currentY + (newY - currentY) * 0.5;
    }
    setAttempts((prev) => prev + 1);
    setBtnPosition({
      top: `${(newY / windowHeight) * 100}%`,
      left: `${(newX / windowWidth) * 100}%`,
    });
  };

  const handleGiveUp = () => {
    if (messageData.ragequitMessages?.length > 0) {
      toast(pickRandom(messageData.ragequitMessages), { duration: 4000 });
    }
    setTimeout(onClose, 400);
  };

  return (
    <div
      className={cx(styles.container, closing && styles.closeAnimation)}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
    >
      {showCrashScreen && (
        <div className={styles.crashScreen}>
          <div className={styles.crashContent}>
            <h2>{t("easterEgg.crashTitle")}</h2>
            <div className={styles.progressBar}>
              <div className={styles.progress}></div>
            </div>
            <p>{t("easterEgg.crashBody")}</p>
          </div>
        </div>
      )}
      <div className={styles.content}>
        <div className={styles.messageWrapper}>
          <div className={styles.messageContainer} aria-live="polite">
            {messages.map((message, index) => (
              <p key={index} className={cx(styles.message, index > 0 && styles.newMessage)}>
                {message}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {showFakeButtons &&
          fakeButtonPositions.map((pos, index) => (
            <button
              key={`fake-${index}`}
              onMouseEnter={moveCloseButton}
              className={cx(styles.closeButton, styles.fakeButton)}
              style={{ top: pos.top, left: pos.left }}
              tabIndex={-1}
            >
              {t("easterEgg.close")}
            </button>
          ))}
        <button
          onClick={handleClose}
          onMouseEnter={moveCloseButton}
          className={styles.closeButton}
          style={{
            position: "fixed",
            top: btnPosition.top,
            left: btnPosition.left,
            opacity: buttonOpacity,
            transform: `scale(${buttonSize})`,
          }}
        >
          {t("easterEgg.close")}
        </button>
        <div className={styles.attemptCounter}>
          {t("easterEgg.attempts")}: <span>{attempts}</span>
        </div>
        <button className={styles.giveUpButton} onClick={handleGiveUp}>
          {t("easterEgg.giveUp")}
        </button>
        {konamiProgress > 0 && (
          <div className={styles.konamiIndicator}>
            {t("easterEgg.sequence")}: {konamiProgress}/{KONAMI_SEQUENCE.length}
          </div>
        )}
        {predictMode && (
          <div className={styles.predictModeIndicator}>{t("easterEgg.predictMode")}</div>
        )}
        {zigzagMode && <div className={styles.zigzagModeIndicator}>{t("easterEgg.snakeMode")}</div>}
      </div>
    </div>
  );
};
