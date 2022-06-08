# Crypto로 정보보호하기

javascript에서 해시 함수를 통한 암호화를 할 수 있도록 해주는 Node.js 패키지로 `Crypto`를 제공하고 있다.
암호화는 목적에 따라 **단방향 암호화** 혹은 **양방향 암호화**를 할 수 있다.

비밀번호를 DB에 사용자가 입력한 값 그대로 저장하면 보안 이슈가 발생하기 때문에 암호화를 해주어야한다.
이 때는 단방향 암호화로 간단히 해결할 수 있다.

```js
const { pbkdf2 } = await import("node:crypto");

// 암호화된 비밀번호를 저장한다.
pbkdf2("secret", "salt", 100000, 64, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString("hex")); // '3745e48...08d59ae'
});
```

특정 개인정보를 암호화하여 저장하고, 복호화하여 화면에 노출해야하는 경우에는 양방향 암호화를 이용해야한다.

```js
const { scrypt, randomFill, createCipheriv } = await import("node:crypto");

const algorithm = "aes-192-cbc";
const password = "Password used to generate key";

// First, we'll generate the key. The key length is dependent on the algorithm.
// In this case for aes192, it is 24 bytes (192 bits).
scrypt(password, "salt", 24, (err, key) => {
  if (err) throw err;
  // Then, we'll generate a random initialization vector
  randomFill(new Uint8Array(16), (err, iv) => {
    if (err) throw err;

    const cipher = createCipheriv(algorithm, key, iv);

    let encrypted = cipher.update("some clear text data", "utf8", "hex");
    encrypted += cipher.final("hex");
    console.log(encrypted);
  });
});
```

key, password 에 길이 제한이 있으니 주의하자!
