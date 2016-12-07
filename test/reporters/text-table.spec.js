describe('text-table', function() {
    var sinon = require('sinon');
    var textTable = require('../../reporters/text-table');
    it('prints table to logger', function() {
        var logger = sinon.spy();
        var time = process.hrtime();
        var entryOne = {
            task: 'test task one',
            duration: 0,
            durationFloat: 0,
            finishIndex: 0
        };
        var entryTwo = {
            task: 'test task two',
            duration: 1,
            durationFloat: 1,
            finishIndex: 1
        };
        var data = {
            startTime: time,
            totalTime: time.map(function(x){ return x + 1}),
            stats: [entryOne, entryTwo]
        };
        textTable(data, {log: logger});
        sinon.assert.called(logger);
    });
});
