class FireBall {
    constructor(destinationx, destinationy) {
        this.destinationx = destinationx; 
        this.destinationy = destinationy;
        this.x = 285;
        this.y = 285;
        this.width = 30;
        this.height = 30;
        this.isDead = false;
        this.isFlying = true; 
        this.speed = 1; 

        
        this.element = document.createElement("div");
        this.element.className = "fireball"; 
        this.element.style.position = "absolute";
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
    }

    move() {
        if (!this.isFlying) return; 

        const dx = this.destinationx - this.x;
        const dy = this.destinationy - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 50) {
            this.element.style.backgroundImage = `url("./textures/fireball.png")`;
        };
            

        if (distance > 5) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
            this.element.style.left = `${this.x}px`;
            this.element.style.top = `${this.y}px`;
            this.width += 0.2;
            this.height += 0.2;
            this.element.style.width = `${this.width}px`;
            this.element.style.height = `${this.height}px`;
        } else {
            this.isFlying = false; 
        }
    }

    die() {
        this.isDead = true;
        this.element.remove();
    }
}