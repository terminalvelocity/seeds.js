var fs         = require('fs');
var ncp        = require('ncp').ncp;
var npm        = require('enpeem');
var chalk      = require('chalk');
var mkdirp     = require('mkdirp');
var resolve    = require('resolve');
var program    = require('commander');
var multiline  = require('multiline');

var debug    = console.log;
var cwd      = process.cwd;
var basepath = process.cwd();

module.exports = function() {
  console.log(seeds);
}

debug(chalk.white.bold('Installing npm dependencies **Not Currently Stubbed**'));
// Download npm dependencies
npm.install({
  dependencies: [
    'sails@0.11.0',
    'sails-disk@git://github.com/balderdashy/sails-disk.git',
    'ember-cli',
    'ember-cli-scaffold', 
    'semantic-ui-ember'
  ], 
  save: false,
}, function (err) { /* ... */ });

ncp(basepath+'/lib/templates', basepath+'/dummy', function(err) {
  if(err) {
    debug(err);
  }
});

var seeds = multiline(function(){/*
                                                       .
                                            .         ;  
               .              .              ;%     ;;   
                 ,           ,                :;%  %;   
                  :         ;                   :;%;'     .,   
          .       %;     %;            ;        %;'    ,;
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
                       ....;%@@@@@%%:;;;;,..
                      =======================
                  Plant some seeds, watch em grow
                      You reap what you sow                            
   ______                             __                                
  /      \                           /  |                               
 /$$$$$$  |  ______    ______    ____$$ |  _______         __   _______ 
 $$ \__$$/  /      \  /      \  /    $$ | /       |       /  | /       |
 $$      \ /$$$$$$  |/$$$$$$  |/$$$$$$$ |/$$$$$$$/        $$/ /$$$$$$$/ 
  $$$$$$  |$$    $$ |$$    $$ |$$ |  $$ |$$      \        /  |$$      \ 
 /  \__$$ |$$$$$$$$/ $$$$$$$$/ $$ \__$$ | $$$$$$  |__     $$ | $$$$$$  |
 $$    $$/ $$       |$$       |$$    $$ |/     $$//  |    $$ |/     $$/ 
  $$$$$$/   $$$$$$$/  $$$$$$$/  $$$$$$$/ $$$$$$$/ $$/__   $$ |$$$$$$$/  
                                                    /  \__$$ |          
                                                    $$    $$/           
                                                     $$$$$$/            


*/});

// console.log(seeds);