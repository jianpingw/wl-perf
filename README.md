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

@particlebanana gave an explanation for the reason of performance improvement:
https://github.com/balderdashy/sails-postgresql/pull/224

Quoted here:

Postgres and MySql return their data as flat arrays so when populating you get rows with repetitive data in certain columns.

| id    |   user  |  pet    |
|-------|---------|---------|
| 1     | sam     | fluffy  |
| 1     | sam     | scruffy |
| 1     | sam     | bubbles |

When populating, Waterline takes this and loops through the array building up nested objects along the way. This fixes an issue where it wasn't skipping records that it had already processed (i.e. sam in the chart above).




