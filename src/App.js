import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  if (!supportsPWA) {
    return null;
  }

  const buttonStyle = {
    backgroundColor: "#4CAF50", // Green background
    color: "white", // White text
    padding: "15px 32px", // Padding to make it larger
    fontSize: "16px", // Larger text
    border: "none", // Remove border
    borderRadius: "5px", // Rounded corners
    cursor: "pointer", // Pointer on hover
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
    transition: "background-color 0.3s ease" // Smooth background transition
  };

  return !window.matchMedia('(display-mode: standalone)').matches && (
    <button
      className="link-button"
      id="setup_button"
      aria-label="Install app"
      title="Install app"
      onClick={onClick}
      style={buttonStyle}
    >
      Install
    </button>
  );
};


function App() {
  const button = InstallPWA();

  return (
    <div className="App">
      {button}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Done.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
