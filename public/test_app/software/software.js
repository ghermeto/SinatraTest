steal.plugins(
    'jquery/controller',
    'jquery/view/ejs',
    'jquery/controller/view',
    'jquery/dom/form_params'
).then(function($){

    $.Controller.extend('TestApp.Software', {}, {

        init: function() {
            this.element.html(this.view('init', this.options));
            TestApp.Models.Software.findAll({}, this.callback('list'));
        },
        list: function(results) {
            this.length = results.length;
            $('#mutable').html(this.view('list', {results: results} ));
        },
        show: function(result) {
            $('#mutable').html(this.view('edit', {result: result} ));
        },
        update: function() {
            this.init();
        },
        '.edit click': function(el, evt) {
            evt.preventDefault();
            TestApp.Models.Software.find($(el).attr('title'), this.callback('show'));
        },
        '.add click': function(el, evt) {
            evt.preventDefault();
            this.show({});
        },
        '.delete click':function(el, evt){
            evt.preventDefault();
            TestApp.Models.Software.destroy($(el).attr('title'), this.callback('init'));
        },
        'form submit': function(el, evt) {
            evt.preventDefault();
            var p = $(el).formParams();
            if(p.id){
                TestApp.Models.Software.update(p.id, p, this.callback('init'));
            }
            else {
                p.id = ++this.length;
                TestApp.Models.Software.create( p, this.callback('init'));
            }
        }

    });
});