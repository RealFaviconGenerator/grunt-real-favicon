# grunt-real-favicon

> Generate a multiplatform favicon with RealFaviconGenerator

## Getting Started
This plugin requires Grunt `~0.4.5`

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
  },
});
```

### Options

TODO

### Usage Examples

TODO

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.0.1

Initial version. At this stage, the project is just a first shot. It is too early to use it in a real web project.
