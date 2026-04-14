// scripts/tower.js
class Tower {
    _element;
    hp;
    x;
    y;

    constructor (hp = 3) {
        this._element = document.createElement("div");
        this.hp = hp;
        this._element.className = "tower";
    }

    takeDamage(amount) {
        this.hp -= amount;
    }

    get element() {
        return this._element;
    }
    get position() {
        return {x: this.x, y: this.y};
    }
}