// File Name: app/controllers/tournaments_controller.js
// Purpose: Controller for the Tournament model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/21/2012 - Initial creation.

load('application');

before(loadTournament, {only: ['show', 'edit', 'update', 'destroy']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Tournament';
var v_form_title_p = 'Tournaments';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.tournament = new Tournament;
    render();
});

action(function create() {
    Tournament.create(req.body.Tournament, function (err, tournament) {
        if (err) {
            flash('error', 'Tournament can not be created');
            render('new', {
                tournament: tournament,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created');  // Updated to use new controller level variable.
            redirect(path_to.tournaments());
        }
    });
});

action(function index() {
    this.title = 'Tournaments index';
    Tournament.all(function (err, tournaments) {
        render({
            tournaments: tournaments
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
    this.tournament.updateAttributes(body.Tournament, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated');
            redirect(path_to.tournaments);
        } else {
            flash('error', v_form_title_s + ' can not be updated');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.tournament.destroy(function (error) {
        if (error) {
            flash('error', 'Can not delete tournament');
        } else {
            flash('info', 'Tournament successfully removed');
        }
        send("'" + path_to.tournaments() + "'");
    });
});

function loadTournament() {
    Tournament.find(params.id, function (err, tournament) {
        if (err) {
            redirect(path_to.tournaments());
        } else {
            this.tournament = tournament;
            next();
        }
    }.bind(this));
}
