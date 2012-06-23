// File Name: app/controllers/stage_draws_controller.js
// Purpose: Controller module for StageDraw_v model.  This one is only used during the Generate Draw index page.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        06/10/2012 - Initial creation.

load('application');

before(use('loadCurrentTournament'), {only: ['index']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Stage for Draw';
var v_form_title_p = 'Stages or Draw';


action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;

    StageDraws_v.paginate({where: {'tournament_id':this.currTournamentId}, order: 'tournament_name, event_start_time desc, division_code_m, stage_sequence', limit: 7, page: page}, function (err, stage_draws) {
       if(!err) {
        render({
            stage_draws: stage_draws
        });
       }
    });
});
