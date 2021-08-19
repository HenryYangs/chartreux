# chartreux
> A flexible custom templates installer

## Why
When developing project, we need to do plenty of chores around config, like eslint, jest, even webpack, rollup, etc...
To avoid copying config file from everywhere, `chartreux` helps you to manage all your config files. You can create your own config file and upload to somewhere. Then set remote path to `chartreux`, you can install your config later.

## Install

`npm i -g chartreux` or `yarn add -g chartreux`

## Usage

### config
- `chartreux config -g/--get [tpl]`: get config of template
- `chartreux config <tpl> -s/--set <url>`: set config of template
- `chartreux config -e/--edit`: open editor to edit config
- `chartreux config -r/--reset`: reset config of template
- `chartreux config --json`: output current config

#### Detail
About config file, `chartreux` has some default remote config for some certain templates, such as eslint, typescript, .gitignore, etc... You can also use your own remote url.

Default remote url is saved in `default` in each template config item. When you set a new value, default value will not be rewrite, unless delete it using `--edit`.

You can also set a new template. `default` and `url` will be set to your remote url at first time.

To understand the details, pls download and check config file.

### fetch
- `chartreux fetch [tpl...]`: fetch specific templates from remote

### install
- `chartreux install <tpl> [path]`: install specific template to custom path

### upgrade
- `chartreux upgrade`: upgrade chartreux
