// File Name: app/controllers/facilities_controller.js
// Purpose: Controller module for Facility model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        03/31/2012 - Initial creation.
// Jude Lam        04/06/2012 - Added before(loadStateList) call and its function.
// Jude Lam        04/14/2012 - Added before(loadCountryList) call and its function.
// Jude Lam        04/21/2012 - Updated the index action to use Facility_v model instead.
// Jude Lam        04/22/2012 - Updated the destroy method to check for existing records in tournaments table.
// Jude Lam        05/16/2012 - Added the use of loadCurrentTournament in before flow.

load('application');

before(loadFacility, {only: ['show', 'edit', 'update', 'destroy']});
before(use('loadStateList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call so that every http request will have access to the state_or_province_list object.
before(use('loadCountryList'), {only: ['new', 'edit', 'update', 'create']}); // Added this call to create the country_list object.
before(use('loadCurrentTournament'), {only: ['new', 'edit', 'index','show', 'setDefault']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Facility';
var v_form_title_p = 'Facilities';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.facility = new Facility;
    render();
});

action(function create() {
    Facility.create(req.body.Facility, function (err, facility) {
        if (err) {
            flash('error', v_form_title_s + ' can not be created.');  // Updated to use new controller level variable.
            render('new', {	
                facility: facility,
                title: 'New ' + v_form_title_s
            });
        } else {
            flash('info', v_form_title_s + ' is created.');
            //redirect(path_to.facilities());
            redirect(path_to.facilities); // Updated to redirect to the main object index page rather than the show page.
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.

    Facility_v.all(function (err, facilities) {
        render({
            facilities: facilities
        });
    });
});

action(function show() {
    this.title = 'Show ' + v_form_title_s;  // Updated to use new controller level variable.
    render();
});

action(function edit() {
    this.title = 'Edit ' + v_form_title_s;  // Updated to use new controller level variable.
    render();
});

action(function update() {
    this.facility.updateAttributes(body.Facility, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            //redirect(path_to.facility(this.facility));
            redirect(path_to.facilities);
        } else {
            flash('error', v_form_title_s + ' can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {

    // Check to see if there is any record in the Tournament table.  If there is any,
    // disallow the delete.
    Tournament.count({facility_id:this.facility.id}, chkFacilityThenDelete.bind(this)); // End of Tournament.count call.
});

function loadFacility() {
    Facility.find(params.id, function (err, facility) {
        if (err) {
            redirect(path_to.facilities);
        } else {
            this.facility = facility;
            next();
        }
    }.bind(this));
}

// Define the function chkFacilityThenDelete to ensure that the Facility is not allowed to be
// deleted if there is at least one tournament that is linked to it.
function chkFacilityThenDelete(err, results) {
  if (err) {
    // error occurred during count.
    flash('error', 'Database Error: Cannot count the facility id: ' + this.facility.id + ' in the tournaments database table.');
    redirect(path_to.facilities);
  } else {
    // no error, then check to see if the count is greater than zero.  If it is, disallow the delete.  Otherwise, proceed with the delete.
    if (results > 0 ) {
      // disallow the delete because record exists in tournaments table.
      flash('error', 'There is at least one record in Tournament setup that is linked to the facility ' +
                     this.facility.facility_name + '. You cannot delete this record until you remove the link in Tournament setup.');
	    send("'" + path_to.facilities + "'");
    } else {
      // perform the delete.
		  this.facility.destroy(function (error) {
		     if (error) {
		       flash('error', 'Can not delete facility.');
			   } else {
			     flash('info', 'Facility is successfully removed.');
			   }
			   send("'" + path_to.facilities + "'");
			}); // end of destroy method.
    }
  } // end of if(err) check.
}
