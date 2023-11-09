# Proof-of-Concept Example for Signature Swapping

This example repository includes proof-of-concept code demonstrating functionality within the [JavaScript SDK](https://github.com/casper-ecosystem/casper-js-sdk).

The example in `index.js` demonstrates the following workflow:

1. Importing a deploy (`deploy.json`) with original signatures using a third-party key pair.

2. Converting the deploy into a new valid deploy object.

3. Removing the third-party key pair approvals.

4. Importing an approved BitGo key pair from files.

5. Signing the new deploy object with the BitGo key pair.

Below is the code from `index.js` with code comments included for each step.

```js
// This is the raw nodeJS env
const casperJsSdk = require('casper-js-sdk');

// Importing the deploy with original signatures // Check the file result.deploy.approvals 
const jsonDeploy = require('./deploy.json');

// Importing DeployUtil and Keys modules from the JS SDK
const { DeployUtil, Keys } = casperJsSdk;

// Converting the imported jsonDeploy to proper Deploy object
let deploy = DeployUtil.deployFromJson(jsonDeploy.result).unwrap();

console.log('*** Approvals before ***');
console.log(deploy.approvals);

// Removing third-party approvals by replacing them with an empty array
deploy.approvals = [];

// Importing (BitGo's) KeyPair from the files
const keysToSign = Keys.Ed25519.parseKeyFiles('./keys/public_key.pem', './keys/secret_key.pem');

// Signing same deploy using new imported (BitGo) keys
const signedDeploy = DeployUtil.signDeploy(deploy, keysToSign);

console.log('*** Approvals after ***');
console.log(signedDeploy.approvals);

```

This example can be run using the following CLI commands, but will first require a valid `public_key.pem` and `secret_key.pem` in the local `keys` directory:

```bash
npm i
node index.js
```