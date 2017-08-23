# grunt-real-favicon

Generate a multiplatform favicon with [RealFaviconGenerator](http://realfavicongenerator.net/).

## Getting Started

So you want to use this plugin? Don't write any code. Instead:

- Go to [RealFaviconGenerator](http://realfavicongenerator.net/favicon/grunt), submit your original image and craft your icons:

![RealFaviconGenerator's favicon editor](https://cloud.githubusercontent.com/assets/423852/11236405/b08079a2-8dd9-11e5-8d42-c49943fd1e1f.png)

- On the result page, click the Grunt tab. Follow the instructions to setup your favicon in your Grunt project:

![Result page, Grunt tab](https://cloud.githubusercontent.com/assets/423852/11236407/b4408e74-8dd9-11e5-861d-a2be47b7dce2.png)

Et voilà! Your favicon is up and ready.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### 0.2.2

- Fix for incompatible change in latest rfg-api, see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/41

### 0.2.1

- Use the latest rfg-api, see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/40

### 0.1.7

- Fix in HTML globbing, see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/30

### 0.1.6

- Update peerDependencies to support Grunt 1.0.

### 0.1.5

- Documentation update: link to the dedicated Grunt page.

### 0.1.4

- Print HTML file name as a debug message, see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/19

### 0.1.3

- Better error reporting (use `--debug` to print the RFG API request).

### 0.1.2

- Multi-task is now `realFavicon` (`real_favicon` is deprecated).

### 0.1.1

- Use latest version of `rfg-api`.

### 0.1.0

- The plugin now uses [rfg-api](https://github.com/RealFaviconGenerator/rfg-api).
- Configuration refactored to use an `options` section,
see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/7
- Documentation and test cases now takes `desktop_browser` into account,
see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/14
- Options now use camelcase,
see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/5
- Generated HTML can be dumped to particular file so it can be used later,
see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/6
- Fix a bug when the `html` parameter is not defined,
see https://github.com/RealFaviconGenerator/grunt-real-favicon/issues/3

### 0.0.4

Fix: <code>msapplication-config</code> was not removed from the HTML. Credits: [Kevin Marsh](http://kevinmarsh.ca/).

### 0.0.3

Documentation added, API key updated.

### 0.0.2

Last minute fixes.

### 0.0.1

Initial version. At this stage, the project is just a first shot. It is too early to use it in a real web project.
