/*
 * grunt-targethtml
 * https://github.com/changer/grunt-targethtml
 *
 * Copyright (c) 2012 Igor Hlina
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },

      gruntfile: 'Gruntfile.js',
      tasks: 'tasks/*.js'
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    }
  });

  // Load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);
};
