import Tower from "./tower.js";
import Enemy from "./enemy.js";


const hpNumber = document.getElementById("currentHP");
let mainTower = null;
let isGameOver = false;
let gameField = null; 
const skill4Button = document.getElementById("skill4");
const skill3Button = document.getElementById("skill3");
const skill2Button = document.getElementById("skill2");
const skill1Button = document.getElementById("skill1");

let enemies = [];
function spawnEnemy() {
    if (isGameOver){
        return
    };

    const centerX = 300;
    const centerY = 300;
    const minDistance = 280;
    const maxDistance = 300; 
  
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    const enemy = new Enemy(x, y);
    gameField.appendChild(enemy.element);
    
    enemy.element.style.position = 'absolute';
    enemy.element.style.left = `${x}px`;
    enemy.element.style.top = `${y}px`;

    enemies.push(enemy);
}


function gameloop() {
    if (isGameOver) {
        if (mainTower && mainTower.element && mainTower.element.parentNode) {
            mainTower.element.remove(); 
        }
        return; 
    }
 
    enemies = enemies.filter(enemy => !enemy.isDead);
    
    enemies.forEach((enemy, index) => {
        const dx = 300 - enemy.x; 
        const dy = 300 - enemy.y; 
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 40) { 
            enemy.x += (dx / distance) * enemy.speed;
            enemy.y += (dy / distance) * enemy.speed;
            enemy.element.style.left = `${enemy.x}px`;
            enemy.element.style.top = `${enemy.y}px`;
        } else {
            mainTower.hp -= 1;
            hpNumber.textContent = mainTower.hp;
            enemy.element.remove();
            enemies.splice(index, 1);
            
            
            let heart = document.getElementById(`heart${mainTower.hp + 1}`);
            if (heart) heart.src = "./textures/-heart.png";
        }
    });


    if (mainTower.hp <= 0) {
        isGameOver = true;
        alert("Game Over! Your score: " + document.getElementById("score").textContent.split(": ")[1]);
    }
    requestAnimationFrame(gameloop);
}



export function startGame() {

    gameField = document.querySelector('.game');

    mainTower = new Tower(3);
    gameField.appendChild(mainTower.element);

    let score = 0;
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = `Score: ${score}`;
    gameField.appendChild(scoreDisplay);

    mainTower.element.addEventListener('click', () => {
        if (mainTower.hp > 0) {
            mainTower.hp -= 1;
            hpNumber.textContent = mainTower.hp;
            let heart = document.getElementById(`heart${mainTower.hp + 1}`);
            if (heart) heart.src = "./textures/-heart.png";
        }
    });


    ////skills clicks
    skill4Button.addEventListener('click', () => {
        if (!skill4Button.classList.contains('cooldown') && mainTower.hp < 3 && !isGameOver) {
            mainTower.hp +=1;
            hpNumber.textContent = mainTower.hp;
            let heart = document.getElementById(`heart${mainTower.hp}`);
            heart.src = "./textures/heart.png";
            /////cd
            skill4Button.classList.add('cooldown');
            setTimeout(() => {
            skill4Button.classList.remove('cooldown');
            }, 10000); 
        }
    });
    skill3Button.addEventListener('click', () => {
        if (!skill3Button.classList.contains('cooldown') && !isGameOver) {
            
            skill3Button.classList.add('cooldown');
            setTimeout(() => {
            skill3Button.classList.remove('cooldown');
            }, 10000); 
        }
    });
    skill2Button.addEventListener('click', () => {
        if (!skill2Button.classList.contains('cooldown') && !isGameOver) {
            
            skill2Button.classList.add('cooldown');
            setTimeout(() => {
            skill2Button.classList.remove('cooldown');
            }, 10000); 
        }
    });
    skill1Button.addEventListener('click', () => {
        if (!skill1Button.classList.contains('cooldown') && !isGameOver) {
            
            skill1Button.classList.add('cooldown');
            setTimeout(() => {
            skill1Button.classList.remove('cooldown');
            }, 10000); 
        }
    });


    /////keyboard keydown
    window.addEventListener('keydown', (key) => {
        if (isGameOver) return;
        if (key.code === "KeyR" && !skill4Button.classList.contains('cooldown') && mainTower.hp < 3 && !isGameOver) {
            mainTower.hp +=1;
            hpNumber.textContent = mainTower.hp;
            let heart = document.getElementById(`heart${mainTower.hp}`);
            heart.src = "./textures/heart.png";
            ///cd
            skill4Button.classList.add('cooldown');
            setTimeout(() => {
            skill4Button.classList.remove('cooldown');
            }, 10000); 
        }
        else if (key.code === "KeyE") {
            ///bomb

            skill3Button.classList.add('cooldown');
            setTimeout(() => {
            skill3Button.classList.remove('cooldown');
            }, 10000); 
        }
        else if (key.code === "KeyW") {
            skill2Button.classList.add('cooldown');
            setTimeout(() => {
            skill2Button.classList.remove('cooldown');
            }, 10000); 
        }
        else if (key.code === "KeyQ") {
            skill1Button.classList.add('cooldown');
            setTimeout(() => {
            skill1Button.classList.remove('cooldown');
            }, 10000); 
        }
    });



    setInterval(spawnEnemy, 5000);
    requestAnimationFrame(gameloop);
}