// File Name: app/model/event.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/02/2012 - Initial creation.
// Jude Lam        05/04/2012 - Added the validation for event_type_threshold for interger only.

// Validation declarations.
Event.validatesPresenceOf('tournament_id', {message: '- You must choose a Tournament to be linked to the current event.'});
Event.validatesPresenceOf('event_name', {message: '- Event Name is required.  Please fill in a value for Event Name.'});
Event.validatesLengthOf('event_name', {allowNull: false, allowBlank: false, max: 80, message: '- Event Name can only be 80 characters long.'});
Event.validatesPresenceOf('event_type_code', {message: '- Event Type must be chosen.  Please select an appropriate Event Type.'});
Event.validatesPresenceOf('event_type_overunder_flag', {message: '- Event Over/Under Code must be chosen.  Please select an appropriate code.'});
Event.validatesPresenceOf('event_start_time', {message: '- Event Start Time is required.  Please fill in a value for Event Start Time.'});
Event.validatesPresenceOf('event_check_in_time', {message: '- Event Check-In Time is required.  Please fill in a value for Event Check-In Time.'});
Event.validatesNumericalityOf('event_type_threshold', {allowNull: true, allowBlank: true, int: true, message: '- Event Type Threshold must be an integer number.  Please make sure that you do not input decimal number.'});

// Using Juggling DB hooks for timestamp updates.
Event.beforeUpdate = updateTimeStamp;
Event.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};

