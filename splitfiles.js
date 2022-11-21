'use strict';

const dotenv = require('dotenv').config();

const args = process.argv.slice(2);

const filename = args[0];
const suffix = args[1];

const tmpFolder = './'+process.env.TMP_DIR+'/';

const fs = require('fs');

let rawdata = fs.readFileSync(tmpFolder+filename);
let themes = JSON.parse(rawdata);

for (const [key,val] of Object.entries(themes)) {
  fs.writeFileSync(tmpFolder+key+suffix, val);
}

