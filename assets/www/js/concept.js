var Concept = Backbone.Model.extend({
	initialize : function(initvals, classvals) {
	},
	
	defaults : {
		name : "",
		id : "",
		datatype : "",
		codedAnswers : [],
		isSet : false,
		setMembers : []
	}
});


var ConceptList = Backbone.Collection.extend({
	model : Concept,
	
	getConceptByName : function(conceptName) {
		var result = this.where({name : conceptName});
		if (result.length == 0) {
			return undefined;
		} else {
			return result[0];
		}
	},

	getConceptById : function(conceptId) {
		var result = this.where({id : conceptId});
		if (result.length == 0) {
			return undefined;
		} else {
			return result[0];
		}
	}	
});

//var TextConcept = Concept.extend({
//	initialize : function(initvals, classvals) {
//		this.set("datatype", "text");
//	}
//});
//
//var NumberConcept = Concept.extend({
//	initialize : function(initvals, classvals) {
//		this.set("datatype", "number");
//	}
//});
//
//var BooleanConcept = Concept.extend({
//	initialize : function(initvals, classvals) {
//		this.set("datatype", "boolean");
//	}
//});
//
//var MultipleChoiceConcept = Concept.extend({
//	initialize : function(initvals, classvals) {
//		this.set("datatype", "multiplechoice");
//	},
//	
//	hasData : function() {
//		return false;
//	}
//});
//
//var SingleChoiceConcept = Concept.extend({
//	initialize : function(initvals, classvals) {
//		this.set("datatype", "singlechoice");
//	}
//});
//
//
//
//
//var ConceptMap = {
//		text : TextConcept,
//		number : NumberConcept,
//		boolean : BooleanConcept,
//		multiplechoice : MultipleChoiceConcept,
//		singlechoice : SingleChoiceConcept
//};
//
//var createConcept = function() {
//		
//}