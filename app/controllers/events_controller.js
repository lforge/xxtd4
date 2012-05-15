// File Name: app/controllers/events_controller.js
// Purpose: Controller module for Player model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/02/2012 - Initial creation.
// Jude Lam        05/05/2012 - Added logic to use Event_v for index and show action.
//                            - Added logic to enforce event_type_threshold data to be numeric by subtracting itself with zero.
//                            - Added the loadEvent_v function.
//                            - Added the default of Tournament Id with current Tournament.
// Jude Lam        05/06/2012 - Updated index method to use railway-pagination.
// Jude Lam        05/08/2012 - Added the call to loadStageStatusList in the before flow.
// Jude Lam        05/14/2012 - Added the 

load('application');

before(loadEvent, {only: ['edit', 'update', 'destroy']});
before(loadEvent_v, {only: ['show']});
before(use('loadAllTournamentList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the tournament_list object.
before(use('loadEventTypeList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the event_type_list object.
before(use('loadEventOverUnderList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the event_overunder_list object.
before(use('loadStageStatusList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Event';
var v_form_title_p = 'Events';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.event = new Event;

    // Find the current Tournament Id and default it to the this.tournament_id field.
    Tournament.findOne({where: {'current_flag':'Y'}}, function(error, currentTournament) {
      if (!error) {
        if (currentTournament != null) {
          this.event.tournament_id = currentTournament.id;
          render('new');
        } else {
          // simply render the view.
          render('new');
        }
      } else {
        flash('error', 'Error in retrieving the current Tournament.');
      }
    }.bind(this)); // end of findOne.
});

action(function create() {

  // Enforce the data to be numeric here.
  req.body.Event.event_type_threshold = req.body.Event.event_type_threshold - 0;

    Event.create(req.body.Event, function (err, event) {
        if (err) {
            flash('error', v_form_title_s + ' can not be created.');  // Updated to use new controller level variable.
            render('new', {
                event: event,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created.');  // Updated to use new controller level variable.
            redirect(path_to.events());
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;

    Event_v.paginate({order: 'tournament_name, event_start_time', limit: 7, page: page}, function (err, events) {
       if(!err) {
        render({
            events: events
        });
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

    // Ensure that the body.Event.event_type_threshold is a numeric number.
    body.Event.event_type_threshold = body.Event.event_type_threshold - 0;

    this.event.updateAttributes(body.Event, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            redirect(path_to.events);
        } else {
            flash('error', v_form_title_s + ' can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
/*    this.event.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy event.');
        } else {
            flash('info', 'Event is successfully removed.');
        }
        send("'" + path_to.events() + "'");
    });
*/
  // Count to see if there is any Stage linked to the Event.  If there is, do not allow the deletion.
  Stage.count({event_id:this.event.id}, chkStageThenDelete.bind(this));
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

// loadEvent_v will load the data from the events_v view instead of the base table.
function loadEvent_v() {
    Event_v.find(params.id, function (err, event) {
        if (err) {
            redirect(path_to.events());
        } else {
            this.event = event;
            next();
        }
    }.bind(this));
}

// Define the function chkStageThenDelete to ensure that the Event is not allowed to be
// deleted if there is at least one stage that is linked to it.
function chkStageThenDelete(err, results) {
  if (err) {
    // error occurred during count.
    flash('error', 'Database Error: Cannot count the records in the stages database table using event id: ' + this.event.id + '.');
    redirect(path_to.tournaments);
  } else {
    // no error, then check to see if the count is greater than zero.  If it is, disallow the delete.  Otherwise, proceed with the delete.
    if (results > 0 ) {
      // disallow the delete because record exists in tournaments table.
      flash('error', 'There is at least one stage that is linked to the current Event: ' +
                     this.event.event_name + '. You cannot delete this record until you remove the link in Stage setup.');
	    send("'" + path_to.events + "'");
    } else {
      // perform the delete.
		  this.event.destroy(function (error) {
		     if (error) {
		       flash('error', 'Can not delete event.');
			   } else {
			     flash('info', 'Event is successfully removed.');
			   }
			   send("'" + path_to.events + "'");
			}); // end of destroy method.
    }
  } // end of if(err) check.
}