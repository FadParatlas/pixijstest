let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}
//using aliases
const Application = PIXI.Application,
    loader = PIXI.Loader.shared,
    resources = PIXI.Loader.shared.resources,
    Sprite = PIXI.Sprite,
    Rect = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

//Create a Pixi Application
const app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
}
);

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;

document.body.appendChild(app.view);
PIXI.utils.sayHello(type);

loader.add("images/texture.json")
    .add("images/controlsprite/controlstext.json");


app.loader.onProgress.add(showProgress);
loader.onComplete.add(doneLoading);
loader.onError.add(reportError);
loader.load();

function reportError(e) {
    console.error("ERROR" + e.message);
}

function showProgress(e) {
    console.log(e.progress);
}

function doneLoading(e) {
    console.log("Done Loading");
    setup();
}