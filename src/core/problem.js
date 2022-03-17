class Problem {
    // list of test cases
    tests = [];
    // code IDs of solutions submitted to problem
    solutionIds = [];

    constructor(title, description, uid, solutionIds, tests, id) {
        // problem title/description
        this.title = title;
        this.description = description;

        // user ID of problem creator
        this.uid = uid;

        // add solutions/tests if given
        if (solutionIds) this.solutionIds = solutionIds;
        if (tests) this.solutionIds = tests;

        // randomly generates problem ID if its not given
        this.id = id ? id : parseInt(Date.now() * Math.random());
    }

    /**
     * add input-output pair to list of problem test cases
     */
    addTest(input, output) {
        this.tests.push({
            input: input,
            output: output
        });
    }

    /**
     * add solution to problem by adding code ID to list
     */
    addSolution(codeID) {
        this.solutionIds.push(codeID);
    }
}

export { Problem };