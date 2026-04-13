export default class Enemy {
    x;
    y;
    hp;
    speed;
    element; 
    isDead;
    constructor(x, y, hp = 5, speed = 1) {
        this.x = x;
        this.y = y;
        this.hp = hp; 
        this.isDead = false;
        this.speed = 0.25 * speed;
        this.element = document.createElement("div");
        this.element.className = "enemy"; 
        
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.addEventListener('click', () => {
            this.takeDamage(1);
        });
    }
    
    takeDamage(damage) {
        this.hp -= damage;
        if (this.hp <= 0) {
            this.die();
        }
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    die() {
        this.isDead = true;
        this.element.remove();
    }
}