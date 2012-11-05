/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*! PROJECT_NAME - v<%= meta.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '* http://PROJECT_WEBSITE/\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        'YOUR_NAME; Licensed MIT */'
    },
    lint: {
      files: ['grunt.js', 'src/**/*.js', 'test/**/*.js']
    },
    concat: {
      dist: {
        src: ['<banner:meta.banner>', '<file_strip_banner:src/*.js>'],
        dest: 'dist/FILE_NAME.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/FILE_NAME.min.js'
      }
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'lint jasmine'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jasmine : false,
        describe : false,
        beforeEach : false,
        expect : false,
        it : false,
        spyOn : false,
        define: false
      }
    },
    uglify: {},
    'jasmine' : {
      src : 'src/**/*.js',
      specs : 'test/**/*Spec.js',
      helpers : 'test/helpers/*.js',
      timeout : 10000,
      template : 'test/runner.html',
      amd: true,
      junit : {
        output : 'junit/'
      },
      phantomjs : {
        'ignore-ssl-errors' : true
      },
      helpers: [
        'node_modules/requirejs/require.js',
        //'/path/to/requireConfig.js'
      ]
    },
    'jasmine-server' : {
      browser : false
    }
  });

  // Default task.
  grunt.loadNpmTasks('grunt-jasmine-runner');
  grunt.registerTask('default', 'lint jasmine concat min');


};
