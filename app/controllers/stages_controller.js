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

load('application');

before(loadStage, {only: ['show', 'edit', 'update', 'destroy']});
before(loadStage_v, {only:['show']});
before(use('loadStageFormatList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_format_list object.
before(use('loadDrawFormatList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the draw_format_list object.
before(use('loadSeedBasisList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the seed_basis_list object.
before(use('loadStageStatusList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.
before(use('loadYesNoList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.
before(use('loadCurrentEventsList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the current_event_list object.

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Stage';
var v_form_title_p = 'Stages';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.stage = new Stage;
    // Retrieve number of table used default from current Tournament's facility.
    // Have tried to do this in afterInitialize hook in the stage.js model file.  But "this" is not
    // updated properly.
    Tournament_v.findOne({where: {'current_flag':'Y'}}, function(err, tournaments){
      if(err) return err;
	    this.stage.number_of_tbl_used = tournaments.number_of_tables;
      this.stage.grp_per_stage = tournaments.number_of_tables;
      render();
	  }.bind(this));
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

    Stage_v.paginate({order: 'tournament_name, event_start_time desc, stage_sequence', limit: 7, page: page}, function (err, stages) {
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