# Theme helper

This repository has tools to help with FusionAuth theme management. It offers syncing to and from your local system. It also has a tool to compare between two themes, which is useful when upgrading FusionAuth.

This repository is for helping you edit, develop, and manage FusionAuth themes locally.

Because these helper scripts upload the results of your changes in real-time, it is best used on non-production systems.

More about FusionAuth themes: https://fusionauth.io/docs/customize/look-and-feel/

## Prerequisites

* node
* npm

## Installation

* `npm install`
* update `.env.sample` with your API key, FusionAuth hostname, and theme id and copy it to `.env`
* you can modify the TMP_DIR to be wherever you'd like it to be, the default is `tmp` in the current directory.

The provided API key must have `/api/theme` permissions for the `GET` and `PATCH` methods.

## Usage for storing a theme in version control

Run `download.sh` to pull down theme files, including freemarker, messages, and stylesheet files.

Commit them to version control.

In a separate terminal, run `watch.sh`. This will upload any modified templates and will overwrite anything present in the remote system whenever a local file changes. 

Edit the files using whatever local editor you want.

In the browser, reload themed pages and see your changes live.

When done, commit changes to version control.

You can do a final upload of whatever is in the TMP_DIR by running `upload.sh`.

## Usage for upgrading

When [upgrading FusionAuth](https://fusionauth.io/docs/operate/deploy/upgrade), there may be changes in newer theme templates. If you have a customized theme, you will need to manually apply these changes. To find the differences, you can download the base theme from the version you are upgrading to, and compare it to the base theme of your current FusionAuth installation. Update the variables in the `.env` file accordingly for each version. You should use the [Default theme Id `75a068fd-e94b-451a-9aeb-3ddb9a3b5987`](https://fusionauth.io/docs/get-started/core-concepts/limitations#default-configuration) as the `THEME_ID` value for both versions. Update the `TMP_DIR` before each download to save the themes to different folders. You can download the current and new themes using the download script:

```sh
./download.sh
```

Once you have both sets of theme files downloaded, you can run the `diff-themes.sh` script to compare the two sets of files. The script takes 2 arguments, the first is the path to the existing theme files, and the second is the path to the new theme files. For example:

```sh
./diff-themes.sh current-theme new-theme
```

The script will output a list of files that are different between the two sets of theme files, along with the differences. You can use this list to update your customized theme files. While you can directly use this output to find the changes, it might be useful to use a visual diff tool of your choice to help you make the changes, using the file list as a guide.

Read more in the [Upgrade Guide](https://fusionauth.io/docs/operate/deploy/upgrade)
