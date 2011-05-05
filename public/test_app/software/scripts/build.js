//steal/js test_app/software/scripts/compress.js

load("steal/rhino/steal.js");
steal.plugins('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('test_app/software/scripts/build.html',{to: 'test_app/software'});
});
