// File Name: app/controllers/stage_controller.js
// Purpose: Controller module for Player model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/12/2012 - Initial creation.
// Jude Lam        05/13/2012 - Added the use of loadStageFormatList function in before flow.
//                            - Added the use of loadDrawFormatList function in before flow.
//                            - Added the use of loadSeedBasisList function in before flow.
//                            - Added the use of loadStageStatusList function in before flow.
//                            - Added the use of loadYesNoList function in before flow.
// Jude Lam        05/14/2012 - Added the use of loadStage_v function in before flow for show action.
//                            - Updated index method to use Stage_v model.
//                            - Added pagination to index page.
// Jude Lam        05/16/2012 - Added the use of loadCurrentTournament in before flow.
//                            - Moved the loadCurrentEventsList function from application_controller.js to stages_controller.js file.
// Jude Lam        05/18/2012 - Added the use of loadDivisionList function in before flow.

load('application');

before(loadStage, {only: ['show', 'edit', 'update', 'destroy']});
before(loadStage_v, {only:['show']});
before(use('loadStageFormatList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_format_list object.
before(use('loadDrawFormatList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the draw_format_list object.
before(use('loadSeedBasisList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the seed_basis_list object.
before(use('loadStageStatusList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.
before(use('loadYesNoList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.
before(loadCurrentEventsList, {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the current_event_list object.
before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index','show', 'setDefault', 'update', 'create']});
before(loadDivisionList, {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the division_list object.

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Stage';
var v_form_title_p = 'Stages';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.stage = new Stage;
    // Check to see if there is a current tournament selected via the loadCurrentTournament routine.  If there is,
    // assigned the number of table used on the facility from the tournament as a default.
    if (this.currTournamentId != -999) {
      // There is a current tournament selected.  then assign the number of tbl used and grp per stage.
      this.stage.number_of_tbl_used = this.currNumberOfTable;
      this.stage.grp_per_stage = this.currNumberOfTable;
    }
    render();
});

action(function create() {

    // Ensure the data are entered as numeric
    req.body.Stage.stage_sequence = req.body.Stage.stage_sequence - 0;
    req.body.Stage.top_x_bye_player = req.body.Stage.top_x_bye_player - 0;
    req.body.Stage.grp_per_stage = req.body.Stage.grp_per_stage - 0;
    req.body.Stage.player_per_grp = req.body.Stage.player_per_grp - 0;
    req.body.Stage.game_per_match = req.body.Stage.game_per_match - 0;
    req.body.Stage.default_match_duration = req.body.Stage.default_match_duration - 0;

    Stage.create(req.body.Stage, function (err, stage) {
        if (err) {
            flash('error', 'Stage can not be created.');
            render('new', {
                stage: stage,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created.');  // Updated to use new controller level variable.
            redirect(path_to.stages());
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;

    Stage_v.paginate({order: 'tournament_name, event_start_time desc, division_code, stage_sequence', limit: 7, page: page}, function (err, stages) {
       if(!err) {
        render({
            stages: stages
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

    // Ensure the data are entered as numeric
    body.Stage.stage_sequence = body.Stage.stage_sequence - 0;
    body.Stage.top_x_bye_player = body.Stage.top_x_bye_player - 0;
    body.Stage.grp_per_stage = body.Stage.grp_per_stage - 0;
    body.Stage.player_per_grp = body.Stage.player_per_grp - 0;
    body.Stage.game_per_match = body.Stage.game_per_match - 0;
    body.Stage.default_match_duration = body.Stage.default_match_duration - 0;

    this.stage.updateAttributes(body.Stage, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            redirect(path_to.stages);
        } else {
            flash('error', 'Stage can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.stage.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy stage.');
        } else {
            flash('info', 'Stage is successfully removed.');
        }
        send("'" + path_to.stages() + "'");
    });
});

function loadStage() {
    Stage.find(params.id, function (err, stage) {
        if (err) {
            redirect(path_to.stages());
        } else {
            this.stage = stage;
            next();
        }
    }.bind(this));
}

// loadEvent_v will load the data from the events_v view instead of the base table.
function loadStage_v() {
    Stage_v.find(params.id, function (err, stage) {
        if (err) {
            redirect(path_to.stages());
        } else {
            this.stage = stage;
            next();
        }
    }.bind(this));
}

// loadCurrentEventsList() will retrieve all events for the "Current Tournament" from the events_v view.
function loadCurrentEventsList() {
  Tournament.findOne({where: {'current_flag':'Y'}},function(err, result) {
    if(err) return err; // stop continue processing if there is any error.
    if (result != null) {
      this.tournament = result;
      // Use the tournament id to find all events.
      Event_v.all({where: {'tournament_id':this.tournament.id}}, function(err, events) {
        this.current_event_list = events;
        var empty_event = new Event_v();
        empty_event.event_name = 'Not Selected';
        empty_event.id = '';
        this.current_event_list.unshift(empty_event); // add the new empty Not Selected list to the top of the array.
        next(); // process the next tick.
      }.bind(this));
    } else {
      // Use the tournament id to find all events.
      Event_v.all({order: 'tournament_name, event_name'}, function(err, events) {
        this.current_event_list = events;
        var empty_event = new Event_v();
        empty_event.event_name = 'Not Selected';
        empty_event.id = '';
        this.current_event_list.unshift(empty_event); // add the new empty Not Selected list to the top of the array.
        next(); // process the next tick.
      }.bind(this));
    }
  }.bind(this));
}

// loadDivisionList() will setup the JSON object for list for Division code.
function loadDivisionList() {
	Lookup.all({where: {'lookup_type':'DIVISION'}, order:'lookup_code'}, function(err, lookups){
	 this.division_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}