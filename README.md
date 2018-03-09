[![Build Status](https://travis-ci.org/opr/formality.svg?branch=master)](https://travis-ci.org/opr/formality)

#### A note to Users looking for the deprecated serialization library Formality
The above library has been renamed, and users in search of this should go to [Surreal]( https://www.npmjs.com/package/surreal) which replaces it. 

# Installation

Type `yarn install` on the command line and let it install. If you're not part of the yarn master race feel free to type `npm install`.

If you want to become part of the yarn master race visit [https://yarnpkg.com](https://yarnpkg.com) to ascend. 

# Usage

- Edit your gulpfile, set `appUrl` to be the URL of the site you're working on. This is what browsersync will proxy to.
If you're just using the `index.html` file that comes with this, then leave it as it is.

- On the command line type `yarn run gulp` (from the root of this project) or if you've got gulp installed globally just type `gulp`.

- Connect to `http://localhost:3000` and marvel at the react hot module reloading and the css injection.

# Docs
I promise that I'll write these later
