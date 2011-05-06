steal.plugins(
    'jquery/controller',
    'jquery/view/ejs',
    'jquery/controller/view'
).then(function($){

    $.Controller.extend('TestApp.Language', {}, {

        init: function() {
            this.element.html(this.view('init', this.options));
            TestApp.Models.Language.findAll({}, this.callback('list'), this.callback('error'));
        },
        list: function(results) {
            $('#mutable').html(this.view('list', {results: results} ));
        },
        error: function(XHR, status ) {
          var error = $.parseJSON(XHR.responseText);
          if(error.message.indexOf('404') > -1 && error.message.indexOf('no_db_file'))
               $('#mutable').html(this.view('create', {} ));
        },
        update: function() {
            this.init();
        },
        '.create click': function(el, evt) {
            evt.preventDefault();
            TestApp.Models.Language.create({}, this.callback('init'));
        }

    });
});