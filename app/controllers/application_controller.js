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

before('protect from forgery', function () {
    protectFromForgery('b01ad3d4b1c2c4bc37460acab9b07e039959ffae');
});

publish('loadStateList', loadStateList);
publish('loadCountryList', loadCountryList);
publish('loadSexList', loadSexList);
publish('getLookupMeaning', getLookupMeaning);
publish('loadFacilityList', loadFacilityList);
publish('loadUSATTStarList', loadUSATTStarList);


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