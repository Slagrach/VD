const fs = require('fs');

const gulp = require('gulp');
const webpackConfig = require('./config/webpack.dev');


const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const browserSync = require('browser-sync');

const rename = require("gulp-rename");
const concat = require('gulp-concat');
const newer = require('gulp-newer');
const uglify = require('gulp-uglify');

const pug = require('gulp-pug');
const htmlBeautify = require('gulp-html-beautify');
const webpHTML = require('gulp-webp-html');

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const shorthand = require('gulp-shorthand');
const autoprefixer = require('gulp-autoprefixer');
const webpCss = require("gulp-webpcss");

const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');

const fonter = require('gulp-fonter');
const otf2ttf = require('otf2ttf');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

const del = require('del');

let folderCopyDist = ['js/files', 'js/libs', ]; // 'videos', 'files' ...
gulp.task('copyFoldersDist', function (f) { f();
	folderCopyDist.forEach(folderItem => {
		gulp.src(['./src/' + folderItem + '/**/*.*'])
			.pipe(gulp.dest('./dist/' + folderItem))
			.pipe(browserSync.reload({stream: true}));
	})
});

let folderCopyBuild = ['js/files', 'js/libs', ]; // 'videos', 'files' ...
gulp.task('copyFoldersBuild', function (f) { f();
	folderCopyBuild.forEach(folderItem => {
		gulp.src(['./src/' + folderItem + '/**/*.*'])
			.pipe(gulp.dest('./build/' + folderItem))
			.pipe(browserSync.reload({stream: true}));
	})
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: './dist'
		},
		notify: false,
		browser: ['C:/Users/slagr/AppData/Local/Mail.Ru/Atom/Application/atom.exe'],
	});
});

