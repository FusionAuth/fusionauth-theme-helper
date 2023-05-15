# Theme helper

This repository has tools to help with FusionAuth theme management. It offers syncing to and from your local system.

This repository is for helping you edit, develop, and manage FusionAuth themes locally.

Because these helper scripts upload the results of your changes in real-time, it is best used on non-production systems.

More about FusionAuth themes: https://fusionauth.io/docs/v1/tech/themes/

## Prerequisites

* node
* npm

## Installation

* `npm install`
* update `.env.sample` with your API key, FusionAuth hostname, and theme id and copy it to `.env`
* you can modify the TMP_DIR to be wherever you'd like it to be, the default is `tmp` in the current directory.

The provided API key must have `/api/theme` permissions for the `GET` and `PATCH` methods.

## Usage

Run `download.sh` to pull down theme files, including freemarker, messages, and stylesheet files.

Commit them to version control.

In a separate terminal, run `watch.sh`. This will upload any modified templates and will overwrite anything present in the remote system whenever a local file changes. 

Edit the files using whatever local editor you want.

In the browser, reload themed pages and see your changes live.

When done, commit changes to version control.

You can do a final upload of whatever is in the TMP_DIR by running `upload.sh`.

