// File Name: app/controllers/versions_controller.js
// Purpose: Controller that does not link to a real model.  This controller is simply used to control the behavior
//          when one click on the Other -> About Tournament Director link on the menu.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        04/10/2012 - Initial creation.

load('application');


// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Version';

action(function index() {
    this.title = v_form_title_s;
    this.version = '1.0';
    render();
});
