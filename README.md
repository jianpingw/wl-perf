# wl-perf

A [Sails](http://sailsjs.org) application to test Waterline performance of populating associations.

In connection.js, make sure to enter your database host, user, password etc. The current configuation is for Postgresql, but it should be easy to change it to MySQL.

## Run the test

1. Start the SailsJS server: `node app.js`
2. Open another terminal window, run the mocha test cases: `mocha --debug test/MessagePerf.test.js`

## Performance history

### sails-postgresql 0.11.0
The `find messages` test case takes about 3 seconds on a Core i3-3110M (2.4GHz) HP laptop (the database has zero row before running the test case).

### sails-postgresql 0.11.0 with [PR#224](https://github.com/balderdashy/sails-mysql/pull/274)
The `find messages` test case takes about 200ms on a Core i3-3110M (2.4GHz) HP laptop (the database has zero row before running the test case).



