var Obs = Backbone.Model.extend({
	defaults : {
		conceptId : "",
	},
	
	initialize : function(initValues, classParams) {
	},
	
	getValue : function() {
		return this.get("value");
	},
	
	setValue : function(value) {
		this.set("value", value);
	},
	
	setValueSilent : function(value) {
		this.set("value", value, {silent : true});
	}
});

var ObsList = Backbone.Collection.extend({
	model : Obs,
	
	findObsFromConceptId : function(conceptIdToFind) {
		var results = this.where({conceptId : conceptIdToFind});
		if (results.length == 0) {
			return undefined;
		} else {
			return results[0];
		}
	},
	
	getValue : function(conceptId) {
		var ob = this.findObsFromConceptId(conceptId);
		if(ob) {
			return ob.get('value');
		} else {
			return undefined;
		}
	},
	
	setValue : function(conceptId, value) {
		var ob = this.findObsFromConceptId(conceptId);
		if (ob) {
			ob.set('value', value);
			console.log("Set conceptid '" + conceptId + "to value'" + value + "'");
		} else {
			this.add({conceptId : conceptId, value : value});
		}
	}
});

//var TextModel = Obs.extend({
//	initialize : function(initValues, classParams) {
//		this.maxCharacters = classParams[maxCharacters];
//		this.minCharacters = classParams[minCharacters];
//	}
//});
//
//var NumberModel = Obs.extend({
//	initialize : function(initValues, classParams) {
//		this.maxCharacters = classParams[maxCharacters];
//		this.minCharacters = classParams[minCharacters];
//		
//		this.maxValue = classParams[maxValue];
//		this.minValue = classParams[minValue];
//	}
//});
//
//var NumberModel = Obs.extend({
//	initialize : function(initValues, classParams) {
//		this.maxCharacters = classParams[maxCharacters];
//		this.minCharacters = classParams[minCharacters];
//		
//		this.maxValue = classParams[maxValue];
//		this.minValue = classParams[minValue];
//	}
//});