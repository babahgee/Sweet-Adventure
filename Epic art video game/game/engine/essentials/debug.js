export const RenderingOptions = {
    ShowBoxBoundary: false
}


export const Debug = {
    Log: function (type, message, styles) {

        if (typeof type !== "string" || typeof message !== "string") return;

        console.log(`%c[${type.toUpperCase()}]%c ${message}`, "color: #ff0000; background: #000;", styles);

        return this;
    }

}
