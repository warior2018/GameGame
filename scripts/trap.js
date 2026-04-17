class Trap {
    constructor(x, y) {
        this.x = x; 
        this.y = y;
        this.width = 40; 
        this.height = 40;
        this.isDead = false;
        
        this.element = document.createElement("div");
        this.element.id = "trap"; 
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.element.style.left = `${this.x - this.width / 2}px`;
        this.element.style.top = `${this.y - this.height / 2}px`;
    }
    
    die() {
        this.isDead = true;
        this.element.remove();
    }
}