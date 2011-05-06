module("language test", { 
	setup: function(){
		S.open("//test_app/language/language.html");
	}
});

test("Copy Test", function(){
	equals(S("h1").text(), "Welcome to JavaScriptMVC 3.0!","welcome text");
});