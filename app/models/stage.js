// File Name: app/model/stage.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/12/2012 - Initial creation.

// Validation declarations.

Stage.validatesPresenceOf('stage_name', {message: '- Stage Name is required.  Please fill in a value for Stage Name.'});
Stage.validatesLengthOf('stage_name', {allowNull: false, allowBlank: false, max: 80, message: '- Stage Name can only be 80 characters long.'});
Stage.validatesPresenceOf('stage_sequence', {message: '- Stage Sequence is required.  Please fill in a value for Stage Sequence.'});
Stage.validatesNumericalityOf('stage_sequence', {allowNull: false, allowBlank: false, int: true, message: '- Stage Sequence must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('event_id', {message: '- You must choose an event to be linked to the current stage.'});
Stage.validatesPresenceOf('stage_format_code', {message: '- Stage Format must be chosen.  Please select an appropriate Stage Format.'});
Stage.validatesPresenceOf('number_of_tbl_used', {message: '- Number of Table is required.  Please fill in a value for Number of Table.'});
Stage.validatesPresenceOf('draw_format_code', {message: '- Draw Format must be chosen.  Please select an appropriate Draw Format.'});
Stage.validatesPresenceOf('seeding_basis_code', {message: '- Seeding Basis must be chosen.  Please select an appropriate Seeding Basis.'});
Stage.validatesPresenceOf('top_x_bye_player', {message: '- Number of Bye Players must be chosen.  Please select an appropriate Number of Bye Players.'});
Stage.validatesNumericalityOf('top_x_bye_player', {allowNull: false, allowBlank: false, int: true, message: '- Number of Bye Players must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('grp_per_stage', {message: '- Group per Stage is required.  Please fill in a value for Group per Stage.'});
Stage.validatesNumericalityOf('grp_per_stage', {allowNull: false, allowBlank: false, int: true, message: '- Group per Stage must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('player_per_grp', {message: '- Player per Group is required.  Please fill in a value for Player per Group.'});
Stage.validatesNumericalityOf('player_per_grp', {allowNull: false, allowBlank: false, int: true, message: '- Player per Group must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('game_per_match', {message: '- Game per Match is required.  Please fill in a value for Game per Match.'});
Stage.validatesNumericalityOf('game_per_match', {allowNull: false, allowBlank: false, int: true, message: '- Game per Match must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('default_match_duration', {message: '- Default Match Duration is required.  Please fill in a value for Default Match Duration.'});
Stage.validatesNumericalityOf('default_match_duration', {allowNull: false, allowBlank: false, int: true, message: '- Default Match Duration must be an integer number.  Please make sure that you do not input decimal number.'});
Stage.validatesPresenceOf('stage_status_code', {message: '- Stage Status is required.  Please fill in a value for Stage Status.'});

// Using Juggling DB hooks for timestamp updates.
Stage.beforeUpdate = updateTimeStamp;
Stage.beforeCreate = createTimeStamp;
//Stage.afterInitialize = stageInitialize;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};

// Notice that the stageInitialize() does not call the done().  This is the only exception.
//function stageInitialize() {
//
//};
