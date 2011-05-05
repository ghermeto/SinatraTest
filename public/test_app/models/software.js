/**
 * @tag models, home
 * Wraps backend software services.  Enables 
 * [TestApp.Models.Software.static.findAll retrieving],
 * [TestApp.Models.Software.static.update updating],
 * [TestApp.Models.Software.static.destroy destroying], and
 * [TestApp.Models.Software.static.create creating] softwares.
 */
$.Model.extend('TestApp.Models.Software',
/* @Static */
{
	/**
 	 * Retrieves softwares data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped software objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	find: function( id, success, error ){
		$.ajax({
			url: '/softwares/'+id,
			type: 'get',
			dataType: 'json',
			data: {},
			success: success,
			error: error,
			fixture: "//test_app/fixtures/softwares.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
 	 * Retrieves softwares data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped software objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/softwares',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: "//test_app/fixtures/softwares.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Updates a software's data.
	 * @param {String} id A unique id representing your software.
	 * @param {Object} attrs Data to update your software with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
     */
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/softwares/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a software's data.
 	 * @param {String} id A unique id representing your software.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	destroy: function( id, success, error ){
		$.ajax({
			url: '/softwares/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
	/**
	 * Creates a software.
	 * @param {Object} attrs A software's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
	 */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/softwares',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: "-restCreate" //uses $.fixture.restCreate for response.
		});
	}
},
/* @Prototype */
{});