// File Name: app/controllers/event_player_signups_controller.js
// Purpose: Controller module for Event Player Signups model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/30/2012 - Initial creation.
// Jude Lam        06/03/2012 - Updated index action to use _v view and pagination routine.
//                            - Updated show action to use _v view and added loadEventPlayerSignup_v function.

load('application');

before(loadEventPlayerSignup, {only: ['edit', 'update', 'destroy']});
before(loadEventPlayerSignup_v, {only: ['show']});
before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index','show', 'update', 'create']});
before(use('loadCurrentEventsList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the current_event_list object.
before(use('loadYesNoList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the yes_no_list object.
before(use('loadPlayerList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the player_list object.


// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Event Player Signup';
var v_form_title_p = 'Event Player Signups';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.event_player_signup = new Event_player_signup;
    render();
});

action(function create() {
    // Ensure the data are entered as numeric

    if(req.body.Event_player_signup.event_rating != "") {req.body.Event_player_signup.event_rating = req.body.Event_player_signup.event_rating - 0;}
    if(req.body.Event_player_signup.seeding_rating != "") {req.body.Event_player_signup.seeding_rating = req.body.Event_player_signup.seeding_rating - 0;}

    Event_player_signup.create(req.body.Event_player_signup, function (err, event_player_signup) {
        if (err) {
            flash('error', 'Event Player Signup record can not be created.');
            render('new', {
                event_player_signup: event_player_signup,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', 'Event Player Signup record is created.');
            redirect(path_to.event_player_signups());
        }
    });
});

action(function index() {

    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;
    Event_player_signup_v.paginate({where: {'tournament_id':this.currTournamentId}, order: 'event_name, event_start_time desc, last_name', limit: 7, page: page}, function (err, event_player_signups) {
      if(!err) {
        render({event_player_signups: event_player_signups});
      }
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

    // Ensure the data are entered as numeric
    if(body.Event_player_signup.event_rating != "") {body.Event_player_signup.event_rating = body.Event_player_signup.event_rating - 0;}
    if(body.Event_player_signup.seeding_rating != "") {body.Event_player_signup.seeding_rating = body.Event_player_signup.seeding_rating - 0;}

    this.event_player_signup.updateAttributes(body.Event_player_signup, function (err) {
        if (!err) {
            flash('info', 'Event Player Signup record is updated.');
            redirect(path_to.event_player_signups());
        } else {
            flash('error', 'Event Player Signup record can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.event_player_signup.destroy(function (error) {
        if (error) {
            flash('error', 'Can not delete Event Player Signup record.');
        } else {
            flash('info', 'Event Player Signup record is successfully removed.');
        }
        send("'" + path_to.event_player_signups() + "'");
    });
});

function loadEventPlayerSignup() {
    Event_player_signup.find(params.id, function (err, event_player_signup) {
        if (err) {
            redirect(path_to.event_player_signups());
        } else {
            this.event_player_signup = event_player_signup;
            next();
        }
    }.bind(this));
}

function loadEventPlayerSignup_v() {
    Event_player_signup_v.find(params.id, function (err, event_player_signup) {
        if (err) {
            redirect(path_to.event_player_signups());
        } else {
            this.event_player_signup = event_player_signup;
            next();
        }
    }.bind(this));
}
