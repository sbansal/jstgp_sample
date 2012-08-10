jstgp_sample
============

A sample project to work with JavaScript: The Good Parts

getting your environment set up
-------------------------------

### Mac OS Users ###

If you don't have HomeBrew, install it: http://mxcl.github.com/homebrew/

Basic steps at: http://shapeshed.com/setting-up-nodejs-and-npm-on-mac-osx/

    brew update
    brew upgrade
    brew install node
    curl http://npmjs.org/install.sh | sh  # We promise it won't hurt your machine.  ;-)

Set NODE_PATH=$HOME/node_modules in your .bash_profile

Install required libraries for the project (from your home directory):

    npm install express stylus ejs vows

### Linux Users ###

There is a node.js PPA here: https://launchpad.net/~chris-lea/+archive/node.js/

Then follow all the rest of the steps from Mac OS Users

required libraries
------------------
express
stylus
ejs
vows

our project libraries
---------------------
node-uuid