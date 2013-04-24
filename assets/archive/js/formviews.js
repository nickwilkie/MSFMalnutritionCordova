//<input type=text itemview=checklist>

getFormView = function(el) {
	var formType = $(el).attr("formview");
	var attributes = {el : el};
	if (formType == 'text') {
		return new TextInputView(attributes);
	} else if (formType == 'checkbox') {
		return new CheckBoxView(attributes);
	} else if (formType == 'checkboxset') {
		return new CheckBoxFieldSet(attributes);
	} else if (formType == 'radiogroup') {
		return new RadioGroupView(attributes);
	} else if (formType == 'number') {
		return new NumberInputView(attributes);
	} else if (formType == 'date') {
		return new DateView(attributes);
	}
}


var FormItemModel = Backbone.Model.extend({
	//Set the defaults for an individual form item
	defaults: {
		concept: "",
		value: ""
	},
	
	/**
	 * When you call the new model, you give it your initial values (value and concept here)
	 * and parameters for the class that don't get stored as model objects. In classParams, 
	 * which is an array, index 0 is the page index and index 1 is the element with which we're 
	 * making this view.
	 */
	initialize: function(initValues, classParams) {
		this.pageIdx = classParams[0];
		this.formView = getFormView(classParams[1]);
		
		this.listenTo(this.formView, 'change', this.takeViewValue);
		var that = this;
		this.on('change:value', function(model, value, options) {
			that.formView.setValue(value);
		});
		
		this.set("concept", this.formView.$el.attr("concept"));
		var defaultValue = this.formView.$el.attr("defaultvalue");
		if (defaultValue) {
			this.set("value", defaultValue);
		} else {
			this.takeViewValue();
		}
	},
	
	takeViewValue : function() {
		this.set("value", this.formView.getValue(), {silent : true});
	}
});


/**
 * This is the core class for all views. It has some helper methods and some
 * default behaviors. The behavior for this class defaults to a text field
 * since those methods are the most reusable across views. Overload any behavior
 * with methods using FormItemView.extend({}).
 */
var FormItemView = Backbone.View.extend({
	/** 
	 * This gets called at the creation of every FormItemView. It calls
	 * initialize2() so you can overload while allowing for some code to run for
	 * all of them.
	 */
	initialize : function() {
		var that = this;
		this.scopedTriggerChange = function() {
			that.triggerChange.apply(that);
		}
		this.initialize2();
	},
	
	/**
	 * Overload this method to change view-dependent initialization behavior.
	 * 
	 * Be sure to implement a function that calls change as the view value changes!
	 */
	initialize2 : function() {
		//Overload me!
	},
	
	triggerChange : function() {
		this.trigger('change');
	},
	
	/** 
	 * Right now there are some views that don't hold data...
	 * Maybe should change that behavior in the future but for now this should return false
	 * if the view isn't meant to return a value at submission.
	 */
	hasData : function() {
		return true;
	},
	
	checkValid : function() {
		var valid = true;
		var result = getValue();
		if (this.$el.attr("required")) {
			valid = valid && result != undefined && result != "";
		}
		return valid;
	},
	
	getId : function() {
		return this.$el.attr("id");
	},
	
	getLabel : function() {
		var result = this.getFieldContain().children("label");
		if (result.length == 0) {
			result = this.$el.children("[role='heading']");
		}
		return result;
	},
	
	getValue : function() {
		return this.$el.val();
	},
	
	setValue : function(val) {
		this.$el.val(val);
	},
	
	error : function(errormsg) {
		this.getFieldContain().addClass("fielderror");
		var errorList = this.getLabel().children("ul.errorlist");
		if (errorList.length == 0) {
			errorList = $("<ul></ul>", {class : "errorlist"}).appendTo(this.getLabel());
		}
		
		
		return $("<li></li>", {class : "errordescription" }).text(errormsg).appendTo(errorList);
	},
	
	clearError : function() {
		this.getFieldContain().removeClass("fielderror");
		this.getLabel().children("ul.errorlist").remove();
	},
	
	getFieldContain : function() {
		return this.$el.parents(":jqmData(role='fieldcontain')");
	},
	
	showotherid : function(e) {
		var target;
		if (e.target != undefined) {
			target = $(e.target);
		} else {
			target = $(e);
		}
		var id = target.attr("showotherid");
		
		if (id != undefined && id != '') {
			var other = $("#" + id);
			
			//this isn't generic enough...
			var fieldcontain = other.parents(":jqmData(role='fieldcontain')");
			//if not using a fieldcontainer, just hide the individual question
			if (fieldcontain.length == 0) {
				fieldcontain = other;
			}
			if (target.is(":checked")) {
				fieldcontain.show();
			} else {
				fieldcontain.hide();
			}
		}
	}
});

var TextInputView = FormItemView.extend({
	initialize2 : function() {
	},
	
	events : {
		"change": "triggerChange",
		"keyup" : "triggerChange"
	}
});

var NumberInputView = FormItemView.extend({
	initialize2 : function() {
	},
	
	events : {
		"change": "triggerChange",
		"keyup" : "triggerChange",
		"keypress" : "catchNumbers"
	},
	
	catchNumbers: function(e) {
		if (e.keyCode >=48 && e.keyCode <= 57) {
			return true; //let it go
		} else {
			return false; //catch it and prevent it from propagating
		}
	}
});

var CheckBoxView = FormItemView.extend({
	initialize2 : function() {
		var that = this;
		if (this.$el.attr('showotherid')) {
			this.$el.change(function(e) {
				that.showotherid.apply(that, [e]);
			});
		}
		this.$el.change(); //trigger the event so that the default behavior is initially displayed
	},
	
	events : {
		"change" : "triggerChange"
	},
	
	getValue : function() {
		return this.$el.is(":checked");
	},
	
	setValue : function() {
		this.$el.attr("checked", true).checkboxradio("refresh");
	}
});

var RadioGroupView = FormItemView.extend({
	initialize2 : function() {
		this.radiobuttons = this.$el.find("input");
		this.radiobuttons.attr("checked", false);
		this.triggerChange();
	},
	
	events : {
		"change" : "triggerChange",
	},
	
	//Need to override since only the element being activated triggers an event
	triggerChange : function() {
		var that = this;
		this.$el.find("[showotherid]").each(function(index, element) {
			that.showotherid(element);
		});
	},
	
	getValue : function() {
		var selected = this.radiobuttons.filter(":checked");
		if (selected.length > 0) {
			return selected.val();
		} else {
			return "";
		}
	},
	
	setValue : function(value) {
		var changedButton = this.radiobuttons.filter("[value='" + value + ']').attr('checked', true);
		this.radiobuttons.not(changedButton).attr('checked', false);
		this.radiobuttons.checkboxradio('refresh');
	}
});

var DateView = FormItemView.extend({
	initialize2 : function() {
		this.$el.mobiscroll().date({
	        theme: 'android-ics',
	        display: 'bubble',
	        mode: 'mixed',
	        dateOrder: 'ddmm (M)yy',
	        dateFormat: 'dd/mm/yy'
	    });
	},
	
	events : {
		"change" : "triggerChange"
	}
});