class SHA256 {
  async hash(value) {
    // convert the value to a plaintext string
    var plaintext = JSON.stringify(value);

    // encode the plaintext as UTF-8
    var textBuff = new TextEncoder().encode(plaintext);

    // hash the plaintext using SHA-256
    var hashBuff = await crypto.subtle.digest("SHA-256", textBuff);

    // convert hash buffer to hash array
    var hashArr = Array.from(new Uint8Array(hashBuff));

    // convert bytes in hash array to hex hash string and return
    return hashArr.map((x) => x.toString(16).padStart(2, "0")).join("");
  }
}

export default new SHA256();
