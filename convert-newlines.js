// import {readFile, writeFile, writeFileSync, promises as fsPromises} from 'fs';
const {readFile, writeFile, promises: fsPromises} = require('fs');

readFile('/dev/stdin', 'utf-8', function (err, contents) {
  if (err) {
    console.log(err);
    return;
  }

  const replaced = contents.replace(/\\n/g, '\n');

  writeFile('/dev/stdout', replaced, 'utf-8', function (err) {
    //console.log(err);
  });
});

