// File Name: app/model/event_player_signup.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/30/2012 - Initial creation.


// Validation declarations.
Event_player_signup.validatesPresenceOf('event_id', {message: '- Event is required.  Please choose an appropriate value for it.'});
Event_player_signup.validatesPresenceOf('player_id', {message: '- Player is required.  Please fill in a value for it.'});
Event_player_signup.validatesPresenceOf('rating_estimate_flag', {message: '- Rating Estimate is required.  Please choose an appropriate value for it.'});
Event_player_signup.validatesPresenceOf('event_rating', {message: '- Event Rating is required.  Please enter an appropriate value for it.'});
Event_player_signup.validatesNumericalityOf('event_rating', {allowNull: false, allowBlank: false, int: true, message: '- Event Rating must be an integer number.  Please make sure that you do not input decimal number.'});
Event_player_signup.validatesPresenceOf('seeding_rating', {message: '- Seeding Rating is required.  Please enter an appropriate value for it.  If you are not sure, use the Event Rating.'});
Event_player_signup.validatesNumericalityOf('seeding_rating', {allowNull: false, allowBlank: false, int: true, message: '- Seeding Rating must be an integer number.  Please make sure that you do not input decimal number.'});

// Using Juggling DB hooks for timestamp updates.
Event_player_signup.beforeUpdate = updateTimeStamp;
Event_player_signup.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};
