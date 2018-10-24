let nodes = [];
function setup() {
    createCanvas(800, 800);
    strokeWeight(2);
    ellipseMode(CORNER);
    for (let i = 0; i < 100; i++) {
        nodes.push(new Node(random(0, 5), random(5, 50), color(random(255), random(255), random(255))));
    }
}

function draw() {
    background(138);
    for (let i = 0; i < nodes.length - 1; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            let d = p5.Vector.sub(nodes[j].pos, nodes[i].pos);
            let r = d.magSq();
            if (r < sq((nodes[i].size + nodes[j].size) / 2)) {
                d.mult(-5);
            } else {
                d.mult(.01);
            }
            nodes[i].applyForce(d.div(r));
            nodes[j].applyForce(d.mult(-1));
        }
    }
    let g = createVector(mouseX, mouseY).sub(width / 2, height / 2).mult(.0001);
    stroke(0, 0, 255);
    // line(width / 2, height / 2, mouseX, mouseY);
    nodes.forEach(node => {
        node.update();
        node.view();
        // node.applyForce(g);
    });

}