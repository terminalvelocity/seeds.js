# Changelog

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