gulp.task('jade', function () {
	var options = {
		"indent_with_tabs": 4,
		"break_chained_methods": true,
	}
	return gulp.src('./src/pug/pages/*.pug')
		.pipe(pug())
		// .pipe(webpHTML())
		.pipe(htmlBeautify(options))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('style', function () {
	return gulp.src(['src/scss/index.scss', 'src/scss/css/*.*'])
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.src(['src/scss/index.scss', 'src/scss/css/*.*']))
		.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
		.pipe(sass())
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		}))
		// .pipe(webpCss({
		// 	webpClass: "._webp",
		// 	noWebpClass: "._no-webp"
		// }))
		.pipe(cleanCSS({level: 2, format: 'beautify'}))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('style-libs', function () {
	return gulp.src('./src/scss/libs/*.{css,scss}')
		.pipe(sourcemaps.init({loadMaps: true, largeFile: true}))
		.pipe(concat('libs.min.css'))
		.pipe(autoprefixer({
			grid: true,
			overrideBrowserslist: ["last 5 versions"],
			cascade: true
		}))
		.pipe(cleanCSS({level: 2, format: 'beautify'}))
		.pipe(shorthand())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css/libs'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js', function () {
	return gulp.src(['./src/js/index.js', './src/js/module.js'])
		.pipe(webpackStream(webpackConfig), webpack)
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('js-libs', function () {
	return gulp.src('./src/js/libs/**/*.*')
		.pipe(concat('libs.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/js/libs'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function () {
	return gulp.src(['./src/images/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', "!**/favicon.*"])
		.pipe(gulp.dest('./dist/images'))
		.pipe(imagemin([
			webp({
				quality: 75
			})
		]))
		.pipe(rename({
			extname: '.webp'
		}))
		.pipe(gulp.dest('./dist/images'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('favicon', function () {
	return gulp.src('./src/images/favicon.{jpg,png,svg,gif,ico,webp}')
		.pipe(
			rename({
				extname: '.ico'
			})
		)
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('fontOtf', function () {
	return gulp.src('./src/fonts/**/*.otf')
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest('./src/fonts'))
		.pipe(browserSync.reload({stream: true}));
})

gulp.task('font', function () {
	return gulp.src('./src/fonts/**/*.ttf')
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(gulp.src('./src/fonts/*.ttf'))
		.pipe(ttf2woff())
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(gulp.src('./src/fonts/*.ttf'))
		.pipe(ttf2woff2())
		.pipe(gulp.dest('./dist/fonts'))
		.pipe(browserSync.reload({stream: true}));
})

gulp.task('fontsInclude', function () {
	let fontsFile = `./src/scss/_fonts.scss`;
	// Проверяем существуют ли файлы шрифтов
	fs.readdir('./dist/fonts', async function (err, fontsFiles) {
		if (fontsFiles) {
			// Проверяем существует ли файл стилей для подключения шрифтов
			if (!fs.existsSync(fontsFile)) {
				// Если файла нет, создаем его
				fs.writeFile(fontsFile, '', cb);
				let newFileOnly;
				for (var i = 0; i < fontsFiles.length; i++) {
					// Записываем подключения шрифтов в файл стилей
					let fontFileName = fontsFiles[i].split('.')[0];
					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;
						if (fontWeight.toLowerCase() === 'thin') {
							fontWeight = 100;
						} else if (fontWeight.toLowerCase() === 'extralight') {
							fontWeight = 200;
						} else if (fontWeight.toLowerCase() === 'light') {
							fontWeight = 300;
						} else if (fontWeight.toLowerCase() === 'medium') {
							fontWeight = 500;
						} else if (fontWeight.toLowerCase() === 'semibold') {
							fontWeight = 600;
						} else if (fontWeight.toLowerCase() === 'bold') {
							fontWeight = 700;
						} else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
							fontWeight = 800;
						} else if (fontWeight.toLowerCase() === 'black') {
							fontWeight = 900;
						} else {
							fontWeight = 400;
						}
						fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url('../fonts/${fontFileName}.woff2') format('woff2'), url('../fonts/${fontFileName}.woff') format('woff');\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
						newFileOnly = fontFileName;
					}
				}
			} else {
				// Если файл есть, выводим сообщение
				console.log('Файл scss/fonts/_fonts.scss уже существует. Для обновления файла нужно его удалить!');
			}
		} else {
			// Если шрифтов нет
			fs.unlink(fontsFile, cb)
		}
	});
	return gulp.src('./src');

	function cb() {
	}
})

gulp.task('clean', function () {
	return del.sync(['dist', 'build']);
})

gulp.task('build', function () {

	return del.sync('build/**/*.*'),

		gulp.src(['./dist/*.html'])
			// .pipe(webpHTML())
			.pipe(htmlBeautify())
			.pipe(gulp.dest('./build')),

		gulp.src(['./dist/css/index.css'])
			.pipe(sourcemaps.init())
			.pipe(shorthand())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build/css')),

		gulp.src(['./dist/css/index.min.css'])
			.pipe(cleanCSS({level: 2}))
			.pipe(gulp.dest('./build/css')),

		gulp.src(['./dist/css/libs/libs.min.css'])
			.pipe(sourcemaps.init())
			.pipe(cleanCSS({level: 2}))
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest('./build/css/libs')),


		gulp.src(['./src/js/index.js', './src/js/module.js'])
			.pipe(webpackStream(webpackConfig), webpack)
			.pipe(gulp.dest('build/js'))
			.pipe(webpackStream(require('./config/webpack.prod')))
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('./build/js')),

		gulp.src('./dist/js/libs/**/*.*')
			.pipe(uglify({}))
			.pipe(gulp.dest('./build/js/libs')),

		gulp.src('./dist/images/**/*.*')
			.pipe(gulp.dest('./build/images'))
			.pipe(
				imagemin({
					progressive: true,
					svgoPlugins: [{removeViewBox: false}],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
			.pipe(gulp.dest('./build/images')),
		gulp.src('./dist/favicon.*')
			.pipe(gulp.dest('./build')),
		gulp.src(['./dist/fonts/**/*.*'])
			.pipe(gulp.dest('./build/fonts'))
});

gulp.task('watch', function () {
	gulp.watch('src/**/*.pug', gulp.parallel('jade'));
	gulp.watch(['src/**/*.scss', 'src/**/*.sass'], gulp.parallel('style'));
	gulp.watch('src/**/*.js', gulp.parallel('js'));
	gulp.watch('src/**/*.{jpg,jpeg,png,svg,gif,ico,webp}', gulp.parallel('images'));
	// gulp.watch('src/**/*.*', gulp.parallel('copyFolders'));
	// gulp.watch('src/**/*.json', gulp.parallel('json'));
	// gulp.watch('src/**/*.php', gulp.parallel('php'));
});

gulp.task('default', gulp.parallel('clean', 'jade', 'style', 'style-libs', 'js', 'js-libs', 'images', 'favicon', 'font', 'browser-sync', 'watch'));
