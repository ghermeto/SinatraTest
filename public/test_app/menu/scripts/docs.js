//js test_app/menu/scripts/doc.js

load('steal/rhino/steal.js');
steal.plugins("documentjs").then(function(){
	DocumentJS('test_app/menu/menu.html');
});