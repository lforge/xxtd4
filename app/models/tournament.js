// File Name: app/model/tournament.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/21/2012 - Initial creation.

// Validation declarations.
Tournament.validatesPresenceOf('tournament_name', {message: 'Tournament Name is required.  Please fill in a value for Tournament Name.'});
Tournament.validatesUniquenessOf('tournament_name', {message: 'Tournament Name must be unique.  The value that you entered is already used.  Please enter another Tournament Name.'});
Tournament.validatesPresenceOf('start_date', {message: 'Tournament Start Date is required.  Please fill in a value for Tournament Start Date.'});
Tournament.validatesPresenceOf('end_date', {message: 'Tournament End Date is required.  Please fill in a value for Tournament End Date.'});
Tournament.validatesLengthOf('tournament_name', {allowNull: false, allowBlank: false, max: 80, message: 'Tournament Name can only be 80 characters long.'});

// Using Juggling DB hooks for timestamp updates.
Tournament.beforeUpdate = updateTimeStamp;
Tournament.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};