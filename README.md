# twitter-herpderp

Inspired by [irssi-herpderp][1], this is a port of the same
functionality to Twitter.  A brief proof-of-concept exists in the
proof-of-concept directory; what else has been committed so far is an
attempt to make it a bit less hacky, and to learn about
grunt/Javascript build tooling in the process.

[1]: https://github.com/ticklemynausea/irssi-herpderp

## Requirements

You can give it a go immediately by opening the proof-of-concept's
manifest.json as a Chrome extension.  Just clone the repository, edit
the herpderp.js to choose who you want derped, and you're done.

If you want to do any development, you'll need:

 * npm
 * grunt
 * grunt-jasmine-runner
 * requirejs

With those installed, you should be able to run `grunt jasmine-server`
to fire up a local test instance, and check the specs pass.

Currently, the build process to go from specs -> actual packaged
extension doesn't exist, but we'll get there.
