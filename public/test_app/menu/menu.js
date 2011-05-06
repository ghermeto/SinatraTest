steal.plugins(
    'jquery/controller',
    'jquery/view/ejs',
    'jquery/controller/view'
).then(function($){

    $.Controller.extend('TestApp.Menu', {}, {

        init: function() {
            this.element.html(this.view('init', this.options));
        },
        '#languages-link click': function(el, evt) {
            this.element.trigger('language-click');
            evt.preventDefault();
        },
        '#software-link click': function(el, evt) {
            this.element.trigger('software-click');
            evt.preventDefault();
        }
    });
});