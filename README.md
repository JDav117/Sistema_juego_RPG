# ⚔️ Dungeon Navigator - Sistema de Navegación RPG

Sistema de navegación para un juego de rol (RPG) tipo dungeon crawler desarrollado con React. El jugador explora un mundo de 5 salas conectadas mediante direcciones cardinales (Norte, Sur, Este, Oeste).

## 🛠️ Tecnologías

- **Vite** — Entorno de desarrollo rápido
- **React** — Biblioteca de interfaz de usuario
- **React Router v7** — Manejo de rutas y navegación
- **Zustand** — Estado global del juego
- **Tailwind CSS** — Estilos utilitarios
- **Context API** — Modo oscuro/claro

## 🎮 Funcionalidades

- **Pantalla de Inicio (`/`):** Formulario para ingresar el nombre del héroe y comenzar la aventura.
- **Exploración (`/game`):** Muestra la sala actual con su nombre y descripción. Botones direccionales (N, S, E, O) para moverse entre salas; se deshabilitan si la dirección no tiene salida.
- **Mapa (`/map`):** Vista de todas las salas del mundo con indicador visual 🚩 en la sala donde se encuentra el jugador.
- **Protección de rutas:** `/game` y `/map` redirigen a `/` si no se ha ingresado un nombre.
- **Modo Pergamino / Calabozo:** Toggle de tema claro y oscuro con persistencia en `localStorage` y script anti-flicker.

## 🗺️ Mapa del Mundo

| Sala | Conexiones |
|------|-----------|
| Entrada de la Cueva | ↑ Norte → Pasillo |
| Pasillo de las Sombras | ↑ Norte → Trono, ↓ Sur → Entrada, → Este → Biblioteca, ← Oeste → Celda |
| Gran Biblioteca | ← Oeste → Pasillo |
| Celda Olvidada | → Este → Pasillo |
| Salón del Trono | ↓ Sur → Pasillo |

## 🚀 Instalación

```bash
npm install
npm run dev
```

## 📁 Estructura del Proyecto

```
src/
├── components/       # Navbar, ProtectedRoute
├── context/          # ThemeContext (modo oscuro/claro)
├── data/             # worldMap.json (mapa del mundo)
├── layouts/          # Layout principal con Outlet
├── pages/            # Home, Game, MapView
├── store/            # useGameStore (Zustand)
├── index.css         # Tailwind + variables CSS
├── main.jsx          # Punto de entrada con ThemeProvider
└── App.jsx           # Configuración de rutas
```
