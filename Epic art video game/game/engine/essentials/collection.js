import { generateUniqueID } from "./generateUniqueID.js";

export class pt_collection {
    constructor(type) {
        this.id = generateUniqueID(24);
        this.type = type;
        this.creationTimestamp = Date.now();

        this.storage = [];
    }
    AddItem(item) {

        this.storage.push(item);

        return this;

    }
    RemoveItem(prop) {

        let i = 0;

        while (i < this.storage.length) {

            const item = this.storage[i];

            if (item[prop] == prop) {

                this.storage.splice(i, 1);

            }
            
            i += 1;
        }

    }
    GetStorageItems() {

        return this.storage;

    }
}