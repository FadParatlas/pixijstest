let base, explorer, cat, id, state;

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

    const textureButton = new Sprite(resources["images/controlsprite/controlstext.json"].textures["s_key.png"]);
    const textureButtonDown = new Sprite(resources["images/controlsprite/controlstext.json"].textures["a_key.png"]);
    const textureButtonOver = new Sprite(resources["images/controlsprite/controlstext.json"].textures["d_key.png"]);

    const buttons = [];

    const buttonPositions = [
        175, 75,
        655, 75,
        410, 325,
    ];

    for (let i = 0; i < 5; i++) {
        const button = textureButton;

        button.anchor.set(0.5);
        button.x = buttonPositions[i * 2];
        button.y = buttonPositions[i * 2 + 1];

        // make the button interactive...
        button.interactive = true;
        button.buttonMode = true;

        button
            // Mouse & touch events are normalized into
            // the pointer* events for handling different
            // button events.
            .on('pointerdown', onButtonDown)
            .on('pointerup', onButtonUp)
            .on('pointerupoutside', onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);

        // Use mouse-only events
        // .on('mousedown', onButtonDown)
        // .on('mouseup', onButtonUp)
        // .on('mouseupoutside', onButtonUp)
        // .on('mouseover', onButtonOver)
        // .on('mouseout', onButtonOut)

        // Use touch-only events
        // .on('touchstart', onButtonDown)
        // .on('touchend', onButtonUp)
        // .on('touchendoutside', onButtonUp)

        // add it to the stage
        app.stage.addChild(button);

        // add button to array
        buttons.push(button);
    }

    // set some silly values...
    buttons[0].scale.set(1.2);
    buttons[2].rotation = Math.PI / 10;
    buttons[3].scale.set(0.8);
    buttons[4].scale.set(0.8, 1.2);
    buttons[4].rotation = Math.PI;

    cat = new Sprite(
        resources["images/texture.json"].textures["018.png"]);

    test = new Sprite(
        resources["images/controlsprite/controlstext.json"].textures["s_key.png"]);
    app.stage.addChild(test);

    cat.x = 50;
    cat.y = app.stage.height / 2 - explorer.height / 2;
    cat.vx = 0;
    cat.vy = 0;

    app.stage.addChild(cat);
    app.stage.interactive = true;
    app.stage.on("pointermove", moveCat);

    app.ticker.add((delta) => gameLoop(delta));
    app.stage.addChild(explorer);

}

function moveCat(e) {
    let pos = e.data.global;

    cat.x = pos.x;
    cat.y = pos.y;
}