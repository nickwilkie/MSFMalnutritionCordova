FormService = {
	viewValueChange : function(sourceView) {
	},
};

ObservationService = {
	setObservation : function(conceptId, value) {
	},

	getObservation : function(concept) {
	}
};

Page = Backbone.View.extend({});

Header = Backbone.View.extend({
	
});

Content = Backbone.View.extend({
	events : {
		"formValueChange" : "formValueChangeHandler"
	},
	
	formValueChangeHandler : function(viewChanged, conceptId,
			newValue, oldValue) {
	}
});

Footer = Backbone.View.extend({
	events : {
		"pageBackButtonPressed" : "pageBackButtonHandler",
		"helpButtonPressed" : "helpButtonHandler",
		"pageForwardButtonPressed" : "pageForwardButtonHandler"
	},
	
	pageBackButtonHandler : function() {
	},
	
	helpButtonHandler : function() {
	},
	
	pageForwardButtonHandler : function() {
	}
});