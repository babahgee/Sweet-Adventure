export const keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    space: false
}

window.addEventListener("keydown", function (event) {

    switch (event.keyCode) {

        case 87:
            keys.w = true
            break;
        case 65:
            keys.a = true;
            break;
        case 83:
            keys.s = true;
            break;
        case 68:
            keys.d = true;
            break;
        case 32:
            keys.space = true;
            break;
    }

});


window.addEventListener("keyup", function (event) {

    switch (event.keyCode) {

        case 87:
            keys.w = false
            break;
        case 65:
            keys.a = false;
            break;
        case 83:
            keys.s = false;
            break;
        case 68:
            keys.d = false;
            break;
        case 32:
            keys.space = false;
            break;
    }

});