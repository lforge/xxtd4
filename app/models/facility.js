// File Name: app/model/facility.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        03/31/2012 - Initial creation.

// Validation declarations.
Facility.validatesPresenceOf('facility_code', {message: '- Facility Code is required.  Please fill in an unique code for Facility.'});
Facility.validatesUniquenessOf('facility_code', {message: '- Facility Code must be unique.  The value that you entered is already used.  Please enter another code.'});
Facility.validatesPresenceOf('facility_name', {message: '- Facility Name is required.  Please fill in a value for Facility Name.'});
Facility.validatesPresenceOf('address1', {message: '- Address1 is required.  Please fill in a value for Address1.'});
Facility.validatesPresenceOf('city', {message: '- City is required.  Please fill in a value for City.'});
Facility.validatesPresenceOf('postal_code', {message: '- Postal Code is required.  Please fill in a value for Postal Code.'});
Facility.validatesLengthOf('facility_code', {max: 5, message: '- Facility Code can only be 5 characters long.'});
Facility.validatesLengthOf('facility_name', {max: 80, message: '- Facility Name can only be 80 characters long.'});
Facility.validatesLengthOf('address1', {max: 100, message: '- Address1 can only be 100 characters long.'});
// Notice that the address2 validation will specify allowNull: true and allowBlank: true if this field can be empty.
Facility.validatesLengthOf('address2', {allowNull: true, allowBlank: true, max: 100, message: '- Address2 can only be 100 characters long.'});
Facility.validatesLengthOf('city', {max: 80, message: '- City can only be 80 characters long.'});
Facility.validatesLengthOf('postal_code', {max: 15, message: '- Postal Code can only be 15 characters long.'});

// Using Juggling DB hooks for timestamp updates.
Facility.beforeUpdate = updateTimeStamp;
Facility.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};