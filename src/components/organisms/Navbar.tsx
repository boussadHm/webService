import React from "react";
import { Link, NavLink } from "react-router-dom";

import { useSensors } from "../../context/SensorContext";

import { StatusBadge } from "../atoms/StatusBadge";
import { BrokerInput } from "../molecules/BrokerInput";

import styles from "./Navbar.module.css";

export const Navbar: React.FC = () => {
  const { sensors, connected } = useSensors();

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <header className={styles.header}>
        <Link to="/" className={styles.title}>
          Dashboard MQTT
        </Link>

        <StatusBadge connected={connected} />
      </header>

      {/* INPUT BROKER */}
      <BrokerInput />

      {/* SIDEBAR */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Sensors</h2>

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
