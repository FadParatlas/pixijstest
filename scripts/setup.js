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

        }

        function moveCat(e) {
            let pos = e.data.global;

            cat.x = pos.x;
            cat.y = pos.y;
        }