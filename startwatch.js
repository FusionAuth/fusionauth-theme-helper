const fs = require("fs");
const chokidar = require("chokidar");
const https = require("https");
const dotenv = require("dotenv").config();

const apiKey = process.env.API_KEY;
const themeId = process.env.THEME_ID;
const fusionauthUrl = process.env.FUSIONAUTH_URL;
const tmpFolder = "./" + process.env.TMP_DIR + "/";

const {
  FusionAuthClient,
  ClientResponse,
} = require("@fusionauth/typescript-client");

const client = new FusionAuthClient(apiKey, fusionauthUrl);

const watcher = chokidar.watch(tmpFolder);

watcher.on("change", (filename) => {
  filename = filename.split("\\")[1];
  if (filename) {
    const obj = {};
    if (
      !(
        filename.endsWith(".ftl") ||
        filename.endsWith(".txt") ||
        filename.endsWith(".css")
      )
    ) {
      // ignore non template, non css, non text files
      return;
    }
    const theme = {};
    const localizedMessages = {};

    fs.readdirSync(tmpFolder).forEach((file) => {
      if (file != filename) {
        return;
      }

      // check templates
      if (filename.endsWith(".ftl")) {
        let name = file.replace(".ftl", "");
        // console.log(name);
        let rawdata = fs.readFileSync(tmpFolder + file);
        obj[name] = String(rawdata);
      }

      // messages
      if (filename.endsWith(".txt")) {
        // console.log(filename);
        let name = file.replace(".txt", "");
        let rawdata = fs.readFileSync(tmpFolder + file);
        if (name == "defaultMessages") {
          theme["defaultMessages"] = String(rawdata);
        } else {
          localizedMessages[name] = String(rawdata);
          theme.localizedMessages = localizedMessages;
        }
      }

      // check css
      if (filename.endsWith(".css")) {
        // console.log(filename);
        let rawdata = fs.readFileSync(tmpFolder + file);
        theme["stylesheet"] = String(rawdata);
      }
    });

    theme["templates"] = obj;

    const wrapper = {};
    wrapper["theme"] = theme;

    // console.log(wrapper);

    const toUpload = wrapper;
    client
      .patchTheme(themeId, toUpload)
      .then((clientResponse) => {
        if (200 != clientResponse.statusCode) {
          console.error("ERROR: " + clientResponse);
        }
        console.log("uploaded " + filename);
      })
      .catch(console.error);
  }
});

process.on("SIGINT", () => {
  watcher.close();
});
