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
  runCode(tests) {
    var pass = tests.length - tests.length;

    /* for (var test of tests) {
      TODO:
        run code with test.input as input
        if output is test.output, increase pass by 1
    } */

    // returns number of times code passed test case
    return pass
  }

  /**
   * checks code for correctness
   */
  isCodeCorrect(tests) {
    return this.runCode(tests) === tests.length
  }

  /**
   * tests code success rate
   */
  testCode(tests) {
    // returns string showing test cases passed vs total tests
    return this.runCode(tests) + '/' + tests.length
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
    this.codeBlock = "function solution(n) { }";
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
  submitCode(tests) {
    if (this.isCodeCorrect(tests)) {
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