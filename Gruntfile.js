module.exports = function(grunt) { 'use strict';

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  var config = {
    app: 'app',
    assetsDir: '{{site.theme.link}}/',
    dist: 'public',
    ghPages: '_site',
    liveReload: 42526,
    port: 80,
    rsyncHost: 'root@162.243.32.19',
    src: 'src',
    temp: '.tmp',
    theme: 'tneme-name',
    url: 'url.dev',
  };

  grunt.initConfig({

    config: config,

    'gh-pages': {
      options: {
        base: '<%= config.ghPages %>'
      },
      src: '**/*'
    }
  });

  grunt.registerTask('deploy', [
    'gh-pages'
  ]);
};
