import React, { useEffect, useState } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import { Footer } from "./components/Footer/Footer";
import FadeInSection from "./components/FadeInSection/FadeInSection";
import EasterEggAlert from "./components/EasterEggAlert/EasterEggAlert";
import { useTheme } from "./context/ThemeContext";
import { darkTheme, lightTheme } from "./theme";

function App() {
  const [showAlert, setShowAlert] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let inputSequence = [];

    const keyHandler = (e) => {
      inputSequence.push(e.key);
      if (
        !konamiCode.slice(0, inputSequence.length).every(
          (code, index) => code === inputSequence[index]
        )
      ) {
        inputSequence = [];
      }
      if (inputSequence.length === konamiCode.length) {
        setShowAlert(true);
        inputSequence = [];
      }
    };

    window.addEventListener('keydown', keyHandler);
    return () => window.removeEventListener('keydown', keyHandler);
  }, []);

  const closeAlert = () => setShowAlert(false);

  const muiTheme = theme === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div className={styles.App}>
        {showAlert && <EasterEggAlert onClose={closeAlert} />}
        <Navbar />
        <Hero />
        <About />
        <FadeInSection>
          <Experience />
        </FadeInSection>
        <FadeInSection>
          <Projects />
        </FadeInSection>
        <FadeInSection>
          <Contact />
        </FadeInSection>
        <ScrollToTopButton />
        <Footer />
      </div>
    </MuiThemeProvider>
  );
}

export default App;