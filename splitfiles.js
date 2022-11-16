'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('out.json');
let themes = JSON.parse(rawdata);

for (const [key,val] of Object.entries(themes)) {
  fs.writeFileSync("tmp/"+key+".ftl", val);
}

