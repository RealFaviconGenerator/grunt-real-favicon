# grunt-real-favicon

> Generate a multiplatform favicon with [RealFaviconGenerator](http://realfavicongenerator.net/).

## Getting Started

There are two major steps to use this plugin:

- Take your favicon master picture (probably the logo of your site) and submit it manually to [RealFaviconGenerator.net](http://realfavicongenerator.net/). Play with the favicon editor: do you want to add margins to the iOS icon? Turn the Windows tile picture into a white silouette? What is the best scaling algorithm for your icon design? You can answer all these questions easily with the help of the UI.
- Once you know what you want, start using the Grunt plugin, as described below. Turn your experiments above into a Grunt task configuration.

This plugin requires Grunt `~0.4.5`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-real-favicon --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-real-favicon');
```

## The "real_favicon" task

### Overview
In your project's Gruntfile, add a section named `real_favicon` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  real_favicon: {
    my_icon: {
      // The favicon master picture
      src: 'pics/high_res_logo.png',
      // Directory where the generated pictures will be stored
      dest: 'dist/path/to/icons',
      // Path to icon (eg. favicon.ico will be accessible through http://mysite.com/path/to/icons/favicon.ico)
      icons_path: '/path/to/icons',
      // HTML files where the favicon code should be inserted
      html: ['dist/index.html', 'dist/about.html'],
      design: {
        // These options reflect the settings available in RealFaviconGenerator
        ios: {
          picture_aspect: 'background_and_margin',
          background_color: '#654321',
          margin: 4
        },
        windows: {
          picture_aspect: 'white_silhouette',
          background_color: '#123456'
        }
      },
      settings: {
        // 0 = no compression, 5 = maximum compression
        compression: 5,
        // Default is Mitchell
        scaling_algorithm: 'NearestNeighbor'
      }
    }
  }
});
```

### Options

#### src
Type: `String`
Default: none (mandatory)

The icon master picture. It must be a square, high definition picture.

This picture can be passed as a file (eg. `"path/icon/master_pic.png"`) or a URL (eg. `"http://mysite/master_pic.png"`).

#### dest
Type: `String`
Default: none (mandatory)

The directory where icons and related files (eg. `browserconfig.xml`) will be stored. This directory must be consistent with `icons_path` (see below).

#### icons_path
Type: `String`
Default: `undefined` (ie. icons stored in the root directory of the web site)

This is where the icons will be stored and accessible. This path is about the target web site, not the local file system.

For example, suppose the overall goal of your Grunt file is to create a directory named `dist` which contains a whole web site. `dist` contains everything: the HTML pages, some Javascript files (minified and all), etc. `dist` will become the root of the web site. For example, `dist/index.html` will be accessible through `http://mysite.com/index.html`.

`icons_path` is a path relative to `http://mysite.com`. For example, if you wish your icons to be accessible with `http://mysite.com/path/to/icons` (eg. `http://mysite.com/path/to/icons/favicon.ico`, etc.), then `icon_paths` must be set to `/path/to/icons` and `dest` must be set to `dist/path/to/icons`.

The default value of `icons_path` is `undefined`, which means the root directory. In this example, `dest` should be set to `dist` and `favicon.ico` will be available at `http://mysite.com/favicon.ico`.

#### html
Type: `Array`
Default: `[]`

The HTML files where the favicon code needs to be injected. Probably all pages of the web site.

#### design

##### ios

###### picture_aspect
Type: `String`
Default: `no_change`

Possible values:

- `no_change`: Use the master picture as is.
- `background_an_margin`: Add a solid background to the (transparent) master picture and a margin. With this option, add the `background_color` and `margin` parameters:

```js
ios: {
  picture_aspect: 'background_an_margin',
  background_color: '#123456',
  margin: 5
}
```

- `margin`: Add a margin to the master picture:

```js
ios: {
  picture_aspect: 'margin',
  margin: 3
}
```

- `dedicated_picture`: Use a specific picture for the iOS design:

```js
ios: {
  picture_aspect: 'dedicated_picture',
  dedicated_picture: 'assets/icon_for_ios.png'
}
```

##### windows

###### picture_aspect
Type: `String`
Default: `no_change`

Possible values:

- `no_change`: Use the master picture as is.
- `white_silhouette`: Turn the master picture into a white silhouette.
- `dedicated_picture`: Use a specific picture for the Windows design:

```js
windows: {
  picture_aspect: 'dedicated_picture',
  dedicated_picture: 'assets/icon_for_windows.png'
}
```

###### background_color
Type: `String`
Default: ``

The color to be used as the background of the tile.

#### settings

##### compression
Type: `Integer`
Default: `0`

The compression factor, from `0` (no compression) to `5` (highest compression).

##### scaling_algorithm
Type: `String`
Default: `Mitchell`

The scaling algorithm used to create the icons. Available algorithms:

- `Mitchell`
- `NearestNeighbor`
- `Cubic`
- `Bilinear`
- `Lanczos`
- `Spline`

### Usage Examples

```js
module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-real-favicon');

	grunt.initConfig({
		real_favicon: {
			create_my_icon: {
        src: 'http://realfavicongenerator.net/demo_favicon.png',
        dest: 'dist/path/to/icons',
        icons_path: '/path/to/icons',
        html: ['dist/index.html'],
        design: {
          ios: {
            picture_aspect: 'no_change'
          },
          windows: {
            picture_aspect: 'dedicated_picture',
            dedicated_picture: 'assets/win_icon.png',
            background_color: '#55ddff'
          }
        },
        settings: {
          compression: 3,
        }
      }
		}
	});

	grunt.registerTask('default', [ 'real_favicon' ]);
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.0.4

Fix: <code>msapplication-config</code> was not removed from the HTML. Credits: [Kevin Marsh](http://kevinmarsh.ca/).

### 0.0.3

Documentation added, API key updated.

### 0.0.2

Last minute fixes.

### 0.0.1

Initial version. At this stage, the project is just a first shot. It is too early to use it in a real web project.
