# grunt-targethtml

Produces html-output depending on grunt target

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-targethtml`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-targethtml');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
Configure which files to be outputted in your `initConfig`:

```javascript
grunt.initConfig({
  // ... other configs

  targethtml: {
    file: "public/index.html",
    output: {
      debug: "public/dist/debug/index.html",
      release: "public/dist/release/index.html"
    }
  }

  // ... other configs
});
```

There's no need to specify `assets/js/**/*` since the task will automatically recursively delete whatever is in that path.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
* 8/31/12 - v0.1.0 - Initial release.

## License
Copyright (c) 2012 Ruben Stolk
Licensed under the MIT license.
