# Terminal Shoot-Em-Up

A retro-style shoot-em-up game with terminal aesthetics (green on black), built with Next.js and TypeScript.

## Controls

- **WASD / Arrow Keys** - Move player
- **F** - Toggle auto-fire (on by default)
- **R** - Spawn enemy (debug)
- **T** - Trigger level up (debug)

## Features

- Player (△) with auto-shooting bullets (○)
- Enemies (<*>) with HP system
- XP and leveling with upgrade choices
- Parallax star background
- Terminal-style visuals: green-on-black, monospace, no rounded corners

## Tech Stack

- Next.js 16 with TypeScript
- Tailwind CSS
- DDD folder structure (domain/application/infrastructure/presentation)

## Run

```bash
npm run dev
```

## Project Structure

```
src/
├── app/              # Next.js pages
├── presentation/     # UI components, types, constants
```
