import { startGame } from "./scripts/init.js";
const startButton = document.getElementById('startButton');

startButton.addEventListener('click', () => {
startButton.remove();
startGame();
});
