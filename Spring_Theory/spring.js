class Node {

    constructor (v, s, c) {
        this.pos = createVector(random(0, width), random(0, height));
        this.vel = p5.Vector.random2D().mult(v);
        this.size = s;
        this.color = c;
    }

    update() {
        if(this.pos.x < 0 || this.pos.x > width - this.size) {
            this.vel.x *= -1;
        }
        if(this.pos.y < 0 || this.pos.y > height - this.size) {
            this.vel.y *= -1;
        }
        this.pos.add(this.vel);
    }

    view() {
        fill(this.color);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.height);
    }

    applyForce(f){
        this.vel.add(f);
    }

    isOutOfBounds(p, n, m){
        return p < n || p > m;
    }

}