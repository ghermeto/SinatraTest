//steal/js test_app/language/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('test_app/language/scripts/build.html',{to: 'test_app/language'});
});
