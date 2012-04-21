// File Name: app/model/player.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        03/31/2012 - Initial creation.

// Validation declarations.
Player.validatesPresenceOf('first_name', {message: 'First Name is required.  Please fill in a value for First Name.'});
Player.validatesPresenceOf('last_name', {message: 'Last Name is required.  Please fill in a value for Last Name.'});
Player.validatesPresenceOf('sex_code', {message: 'Sex is required.  Please fill in a value for Sex.'});
Player.validatesPresenceOf('address1', {message: 'Address1 is required.  Please fill in a value for Address1.'});
Player.validatesPresenceOf('city', {message: 'City is required.  Please fill in a value for City.'});
Player.validatesPresenceOf('postal_code', {message: 'Postal Code is required.  Please fill in a value for Postal Code.'});
Player.validatesLengthOf('address1', {max: 100, message: 'Address1 can only be 100 characters long.'});
// Notice that the address2 validation will specify allowNull: true and allowBlank: true if this field can be empty.
Player.validatesLengthOf('address2', {allowNull: true, allowBlank: true, max: 100, message: 'Address2 can only be 100 characters long.'});
Player.validatesLengthOf('city', {max: 80, message: 'City can only be 80 characters long.'});
Player.validatesLengthOf('postal_code', {max: 15, message: 'Postal Code can only be 15 characters long.'});


// Using Juggling DB hooks for timestamp updates.
Player.beforeUpdate = updateTimeStamp;
Player.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};