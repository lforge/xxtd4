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

load('application');

before(loadFacility, {only: ['show', 'edit', 'update', 'destroy']});
before(use('loadStateList'), {only: ['new', 'edit']}); // Added this call so that every http request will have access to the state_or_province_list object.
before(use('loadCountryList'), {only: ['new', 'edit']}); // Added this call to create the country_list object.

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
            flash('info', v_form_title_s + ' is created');
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

//console.log('JKL body.Facility: ' + JSON.stringify(body.Facility));

    this.facility.updateAttributes(body.Facility, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated');
            //redirect(path_to.facility(this.facility));
            redirect(path_to.facilities);
        } else {
            flash('error', v_form_title_s + ' can not be updated');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.facility.destroy(function (error) {
        if (error) {
            flash('error', 'Can not delete facility');
        } else {
            flash('info', 'Facility is successfully removed');
        }
        send("'" + path_to.facilities + "'");
    });
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
