class SHA256 {

    async hash(value) {
        var plaintext = JSON.stringify(value);

        // encode plaintext as UTF-8
        var textBuff = new TextEncoder().encode(plaintext);

        // hash plaintext using SHA-256
        var hashBuff = await crypto.subtle.digest('SHA-256', textBuff);

        // convert to Array
        var hashArr = Array.from(new Uint8Array(hashBuff));

        // convert bytes in Array to hash hex string and return             
        var hash = hashArr.map(b => b.toString(16).padStart(2, '0')).join('');
        return hash;
    }

}

export default new SHA256();