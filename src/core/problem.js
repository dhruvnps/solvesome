class Problem {
  // list of test cases
  tests = [];

  constructor(title, description, uid, tests, id) {
    // problem title/description
    this.title = title;
    this.description = description;

    // user ID of problem creator
    this.uid = uid;

    // add tests if given
    if (tests) this.tests = tests;

    // randomly generates problem ID if its not given
    this.id = id ? id : parseInt(Date.now() * Math.random()).toString();
  }

  /**
   * add input-output pair to list of problem test cases
   */
  addTest(input, output) {
    /*
      TODO: encrypt test output using MD5
    */
    this.tests.push({
      input: input,
      output: output
    });
  }

  /**
   * add solution to problem by adding code ID to list
   */
  addSolution(codeId) {
    this.solutionIds.push(codeId);
  }
}

export { Problem };