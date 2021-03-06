// File Name: application_helper.js
// Purpose: Application wide helper module.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/06/2012 - Initial creation.
// Jude Lam        04/13/2012 - Added xxtd_display_footer function.
// Jude Lam        04/14/2012 - Bug fix to change the xxtd_createDropDown function f_list.length > 1 to > 0.
// Jude Lam        04/21/2012 - Updated xxtd_createDropDown to add fid, meaning_name, code_name parameter to 
//                              make it more generalized instead of just for lookup_codes process.
//                            - Removed the check for current_code != null check for the selected = selected option.
// Jude Lam        04/22/2012 - Added the xxtd_USPhoneNum function to convert raw phone number such as 1112223333 to (111) 222-3333.
// Jude Lam        05/04/2012 - Updated xxtd_UtcToHumanDate function to add show_time parameter and the related logic.
//

module.exports = {
  // xxtd_createDropDown will generate a HTML drop down select list HTML tag. If the value in the current_code matches
  // the one in f_list_entry[code_name], it will also flag the value to be selected.
  // parameter:
  // fid = id attribute of the select tag, e.g. for Player.country_code attribute, this should be "Player_country_code".
  // fname = name attribute of the select tag, e.g. for Player.country_code attribute, this should be "Player[country_code]"
  // f_list = object that contain a list with "lookup_code" and "meaning" values.
  // current_code = current value that is selected.  If this value is null, then no select = "selected" is generated.
  // meaning_name = the column name of the f_list that contains the display value, e.g. for lookup_codes table list, this will be "meaning".
  // code_name = the column name of the f_list that contains the internal code, e.g. for lookup_codes table list, this will be "lookup_code".
  xxtd_createDropDown: function(fid, fname, f_list, current_code, meaning_name, code_name) {
    var selectTag = '';
    var f_id = fid;
    var f_name = fname;

    // Only do something when there is value in the f_list.
    if (f_list.length > 0) {
      // Setup the opening tag for select.
      selectTag = '<select id="' + f_id + '" name="' + f_name + '" size="1">';

      f_list.forEach(function(f_list_entry) {

        // Setup the option tag with selected = specified.
        selectTag = selectTag + '<option value = "' + f_list_entry[code_name] + '" ';

        if (current_code == f_list_entry[code_name]) {
          selectTag = selectTag + 'selected = "selected"';
        }

        // close the bracket.
        selectTag = selectTag + '>' + f_list_entry[meaning_name] + '</option>';
      });  // End of forEach loop.

      // close out the select tag
      selectTag = selectTag + '</select>';

    }  // end of if f_list.length > 1 check.

    return selectTag;
  } // End of xxtd_createDropDown:

  //xxtd_DisplayFooter will simply display a hardcoded footer text in html format.
 ,xxtd_DisplayFooter: function() {
    return 'Tournament Director &copy; Jude Lam 2012';
  } // end of xxtd_display_footer.

  //xxtd_UtcToHumanDate will convert raw_date in Unix UTC format to human readable format.
  // for now, this is hardcoded with mm/dd/yyyy format.
 ,xxtd_UtcToHumanDate: function(raw_date, show_time) {
    if ((raw_date == null) || (raw_date == '')) {
      return '';
    } else {
      // the data needs to be converted.
      var dummy_date = new Date(raw_date);
      var yyyy = dummy_date.getFullYear();
      var mm = dummy_date.getMonth()+1;
      var dd = dummy_date.getDate();
      var hh = dummy_date.getHours();
      var mi = dummy_date.getMinutes();
      if (mm < 10) { mm = '0' + mm; } // add leading zero for month if the month is a single digit.
      if (dd < 10) { dd = '0' + dd; } // add leading zero for day if the day is a single digit.
      if (hh < 10) { hh = '0' + hh; } // add leading zero for hour if the hour is a single digit.
      if (mi < 10) { mi = '0' + mi; } // add leading zero for minute if the hour is a single digit.
      if (show_time == null) {
        return ''+mm+'/'+dd+'/'+yyyy;
      } else {
        return ''+mm+'/'+dd+'/'+yyyy+' '+hh+':'+mi;
      }
    }
  } // end of xxtd_utc_to_human_date
  //xxtd_USPhoneNum will convert a raw number such as 1112223333 to (111) 222-3333.
 ,xxtd_USPhoneNum: function(raw_phone_num) {
    if (raw_phone_num != null) {
      return '(' + raw_phone_num.substr(0, 3) + ') ' + raw_phone_num.substr(3, 3) + '-' + raw_phone_num.substr(6);
    }
  } // end of xxtd_USPhoneNum
};