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
            document.getElementById("test").innerText = arrayBufferToBase64(t);
        })
    })
}

