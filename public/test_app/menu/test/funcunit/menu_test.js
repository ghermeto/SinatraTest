module("menu test", { 
	setup: function(){
		S.open("//test_app/menu/menu.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});