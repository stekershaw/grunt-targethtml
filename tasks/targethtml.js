/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Ruben Stolk
 * Licensed under the MIT license.
 */

'use strict';

var esprima = require('esprima');

function regexParser (target, regexCandidate, regexDelimiter) {
  var startDelimPos = regexCandidate.indexOf(regexDelimiter);
  var endDelimPos = regexCandidate.lastIndexOf(regexDelimiter);
  if (!(startDelimPos === 0 && endDelimPos !== -1 && endDelimPos === (regexCandidate.length - regexDelimiter.length))) {
      return false;
  }
  var x = regexCandidate.substring(regexDelimiter.length, endDelimPos);
  var regex = new RegExp(x);
  return regex.test(target);
}

function conditionalParser (target, expression, options) {
  switch(expression.type) {
    case 'LogicalExpression':
      if (expression.operator !== '||') { // we only compare one variable so && is useless
        throw new Error('Syntax not supported - \'||\' is the only supported binary logical operator');
      }
      return conditionalParser(target, expression.left, options) || conditionalParser(target, expression.right, options);
    case 'UnaryExpression':
      if (expression.operator !== '!') {
        throw new Error('Syntax not supported - \'!\' is the only supported unary operator');
      }
      return !conditionalParser(target, expression.argument, options);
    case 'Identifier':
      return options.regex.allow ? regexParser(target, expression.name, options.regex.delimiter) : target===expression.name;
    case 'Literal':
      return options.regex.allow ? regexParser(target, expression.value, options.regex.delimiter) : target===expression.value;
    default :
      throw new Error('Syntax not supported - only certain logical operators and strings allowed in target expression.');
  }
}

module.exports = function(grunt) {

  grunt.registerMultiTask('targethtml', 'Produces html-output depending on grunt release version', function() {

    var target = this.target,
        path = require('path'),
        options = this.options({
          curlyTags: {},
          regex: {
            allow: false,
            delimiter: '/'
          }
        });

    this.files.forEach(function(file) {
      file.src.forEach(function(src) {
        var dest, statement;

        if (!grunt.file.exists(src)) {
          grunt.log.error('Source file "' + src + '" not found.');
        }

        if  (grunt.file.isDir(file.dest)) {
          dest = file.dest + path.basename(src);
        } else {
          dest = file.dest;
        }

        var contents = grunt.file.read(src);

        if (contents) {
          contents = contents.replace(new RegExp('<!--[\\[\\(]if target (.*?)[\\]\\)]>(<!-->)?([\\s\\S]*?)(<!--)?<![\\[\\(]endif[\\]\\)]-->', 'g'), function(match, $1, $2, $3) {
            // check if it's really targeted
            if (!conditionalParser(target, esprima.parse($1).body[0].expression, options)) {
              return '';
            }

            // Process any curly tags in content
            return $3.replace(/\{\{([^{}]*)\}\}/g, function(match, search) {
              var replace = options.curlyTags[search];
              return ('string' === typeof replace) ? replace : match;
            });
          });
          grunt.file.write(dest, contents);
        }

        grunt.log.ok('File "' + dest + '" created.');

        });
    });

    if (this.errorCount) { return false; }
  });
};
