getUIView = function(el) {
	var viewType = $(el).attr("uiview");
	var attributes = {el : el};
	if (viewType == 'checkboxset') {
		return new CheckBoxFieldSet(attributes);
	}
}

var UIView = Backbone.View.extend({
	
	/**
	 * Like FormViews, you should override initialize2 rather than initialize.
	 */
	initialize : function() {
		this.initialize2();
	},
	
	initialize2 : function() {
		//override me!
	}
});

var CheckBoxFieldSet = UIView.extend({
	initialize2 : function() {
		this.checkboxes = this.$el.find("input[type='checkbox']");
		var that = this;
		this.checkboxes.filter("[disableothers='true']").bind('change', function(e) {
			that.disableothers.apply(that, [e]);
		});
	},
	
	disableothers : function(e) {
		var target = $(e.target);
		var siblings = this.checkboxes.not(target);
		
		if (target.is(":checked")) {
			siblings.attr('checked', false);
			siblings.attr('disabled', '');
		} else {
			siblings.removeAttr('disabled');
		}
		siblings.checkboxradio('refresh').change();
	},
	
	hasData : function() {
		return false;
	}
});