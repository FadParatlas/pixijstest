function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    explorer.x += explorer.vx;
    explorer.y += explorer.vy;
}