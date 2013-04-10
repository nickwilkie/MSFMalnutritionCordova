var FormItemViewModel = Backbone.Model.extend({
	defaults : {
		viewType : "",
		id : undefined,
		visible : true,
		label : "",
		conceptId : "",
		defaultValue : "",
		options : [],
		children : undefined
	},
	
	propertyDescriptors : {
		id : {text : "Element ID", defaultValue : undefined, dataType : "text"},
		visible : {text : "Visible by default", defaultValue : true, dataType : "select", options : [true, false]},
		label : {text : "Label", defaultValue : "", dataType : "text"},
		conceptId : {text : "Concept ID", defaultValue : "", dataType : "text"},
	},
	
	initialize : function() {
		var obs = FormApp.obs.findObsFromConceptId(this.get('conceptId'));
		if (!obs) {
			obs = FormApp.obs.add({conceptId : this.get('conceptId'), value : this.get('defaultValue')});
			obs = FormApp.obs.findObsFromConceptId(this.get('conceptId'));
		}
		this.obs = obs;
		
		this.listenTo(this.obs, 'change:value', this.obsChanged);
	},
	
	obsChanged : function(obs, value) {
		this.view.setValue(value);
	},
	
	viewValueChanged : function(view) {
		this.obs.set( { value : view.getValue() });
	},
	
	setObsValue : function(value) {
		this.obs.set("value", value);
	},
	
	getObsValue : function() {
		return this.obs.getValue(this.get('conceptId'));
	},
	
	generateView : function(element) {
		if(this.view) {
			this.destroyView();
		}
		this.view = new formItemViewCodes[this.get('viewType')]({model : this, el : element});
		this.listenTo(this.view, 'viewValueChanged', this.viewValueChanged);
		this.view.render();
	},
	
	destroyView : function() {
		this.view.stopListening();
		this.view.$el.html("");
		this.view = undefined;
	}
});

//stupid name
var FormItemViewModelList = Backbone.Collection.extend({
	model : FormItemViewModel
});

var FormItemView = Backbone.View.extend({
	customPropertyDescriptors : {
	},
	
	//set model by passing {model : modelObject} to constructor
	initialize : function(options) {
		this.model = options.model;
		
		//generate a unique ID if not specified already
		var id = this.model.get('id');
		if (!id) {
			id = _.uniqueId(this.model.get('viewType') + "-");
		}
		this.id = id;
	},
	
	renderDefault : function(templateId, processBeforeCreateFunction) {
		this.$el.attr('id', this.id).attr('formview', this.model.get('viewType'));
		this.$el.html(_.template($("#" + templateId).html(), {model : this.model, view : this}, {variable : "data"}));
		if (processBeforeCreateFunction) {
			processBeforeCreateFunction.apply(this, this.$el);
		}
		this.$el.trigger('create');
	},
	
	valueChanged : function(view) {
		this.model.viewValueChanged(view);
	},
	
	render : function() {
	},
	
	getValue : function() {
	},
	
	setValue : function(value) {
	}
});

var TextView = FormItemView.extend({
	events : {
		"keyup input" : "valueChanged"
	},
	
	customPropertyDescriptors : {
		minCharacters : {text : "Min characters", value : "", dataType : "number"},
		maxCharacters : {text : "Max characters", value : "", dataType : "number"}
	},
	
	render : function() {
		this.renderDefault("tmpl-textview");
	},
	
	getValue : function() {
		return this.$el.find("input").val();
	},
	
	setValue : function(value) {
		this.$el.find("input").val(value);
	}
});

var NumberView = TextView.extend({
	events : {
		"keyup input" : "valueChanged",
		"keypress input" : "catchNumbers"
	},
	
	catchNumbers: function(e) {
		if ((e.keyCode >=48 && e.keyCode <= 57) || e.keyCode == 190) {
			return true; //let it go
		} else {
			return false; //catch it and prevent it from propagating
		}
	},
	
	render : function() {
		this.renderDefault("tmpl-numberview");
	},
});

var RadioView = TextView.extend({
	events : {
		"change" : "radioValueChanged"
	},
	
	render : function() {
		this.renderDefault("tmpl-radioview");
	},
	
	radioValueChanged : function(e) {
		this.viewValueChanged();
	},
	
	getValue : function() {
		var selected = this.$el.find(":checked");
		if (selected.length > 0) {
			return selected.val();
		} else {
			return "";
		}
	},
	
	setValue : function(value) {
		var radiobuttons = this.$el.find("input");
		var changedButton = radiobuttons.filter("[value='" + value + "']").attr('checked', true);
		radiobuttons.not(changedButton).attr('checked', false);
		radiobuttons.checkboxradio('refresh');
	}
});

var CheckGroupView = FormItemView.extend({
	events : {
		"input change" : "checkBoxChanged"
	},
	
	render : function() {
		this.children = [];
		this.renderDefault("tmpl-checkgroupview", function($elBeforeCreate) {
			var children = this.model.get('children');
			
			_.each(children, function(element, index, list) {
				new CheckView
			}, this);
		});
		
	},
	
	checkBoxChanged : function(e) {
		
	}
});

var CheckView = FormItemView.extend({
	template : _.template($("#tmpl-checkview").html()),
	
	events : {
		"input change" : "valueChanged"
	},
	
	render : function() {
		//rendered by CheckGroupView
	},
	
	getValue : function() {
		var selected = this.$el.find(":checked");
		if (selected.length > 0) {
			return selected.val();
		} else {
			return "";
		}
	},
	
	setValue : function(value) {
		var radiobuttons = this.$el.find("input");
		var changedButton = radiobuttons.filter("[value='" + value + "']").attr('checked', true);
		radiobuttons.not(changedButton).attr('checked', false);
		radiobuttons.checkboxradio('refresh');
	}
});


window.formItemViewCodes = {text : TextView, number : NumberView, radio : RadioView, checkboxgroup : CheckGroupView};


