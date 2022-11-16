
This repository is for helping you edit, develop and manage FusionAuth themes.

## Prerequisites

* curl
* node
* npm
* jq: https://stedolan.github.io/jq

## Installation

* `npm install`
* update `.env.sample` with your API key, FusionAuth hostname, and theme id and copy it to `.env`

## Usage

Run `download.sh` to pull down all the freemarker files.

Commit them to version control.

In a separate terminal, run `node startwatch.js`. This will upload any templates that are modified.

Edit the files using whatever local editor you want.

In the browser, reload the themed pages and see your chnages live.

When done, commit changes to version control.

You can do a final upload by running `upload.sh`.

## TODO

Have the messages file handled as well. Only templates are supported currently.
