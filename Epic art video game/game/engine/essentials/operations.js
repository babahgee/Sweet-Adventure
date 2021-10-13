import { generateUniqueID } from "./generateUniqueID.js";

const operationsTitlebarNode = document.querySelector(".item-operations");

export const operations = [];

export class pt_operation {
    constructor(operationName, start, end) {
        this.type = "obj:operation";
        this.id = generateUniqueID(18).id;

        this.operationName = operationName;
        this.start = start;
        this.end = end;

        this.operationStart = Date.now();
        this.operationEnd = 0;

        this.progress = 0;

        this.events = {};

        operations.push(this);

        operationsTitlebarNode.innerText = `${operations.length} operations`;
    }
    Update(value) {

        if (value > this.end || value == this.end) {
            this.Destroy();

            return;
        }

        this.progress = 100 / this.end * value;

        if (typeof this.events["update"] == "function") {
            this.events["update"](this.progress);
        }
    }
    /**
     * Sets an event listener on this operation.
     * @param {"update" | "end"} event
     * @param {Function} callback
     */
    On(event, callback) {

        const events = ["update", "end"];

        let isEvent = true;

        for (let key in events) {
            if (key == event) isEvent = true;
        }

        if (!isEvent) throw new Error(`Event '${event}' is not a recognized event for this instance.`);

        if (typeof callback !== "function") throw new Error(`Cannot set event on instance since no callback has been given.`);

        this.events[event] = callback;

        return this;
    }
    Destroy() {

        this.operationEnd = Date.now();

        const difference = this.operationEnd - this.operationStart;

        // console.log(true);

        if (typeof this.events["end"] == "function") {
            this.events["end"](difference);
        }

        this.progress = 100;

        if (typeof this.events["update"] == "function") {
            this.events["update"](this.progress);
        }

        let i = 0;

        while (i < operations.length) {

            const operation = operations[i];

            if (this.id == operation.id) {
                operations.splice(i, 1);
            }

            i += 1; 
        }

        operationsTitlebarNode.innerText = `${operations.length} operations`;
    }
}