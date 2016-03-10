# Changelog

## v2.3.0 | 2016-03-09
* fix error message for db
* lib/template
* update seeds-backend package
* adds db commands to seeds

## v2.2.2 | 2016-03-09
* Update sails version number in the version command's output

## v2.2.1 | 2016-03-09
* bump seeds-frontend and backend versions
* bumps to latest seeds-frontend package
* update seeds-backend package and sails dep
* remove resource generator from generate.es6
* Fixes model generator to use scaffold-model so that it always uses top level model folder with pods structure. Removes resource generator as I don't like what it creates and do not want to override it
* Add download rank badge

## v2.2.0 | 2016-03-09
* adds --cache-min to install command for api/frontend. Reduces new command time by ~50%

## v2.1.5 | 2016-03-09
* reset version number
* removed extraneous test.txt file
* Updates version numbers in version command and adds version to seedsrc file on seeds new
* Update Ember to 2.4.1, updates generate-seeds-frontend version to latest version with Ember 2.4.1 templates, remove hardcoded bower deps and replace with a bower install during ember install.
* Adds lib to git

## v2.1.4 | 2016-03-06
* changes templates package.json file to use tilde (minor level matcher) for generators

## v2.1.3 | 2016-02-25


## v2.1.2 | 2016-02-25
* Modified help command. Also, adds alias for help & build commands
* Adds build command. Build creates a timestamped directory in the builds dir, copies api server, then runs ember build command with output-dir set to timestamped api server's asset dir. Adds mkdirp as dep. Updates default seeds .gitignore file to ignore the builds directory
* Refactored commands.es6 to automatically export all files found in the commands dir as CLI commands

## v2.1.1 | 2016-02-15
* Adds resource generator to seeds. seeds g resource modelName attrs:type

## v2.1.0 | 2016-02-11
* Adds model generator to seeds. Creates API model and controller as well as Ember Model.

## v2.0.7 | 2016-02-09
* Adds init command to install API and Frontend dependencies for a seeds project

## v2.0.6 | 2015-09-23
* add lib to .gitignore
* Adds gitignore to templates for seeds new command. Changed .seedsrc to seedsrc in templates so babel will see it and changed new command to copy over the unhidden version into a hidden version, does same for .gitignore. Removes Lib and fixes #62

## v2.0.5 | 2015-09-17
* Cleans up commands.es6 to use an array of command names to export

## v2.0.4 | 2015-09-16
* Adds versions table and help output
* Fixes npm run build and watch to only compile .es6 files and copy over other files to lib from src. Currently does not copy .seedsrc file. May change the .seedsrc file creation process

## v2.0.3 | 2015-09-14
* Reverts seeds version.
* Ember 2.0 compatible.
* Ember 2.0 compatible.
* preps for multiple front and backend apps as well as utilizing rails as a backend

## v2.0.2 | 2015-09-11
* Reverts bin/seeds. Want cli to work with version of node older than 4.
* move banner.es6 to lib to skip transpile. Babel does not preserve spacing of comments, also removes sails/ember from deps since it's not needed
* remove accidental tests.js from project root, update package.json test script and fixed typo in tests.es6
* Add dummy to npm ignore
* Template strings in node4 doesn't work 100% as expected. Reverted to old version of banner using multiline
* Cleans up repo. Moves pre-transpiled files to src folder, merge lib/settings and lib/helpers folder, updates package.json scripts to new setup
* Updates bin/seeds to es6
* removes ./node_modules/.bin from build/watch since it's not required when using npm run <command>, via @IanVS

## v2.0.1 | 2015-06-24
* fixes output of install command to show only which directory inside the current directory we are installing to instead of the absolute path
* adds test for install alias
* adds install command + alias 'i'

## v2.0.0 | 2015-06-19
* changes release hooks babel call from build-es5 to build
* adds *.es6 to npmignore
* Removes comments from new command
* removes extraneous templates, cleans up new command
* Uses sails generate seeds-backend instead of sails new
* adds test to ensure debug is false before pushing
* Adds tests to npm run watch transpile command
* debug: false by default
* Finishes up es6 transpile. all commands work on node 0.12.4
* Adds babel as a devdep
* sets .seedsrc up for multiple front end apps
* rm npm-debug.log.randomstring
* es6 -> es5
* readds templates to eslintrc
* Adds watch/build to package.json, transpiles es6 to es5 and works in node v0.12.4
* es6-transpile wip
* debug flag false by default
* Upgrades soil-cli version
* table of contents update
* Updates README
* Adds info comment about model types
* Adds package.json to templates
* Updates links in package.json
* add npm run watch command to have tests run automatically on filesave
* Adds test for help to be default command
* adds tests for aliases
* Adds aliases/flags class. Called in the constructor to parse aliases and flags. Flags -v, --version, -h, and --help will supercede all other commands
* Updates test to reflect change to conver models file. Camelcased instead of dashed
* Refactors generate command to use the updated convertModels command. Data types are now properly converted from for sails and ember. Also normalized all the directory calls so it should now work on windows
* refactor generate to check for existance of .seedsrc file instead of checking for specific dir names
* Adds tests for converting model datatypes
* Fixed eslint error 'guard-for-in', removes convert-models from eslintignore
* Refactors the convert-models function
* Adds mocha: true to eslint, ads a couple tests for seedsrc defaults
* moves debug flag to top of constructor
* debug flag is based on config
* use the seeds config for file names, changes all the references to paths in lib/cli to use path.join
* fixes typo on generate command
* table of contents update
* Adds config property to SeedsCLI class. Returns the configuration as set by default, by a seedsrc file, or by passing arguments to cli

## v1.7.3 | 2015-06-11
* Fixes soil-cli version to 1.3.3. Going to be upgrading soil-cli commands before refactoring parts of seeds and don't want it to break production
* Update README.md
* Make default options for runExternalCommand more granular
* Update README.md
* add waffle.io badge

## v1.7.2 | 2015-06-02
* updates seeds to use soil cli's api method includedBasepath, previously was underscored

## v1.7.1 | 2015-06-02
* Remove debug flag and bumps soil cli version to the latest

## v1.7.0 | 2015-06-02


## v1.6.0 | 2015-06-02
* clarifies roadmap
* updates readmes current roadmap
* table of contents update
* update npmignore
* Adds release process that includes linting, testing, git hooks: [pre-commit, pre-push, update], changelog generation, doctoc, deps minification, auto release generation, also includes full npmignore to slim up production installations.
* Adds eslint/cleans up most files to adhere to style guide (Except new.. new needs separate refactor) also adds to gitignore, adds eslintignore, adds tests folder in preparation for adding tests

### 0.0.0
Init
























