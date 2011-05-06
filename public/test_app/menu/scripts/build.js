//steal/js test_app/menu/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('test_app/menu/scripts/build.html',{to: 'test_app/menu'});
});
