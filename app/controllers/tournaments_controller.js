// File Name: app/controllers/tournaments_controller.js
// Purpose: Controller for the Tournament model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/21/2012 - Initial creation.
// Jude Lam        05/05/2012 - Added loadTournament_v for show() action.
//                            - Added default tournament function handling such as setDefault and updateDefault actions.
//                            - Added setNewDefault function to set a new default tournament.
//                            

load('application');

before(loadTournament, {only: ['edit', 'update', 'destroy']});
before(loadTournament_v, {only: ['show']});
before(use('loadFacilityList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the facility_list object.
before(use('loadUSATTStarList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the usatt_star_list object.

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
            flash('error', 'Tournament can not be created.');
            render('new', {
                tournament: tournament,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created.');  // Updated to use new controller level variable.
            redirect(path_to.tournaments());
        }
    });
});

action(function index() {
    this.title = 'Tournaments index';
    Tournament_v.all(function (err, tournaments) {
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
            flash('info', v_form_title_s + ' is updated.');
            redirect(path_to.tournaments);
        } else {
            flash('error', v_form_title_s + ' can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.tournament.destroy(function (error) {
        if (error) {
            flash('error', 'Can not delete tournament.');
        } else {
            flash('info', 'Tournament is successfully removed.');
        }
        send("'" + path_to.tournaments() + "'");
    });
});

action('setDefault', function () {
	  this.title = 'Setting Current Default Tournament';
    Tournament_v.all(function (err, tournaments) {
        render('setdefault', {tournaments: tournaments});
    });
});

action('updateDefault', function () {
    // Call findOne to find the current default.
    Tournament.findOne({where: {'current_flag':'Y'}}, function(error, currentTournament) {
      if (!error) {
        if (currentTournament == null) {
          //There is no current tournament select.  So simply setup the new one.  This is done by 
          //first locating the record and then do an updateattribute call.
          setNewDefault();
        } else {
          // currentTournament is not null.  So set the current one to N and then
          // update the new one to Y for current_flag.
          var cur_Tournament = currentTournament;
          cur_Tournament.current_flag = 'N';
          currentTournament.updateAttributes(cur_Tournament, function(err, existingTournament) {
            if (!err) {
              // setting the new one tournament to current tournament.
              setNewDefault();
            } else {
              flash('error', 'Cannot reset existing Current Tournament.  Please contact Tournament Director Support');
            } // end of if (!err) for currentTournament is not null branch.
          });  // end of currentTournament.updateAttributes call.
        }
      } else {
        flash('error', 'Cannot retrieve current Default Tournament.  Please contact Tournament Director Support.');
      } // end of if (error)
    });  // end of Tournament.findOne.
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

// Added the loadTournament_v for show() action.
function loadTournament_v() {
    Tournament_v.find(params.id, function (err, tournament) {
        if (err) {
            redirect(path_to.tournaments());
        } else {
            this.tournament = tournament;
            next();
        }
    }.bind(this));
}

// Setup new Default Tournament using params.id value.
function setNewDefault() {
	Tournament.find(params.id, function(error, tournament) {
	  if (!error) {
	    // update the current tournament to be the current one.
	    tournament.updateAttribute('current_flag', 'Y', function(err) {
	      if (!err) {
	        // successful update, then redirect to refresh the page.
	        redirect('/setDefault');
	      } else {
	        flash('error', 'Cannot set Default Tournament to tournament: ' + tournament.name);
	      }
	    }); // end of tournament.updateAttribute
	  } else {
	    flash('error', 'Cannot setup default Tournament.');
	  }
	});  // end of Tournament.find
} // end of setNewDefault()
