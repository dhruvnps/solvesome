import SHA256 from "@/core/sha256";

class Code {
  // has code been submitted as solution to problem
  isSubmitted = false;
  // list of IDs of users who upvoted code
  upvoterUids = [];

  constructor(uid, problemId, isSubmitted, upvoterUids, id) {
    // reset code block plaintext to default
    this.resetCode();

    // user ID of code creator
    this.uid = uid;

    // ID of problem associated to code
    this.problemId = problemId;

    // add (submit status)/(upvoter user ids) if given
    if (isSubmitted) this.isSubmitted = isSubmitted;
    if (upvoterUids) this.upvoterUids = upvoterUids;

    // randomly generates code ID if its not given
    this.id = id ? id : parseInt(Date.now() * Math.random()).toString();
  }

  /**
   * runs code against tests
   */
  async runCode(tests) {
    var pass = 0;

    for (var test of tests) {
      try {
        var codeFunc = eval(`((r${this.id})=>{${this.codeBlock};return solution(r${this.id});})`);
        var output = codeFunc(test.input);
        var hash = await SHA256.hash(output);
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
   * upvote code solution
   */
  upvote(uid) {
    // only upvote if user has not upvoted code already
    if (!this.upvoterUids.includes(uid)) {
      this.upvoterUids.push(uid)
    }
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
   * submit user code if correct and return whether code was submitted
   */
  async submitCode(tests) {
    var isCorrect = await this.isCodeCorrect(tests)
    if (isCorrect) {
      this.isSubmitted = true;
      return true
    } else {
      return false
    }
  }

  /**
   * get total number of code upvotes
   */
  totalUpvotes() {
    return this.upvoterUids.length;
  }

}

export { Code };