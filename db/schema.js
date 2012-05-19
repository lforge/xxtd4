/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

// File Name: app/db/schema.js
// Purpose: Main Model/database table definition.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/06/2012 - Initial creation with Facility model definition.
// Jude Lam        04/07/2012 - Added Lookup model definition.
// Jude Lam        04/13/2012 - Added Player model definition.
// Jude Lam        04/20/2012 - Added the Facility_v view model definition for Facility, Player, and Tournament.
// Jude Lam        04/21/2012 - Added Tournament model definition.
// Jude Lam        05/02/2012 - Added Event model definition.
// Jude Lam        05/05/2012 - Added current_flag column to Tournament and Tournament_v model.
//                            - Added Event_v model definition.
// Jude Lam        05/12/2012 - Added Stage model definition.
// Jude Lam        05/13/2012 - Added number_of_tables field to Tournament_v model.
// Jude Lam        05/14/2012 - Added Stage_v model.
// Jude Lam        05/18/2012 - Update stages and stages_v model to add division_code and division_code_m fields.

var Facility = describe('Facility', function () {
    property('facility_code', String);
    property('facility_name', String);
    property('number_of_tables', Number);
    property('address1', String);
    property('address2', String);
    property('city', String);
    property('state_or_province', String);
    property('postal_code', String);
    property('country_code', String, {default: 'US'});
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('facilities');
});

var Facility_v = describe('Facility_v', function () {
    property('facility_code', String);
    property('facility_name', String);
    property('number_of_tables', Number);
    property('address1', String);
    property('address2', String);
    property('city', String);
    property('state_or_province', String);
    property('postal_code', String);
    property('country_code', String, {default: 'US'});
    property('date_created', Number);
    property('date_updated', Number);
    property('country_code_m', String);
    setTableName('facilities_v');
});

var Lookup = describe('Lookup', function () {
    property('lookup_type', String);
    property('lookup_code', String);
    property('meaning', String);
    property('context_code', String);
    property('description', String);
    property('enabled_flag', String);
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('lookup_codes');
});

var Player = describe('Player', function () {
    property('first_name', String);
    property('last_name', String);
    property('usatt_number', String);
    property('address1', String);
    property('address2', String);
    property('city', String);
    property('state_or_province', String);
    property('postal_code', String);
    property('country_code', String, {default: 'US'});
    property('birth_date', Number);
    property('sex_code', String, {default: 'M'});
    property('usatt_rating', Number);
    property('rating_asof_date', Number);
    property('usatt_expiredate', Number);
    property('home_club', String);
    property('email', String);
    property('home_phone', String);
    property('mobile_phone', String);
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('players');
});

var Player_v = describe('Player_v', function () {
    property('first_name', String);
    property('last_name', String);
    property('usatt_number', String);
    property('address1', String);
    property('address2', String);
    property('city', String);
    property('state_or_province', String);
    property('postal_code', String);
    property('country_code', String, {default: 'US'});
    property('birth_date', Number);
    property('sex_code', String, {default: 'M'});
    property('usatt_rating', Number);
    property('rating_asof_date', Number);
    property('usatt_expiredate', Number);
    property('home_club', String);
    property('email', String);
    property('home_phone', String);
    property('mobile_phone', String);
    property('date_created', Number);
    property('date_updated', Number);
    property('sex_code_m', String);
    property('country_code_m', String);
    setTableName('players_v');
});

var Tournament = describe('Tournament', function () {
    property('tournament_name', String);
    property('start_date', Number);
    property('end_date', Number);
    property('usatt_star_rating_code', String, {default: '0' });
    property('facility_id', Number);
    property('current_flag', String, {default: 'N'});
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('tournaments');
});

