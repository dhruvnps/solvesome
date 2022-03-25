class CodeSort {

  /**
   * sort two arrays of code objects by code shortest -> longest
   */
  mergeSort(codes) {
    // base case when codes array length < 2
    // return codes array since it is already sorted
    if (codes.length < 2) return codes;

    // get left half of codes array
    // the remaining array is in now the right half
    var left = codes.splice(0, codes.length / 2);

    // return the merger of the two halves sorted
    return this.merge(
      this.mergeSort(left),
      this.mergeSort(codes)
    )
  }

  /**
   * merge two sorted arrays of code objects
   */
  merge(left, right) {
    var codes = [];
    // repeat while both halves have elements
    while (left.length && right.length)
      // sorting from shortest code to longest code
      if (this.getLength(left[0]) > this.getLength(right[0])) {
        codes.push(right.shift());
      } else {
        codes.push(left.shift());
      }
    // return the ordered codes array with any remaining elements
    return codes.concat(left).concat(right);
  }

  /**
   * get length of code block of code object
   */
  getLength(code) {
    return code.codeBlock.length;
  }
}

export default new CodeSort();