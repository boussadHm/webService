import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSensors } from "../../context/SensorContext";
import { StatusBadge } from "../atoms/StatusBadge";
import styles from "./Navbar.module.css";
import logo from "../../assets/logo.svg";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export const Navbar: React.FC<Props> = ({ open, setOpen }) => {
  const { sensors, connected } = useSensors();

  return (
    <div className={`${styles.sidebar} ${open ? styles.open : styles.closed}`}>
      {/* TOGGLE BUTTON (le fameux "handle") */}
      <button className={styles.toggle} onClick={() => setOpen(!open)}>
        {open ? "❮" : "☰"}
      </button>

      {/* HEADER */}
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          <img src={logo} alt="SensorFlow" height="40" />
        </Link>
        <div className={styles.statusRow}>
          <span className={styles.statusLabel}>Statut :</span>
          <StatusBadge connected={connected} />
        </div>
      </header>

      {/* LIST */}
      <aside className={styles.listWrapper}>
        <h2 className={styles.sidebarTitle}>Capteurs</h2>

        <ul className={styles.list}>
          {Object.values(sensors).map((sensor) => (
            <li key={sensor.id}>
              <NavLink
                to={`/${sensor.id}`}
                className={({ isActive }) =>
                  isActive ? `${styles.link} ${styles.active}` : styles.link
                }
              >
                {sensor.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};
