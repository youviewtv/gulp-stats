'use strict';
describe('gulp-stats', function() {
    var events = require('events');
    var sinon = require('sinon');
    beforeEach(function() {
        this.gulpInstance = new events.EventEmitter();
    });
    describe('stats', function() {
        beforeEach(function() {
            this.reporter = sinon.spy();
            require('../index')(this.gulpInstance, this.reporter);
        });
        it('reporter called when gulp stops', function() {
            this.gulpInstance.emit('task_start');
            this.gulpInstance.emit('task_stop', {task: 'test-task'});
            this.gulpInstance.emit('stop');
            sinon.assert.called(this.reporter);
        });
    });
});
