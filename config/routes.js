exports.routes = function (map) {
    map.resources('tournaments');
    map.resources('players');
    map.resources('versions', {only: ['index']});  // only response to the index "/versions" request.
    map.resources('facilities');



    // Generic routes. Add all your routes below this line
    // feel free to remove generic routes
    map.all(':controller/:action');
    map.all(':controller/:action/:id');
};