import SHA256 from "@/core/sha256";

class Code {
  constructor(uid, problemId, isSubmitted, id) {
    // reset code block plaintext to default
    this.resetCode();
    // user ID of code creator
    this.uid = uid;
    // ID of problem associated to code
    this.problemId = problemId;
    // set submit status if given (set it to false if not given)
    this.isSubmitted = isSubmitted === true;
    // randomly generates code ID if its not given
    this.id = id
      ? id
      : parseInt(Date.now() * Math.random()).toString();
  }

  /**
   * runs code against tests
   */
  async runCode(tests) {
    var pass = 0;

    for (var test of tests) {
      try {
        // wrap code block in anonymous function and evaluate
        var codeFunc = eval(
          `(_${this.id}=>{${this.codeBlock};` +
          `return solution(_${this.id});})`
        );
        // run code against input
        var output = codeFunc(test.input);
        // hash code output using SHA-256
        var hash = await SHA256.hash(output);
        // increment pass count if output hash matched test case
        if (hash === test.output) pass++;
      } catch { /* solution code has runtime error */ }
    }

    // returns number of times code passed test case
    return pass
  }

  /**
   * checks code for correctness
   */
  async isCodeCorrect(tests) {
    // return true if all tests passed
    return await this.runCode(tests) === tests.length
  }

  /**
   * tests code success rate
   */
  async testCode(tests) {
    // returns string showing test cases passed vs total tests
    return await this.runCode(tests) + '/' + tests.length
  }

  /**
   * delete user code and reset code block to default
   */
  resetCode() {
    this.codeBlock = "function solution(input) {}";
  }

  /**
   * set code block to user inputted code
   */
  setCode(codeBlock) {
    this.codeBlock = codeBlock;
  }

  /**
   * submit user code if correct and return if it was submitted
   */
  async submitCode(tests) {
    // check code correctness
    var isCorrect = await this.isCodeCorrect(tests)
    if (isCorrect) {
      // set code to submitted if correct
      this.isSubmitted = true;
      return true
    } else {
      return false
    }
  }
}

export { Code };