var Tournament_v = describe('Tournament_v', function () {
    property('tournament_name', String);
    property('start_date', Number);
    property('end_date', Number);
    property('usatt_star_rating_code', String, {default: '0' });
    property('facility_id', Number);
    property('current_flag', String);
    property('current_flag_m', String);
    property('date_created', Number);
    property('date_updated', Number);
    property('facility_code', String);
    property('facility_name', String);
    property('facility_city', String);
    property('facility_state_or_province', String);
    property('number_of_tables', Number);
    setTableName('tournaments_v');
});

var Event = describe('Event', function () {
    property('tournament_id', Number);
    property('event_name', String);
    property('event_status_code', String, {default: 'N'});
    property('event_type_code', String, {default: 'OTHER'});
    property('event_type_cutoff_date', Number);
    property('event_type_overunder_flag', String, {default: 'N'});
    property('event_type_threshold', Number);
    property('event_start_time', Number);
    property('event_check_in_time', Number);
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('events');
});

var Event_v = describe('Event_v', function () {
    property('tournament_id', Number);
    property('event_name', String);
    property('event_status_code', String, {default: 'N'});
    property('event_type_code', String, {default: 'OTHER'});
    property('event_type_cutoff_date', Number);
    property('event_type_overunder_flag', String, {default: 'N'});
    property('event_type_threshold', Number);
    property('event_start_time', Number);
    property('event_check_in_time', Number);
    property('date_created', Number);
    property('date_updated', Number);
    property('event_type_code_m', String);
    property('event_type_overunder_flag_m', String);
    property('tournament_name', String);
    property('event_status_code_m', String);
    setTableName('events_v');
});

// Define relationships between Tournaments and Events.
Tournament.hasMany(Event, {as: 'events', foreignKey: 'tournament_id'});
Event.belongsTo(Tournament, {as: 'tournament', foreignKey: 'tournament_id'});

var Stage = describe('Stage', function () {
    property('stage_name', String);
    property('stage_sequence', Number);
    property('event_id', Number);
    property('stage_format_code', String, {default: 'RR'});
    property('division_code', String, {default: '11-A'});
    property('number_of_tbl_used', Number);
    property('draw_format_code', String, {default: 'RANDOM'});
    property('seeding_basis_code', String, {default: 'ER'});
    property('top_x_bye_player', Number, {default: '0'});
    property('grp_per_stage', Number);
    property('player_per_grp', Number);
    property('game_per_match', Number, {default: '5'});
    property('final_stage_flag', String, {default: 'N'});
    property('default_match_duration', Number, {default: '20'});
    property('stage_status_code', String, {default: 'N'});
    property('date_created', Number);
    property('date_updated', Number);
    setTableName('stages');
});

// Define relationships between Events and Stages.
Event.hasMany(Stage, {as: 'stages', foreignKey: 'event_id'});
Stage.belongsTo(Event, {as: 'event', foreignKey: 'event_id'});

var Stage_v = describe('Stage_v', function () {
    property('stage_name', String);
    property('stage_sequence', Number);
    property('event_id', Number);
    property('stage_format_code', String, {default: 'RR'});
    property('division_code', String);
    property('number_of_tbl_used', Number);
    property('draw_format_code', String, {default: 'RANDOM'});
    property('seeding_basis_code', String, {default: 'ER'});
    property('top_x_bye_player', Number, {default: '0'});
    property('grp_per_stage', Number);
    property('player_per_grp', Number);
    property('game_per_match', Number, {default: '5'});
    property('final_stage_flag', String, {default: 'N'});
    property('default_match_duration', Number, {default: '20'});
    property('stage_status_code', String, {default: 'N'});
    property('date_created', Number);
    property('date_updated', Number);
    property('tournament_name', String);
    property('event_name', String);
    property('event_start_time', Number);
    property('stage_format_code_m', String);
    property('draw_format_code_m', String);
    property('seeding_basis_code_m', String);
    property('final_stage_flag_m', String);
    property('stage_status_code_m', String);
    property('division_code_m', String);
    setTableName('stages_v');
});

