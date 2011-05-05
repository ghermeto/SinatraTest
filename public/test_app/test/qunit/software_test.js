module("Model: TestApp.Models.Software")

test("findAll", function(){
	stop(2000);
	TestApp.Models.Software.findAll({}, function(softwares){
		start()
		ok(softwares)
        ok(softwares.length)
        ok(softwares[0].name)
        ok(softwares[0].description)
	});
	
})

test("create", function(){
	stop(2000);
	new TestApp.Models.Software({name: "dry cleaning", description: "take to street corner"}).save(function(software){
		start();
		ok(software);
        ok(software.id);
        equals(software.name,"dry cleaning")
        software.destroy()
	})
})
test("update" , function(){
	stop();
	new TestApp.Models.Software({name: "cook dinner", description: "chicken"}).
            save(function(software){
            	equals(software.description,"chicken");
        		software.update({description: "steak"},function(software){
        			start()
        			equals(software.description,"steak");
        			software.destroy();
        		})
            })

});
test("destroy", function(){
	stop(2000);
	new TestApp.Models.Software({name: "mow grass", description: "use riding mower"}).
            destroy(function(software){
            	start();
            	ok( true ,"Destroy called" )
            })
})