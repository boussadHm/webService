# 📡 SensorFlow (TP4 WEB - React Router)

> **Dashboard temps réel de monitoring de capteurs via le protocole MQTT**

[![Version](https://img.shields.io/badge/version-1.0.0-e60023)](https://www-apps.univ-lehavre.fr/forge/hb214137/tp4_webservice)
[![React](https://img.shields.io/badge/React-19.2-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.0-646cff)](https://vitejs.dev)


---

## Table des matières

- [Présentation](#-présentation)
- [Fonctionnalités](#-fonctionnalités)
- [Architecture](#-architecture)
- [Stack technique](#-stack-technique)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [Tests](#-tests)
- [Auteurs](#-auteurs)

---

## Présentation

**SensorFlow** est une application web de monitoring en temps réel qui se connecte à un broker MQTT pour recevoir et afficher les données de capteurs dans un réseau. L'application crée dynamiquement une page par capteur, affiche les valeurs en temps réel avec un graphique d'évolution et un historique des 10 dernières mesures.

### Démo

```
Broker MQTT : wss://random.pigne.org:443
```

---

## Fonctionnalités

- 📡 **Connexion MQTT temps réel** via WebSocket sécurisé
- 🛣️ **Routage dynamique** : une URL par capteur créée automatiquement
- 📊 **Graphique temps réel** avec la bibliothèque Recharts
- 🎨 **Affichage adaptatif** selon le type de capteur (température, humidité, ON/OFF...)
- 🌙 **Mode sombre / clair** avec persistance dans localStorage
- 📱 **Design responsive** avec CSS Grid et Flexbox
- 🧪 **Tests unitaires** : avec Vitest et React Testing Library

---

## Architecture

```
src/
├── components/
│   ├── atoms/                    # Plus petites unités réutilisables
│   │   ├── StatusBadge.tsx       # Indicateur connecté/déconnecté
│   │   └── StatusBadge.module.css
│   ├── molecules/                # Assemblages d'atomes
│   │   ├── BrokerInput.tsx       # Champ URL broker + bouton connect
│   │   ├── SensorCard.tsx        # Carte résumé d'un capteur
│   │   └── SensorChart.tsx       # Graphique temps réel (Recharts)
│   └── organisms/                # Composants complexes
│       ├── Navbar.tsx            # Sidebar avec liste des capteurs
│       └── SensorDisplay.tsx     # Affichage selon le type de capteur
├── context/
│   ├── SensorContext.tsx         # Context API — partage les capteurs
│   └── ThemeContext.tsx          # Context API — gestion du thème
├── hooks/
│   └── useMqtt.ts                # Hook MQTT — connexion broker
├── pages/
│   ├── HomePage.tsx              # Grille de tous les capteurs
│   └── SensorPage.tsx            # Détail + graphique + historique
├── types/
│   └── Sensor.ts                 # Types TypeScript
├── utils/
│   └── sensorUtils.ts            # Fonctions utilitaires
├── App.tsx                       # Routes dynamiques React Router
└── main.tsx                      # Point d'entrée + Providers
```

---

##  Stack technique

| Technologie | Version | Usage |
|---|---|---|
| React | 19.2 | Bibliothèque UI |
| TypeScript | 6.0 | Typage statique |
| Vite | 8.0 | Bundler + dev server |
| React Router DOM | 7.14 | Routage dynamique |
| MQTT.js | 5.15 | Protocole MQTT over WebSocket |
| Recharts | 3.8 | Graphiques temps réel |
| Vitest | 4.1 | Tests unitaires |
| React Testing Library | 16.3 | Tests composants |

---

##  Installation

### Prérequis

- Node.js ≥ 18
- npm ≥ 9

### Cloner le projet

```bash
git clone https://www-apps.univ-lehavre.fr/forge/hb214137/tp4_webservice.git
cd tp4_webservice
```

### Installer les dépendances

```bash
npm install
```

### Lancer en développement

```bash
npm run dev
```

L'application est accessible sur [http://localhost:51XX](http://localhost:51XX)


---

## Utilisation

### Connexion au broker

Au démarrage, l'application se connecte automatiquement au broker par défaut :

```
wss://random.pigne.org:443
```

Vous pouvez changer l'URL du broker dans le champ en haut de l'application et cliquer sur **Connect**.

### Navigation

| URL | Description |
|---|---|
| `/` | Page d'accueil — liste tous les capteurs |
| `/:sensorId` | Page détail d'un capteur |

### Format des messages MQTT

Les capteurs publient sur le topic `value/[ID]` au format JSON :

```json
{
  "name": "Température Bureau",
  "value": "21.3",
  "type": "TEMPERATURE"
}
```

### Types de capteurs supportés

| Type | Affichage |
|---|---|
| `TEMPERATURE` | Valeur colorée 🌡️ selon la température |
| `HUMIDITY` | Jauge de pourcentage 💧 |
| `PERCENT` | Jauge de pourcentage 📊 |
| `ON_OFF` | Badge ON / OFF 💡 |
| `OPEN_CLOSE` | Badge OPEN / CLOSED 🔓 |
| `PRESSURE` | Valeur en hPa avec tendance 📈 |
| `SPEED` | Valeur en km/h avec intensité 💨 |
| `POSITIVE_NUMBER` | Valeur numérique brute |

---

## 🧪 Tests

### Lancer les tests

```bash
npm run test
```

### Tests implémentés

```
- StatusBadge : affiche Connecté / Déconnecté
- SensorCard : affiche nom et type du capteur
- SensorDisplay : affichage ON/OFF, OPEN/CLOSE, TEMPERATURE, PERCENT
- BrokerInput : champ URL + bouton connect
- HomePage : affiche les cartes des capteurs
```

---

##  Choix techniques

### Context API vs Props drilling

On a choisi le **Context API** pour partager les données des capteurs dans toute l'application. Sans Context, il faudrait passer `sensors` de composant en composant (prop drilling). Avec `SensorContext`, n'importe quel composant peut appeler `useSensors()` directement.

### useRef pour le client MQTT

Le client MQTT est stocké dans un `useRef` plutôt qu'un `useState` car on a besoin de conserver la référence à l'objet sans déclencher de re-rendu à chaque changement.

### SensorsMap : Record<string, Sensor>

On utilise un dictionnaire `Record<string, Sensor>` pour stocker les capteurs. Avec un accès par ID ce qui est optimal pour les mises à jour temps réel.

### Reconnexion automatique

On a configuré `reconnectPeriod: 3000` pour la reconnexion automatique toutes les 3 secondes et `keepalive: 60` pour maintenir la connexion active.

---

## Auteurs

| Nom | adresse mail |
|---|---|
| **Sabrina Kechidi** |sabrina.kechidi@etu.univ-lehavre.fr |
| **Boussad Hammoum** | boussad.hammoum@etu.univ-lehavre.fr |

---

##  Changelog

### v1.0.0 — 2026-05-12

-  Première version stable
- Connexion MQTT via WebSocket
- Routage dynamique React Router
- Context API pour le partage des données
- Affichage adaptatif par type de capteur
- Graphique temps réel avec Recharts
- Mode sombre / clair
-  CSS Modules + Flexbox + CSS Grid
-  Tests unitaires

---

