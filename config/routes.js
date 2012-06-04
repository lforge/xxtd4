// File Name: app/config/route.js
// Purpose: Main Route Configuration
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/05/2012 - Added map.get('setDefault'...) route for setting up current default tournament.
// Jude Lam        04/06/2012 - Added facilities map.
// Jude Lam        04/10/2012 - Added versions map.
// Jude Lam        04/13/2012 - Added players map.
// Jude Lam        04/21/2012 - Added tournaments map.
// Jude Lam        04/30/2012 - Added events map.
// Jude Lam        05/12/2012 - Added stages map.
// Jude Lam        05/20/2012 - Added stage_advance_rules map.
// Jude Lam        05/26/2012 - Added stage_advance_rules/buildFromStage and buildToStage route for AJAX call.
// Jude Lam        05/30/2012 - Added event_player_signups map.

exports.routes = function (map) {
    map.resources('event_player_signups');
    map.resources('stage_advance_rules');
    map.resources('stages');
    map.resources('events');
    map.resources('tournaments');
    map.resources('players');
    map.resources('versions', {only: ['index']});  // only response to the index "/versions" request.
    map.resources('facilities');
    map.get('setDefault', 'tournaments#setDefault');
    map.get('stage_advance_rules/buildFromStage/:event_id.:format?', 'stage_advance_rules#buildAjaxFromStageList');
    map.get('stage_advance_rules/buildToStage/:event_id.:format?', 'stage_advance_rules#buildAjaxToStageList');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};