require('../test_helper.js').controller('facilities', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        facility_code: '',
        facility_name: '',
        number_of_tables: '',
        address1: '',
        address2: '',
        city: '',
        state_or_province: '',
        postal_code: '',
        country_code: '',
        date_created: '',
        date_updated: ''
    };
}

exports['facilities controller'] = {

    'GET new': function (test) {
        test.get('/facilities/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/facilities', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Facility.find;
        Facility.find = sinon.spy(function (id, callback) {
            callback(null, new Facility);
        });
        test.get('/facilities/42/edit', function () {
            test.ok(Facility.find.calledWith('42'));
            Facility.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Facility.find;
        Facility.find = sinon.spy(function (id, callback) {
            callback(null, new Facility);
        });
        test.get('/facilities/42', function (req, res) {
            test.ok(Facility.find.calledWith('42'));
            Facility.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var facility = new ValidAttributes;
        var create = Facility.create;
        Facility.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, facility);
            callback(null, facility);
        });
        test.post('/facilities', {Facility: facility}, function () {
            test.redirect('/facilities');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var facility = new ValidAttributes;
        var create = Facility.create;
        Facility.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, facility);
            callback(new Error, facility);
        });
        test.post('/facilities', {Facility: facility}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Facility.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/facilities/1', new ValidAttributes, function () {
            test.redirect('/facilities/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Facility.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/facilities/1', new ValidAttributes, function () {
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

