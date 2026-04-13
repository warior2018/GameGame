import Tower from "./tower.js";

const hpNumber = document.getElementById("currentHP");

function gameloop() {
    if (mainTower.hp<=0) {
        mainTower.hide();
        alert("Game Over! Your score: " + document.getElementById("score").textContent.split(": ")[1]);
        return;
    }
    
    requestAnimationFrame(gameloop);
}


let mainTower = null;
export function startGame() {
    ///dom init
    const gameField = document.querySelector('.game');


    /////tower creation
    mainTower = new Tower(3);
    gameField.appendChild(mainTower.element);


    ///score
    let score = 0;
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = `Score: ${score}`;
    gameField.appendChild(scoreDisplay);
    
    mainTower.element.addEventListener("click", () => {
        mainTower.takeDamage(1);
        hpNumber.textContent = mainTower.hp;
        let heart = document.getElementById(`heart${mainTower.hp+1}`);
        heart.src = "./textures/-heart.png";
    });

    requestAnimationFrame(gameloop);
}