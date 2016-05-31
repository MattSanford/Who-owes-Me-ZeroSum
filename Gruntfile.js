module.exports = function(grunt) {
	grunt.initConfig({
		express: {
			files: [ '**/*.js' ],
			tasks: [ 'express:dev' ],
			dev: {
				options: {
					script: 'app.js'
				}
			},
			options: {
				spawn: false
			}
		},
/*		sass: {
			dist: {
				optons: {
					style: 'expanded',
					compass: true,
					update: true
				},
				files: [{
					expanded: true,
					cwd: 'public/assets/stylesheets/scss',
					src: ['*.scss'],
					dest: 'public/assests/stylesheets/css',
					ext: '.css'
				}]
			}
		}, */
		watch: {
			options: {
				livereload: true
			},
			files: ['*']
			//sass: {
			//	files: ['public/assets/stylesheets/scss/**/*.scss'],
			//	tasks: ['sass']
			//}
		}
	});
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-keepalive');

  grunt.registerTask('serve', ['express:dev', 'keepalive']);
  grunt.registerTask('default', ['serve', 'watch']);
}