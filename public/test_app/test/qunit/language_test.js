module("Model: TestApp.Models.Language")

test("findAll", function(){
	stop(2000);
	TestApp.Models.Language.findAll({}, function(languages){
		start()
		ok(languages)
        ok(languages.length)
        ok(languages[0].name)
        ok(languages[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new TestApp.Models.Language({name: "dry cleaning", description: "take to street corner"}).save(function(language){
		start();
		ok(language);
        ok(language.id);
        equals(language.name,"dry cleaning")
        language.destroy()
	})
})
test("update" , function(){
	stop();
	new TestApp.Models.Language({name: "cook dinner", description: "chicken"}).
            save(function(language){
            	equals(language.description,"chicken");
        		language.update({description: "steak"},function(language){
        			start()
        			equals(language.description,"steak");
        			language.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new TestApp.Models.Language({name: "mow grass", description: "use riding mower"}).
            destroy(function(language){
            	start();
            	ok( true ,"Destroy called" )
            })
})