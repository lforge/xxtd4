// File Name: app/controllers/events_controller.js
// Purpose: Controller module for Player model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/02/2012 - Initial creation.

load('application');

before(loadEvent, {only: ['show', 'edit', 'update', 'destroy']});
before(use('loadAllTournamentList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the tournament_list object.
before(use('loadEventTypeList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the tournament_list object.
before(use('loadEventOverUnderList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the tournament_list object.

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Event';
var v_form_title_p = 'Events';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.event = new Event;
    render();
});

action(function create() {
    Event.create(req.body.Event, function (err, event) {
        if (err) {
            flash('error', v_form_title_s + ' can not be created.');  // Updated to use new controller level variable.
            render('new', {
                event: event,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created');  // Updated to use new controller level variable.
            redirect(path_to.events());
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    Event.all(function (err, events) {
        render({
            events: events
        });
    });
});

action(function show() {
    this.title = 'Show ' + v_form_title_s;  // Updated to use new controller level variable.
    render();
});

action(function edit() {
    this.title = 'Edit ' + v_form_title_s;  // Updated to use new controller level variable.
    render();
});

action(function update() {
    this.event.updateAttributes(body.Event, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated');
            redirect(path_to.events);
        } else {
            flash('error', v_form_title_s + ' can not be updated');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.event.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy event');
        } else {
            flash('info', 'Event is successfully removed');
        }
        send("'" + path_to.events() + "'");
    });
});

function loadEvent() {
    Event.find(params.id, function (err, event) {
        if (err) {
            redirect(path_to.events());
        } else {
            this.event = event;
            next();
        }
    }.bind(this));
}
