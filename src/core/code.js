class Code {
    // has code been submitted as solution to problem
    isSubmitted = false;
    // list of IDs of users who upvoted code
    upvoterUids = [];

    constructor(codeBlock, uid, problemId, id) {
        // code block plaintext
        this.codeBlock = codeBlock;

        // user ID of code creator
        this.uid = uid;

        // ID of problem associated to code
        this.problemId = problemId;

        // randomly generates code ID if its not given
        this.id = id ? id : parseInt(Date.now() * Math.random());
    }

    /**
     * runs code against tests
     * @returns {number} number of passes
     */
    runCode(tests) {
        var pass = 0;
        for (var test of tests) {
            /* TODO:
              run code with test.input as input
              if output is test.output, increase pass by 1
            */
        }
        return pass
    }

    /**
     * checks code for correctness
     * @returns {boolean} true if code passes all tests
     */
    isCodeCorrect(tests) {
        return this.runCode(tests) === tests.length
    }

    /**
     * tests code success rate
     * @returns {string} passes/total
     */
    testCode(tests) {
        return this.runCode(tests) + '/' + tests.length
    }

    /**
     * upvote code solution
     */
    upvote(uid) {
        // only upvote if user has not upvoted code already
        if (!this.upvoterUids.includes(uid)) {
            this.upvoterUids.push(uid)
            this.upvotes = upvoterUids.length;
        }
    }
}

export { Code };