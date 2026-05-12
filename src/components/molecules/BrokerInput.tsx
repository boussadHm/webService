import React, { useState } from "react";
import { useSensors } from "../../context/SensorContext";
import styles from "./BrokerInput.module.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
export const BrokerInput: React.FC = () => {
  const { connected, connect, disconnect, error } = useSensors();

  const [url, setUrl] = useState("wss://random.pigne.org:443");

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      connect(url);
    }
  };

  return (
    <div className={styles.logo}>
      <Link to="/" className={styles.title}>
        <img src={logo} alt="SensorFlow" height="40" />
      </Link>

      <div className={styles.container}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={connected}
          className={styles.input}
        />
        <button
          onClick={handleClick}
          className={connected ? styles.disconnect : styles.connect}
        >
          {connected ? "Déconnecter" : "Connecter"}
        </button>
      </div>
      {/* Affichage de l'erreur */}
      {error && (
        <div className={styles.errorWrapper}>
          <div className={styles.error}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};
