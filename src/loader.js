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

