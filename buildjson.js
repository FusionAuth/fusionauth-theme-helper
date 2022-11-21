'use strict';

const dotenv = require('dotenv').config();

const tmpFolder = './'+process.env.TMP_DIR+'/';

const fs = require('fs');
const obj = {}
const theme = {};

fs.readdirSync(tmpFolder).forEach(file => {
  if (!file.endsWith(".ftl")) {
    return;
  }
  let name = file.replace(".ftl","");
  // console.log(name);
  let rawdata = fs.readFileSync(tmpFolder+file);
  obj[name] = String(rawdata)
});

theme['templates'] = obj;

fs.readdirSync(tmpFolder).forEach(file => {
  if (!file.endsWith(".txt")) {
    return;
  }
  let rawdata = fs.readFileSync(tmpFolder+file);
  theme["defaultMessages"] = String(rawdata)
});

fs.readdirSync(tmpFolder).forEach(file => {
  if (!file.endsWith(".css")) {
    return;
  }
  let rawdata = fs.readFileSync(tmpFolder+file);
  theme["stylesheet"] = String(rawdata)
});

const wrapper = {};
wrapper['theme'] = theme;

console.log(JSON.stringify(wrapper));

