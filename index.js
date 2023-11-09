
const casperJsSdk = require('casper-js-sdk');
 
const jsonDeploy = require('./deploy.json');

const { DeployUtil, Keys } = casperJsSdk;

let deploy = DeployUtil.deployFromJson(jsonDeploy.result).unwrap();

console.log('*** Approvals before ***');
console.log(deploy.approvals);

deploy.approvals = [];

const keysToSign = Keys.Ed25519.parseKeyFiles('./keys/public_key.pem', './keys/secret_key.pem');

const signedDeploy = DeployUtil.signDeploy(deploy, keysToSign);

console.log('*** Approvals after ***');
console.log(signedDeploy.approvals);