import SHA256 from "@/core/sha256";

class Problem {
  constructor(title, description, uid, tests, id) {
    // problem title/description
    this.title = title;
    this.description = description;

    // user ID of problem creator
    this.uid = uid;

    // add test cases
    this.tests = tests;

    // add problem ID
    this.id = id;
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

    // push secret tests to code object using composition
    this.tests.push(new Test(input, hash));
  }
}

class NewProblem extends Problem {
  constructor(title, description, uid) {
    // randomly generates problem ID
    var id = parseInt(Date.now() * Math.random()).toString()

    // call parent class's constructor with extra generated fields
    super(title, description, uid, /* tests */[], id);
  }
}

class Test {
  constructor(input, hashedOutput) {
    this.input = input;
    this.output = hashedOutput;
  }
}

export { Problem, NewProblem };