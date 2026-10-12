let createdEmojisContainer = document.getElementById("created-emojis");

function arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

function clickPress(event) {
    if (event.keyCode == 13) {
        submit()
    }
}


function submit() {
    let text = document.getElementById("input").value;
    let p = /[a-z0-9]+/gm;
    createdEmojisContainer.innerHTML = "";
    for (let name of text.match(p)) {
        scrapeEmoji(name);
    }
}

function scrapeEmoji(name) {
    fetch(`https://teams.public.onecdn.static.microsoft/evergreen-assets/personal-expressions/v2/assets/emoticons/${name}/default/100_anim_f.png?v=v29`).then((r) => {
        r.arrayBuffer().then((t) => {
            let img = document.createElement("img");
            img.src = "data:image/png;base64," + arrayBufferToBase64(t);
            // document.body.appendChild(img);
            img.onload = () => {
                createGif(img, name);
            };
        })
    })
}

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (url, fileName) {
        a.href = url;
        a.download = fileName;
        a.click();
    };
}());

function createGif(img, name) {
    var gif = new GIF({
        workers: 2,
        quality: 10,
        width: 100,
        height: 100,
        alphaThreshold: 230,
        transparent: 0x0,
        name: name,
    });


    let frames = Math.floor(img.height / 100);


    for (let i = 0; i < frames; i++) {
        let canvas = document.createElement("canvas");
        canvas.width = 100;
        canvas.height = 100;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 100, 100);
        ctx.drawImage(img, 0, -i * 100);
        gif.addFrame(ctx, { copy: true, delay: 41 });
    }


    gif.on('finished', function (blob) {
        let img = document.createElement("img");
        let url = URL.createObjectURL(blob);
        img.src = url;
        createdEmojisContainer.appendChild(img);
        img.onclick = () => { saveData(url, gif.options.name + ".gif") };
    });


    gif.render();
}