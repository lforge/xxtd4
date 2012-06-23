require('../test_helper.js').controller('draws', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        draw_name: '',
        draw_status_code: '',
        version: '',
        stage_id: '',
        used_in_tournament_flag: '',
        date_creted: '',
        date_updated: ''
    };
}

exports['draws controller'] = {

    'GET new': function (test) {
        test.get('/draws/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/draws', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Draw.find;
        Draw.find = sinon.spy(function (id, callback) {
            callback(null, new Draw);
        });
        test.get('/draws/42/edit', function () {
            test.ok(Draw.find.calledWith('42'));
            Draw.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Draw.find;
        Draw.find = sinon.spy(function (id, callback) {
            callback(null, new Draw);
        });
        test.get('/draws/42', function (req, res) {
            test.ok(Draw.find.calledWith('42'));
            Draw.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var draw = new ValidAttributes;
        var create = Draw.create;
        Draw.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, draw);
            callback(null, draw);
        });
        test.post('/draws', {Draw: draw}, function () {
            test.redirect('/draws');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var draw = new ValidAttributes;
        var create = Draw.create;
        Draw.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, draw);
            callback(new Error, draw);
        });
        test.post('/draws', {Draw: draw}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Draw.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/draws/1', new ValidAttributes, function () {
            test.redirect('/draws/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Draw.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/draws/1', new ValidAttributes, function () {
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

