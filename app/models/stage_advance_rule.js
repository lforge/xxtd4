// File Name: app/model/stage_advance_rule.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/20/2012 - Initial creation.

// Validation declarations.

Stage_advance_rule.validatesPresenceOf('stage_advance_rule_name', {message: '- Stage Advance Rule Name is required.  Please fill in a value for it.'});
Stage_advance_rule.validatesPresenceOf('event_id', {message: '- Event is required.  Please choose an appropriate value for it.'});
Stage_advance_rule.validatesPresenceOf('from_stage_id', {message: '- From Stage is required.  Please choose an appropriate value for it.'});
Stage_advance_rule.validatesPresenceOf('to_stage_id', {message: '- To Stage is required.  Please choose an appropriate value for it.'});

// Using Juggling DB hooks for timestamp updates.
Stage_advance_rule.beforeUpdate = updateTimeStamp;
Stage_advance_rule.beforeCreate = createTimeStamp;

function updateTimeStamp(done) {
  this.date_updated = (new Date()) - 0;
  done();
};

function createTimeStamp(done) {
  this.date_created = (new Date()) - 0;
  this.date_updated = (new Date()) - 0;
  done();
};
