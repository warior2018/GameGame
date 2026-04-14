class Enemy {
    x;
    y;
    hp;
    speed;
    element; 
    isDead;
    width;
    height;
    constructor(x, y, hp = 5, speed = 1) {
        this.x = x;
        this.y = y;
        this.width = 35;
        this.height = 35;
        this.hp = hp; 
        this.isDead = false;
        this.speed = 0.25;
        this.element = document.createElement("div");
        this.element.className = "enemy"; 
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.addEventListener('click', () => {
            this.width -= 3;
            this.element.style.width = `${this.width}px`;
            
            this.height -= 3;
            this.element.style.height = `${this.height}px`;
            this.takeDamage(1);
        });
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.element.remove();
    }
}