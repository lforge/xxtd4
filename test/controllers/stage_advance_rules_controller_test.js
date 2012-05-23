require('../test_helper.js').controller('stage_advance_rules', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        stage_advance_rule_name: '',
        from_stage_id: '',
        from_stage_finish: '',
        winner_looser_flag: '',
        to_stage_id: '',
        event_id: '',
        unrated_plyr_advance_flag: '',
        date_created: '',
        date_updated: ''
    };
}

exports['stage_advance_rules controller'] = {

    'GET new': function (test) {
        test.get('/stage_advance_rules/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/stage_advance_rules', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = StageAdvanceRule.find;
        StageAdvanceRule.find = sinon.spy(function (id, callback) {
            callback(null, new StageAdvanceRule);
        });
        test.get('/stage_advance_rules/42/edit', function () {
            test.ok(StageAdvanceRule.find.calledWith('42'));
            StageAdvanceRule.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = StageAdvanceRule.find;
        StageAdvanceRule.find = sinon.spy(function (id, callback) {
            callback(null, new StageAdvanceRule);
        });
        test.get('/stage_advance_rules/42', function (req, res) {
            test.ok(StageAdvanceRule.find.calledWith('42'));
            StageAdvanceRule.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var stage_advance_rule = new ValidAttributes;
        var create = StageAdvanceRule.create;
        StageAdvanceRule.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, stage_advance_rule);
            callback(null, stage_advance_rule);
        });
        test.post('/stage_advance_rules', {StageAdvanceRule: stage_advance_rule}, function () {
            test.redirect('/stage_advance_rules');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var stage_advance_rule = new ValidAttributes;
        var create = StageAdvanceRule.create;
        StageAdvanceRule.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, stage_advance_rule);
            callback(new Error, stage_advance_rule);
        });
        test.post('/stage_advance_rules', {StageAdvanceRule: stage_advance_rule}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        StageAdvanceRule.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/stage_advance_rules/1', new ValidAttributes, function () {
            test.redirect('/stage_advance_rules/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        StageAdvanceRule.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/stage_advance_rules/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

