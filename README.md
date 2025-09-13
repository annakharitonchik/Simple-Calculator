# Simple-Calculator

## Task  [Simple Calculator](https://github.com/annakharitonchik/Simple-Calculator/blob/main/Task-simple-calculator.pdf)

## Structure

```bush
Simple-Calculator/
│
├─ src/               — project source code
│   ├─ components/    — JS-conponents (calculator, display, numbers, symbols, theme)
│   └─  styles/       — CSS files (calculator, display, numbers, symbols, theme)
│   
│
├─ Task.pdf           — PDF-file task for the project
│           
│
├─ tests/             
│   └─ calculator.    — tests for the on Mocha
|      test.js      
│
├─ dist/              — project build (ready for deployment)
│   ├─ bundle.js 
|   └─ index.html     — minified files
│
├─ README.md          — project description
├─ package.json       — npm dependencies and scripts
└─ .gitignore         — files/folders ignored by Git

 ```

In the project directory, you can run:

### `npm start`

### `npm test`

### `npm run build`

## Installation and Setup

1. Clone the repository or open the project folder.
2. Make sure Node.js and npm are installed:
   
   ```bash
   node -v
   npm -v
   ```
3. Install all project dependencies:
   
   ```bash
    npm install
   ```
# Project Scripts
## Local Development

  ```bash
    npm start
  ```
Starts the project in development mode.

Opens a local server (usually at http://localhost:3000).

The page reloads automatically when code changes.

Errors are shown in the console.

## Testing

  ```bash
    npm test
  ```

## Production Build

```bash
    npm run build
    npm run deploy
  ```

Check out the production version of the project here: [Beauty Shop](https://annakharitonchik.github.io/Simple-Calculator/)
