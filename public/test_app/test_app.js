steal.plugins(
    'jquery/model',
    'test_app/software',
    'test_app/language',
    'test_app/menu'
).models (
    'software',
    'language'
).then(function($){

    $('#menu').test_app_menu();

    $('#menu').bind('language-click', function(){
       $('#main').test_app_language();
    });
    
    $('#menu').bind('software-click', function(){
       $('#main').test_app_software();
    });

});
