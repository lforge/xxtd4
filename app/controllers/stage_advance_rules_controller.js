// File Name: app/controllers/stage_advance_rules_controller.js
// Purpose: Controller module for Player model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/20/2012 - Initial creation.
//                            - Added loadYesNoList function call in before flow.
//                            - Added loadCurrentTournament function call in before flow.
//                            - Added loadCurrentEventsList function call in before flow.
//                            - Added loadWinnerLooserList function call in before flow.
//                            - Added loadStageAdvanceRule_v function call in before flow.
//                            - Added loadTopXFinishList function call in before flow.
// Jude Lam        05/21/2012 - Added loadFromStageFinishList function call in before flow.

load('application');

before(loadStageAdvanceRule, {only: ['edit', 'update', 'destroy']});
before(loadStageAdvanceRule_v, {only: ['show']});
before(use('loadYesNoList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the stage_status_list object.
before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index','show', 'setDefault', 'update', 'create']});
before(use('loadCurrentEventsList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the current_event_list object.
before(loadWinnerLooserList, {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the winner_looser_list object.
before(loadTopXFinishList, {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the top_x_finish_list object.
before(loadFromStageFinishList, {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the from_stage_finish_list object.


// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Stage Advance Rule';
var v_form_title_p = 'Stage Advance Rules';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.stage_advance_rule = new Stage_advance_rule;
    render();
});

action(function create() {
    Stage_advance_rule.create(req.body.Stage_advance_rule, function (err, stage_advance_rule) {
        if (err) {
            flash('error', 'Stage Advance Rule can not be created.');
            render('new', {
                stage_advance_rule: stage_advance_rule,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', 'Stage Advance Rule is created.');
            redirect(path_to.stage_advance_rules());
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;

    Stage_advance_rule_v.paginate({where: {'tournament_id':this.currTournamentId}, order: 'event_name, event_start_time desc, from_stage_sequence, to_stage_sequence, to_div_code', limit: 7, page: page}, function (err, stage_advance_rules) {
      if(!err) {
        render({stage_advance_rules: stage_advance_rules});
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
    this.stage_advance_rule.updateAttributes(body.StageAdvanceRule, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            redirect(path_to.stage_advance_rules());
        } else {
            flash('error', 'Stage Advance Rule can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.stage_advance_rule.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy Stage Advance Rule.');
        } else {
            flash('info', 'Stage Advance Rule is successfully removed.');
        }
        send("'" + path_to.stage_advance_rules() + "'");
    });
});

function loadStageAdvanceRule() {
    Stage_advance_rule.find(params.id, function (err, stage_advance_rule) {
        if (err) {
            redirect(path_to.stage_advance_rules());
        } else {
            this.stage_advance_rule = stage_advance_rule;
            next();
        }
    }.bind(this));
}

// loadWinnerLooserList() will setup the JSON object for list of Winner Looser code.
function loadWinnerLooserList() {
	Lookup.all({where: {'lookup_type':'WINNER_LOOSER'}}, function(err, lookups){
	 this.winner_looser_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

function loadStageAdvanceRule_v() {
    Stage_advance_rule_v.find(params.id, function (err, stage_advance_rule) {
        if (err) {
            redirect(path_to.stage_advance_rules());
        } else {
            this.stage_advance_rule = stage_advance_rule;
            next();
        }
    }.bind(this));
}

// loadTopXFinishList() will setup the JSON object for list of Winner Looser code.
function loadTopXFinishList() {
	Lookup.all({where: {'lookup_type':'TOP_X_FINISH'}}, function(err, lookups){
	 this.top_x_finish_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadFromStageFinishList() will setup the JSON object for list of Winner Looser code.
function loadFromStageFinishList() {
	Lookup.all({where: {'lookup_type':'FROM_STAGE_FINISH'}}, function(err, lookups){
	 this.from_stage_finish_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}
