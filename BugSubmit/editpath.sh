#!/bin/sh

# (Source this file)
export PATH="${PATH}:./node_modules/@angular/cli/bin"

# I will also write some notes here, since I can't use README.txt
# because this is going to a Github repository.
#
# We are using Angular 10.2.3, which is compatible with Debian Buster's
# Node.js 10.24.0. I installed it using `npm install @angular/cli@v10-lts`.
#
# I then did `ng new` which, after setting up the project in a subdirectory,
# proceeded to install all the needed packages from npm *again*, into
# node_modules in the subdirectory. Miraculously, what it re-installed was
# indeed still Angular 10.2.3. Also it has more packages for some reason,
# even though I didn't ask for anything extra in `ng new`'s wizard.
#
# I can fix the duplication by simply replacing this directory with the
# subdirectory, which has all its needed Node.js modules. I guess the way
# it was supposed to go down was, I install Angular 10.2.3 system-wide
# (rather than project-local like I did), which presumably would also install
# its dependencies system-wide. Then when I do `ng new` and it goes to fetch
# all the project packages, it would perhaps copy the already-installed
# system-wide copies.
#
# But it's still weird why they use a brute force duplication strategy,
# rather than looking at and linking to system-wide node_modules, or even
# node_modules in the parent directory.
