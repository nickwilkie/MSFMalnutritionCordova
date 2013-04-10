ViewInflator = {
	inflate : function(json) {
	}
};

FormItemView = Backbone.View.extend({
	template : _.template($("").html()),
	
	events : {
		"input change" : "valueChanged"
	},
	
	render : function() {
	},
	
	renderChildren : function() {
	},
	
	valueChanged : function() {
		FormController.viewValueChange(this);
	}
});

TextView = FormItemView.extend({
	template : _.template($("tmpl-textview").html()),
	
	render : function() {
		this.$el.html(this.template, {model : this.model, view : this}, {variable : "data"}));
	}
});