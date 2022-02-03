class User {
    name;
    uid;
    problemids = [];

    constructor(name, uid) {
        this.name = name;
        this.uid = uid;
    }
}

export { User };