// File Name: app/controllers/stage_draws_controller.js
// Purpose: Controller module for StageDraw_v model.  This one is only used during the Generate Draw index page.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        06/10/2012 - Initial creation.

load('application');

before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index','show', 'update', 'create']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Stage for Draw';
var v_form_title_p = 'Stages or Draw';

action(function index() {

    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;
    StageDraws_v.paginate({where: {'tournament_id':this.currTournamentId}, order: 'tournament_name, event_start_time desc, division_code_m, stage_sequence', limit: 7, page: page}, function (err, stage_draws) {

      if(!err) {

        var stage_draws_count = stage_draws.length;

console.log('JKL: initial stage_draws_count: ' + stage_draws_count);

        for (var i = 0; i < stage_draws.length; i ++) {

         // adding the generate_ready property to the stage_draws object.
         stage_draws[i].generate_ready = 'N';

         Stage.count({event_id : stage_draws[i].event_id, stage_sequence : {'lt': stage_draws[i].stage_sequence}}, function(err, stage_count) {

console.log('JKL: inside stage.count for id: ' + this.id + 'count: ' + stage_count + ' stage_status_code: ' + this.stage_status_code);

           if (stage_count == 0 || this.stage_status_code == 'F') {

             this.generate_ready = 'Y';

console.log('JKL: setting this.generate_ready to Y for id: ' + this.id + ' this.generate_ready: ' + this.generate_ready );

             } // end of if (stage_count)

         }.bind(stage_draws[i]));
//         }).bind(stage_draws[i]);


        check_done();

        } // end of for loop

       function check_done() {
//console.log('JKL: stage_draws_count when check_done is called: ' + stage_draws_count + ' stage_draw[i].generate_flag: ' + stage_draws[i].generate_ready);

         // decrease stage_draws_count to keep track of how many record has been processed.
         stage_draws_count = stage_draws_count - 1;

         if (stage_draws_count === 0) {
//console.log('JKL: render call for stage_draws: ' + JSON.stringify(stage_draws));

		       render({stage_draws: stage_draws});
         } // end of stage_draws_count == 0

       } // end of check_done function.

      } // end of (!err)

    })// end of paginate

}); // End of action

