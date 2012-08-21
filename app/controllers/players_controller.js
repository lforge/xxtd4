// File Name: app/controllers/players_controller.js
// Purpose: Controller module for Player model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/13/2012 - Initial creation.
// Jude Lam        04/14/2012 - Added before(loadCountryList) call and its function.
// Jude Lam        04/21/2012 - Updated the index action to use Player_v model instead.
// Jude Lam        04/22/2012 - Updated the index() to sort the list by first_name, last_name.
// Jude Lam        04/26/2012 - Updated the index() to use railway-pagination npm module.  Also, customize 
//                              the module to accept order option.
// Jude Lam        05/16/2012 - Added the use of loadCurrentTournament in before flow.

load('application');

before(loadPlayer, {only: ['show', 'edit', 'update', 'destroy']});
before(use('loadStateList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call so that every http request will have access to the state_or_province_list object.
before(use('loadSexList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call so that every http request will have access to the sex_list object.
before(use('loadCountryList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the country_list object.
before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index', 'create', 'show', 'setDefault']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Player';
var v_form_title_p = 'Players';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.player = new Player;
    render();
});

action(function create() {
    Player.create(req.body.Player, function (err, player) {
        if (err) {
            flash('error', v_form_title_s + ' can not be created.');  // Updated to use new controller level variable.
            render('new', {
                player: player,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created.');  // Updated to use new controller level variable.
            //redirect(path_to.players());
            redirect(path_to.players); // Updated to redirect to the main object index page rather than the show page.
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    var page = req.param('page') || 1;

    Player_v.paginate({order: 'first_name, last_name', limit: 10, page: page}, function (err, players) {
       if(!err) {
        render({
            players: players
        });
       }
    });
});

action(function show() {

    this.title = 'Show ' + v_form_title_s;  // Updated to use new controller level variable.

    // Setup the anonymous callback function before calling Lookup.getLookupMeaning.
    var sexCodeMeaning = function(err, result){
      if(err) {
        flash('error', 'Cannot retrieve sex code using ' + this.player.sex_code + '.');
        this.sex_code_meaning = 'Unknown';
      } else {
        this.sex_code_meaning = result[0].meaning;
      }
      render('show', {player: this.player, sex_code_meaning: this.sex_code_meaning});
    }.bind(this); // end of defining annonymous function.

    // Call Lookup model method to retrieve Sex code meaning.
    Lookup.getLookupMeaning('SEX', this.player.sex_code, null, sexCodeMeaning);

/*
    // the following is in the application_controller.js and leave it here as an example on how to pass parameter between application_controller and model controller.
    // Assign the published function to getSexCodeMeaning variable.
    //var getSexCodeMeaning = use('getLookupMeaning');
    getSexCodeMeaning('SEX', this.player.sex_code, null, sexCodeMeaning);
*/
    //render();
    
});

/*action(function show() {
  this.title = 'Show ' + v_form_title_s;  // Updated to use new controller level variable.
  render();
});*/

action(function edit() {
    this.title = 'Edit ' + v_form_title_s;  // Updated to use new controller level variable.
    render();
});

action(function update() {
    this.player.updateAttributes(body.Player, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            //redirect(path_to.player(this.player));
            redirect(path_to.players);
        } else {
            flash('error', v_form_title_s + ' can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.player.destroy(function (error) {
        if (error) {
            flash('error', 'Can not delete player.');
        } else {
            flash('info', 'Player is successfully removed.');
        }
        send("'" + path_to.players() + "'");
    });
});

function loadPlayer() {
    Player.find(params.id, function (err, player) {
        if (err) {
            redirect(path_to.players());
        } else {
            this.player = player;
            next();
        }
    }.bind(this));
}



