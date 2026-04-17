class Enemy {
    x;
    y;
    hp;
    speed;
    element; 
    isDead;
    width;
    height;
    constructor(x, y, hp = 12, speed = 0.25) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.hp = hp; 
        this.isDead = false;
        this.speed = speed;
        this.element = document.createElement("div");
        this.element.className = "enemy"; 
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;

        this.element.addEventListener('click', () => {
            this.width -= 1.1;
            this.element.style.width = `${this.width}px`;
            
            this.height -= 1.1;
            this.element.style.height = `${this.height}px`;
            this.takeDamage(1);
        });
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
        if(this.hp > 4 && this.hp <=8){
            this.element.style.backgroundImage = `url("./textures/enemy2.png")`;
        }
        else if(this.hp > 0 && this.hp <=4){
            this.element.style.backgroundImage = `url("./textures/enemy1.png")`;
        }
    }

    die() {
        this.isDead = true;
        this.element.remove();
    }
}



class Boss extends Enemy {
    constructor(x, y) {
        super(x, y, 50, 0.08); 

        this.width = 90;
        this.height = 90;
        
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        
        this.element.style.backgroundImage = `url("./textures/enemy3.png")`;
    }

    takeDamage(damage) {
        this.hp -= damage;

        if (this.hp > 25 && this.hp <= 40) {
            this.element.style.backgroundImage = `url("./textures/enemy2.png")`;
            this.speed = 0.1;
        } else if (this.hp > 0 && this.hp <= 25) {
            this.element.style.backgroundImage = `url("./textures/enemy1.png")`;
            this.speed = 0.15;
        }
    }
}