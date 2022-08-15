let base, explorer, cat, id, state;

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

    const textureButton = new Sprite(resources["images/controlsprite/controlstext.json"].textures["s_key.png"]);
    const textureButtonDown = new Sprite(resources["images/controlsprite/controlstext.json"].textures["a_key.png"]);
    const textureButtonOver = new Sprite(resources["images/controlsprite/controlstext.json"].textures["d_key.png"]);

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
        this.isdown = true;
        this.texture = textureButtonDown;
        this.alpha = 1;
    }

    function onButtonUp() {
        this.isdown = false;
        if (this.isOver) {
            this.texture = textureButtonOver;
        } else {
            this.texture = textureButton;
        }
    }

    function onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = textureButtonOver;
    }

    function onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = textureButton;
    }


}

function moveCat(e) {
    let pos = e.data.global;

    cat.x = pos.x;
    cat.y = pos.y;
}



