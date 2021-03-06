/**
 * @tag models, home
 * Wraps backend language services.  Enables 
 * [TestApp.Models.Language.static.findAll retrieving],
 * [TestApp.Models.Language.static.update updating],
 * [TestApp.Models.Language.static.destroy destroying], and
 * [TestApp.Models.Language.static.create creating] languages.
 */
$.Model.extend('TestApp.Models.Language',
/* @Static */
{
	/**
 	 * Retrieves languages data from your backend services.
 	 * @param {Object} params params that might refine your results.
 	 * @param {Function} success a callback function that returns wrapped language objects.
 	 * @param {Function} error a callback function for an error in the ajax request.
 	 */
	findAll: function( params, success, error ){
		$.ajax({
			url: '/couchdb',
			type: 'get',
			dataType: 'json',
			data: params,
			success: this.callback(['wrapMany',success]),
			error: error,
			fixture: "//test_app/fixtures/languages.json.get" //calculates the fixture path from the url and type.
		});
	},
	/**
	 * Creates a language.
	 * @param {Object} attrs A language's attributes.
	 * @param {Function} success a callback function that indicates a successful create.  The data that comes back must have an ID property.
	 * @param {Function} error a callback that should be called with an object of errors.
         */
	create: function( attrs, success, error ){
		$.ajax({
			url: '/couchdb',
			type: 'post',
			dataType: 'json',
			success: success,
			error: error,
			data: attrs,
			fixture: "-restCreate" //uses $.fixture.restCreate for response.
		});
	}
	/**
	 * Updates a language's data.
	 * @param {String} id A unique id representing your language.
	 * @param {Object} attrs Data to update your language with.
	 * @param {Function} success a callback function that indicates a successful update.
 	 * @param {Function} error a callback that should be called with an object of errors.
	update: function( id, attrs, success, error ){
		$.ajax({
			url: '/languages/'+id,
			type: 'put',
			dataType: 'json',
			data: attrs,
			success: success,
			error: error,
			fixture: "-restUpdate" //uses $.fixture.restUpdate for response.
		});
	},
	/**
 	 * Destroys a language's data.
 	 * @param {String} id A unique id representing your language.
	 * @param {Function} success a callback function that indicates a successful destroy.
 	 * @param {Function} error a callback that should be called with an object of errors.
	destroy: function( id, success, error ){
		$.ajax({
			url: '/languages/'+id,
			type: 'delete',
			dataType: 'json',
			success: success,
			error: error,
			fixture: "-restDestroy" // uses $.fixture.restDestroy for response.
		});
	},
         */

},
/* @Prototype */
{});