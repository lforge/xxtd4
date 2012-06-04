require('../test_helper.js').controller('event_player_signups', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        player_id: '',
        event_id: '',
        player_seeding: '',
        event_rating: '',
        rating_estimate_flag: '',
        seeding_rating: '',
        date_created: '',
        date_updated: ''
    };
}

exports['event_player_signups controller'] = {

    'GET new': function (test) {
        test.get('/event_player_signups/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/event_player_signups', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = EventPlayerSignup.find;
        EventPlayerSignup.find = sinon.spy(function (id, callback) {
            callback(null, new EventPlayerSignup);
        });
        test.get('/event_player_signups/42/edit', function () {
            test.ok(EventPlayerSignup.find.calledWith('42'));
            EventPlayerSignup.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = EventPlayerSignup.find;
        EventPlayerSignup.find = sinon.spy(function (id, callback) {
            callback(null, new EventPlayerSignup);
        });
        test.get('/event_player_signups/42', function (req, res) {
            test.ok(EventPlayerSignup.find.calledWith('42'));
            EventPlayerSignup.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var event_player_signup = new ValidAttributes;
        var create = EventPlayerSignup.create;
        EventPlayerSignup.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, event_player_signup);
            callback(null, event_player_signup);
        });
        test.post('/event_player_signups', {EventPlayerSignup: event_player_signup}, function () {
            test.redirect('/event_player_signups');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var event_player_signup = new ValidAttributes;
        var create = EventPlayerSignup.create;
        EventPlayerSignup.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, event_player_signup);
            callback(new Error, event_player_signup);
        });
        test.post('/event_player_signups', {EventPlayerSignup: event_player_signup}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        EventPlayerSignup.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/event_player_signups/1', new ValidAttributes, function () {
            test.redirect('/event_player_signups/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        EventPlayerSignup.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/event_player_signups/1', new ValidAttributes, function () {
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

