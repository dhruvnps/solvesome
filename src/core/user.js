class User {
    // IDs of problems associated to user
    problemIds = [];

    constructor(name, uid, problemIds) {
        // user name/ID
        this.name = name;
        this.uid = uid;

        // add problem IDs if given
        if (problemIds) this.problemIds = problemIds;
    }
}

export { User };