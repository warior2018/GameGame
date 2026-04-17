const hpNumber = document.getElementById("currentHP");
let mainTower = null;
let isGameOver = false;
let gameField = null; 
const skill4Button = document.getElementById("skill4");
const skill3Button = document.getElementById("skill3");
const skill2Button = document.getElementById("skill2");
const skill1Button = document.getElementById("skill1");
let enemies = [];
let score1 = 0;
let traps = []; 
let fireballs = [];
let currentMouseX = 0;
let currentMouseY = 0;
let lastBossScore = 0;


function spawnEnemy() {
    if (isGameOver) return;

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
    score1 += 1;
    const scoreDisplayNow = document.getElementById("score");
    if (scoreDisplayNow) {
        scoreDisplayNow.textContent = `Score: ${score1}`;
    }
}

function spawnBoss() {
    if (isGameOver) return;
    const centerX = 300;
    const centerY = 300;
    const minDistance = 280;
    const maxDistance = 300; 
  
    const angle = Math.random() * Math.PI * 2;
    const distance = minDistance + Math.random() * (maxDistance - minDistance);

    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    const enemy = new Boss(x, y);
    gameField.appendChild(enemy.element);
    
    enemy.element.style.position = 'absolute';
    enemy.element.style.left = `${x}px`;
    enemy.element.style.top = `${y}px`;

    enemies.push(enemy);
    const scoreDisplayNow = document.getElementById("score");
    if (scoreDisplayNow) {
        scoreDisplayNow.textContent = `Score: ${score1}`;
    }
}

function gameloop() {
    if (isGameOver) {
        if (mainTower && mainTower.element && mainTower.element.parentNode) {
            mainTower.element.remove(); 
        }
        return; 
    }
    
    enemies = enemies.filter(enemy => !enemy.isDead);
    traps = traps.filter(trap => !trap.isDead);
    fireballs = fireballs.filter(fireball => !fireball.isDead);
    if (score1 % 50 === 0 && score1 !== lastBossScore) {
    spawnBoss();
    lastBossScore = score1;
    }
    fireballs.forEach((fireball) => {
        fireball.move();
    });
    
    enemies.forEach((enemy) => {
        traps.forEach((trap) => {
        if (enemy.isDead) return;
        const dx = trap.x - enemy.x;
        const dy = trap.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < (trap.width / 2 + enemy.width / 2)) {
            
          enemy.takeDamage(12);
           trap.die();
        }
        });

        if (enemy.isDead) return;

        fireballs.forEach((fireball) => {
            if (fireball.isFlying) return; 

            const dx = fireball.x - enemy.x;
            const dy = fireball.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < (fireball.width+enemy.width)/2) { 
                enemy.takeDamage(20);
            }
            fireball.die();
        });

        if (enemy.isDead) return;
        const dx = 300 - enemy.x; 
        const dy = 300 - enemy.y; 
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 40) {
            enemy.x += (dx / distance) * enemy.speed;
            enemy.y += (dy / distance) * enemy.speed;
            enemy.element.style.left = `${enemy.x}px`;
            enemy.element.style.top = `${enemy.y}px`;
        } else {
            /////boss dmg
            if (enemy instanceof Boss) {
            mainTower.hp -= 1;
            let bossHeart = document.getElementById(`heart${mainTower.hp + 1}`);
            if (bossHeart) bossHeart.src = "./textures/-heart.png";
            }
            ///usuall dmg
            mainTower.hp -= 1;
            hpNumber.textContent = mainTower.hp;
            enemy.die();
            
            let heart = document.getElementById(`heart${mainTower.hp + 1}`);
            if (heart) heart.src = "./textures/-heart.png";
        }
    });

    if (mainTower.hp <= 0) {
        isGameOver = true;
        const finalScore = document.getElementById("score") ? document.getElementById("score").textContent.split(": ")[1] : score1;
        alert("Game Over! Your score: " + finalScore);
    }
    requestAnimationFrame(gameloop);
}

function useTrap() {
    if (!skill1Button.classList.contains('cooldown') && !isGameOver) {
        skill1Button.classList.add('cooldown');
        setTimeout(() => skill1Button.classList.remove('cooldown'), 10000);

        const trapy = new Trap(currentMouseX, currentMouseY);
        gameField.appendChild(trapy.element);
        traps.push(trapy);
    }
}

function useFireBall() {
    if (!skill3Button.classList.contains('cooldown') && !isGameOver) {
        skill3Button.classList.add('cooldown');
        setTimeout(() => skill3Button.classList.remove('cooldown'), 14000);

        const posX = currentMouseX - 20;
        const posY = currentMouseY - 20;

        const fireball = new FireBall(posX, posY);
        gameField.appendChild(fireball.element);
        fireballs.push(fireball);
    }
}

function startGame() {
    gameField = document.querySelector('.game');

    mainTower = new Tower(3);
    gameField.appendChild(mainTower.element);

    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score';
    scoreDisplay.textContent = `Score: ${score1}`;
    gameField.appendChild(scoreDisplay);

    window.addEventListener('mousemove', (e) => {
        const rect = gameField.getBoundingClientRect();
        currentMouseX = e.clientX - rect.left;
        currentMouseY = e.clientY - rect.top;
    });

    skill4Button.addEventListener('click', () => {
        if (!skill4Button.classList.contains('cooldown') && mainTower.hp < 3 && !isGameOver) {
            mainTower.hp += 1;
            hpNumber.textContent = mainTower.hp;
            let heart = document.getElementById(`heart${mainTower.hp}`);
            if (heart) heart.src = "./textures/heart.png";
            
            skill4Button.classList.add('cooldown');
            setTimeout(() => skill4Button.classList.remove('cooldown'), 10000);
        }
    });

    skill3Button.addEventListener('click', useFireBall);
    skill1Button.addEventListener('click', useTrap);

    window.addEventListener('keydown', (key) => {
        if (isGameOver) return;
        if (key.code === "KeyR") skill4Button.click();
        else if (key.code === "KeyE") useFireBall();
        else if (key.code === "KeyQ") useTrap();
        else if (key.code === "KeyW") skill2Button.click();
    });

    setInterval(spawnEnemy, 3000);
    requestAnimationFrame(gameloop);
}