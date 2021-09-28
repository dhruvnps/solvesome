<template>
  <h3>Description</h3>
  <br />
  <p>
    Commander Lambda has asked for your help to refine the automatic quantum
    antimatter fuel injection system for her LAMBCHOP doomsday device. It's a
    great chance for you to get a closer look at the LAMBCHOP - and maybe sneak
    in a bit of sabotage while you're at it - so you took the job gladly.
    Quantum antimatter fuel comes in small pellets, which is convenient since
    the many moving parts of the LAMBCHOP each need to be fed fuel one pellet at
    a time.
  </p>
  <br />
  <p>
    However, minions dump pellets in bulk into the fuel intake. You need to
    figure out the most efficient way to sort and shift the pellets down to a
    single pellet at a time. The fuel control mechanisms have three operations:
  </p>
  <br />
  <ul>
    <li>Add one fuel pellet</li>
    <li>Remove one fuel pellet</li>
    <li>
      Divide the entire group of fuel pellets by 2 (due to the destructive
      energy released when a quantum antimatter pellet is cut in half, the
      safety controls will only allow this to happen if there is an even number
      of pellets)
    </li>
  </ul>
  <br />
  <p>
    Write a function called solution(n) which takes a positive integer as a
    string and returns the minimum number of operations needed to transform the
    number of pellets to 1. The fuel intake control panel can only display a
    number up to 309 digits long, so there won't ever be more pellets than you
    can express in that many digits. For example: solution(4) returns 2: 4 -> 2
    -> 1 solution(15) returns 5: 15 -> 16 -> 8 -> 4 -> 2 -> 1
  </p>
  <br />

  <h3>Code</h3>
  <br />
  <pre><code>
  def solution(n):
    # returns an integer
  </code></pre>
  <br />

  <h3>Test Cases</h3>
  <br />
  <p>Input: <samp>solution(15)</samp></p>
  <p>Output: <samp>5</samp></p>
  <br />
  <p>Input: <samp>solution(4)</samp></p>
  <p>Output: <samp>2</samp></p>
</template>

<script>
export default {
  name: "Description",
  props: {},
};
</script>

<style scoped>
pre code {
  background-color: #f4f4f4;
  display: block;
  padding: 10px;
  border-radius: 5px;
}
</style>
