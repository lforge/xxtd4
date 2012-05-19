// File Name: app/controllers/application_controller.js
// Purpose: Application level controller helper functions.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        03/31/2012 - Initial creation.
// Jude Lam        04/16/2012 - Moved loadxxx functions from <model>_controller.js to here.
// Jude Lam        04/21/2012 - Added the loadFacilityList function.
//                            - Added the loadUSATTStarList function.
// Jude Lam        05/08/2012 - Added the loadStageStatusList function.
// Jude Lam        05/13/2012 - Added the loadStageFormatList function.
//                            - Added the loadDrawFormatList function.
//                            - Added the loadSeedBasisList function.
//                            - Added the loadYesNoList function.
// Jude Lam        05/16/2012 - Added the loadCurrentTournament function.
//                            - Moved the loadCurrentEventsList function back to stages_controller.js file.

before('protect from forgery', function () {
    protectFromForgery('b01ad3d4b1c2c4bc37460acab9b07e039959ffae');
});

publish('loadStateList', loadStateList);
publish('loadCountryList', loadCountryList);
publish('loadSexList', loadSexList);
publish('getLookupMeaning', getLookupMeaning);
publish('loadFacilityList', loadFacilityList);
publish('loadUSATTStarList', loadUSATTStarList);
publish('loadAllTournamentList', loadAllTournamentList);
publish('loadEventTypeList', loadEventTypeList);
publish('loadEventOverUnderList', loadEventOverUnderList);
publish('loadStageStatusList', loadStageStatusList);
publish('loadStageFormatList', loadStageFormatList);
publish('loadDrawFormatList', loadDrawFormatList);
publish('loadSeedBasisList', loadSeedBasisList);
publish('loadYesNoList', loadYesNoList);
publish('loadCurrentTournament', loadCurrentTournament);

// loadStateList() will setup the JSON object for list of state.  For now, this is only working for US states.
function loadStateList() {
	Lookup.all({where: {'lookup_type':'STATE_OR_PROVINCE', 'context_code':'US'}}, function(err, lookups){
	 this.state_or_province_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadStateList() will setup the JSON object for list of state.  For now, this is only working for US states.
function loadCountryList() {
	Lookup.all({where: {'lookup_type':'COUNTRY', 'enabled_flag':'Y'}}, function(err, lookups){
	 this.country_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadSexList() will setup the JSON object for list of Sex codes.
function loadSexList() {
	Lookup.all({where: {'lookup_type':'SEX'}}, function(err, lookups){
	 this.sex_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// getLookupMeaning will get lookup meaning based on the passed lookup_type, lookup_code, lookup_context.
// This function is not used for now because this has moved to the model lookup.js file.
function getLookupMeaning(lkup_type, lkup_code, lkup_context, callback) {
    // check to see if the lkup_context value is passed, if it is, then pass along to Lookup.finaOne
    if (lkup_context == null) {
      Lookup.all({where: {'lookup_type':lkup_type, 'lookup_code':lkup_code}}, function(err, lkup_meaning){
        if(err) return callback(err);
        callback(null, lkup_meaning);
        next();
	    }.bind(this));
    } else {
      Lookup.all({where: {'lookup_type':lkup_type, 'lookup_code':lkup_code, 'context_code': lkup_context}}, function(err, lkup_meaning){
        if(err) return callback(err);
        callback(null, lkup_meaning);
        next();
	    }.bind(this));
    } // end of if (lkup_context == null) check
}

// loadFacilityList() will setup the JSON object for list of Facilities.
function loadFacilityList() {
	Facility.all(function(err, results){
	 this.facility_list = results;
   var empty_facility = new Facility();
   empty_facility.facility_name = 'Not Selected';
   empty_facility.id = "";
   this.facility_list.unshift(empty_facility);  // add the new empty Not Selected list to the top of the array.
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadUSATTStarList() will setup the JSON object for list of USATT Star Rating Code.
function loadUSATTStarList() {
	Lookup.all({where: {'lookup_type':'USATT_STAR'}}, function(err, lookups){
	 this.usatt_star_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadAllTournamentList() will retrieve all tournaments from the tournament table.
function loadAllTournamentList() {
  Tournament.all(function(err, results) {
    this.tournament_list = results;
    var empty_tournament = new Tournament();
    empty_tournament.tournament_name = 'Not Selected';
    empty_tournament.id = "";
    this.tournament_list.unshift(empty_tournament); // add the new empty Not Selected list to the top of the array.
    next(); // process the next tick.
  }.bind(this));
}

// loadEventTypeList() will setup the JSON object for list of Event Types.
function loadEventTypeList() {
	Lookup.all({where: {'lookup_type':'EVENT_TYPE'}}, function(err, lookups){
	 this.event_type_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadEventOverUnderList() will setup the JSON object for list of Event Over/Under flag.
function loadEventOverUnderList() {
	Lookup.all({where: {'lookup_type':'OVER_UNDER'}}, function(err, lookups){
	 this.event_overunder_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadStageStatusList() will setup the JSON object for list of Stage Status code.
function loadStageStatusList() {
	Lookup.all({where: {'lookup_type':'STAGE_STATUS'}}, function(err, lookups){
	 this.stage_status_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadStageFormatList() will setup the JSON object for list of Stage Format code.
function loadStageFormatList() {
	Lookup.all({where: {'lookup_type':'STAGE_FORMAT'}}, function(err, lookups){
	 this.stage_format_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadDrawFormatList() will setup the JSON object for list of Stage Format code.
function loadDrawFormatList() {
	Lookup.all({where: {'lookup_type':'DRAW_FORMAT'}}, function(err, lookups){
	 this.draw_format_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadSeedBasisList() will setup the JSON object for list of Seeding Basis code.
function loadSeedBasisList() {
	Lookup.all({where: {'lookup_type':'SEEDING_BASIS'}}, function(err, lookups){
	 this.seed_basis_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadYesNoList() will setup the JSON object for list of Yes/No code.
function loadYesNoList() {
	Lookup.all({where: {'lookup_type':'YES_NO'}}, function(err, lookups){
	 this.yes_no_list = lookups;
	 next(); // process the next tick.  If you don't put it here, it will stuck at this point.
	}.bind(this));
}

// loadCurrentTournament will retrieve the tournament that is set to be the current one.  If there is none,
// it will then set the current value to None Selected.
function loadCurrentTournament() {
  Tournament_v.findOne({where: {'current_flag': 'Y'}}, function(err, result) {
    if (result != null) {
      this.currTournamentName = result.tournament_name;
      this.currTournamentId = result.id;
      this.currNumberOfTable = result.number_of_tables;
    } else {
      this.currTournamentName = 'Not Selected';
      this.currTournamentId = -999;
    }
    next();
  }.bind(this));
}
