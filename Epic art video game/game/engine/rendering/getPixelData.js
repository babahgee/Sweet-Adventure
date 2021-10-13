/**
 * Gets 4x4 image data
 * @param {Image} texture
 */
export function get4v4ImageData(texture) {

    let tempcanvas = document.createElement("canvas");

    tempcanvas.width = texture.width;
    tempcanvas.height = texture.height;

    let ctx = tempcanvas.getContext("2d");

    ctx.drawImage(texture, 0, 0);

    let data = ctx.getImageData(tempcanvas.width / 2 - 10, tempcanvas.width / 2 - 10, tempcanvas.width / 2 + 10, tempcanvas.height / 2 + 10);

    tempcanvas = null;
    ctx = null;

    return data;
}