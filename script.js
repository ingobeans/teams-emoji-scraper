let a;

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}


function test() {
    fetch("https://teams.public.onecdn.static.microsoft/evergreen-assets/personal-expressions/v2/assets/emoticons/emo/default/100_anim_f.png?v=v29").then((r) => {
        r.arrayBuffer().then((t) => {
            a = t;
            let img = document.createElement("img");
            img.src = "data:image/png;base64," + arrayBufferToBase64(t);
            // document.body.appendChild(img);
            img.onload = () => {
                createGif(img);
            };
        })
    })
}

function createGif(img) {
    var gif = new GIF({
        workers: 2,
        quality: 10,
        width: 100,
        height: 100,
    });

    let canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = 100;
    canvas.height = 100;
    let ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    gif.addFrame(ctx);

    gif.on('finished', function (blob) {
        window.open(URL.createObjectURL(blob));
    });


    gif.render();
}