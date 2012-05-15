// File Name: app/config/route.js
// Purpose: Main Route Configuration
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        05/05/2012 - Added map.get('setDefault'...) route for setting up current default tournament.

exports.routes = function (map) {
    map.resources('stages');
    map.resources('events');
    map.resources('tournaments');
    map.resources('players');
    map.resources('versions', {only: ['index']});  // only response to the index "/versions" request.
    map.resources('facilities');
    map.get('setDefault', 'tournaments#setDefault');

    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};