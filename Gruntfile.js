module.exports = function(grunt) {
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        src: ['public/javascripts/*.js'],
        dest: 'public/javascripts/build/combined.js'
      }
    },
    sass: {
      dist: {
        files: {
          'public/stylesheets/style.css': 'public/sass/style.scss'
        }
      }
    },
    uglify: {
      js: {
        files: {
          'public/javascripts/build/output.min.js': ['public/javascripts/build/combined.js']
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    watch: {
      files: ['public/sass/*.scss', 'public/javascripts/*.js'],
      tasks: ['sass', 'concat', 'uglify']
    },
    concurrent: {
      dev: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  });

  grunt.registerTask('default', ['concurrent']);
}

