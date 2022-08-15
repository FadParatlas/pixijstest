function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;

    if (hitTestRectangle(cat, explorer)){
        console.log("lucas is gay");

    } else {
        console.log("lucas is mega gay");
    }
}
