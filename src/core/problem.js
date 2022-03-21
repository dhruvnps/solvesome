import SHA256 from "@/core/sha256";

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
  async addTest(input, output) {
    // try parse input/output strings to get values of correct type
    try {
      input = JSON.parse(input);
    } catch { /**/ }
    try {
      output = JSON.parse(output);
    } catch { /**/ }

    // hash output value using sha256 to make it impossible for coder to find
    var hash = await SHA256.hash(output);

    // push secret tests to code object
    this.tests.push({
      input: input,
      output: hash
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