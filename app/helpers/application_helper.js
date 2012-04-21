// File Name: application_helper.js
// Purpose: Application wide helper module.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/06/2012 - Initial creation.
// Jude Lam        04/13/2012 - Added xxtd_display_footer function.
// Jude Lam        04/14/2012 - Bug fix to change the xxtd_createDropDown function f_list.length > 1 to > 0.

module.exports = {
  // xxtd_createDropDown will expect an element named "lookup_code" and "meaning" in the f_list object.
  // parameter: 
  // fname = model.field_name
  // resource = the model instance itself.
  // f_list = object that contain a list with "lookup_code" and "meaning" values.
  // current_code = current value that is selected.  If this value is null, then no select = "selected" is generated.
  xxtd_createDropDown: function(fname, resource, f_list, current_code) {
    var selectTag = '';
    var f_id = resource.constructor.modelName + '_' + fname;
    var f_name = resource.constructor.modelName + '[' + fname + ']';

    // Only do something when there is value in the f_list.
    if (f_list.length > 0) {
      // Setup the opening tag for select.
      selectTag = '<select id="' + f_id + '" name="' + f_name + '" size="1">';

      f_list.forEach(function(f_list_entry) {

        // Setup the option tag with selected = specified.
        selectTag = selectTag + '<option value = "' + f_list_entry.lookup_code + '" ';
        if ((current_code != null) && (current_code == f_list_entry.lookup_code)) {
          selectTag = selectTag + 'selected = "selected"';
        }

        // close the bracket.
        selectTag = selectTag + '>' + f_list_entry.meaning + '</option>';
      });  // End of forEach loop.

      // close out the select tag
      selectTag = selectTag + '</select>';

    }  // end of if f_list.length > 1 check.

    return selectTag;
  } // End of xxtd_createDropDown:

  //xxtd_DisplayFooter will simply display a hardcoded footer text in html format.
 ,xxtd_DisplayFooter: function() {
    return 'Tournament Director &copy; LForge, LLC 2012';
  } // end of xxtd_display_footer.

  //xxtd_UtcToHumanDate will convert raw_date in Unix UTC format to human readable format.
  // for now, this is hardcoded with mm/dd/yyyy format.
 ,xxtd_UtcToHumanDate: function(raw_date) {
    if ((raw_date == null) || (raw_date == '')) {
      return '';
    } else {
      // the data needs to be converted.
      var dummy_date = new Date(raw_date);
      var yyyy = dummy_date.getFullYear();
      var mm = dummy_date.getMonth()+1;
      var dd = dummy_date.getDate();
      if (mm < 10) { mm = '0'+ mm; } // add leading zero for month if the month is a single digit.
      if (dd < 10) { dd = '0' + dd; } // add leading zero for day if the day is a single digit.
      return ''+mm+'/'+dd+'/'+yyyy;
    }
  } // end of xxtd_utc_to_human_date
};