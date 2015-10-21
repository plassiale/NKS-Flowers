module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: {
        src: ['dist/**', 'tmp/**']
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist'
        }
      }
    },
    concat: {
      main: {
        src: [
          'bower_components/jquery/dist/jquery.min.js',
          'bower_components/bootstrap/dist/js/bootstrap.min.js',
          'bower_components/jquery.easing/js/jquery.easing.js',
          'js/plugins/*.js',
          'bower_components/wow/dist/wow.js',
          'bower_components/purl/purl.js',
          'bower_components/bootstrap-magnify/js/bootstrap-magnify.js',
          'bower_components/jquery.lazyload/jquery.lazyload.js',
          'bower_components/timecircles/inc/TimeCircles.js',
          'js/custom-cookies.js',
          'js/custom.js'
        ],
        dest: 'dist/js/custom.js',
      }
    },
    uglify: {
      main: {
        src: 'dist/js/custom.js',
        dest: 'dist/js/custom.min.js'
      }
    },
    copy: {
      htacess: {
        expand: true,
        src: '.htaccess',
        dest: 'dist/'
      },
      favicon: {
        expand: true,
        src: '*',
        cwd: 'favicon/',
        dest: 'dist/'
      },
      glyphicons: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/',
          src: [
            'fonts/glyphicons-halflings-regular.*'
          ],
          dest: 'dist/'
        }, ]
      },
      fontawesomefonts: {
        files: [{
          expand: true,
          cwd: 'bower_components/fontawesome/fonts/',
          src: [
            '*.*'
          ],
          dest: 'dist/fonts/'
        }, ]
      },
      fontawesomecss: {
        files: [{
          expand: true,
          cwd: 'bower_components/fontawesome/css',
          src: [
            'font-awesome.min.css'
          ],
          dest: 'tmp/css/'
        }, ]
      },
      timecirclescss: {
        files: [{
          expand: true,
          cwd: 'bower_components/timecircles/inc/',
          src: [
            'TimeCircles.css'
          ],
          dest: 'tmp/css/'
        }, ]
      },
      animate: {
        files: [{
          expand: true,
          cwd: 'bower_components/animate.css/',
          src: [
            'animate.min.css'
          ],
          dest: 'tmp/css'
        }, ]
      },
      bootstrapmagnify: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap-magnify/css/',
          src: [
            'bootstrap-magnify.min.css'
          ],
          dest: 'tmp/css'
        }, ]
      },
      bootstrap: {
        files: [{
          expand: true,
          cwd: 'bower_components/bootstrap/dist/',
          src: ['css/bootstrap.min.css'],
          dest: 'tmp/'
        }, ]
      },
      spinkit: {
        files: [{
          expand: true,
          cwd: 'bower_components/spinkit/css/spinners/',
          src: ['7-three-bounce.css'],
          dest: 'tmp/css'
        }, ]
      },
      sitemap: {
        files: [{
          expand: true,
          cwd: 'sitemap',
          src: ['*'],
          dest: 'dist/'
        }, ]
      },
      html: {
        options: {
          process: function(content, srcpath) {
            return content.split('${version}').join(grunt.config.get('pkg.version'));
          }
        },
        src: ['*.html'],
        dest: 'tmp/html/'
      },
      php: {
        src: ['mail/*.php'],
        dest: 'dist/'
      },
      img: {
        src: ['img/**'],
        dest: 'dist/'
      }
    },
    less: {
      expanded: {
        options: {
          paths: ["css"]
        },
        files: {
          "tmp/css/custom.css": "less/custom.less",
          "tmp/css/vp.css": "less/vp.less",
          "dist/css/construction.css": "less/construction.less"
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'dist/css/custom.min.css': ['tmp/css/*.css']
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          useShortDoctype: true,
          minifyJS: true,
          minifyCSS: true
        },
        expand: true,
        cwd: 'tmp/html',
        src: ['*.html'],
        dest: 'dist/'
      }
    },
    watch: {
      scripts: {
        files: ['js/**'],
        tasks: ['concat', 'uglify'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      copyhtml: {
        files: ['*.html'],
        tasks: ['copy:html', 'htmlmin'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      copyimg: {
        files: ['img/**'],
        tasks: ['copy:img'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      less: {
        files: ['less/*.less'],
        tasks: ['less', 'cssmin'],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    exec: {
      deploy_github: {
        cmd: "git subtree push --prefix dist origin gh-pages"
      },
      clean_github: {
        cmd: "git push origin :gh-pages"
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-exec');

  // Default task(s).
  grunt.registerTask('init', ['clean', 'concat', 'uglify', 'copy', 'less', 'cssmin', 'htmlmin']);
  grunt.registerTask('default', ['init', 'connect', 'watch']);
  grunt.registerTask('deploy_github', ['init', 'exec:deploy_github', 'clean']);
  grunt.registerTask('clean_github', ['exec:clean_github']);
};