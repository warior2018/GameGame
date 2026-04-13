// scripts/tower.js
export default class Tower {
    element;
    hp;
    x;
    y;

    constructor (hp = 3) {
        this.element = document.createElement("div");
        this.hp = hp;
        this.element.className = "tower";
    }

    get element() {
        return this.element;
    }

    takeDamage(amount) {
        this.hp -= amount;
    }

    hide() {
        this.element.style.display = "none";
    }
    
    get position() {
        return {x: this.x, y: this.y};
    }

    
}