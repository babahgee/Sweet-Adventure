/**
 * Resolves image
 * @param {string} path
 */
function resolveImage(path) {

    return new Promise(function (resolve, reject) {

        if (path == "test") {
            resolve(true);

            return;
        }

        let tempImg = new Image();

        tempImg.src = path;

        tempImg.addEventListener("load", function () {

            resolve(tempImg);

        });

        tempImg.addEventListener("error", function (err) {

            reject(null);

        });

    });

}

/**
 * Loads an image object asynchronously.
 * @param {any} path
 */
export async function pt_loadImageSync(path) {

    if (typeof path !== "string") {
        throw new Error("The given parameter is not a string. "); return;
    }

    return await resolveImage(path);

}