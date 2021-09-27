export class pt_collection {
    constructor(type) {
        this.type = type;
        this.creationTimestamp = Date.now();

        this.storage = new Array();
    }
    AddItem(item) {

        this.storage.push(item);

        return this;

    }
    GetStorageItems() {

        return this.storage;

    }
}