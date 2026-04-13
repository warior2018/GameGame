// scripts/enemy.js
export default class Enemy {
    element;
    hp;
    x;
    y;
    speed;

    constructor(x, y, hp = 1) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.speed = 5;
        
        this.element = document.createElement("button");
        this.element.className = "enemy";
        this.element.style.position = "absolute";
        this.element.style.width = "40px";
        this.element.style.height = "40px";
        
        this.updatePosition();
    }

    get element() { return this.element; }
    get x() { return this.x; }
    get y() { return this.y; }

    moveTo(targetX, targetY) {
        if (this.x < targetX) this.x += this.speed;
        else if (this.x > targetX) this.x -= this.speed;

        if (this.y < targetY) this.y += this.speed;
        else if (this.y > targetY) this.y -= this.speed;

        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    takeDamage(amount) {
        this.hp -= amount;
        const hpDisplay = this.element.querySelector('.hp-count');
        if (hpDisplay) hpDisplay.textContent = this.hp;

        if (this.hp <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }

    destroy() {
        this.element.remove(); 
    }
}