
function buttonSetup() {
    // create some textures from an image path
    const textureButton = PIXI.Texture.from(resources["images/controlsprite/controlstext.json"].textures["s_key.png"]);
    const textureButtonDown = PIXI.Texture.from(resources["images/controlsprite/controlstext.json"].textures["a_key.png"]);
    const textureButtonOver = PIXI.Texture.from(resources["images/controlsprite/controlstext.json"].textures["d_key.png"]);

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
}
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
