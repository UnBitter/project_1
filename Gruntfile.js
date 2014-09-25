module.exports = function(grunt) {
	grunt.initConfig({
		jade: {
			compile: {
				files: [{
					src: ['templates/*.jade', '!templates/incl/*.jade'],
					dest: 'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>',
					expand: true,
					ext: '.html',
				}]
			},
			options: {
				pretty: true,
			}
		},
		sass: {
			prod: {
				files: {
					'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>/css/main.css': 'sass/main.scss'
				},
				options: {
					compass: true,
					style: 'compressed'
				}
			}
		},
		concat: {
			main: {
				src: [
					'js/libs/jquery.js',
					'js/*.js' // Все JS-файлы в папке
				],
				dest: 'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>/js/scripts.build.js'
			}
		},
		// Сжимаем
		uglify: {
			main: {
				files: {
					// Результат задачи concat
					'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>/js/scripts.min.js': '<%= concat.main.dest %>'
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					src: ['img/*.{png,jpg,gif}'],
					dest: 'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>/img',
				}]
			}
		},
		watch: {
			livereload: {
				options: {
					livereload: true
				},
				files: ['builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>/*'],
			},
			js: {
				files: ['js/libs/jquery.js', 'js/*.js'],
				tasks: ['concat', 'uglify'],
			},
			sass: {
				files: ['sass/*.scss'],
				tasks: 'sass',
			},
			jade: {
				files: ['templates/*.jade', '!templates/incl/*.jade'],
				tasks: 'jade',
			},
			imagemin: {
				files: ['img/*.{png,jpg,gif}'],
				tasks: 'imagemin',
			}
		},
		connect: {
			server: {
				options: {
					port: 3000,
					base: 'builds/prod_build_<%= grunt.template.today("m-d-yyyy") %>',
				}
			}
		},
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', [
		'connect',
		'jade',
		'sass',
		'concat',
		'uglify',
		'imagemin',
		'watch',
	]);
};