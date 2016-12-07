'use strict';

module.exports = function(gulp, reporter) {

    var reporter = typeof reporter !== 'undefined' ? reporter : require('./reporters/text-table');

    var tableData, startTime;

    function reset() {
        tableData = null;
        startTime = null;
    }

    reset();

    gulp.on('task_start', function () {
        if (tableData === null) {
            tableData = [];
        }
        if (startTime === null) {
            startTime = process.hrtime();
        }
    });

    gulp.on('task_stop', function (e) {
        // Build entry
        var entry = {
            finishIndex:    tableData.length,
            task:           e.task,
            duration:       e.hrDuration,
            durationFloat:  e.duration,
        };

        // Add to table
        tableData.push(entry);
    });

    gulp.on('stop', function () {
        var totalTime = process.hrtime(startTime);

        reporter({startTime: startTime, totalTime: totalTime, stats: tableData});

        reset();
    });

};
