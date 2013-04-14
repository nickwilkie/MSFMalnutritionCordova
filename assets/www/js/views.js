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
		var children = this.get('children');
		if(children) {
			this.childrenModels = new FormItemViewModelList;
			this.childrenModels.add(children);
			
			this.listenTo(this.childrenModels, 'change', this.rebuildChildren);
		}
	},
	
	generateView : function(element, viewType) {
		if(this.view) {
			this.destroyView();
		}
		
		if(!viewType) {
			viewType = this.get('viewType');
		}
		
		this.view = new formItemViewCodes[viewType]({model : this,
			el : element});
		this.view.render();
		
		FormService.registerView(this.view);
	},
	
	destroyView : function() {
		this.view.stopListening();
		this.view.$el.html("");
		FormService.unregisterView(this.view);
		this.view = undefined;
	},
	
	rebuildChildren : function() {
		this.set('children', childrenModels.toJSON());
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
		var id = options.id;
		if (!id) {
			id = this.model.get('id');
			if (!id) {
				id = _.uniqueId(this.model.get('viewType') + "-");
			}
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
	},
	
	defaultValueChanged : function() {
		console.log('defaultValueChanged');
		this.trigger('viewValueChange', this);
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
		"keyup input" : "defaultValueChanged",
		"change input" : "defaultValueChanged"
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
		"keyup input" : "defaultValueChanged",
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
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault("tmpl-radioview");
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
	render : function() {		
		this.renderDefault("tmpl-checkgroupview", function() {
			//generate checkboxes before creating
			this.model.childrenModels.each(function(childModel, index, list) {
				var newElement = $("<div></div>").appendTo(this.$el.find('fieldset'));
				childModel.generateView(newElement, 'checkbox');
			}, this);
		});
	}
});

var CheckView = FormItemView.extend({
	template : _.template($("#tmpl-checkview").html()),
	
	events : {
		"change input" : "defaultValueChanged"
	},
	
	render : function() {
		this.renderDefault("tmpl-checkview");
		this.input = this.$el.find("input");
	},
	
	getValue : function() {
		var selected = this.input.is(":checked");
		return selected;
	},
	
	setValue : function(value) {
		var checked;
		if (value) {
			checked = 'checked';
		} else {
			checked = '';
		}
		this.input.attr('checked', value).checkboxradio('refresh');
	}
});


window.formItemViewCodes = {text : TextView, number : NumberView, radio : RadioView, checkboxgroup : CheckGroupView, checkbox : CheckView};


