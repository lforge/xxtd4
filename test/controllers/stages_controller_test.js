require('../test_helper.js').controller('stages', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        stage_name: '',
        stage_sequence: '',
        event_id: '',
        stage_format_code: '',
        number_of_tbl_used: '',
        draw_format_code: '',
        seeding_basis_code: '',
        top_x_bye_player: '',
        grp_per_stage: '',
        player_per_grp: '',
        game_per_match: '',
        final_stag_flag: '',
        default_match_duration: '',
        stage_status_code: '',
        use_previous_results_for_draw: '',
        date_created: '',
        date_updated: ''
    };
}

exports['stages controller'] = {

    'GET new': function (test) {
        test.get('/stages/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/stages', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Stage.find;
        Stage.find = sinon.spy(function (id, callback) {
            callback(null, new Stage);
        });
        test.get('/stages/42/edit', function () {
            test.ok(Stage.find.calledWith('42'));
            Stage.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Stage.find;
        Stage.find = sinon.spy(function (id, callback) {
            callback(null, new Stage);
        });
        test.get('/stages/42', function (req, res) {
            test.ok(Stage.find.calledWith('42'));
            Stage.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var stage = new ValidAttributes;
        var create = Stage.create;
        Stage.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, stage);
            callback(null, stage);
        });
        test.post('/stages', {Stage: stage}, function () {
            test.redirect('/stages');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var stage = new ValidAttributes;
        var create = Stage.create;
        Stage.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, stage);
            callback(new Error, stage);
        });
        test.post('/stages', {Stage: stage}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Stage.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/stages/1', new ValidAttributes, function () {
            test.redirect('/stages/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Stage.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/stages/1', new ValidAttributes, function () {
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

