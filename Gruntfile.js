module.exports = function(grunt) {
  grunt.initConfig({
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: './public/css/scss',
          cssDir: './public/css',
          watch: true,
          environment: 'production'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
};