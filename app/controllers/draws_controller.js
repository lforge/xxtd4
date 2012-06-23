// File Name: app/controllers/draws_controller.js
// Purpose: Controller module for Event model.
//
// Update History
// Name            Date       Description
// --------------- ---------- ------------------------------------------------------------------------------
// Jude Lam        06/10/2012 - Initial creation.

load('application');

before(loadDraw, {only: ['show', 'edit', 'update', 'destroy']});
before(use('loadCurrentTournament'), {only: ['index']});

// adding a singleton name and plural name for title setup and other message.
var v_form_title_s = 'Draw';
var v_form_title_p = 'Draws';

action('new', function () {
	  this.title = 'New '+ v_form_title_s;  // Updated to use new controller level variable.
    this.draw = new Draw;
    render();
});

action(function create() {
    Draw.create(req.body.Draw, function (err, draw) {
        if (err) {
            flash('error', 'Draw can not be created');
            render('new', {
                draw: draw,
                title: 'New ' + v_form_title_s  // Updated to use new controller level variable.
            });
        } else {
            flash('info', v_form_title_s + ' is created.');  // Updated to use new controller level variable.
            redirect(path_to.draws());
        }
    });
});

action(function index() {
    this.title = v_form_title_p;  // Updated to use new controller level variable.
    Draw_v.all({where: {'stage_id':params.stage_id}}, function (err, draws) {
        render({
            draws: draws
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
    this.draw.updateAttributes(body.Draw, function (err) {
        if (!err) {
            flash('info', v_form_title_s + ' is updated.');
            redirect(path_to.draw(this.draw));
        } else {
            flash('error', v_form_title_s + ' can not be updated.');
            this.title = 'Edit ' + v_form_title_s + ' details';  // Updated to use new controller level variable.
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.draw.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy draw');
        } else {
            flash('info', 'Draw successfully removed');
        }
        send("'" + path_to.draws() + "'");
    });
});

function loadDraw() {
    Draw.find(params.id, function (err, draw) {
        if (err) {
            redirect(path_to.draws());
        } else {
            this.draw = draw;
            next();
        }
    }.bind(this));
}
