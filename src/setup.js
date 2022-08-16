let base, explorer, cat, id, state;
let pointerIsOver = false, pointerIsDown = false;

const buttonPositions = [
    70, 200,
    60, 200,
    50, 200,
];

function setup() {
    const basemap = TextureCache["house.png"];
    base = new Sprite(basemap);
    app.stage.addChild(base);

    //explorer script
    explorer = new Sprite(
        resources["images/texture.json"].textures["018.png"]);

    state = play;

    explorer.x = 100;
    explorer.y = app.stage.height / 2 - explorer.height / 2;
    explorer.vx = 0;
    explorer.vy = 0;

    const left = keyboard("ArrowLeft"),
        up = keyboard("ArrowUp"),
        right = keyboard("ArrowRight"),
        down = keyboard("ArrowDown");

    left.press = () => {
        explorer.vx = -5;
        explorer.vy = 0;
    }

    left.release = () => {
        if (!right.isDown && explorer.vy === 0) {
            explorer.vx = 0
        }
    };

    up.press = () => {
        explorer.vy = -5;
        explorer.vx = 0;
    };

    up.release = () => {
        if (!down.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    };

    right.press = () => {
        explorer.vx = 5;
        explorer.vy = 0;
    };

    right.release = () => {
        if (!left.isDown && explorer.vy === 0) {
            explorer.vx = 0
        }
    };

    down.press = () => {
        explorer.vy = 5;
        explorer.vx = 0;
    };

    down.release = () => {
        if (!up.isDown && explorer.vx === 0) {
            explorer.vy = 0;
        }
    }

    cat = new Sprite(
        resources["images/texture.json"].textures["018.png"]);

    cat.x = 50;
    cat.y = app.stage.height / 2 - explorer.height / 2;
    cat.vx = 0;
    cat.vy = 0;

    app.stage.addChild(cat);
    app.stage.interactive = true;
    app.stage.on("pointermove", moveCat);

    app.ticker.add((delta) => gameLoop(delta));
    app.stage.addChild(explorer);

    const textureButton = new PIXI.Sprite.from(resources["images/controlsprite/controlstext.json"].textures["s_key.png"]);
    textureBut = resources["images/controlsprite/controlstext.json"].textures["s_key.png"];
    const textureButtonDown = resources["images/controlsprite/controlstext.json"].textures["a_key.png"];
    const textureButtonOver = resources["images/controlsprite/controlstext.json"].textures["d_key.png"];

    const button = textureButton;

    button.anchor.set(0.5);
    button.x = 100;
    button.y = 50;

    // make the button interactive...
    button.interactive = true;
    button.buttonMode = true;

    button
        .on('pointerdown', onButtonDown)
        .on('pointerup', onButtonUp)
        .on('pointerupoutside', onButtonUp)
        .on('pointerover', onButtonOver)
        .on('pointerout', onButtonOut);


    app.stage.addChild(button);

    function onButtonDown() {
        pointerIsDown = true;
        button.texture = textureButtonDown;
    }

    function onButtonUp() {
        button.texture = textureBut;
        pointerIsDown = false;
    }

    function onButtonOver() {
        if (pointerIsDown !== true) {
            button.texture = textureButtonOver;
            pointerIsOver = true;
        }
        else {
            return;
        }
    }

    function onButtonOut() {
        if (pointerIsDown !== true) {
            button.texture = textureBut;
            pointerIsOver = false;
        }
        else {
            return;
        }
    }


}

function moveCat(e) {
    let pos = e.data.global;

    cat.x = pos.x;
    cat.y = pos.y;
}



