/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Ruben Stolk
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('targethtml', 'Produces html-output depending on grunt release version', function() {

    // Process src-dest files
    this.files.forEach(function(file) {
      var contents = grunt.file.read(file.src);

      if (contents) {
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target ' + this.target + '[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), '$2');
        contents = contents.replace(new RegExp('^[\\s\\t]+<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'gm'), '');
        contents = contents.replace(new RegExp('<!--[\\[\\(]if target .*?[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->[\r\n]*', 'g'), '');
        grunt.file.write(file.dest, contents);

        // print a success message.
        grunt.log.ok('File "' + file.dest + '" created.');
      }
    }.bind(this));

    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

  });
};
