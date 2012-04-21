// File Name: app/model/lookup.js
// Purpose: Model definition for validation and other model level methods.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/15/2012 - Initial creation.


// Function: getLookupMeaning will retrieve the meaning from the lookup_codes table.
// @param:
// lkup_type = Lookup_type, e.g. COUNTRY
// lkup_code = Lookup_code, e.g. US
// lkup_context = Lookup_context, e.g. US
// callback = callback function.

Lookup.getLookupMeaning = function(lkup_type, lkup_code, lkup_context, callback) {
    // check to see if the lkup_context value is passed, if it is, then pass along to Lookup.finaOne
    if (lkup_context == null) {
      Lookup.all({where: {'lookup_type':lkup_type, 'lookup_code':lkup_code}}, function(err, lkup_meaning){
        if (err) return callback(err);
        callback(null, lkup_meaning);
	    });
    } else {
      Lookup.all({where: {'lookup_type':lkup_type, 'lookup_code':lkup_code, 'context_code': lkup_context}}, function(err, lkup_meaning){
        if (err) return callback(err);
        callback(null, lkup_meaning);
	    });
    } // end of if (lkup_context == null) check
};