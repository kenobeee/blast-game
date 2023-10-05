# Blast Game

Blast Game is an exciting puzzle game where you match tiles to earn points. Try to reach the target score within the available steps to win the game!

## Getting Started

### Prerequisites

Before you start, make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) (Node Package Manager) installed on your system.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kenobeee/blast-game.git

2. Navigate to the project directory:

   ```bash
   cd blast-game

3. Install dependencies:

   ```bash
   npm install


### Usage

1. Run project

   ```bash
   npm run start
   
2. Build project

   ```bash
   npm run build

## Configuration Variables

### `config.ts`

The `config.ts` file contains configuration variables for the game. Here are the main configuration options:

- **initConfig**: Contains the initial game configuration, including tile size, total rows and columns, and tile information.

- **animateConfig**: Contains animation-related configuration, such as tile falling down speed, growing rate, and starting size.

- **gameConfig**: Holds game-specific configuration, including the target score (`scoreTarget`), total available steps (`totalAvailableSteps`), and the quantity of tiles shuffling (`shufflingQty`).
