Seeds.js - A Full Stack JavaScript Framework
=====

[![Join the chat at https://gitter.im/terminalvelocity/seeds.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/terminalvelocity/seeds.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Stories in Ready](https://badge.waffle.io/terminalvelocity/seeds.js.png?label=ready&title=Ready)](https://waffle.io/terminalvelocity/seeds.js) ![Downloads on NPM](http://img.shields.io/npm/dm/seeds.svg?style=flat-square)

Seeds is an acronym that stands for **S**ails **E**mber **E**mber-**D**ata **S**emantic-UI. It is designed for Rapid Application Prototyping.

```
                                                         .
                                              .         ;
                 .              .              ;%     ;;
                   ,           ,                :;%  %;
                    :         ;                   :;%;'     .,
           ,.        %;     %;            ;        %;'    ,;
             ;       ;%;  %%;        ,     %;    ;%;    ,%'
              %;       %;%;      ,  ;       %;  ;%;   ,%;'
               ;%;      %;        ;%;        % ;%;  ,%;'
                `%;.     ;%;     %;'         `;%%;.%;'
                 `:;%.    ;%%. %@;        %; ;@%;%'
                    `:%;.  :;bd%;          %;@%;'
                      `@%:.  :;%.         ;@@%;'
                        `@%.  `;@%.      ;@@%;
                          `@%%. `@%%    ;@@%;
                            ;@%. :@%%  %@@%;
                              %@bd%%%bd%%:;
                                #@%%%%%:;;
                                %@@%%%::;
                                %@@@%(o);  . '
                                %@@@o%;:(.,'
                            `.. %@@@o%::;
                               `)@@@o%::;
                                %@@(o)::;
                               .%@@@@%::;
                               ;%@@@@%::;.
                              ;%@@@@%%:;;;.
                          ...;%@@@@@%%:;;;;,..
                    Plant some seeds, watch em grow
                        You reap what you sow
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Seeds.js**

- [Installation](#installation)
- [Usage](#usage)
  - [Generates a new project with the supplied name](#generates-a-new-project-with-the-supplied-name)
  - [Run API Server at 1776 and Frontend at 4200](#run-api-server-at-1776-and-frontend-at-4200)
  - [Generates boilerplate of <kind> named [name]](#generates-boilerplate-of-kind-named-name)
    - [Currently only scaffold generator is available.](#currently-only-scaffold-generator-is-available)
- [Note](#note)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation
`npm install -g seeds`

## Usage

### Generates a new project with the supplied name
```
$ seeds new [name]
```

### Run API Server at 1776 and Frontend at 4200
```
$ seeds serve
```

### Generates boilerplate of <kind> named [name]
```
$ seeds generate <kind> [name] <attrs:type>
```

#### Currently only scaffold generator is available.

```
$ seeds generate scaffold user name:string email:string age:number birthday:date newsletter:boolean
```


## Note

Seeds.js uses tagged releases. The latest tagged version is the latest version available on NPM. Master is dev master branch.
