exampleTextField = {
	viewType : "text",
	conceptId : "fullName",
	label : "What is your full name?"
};

exampleNumberField = {
		viewType : "number",
		conceptId : "numberOfBoats",
		label : "How many boats do you own?"
};

exampleRadio = {
		viewType : "radio",
		conceptId : "favoriteColor",
		label : "Which is your favorite color?",
		options : [{label : "Green", value : "greenvalue"},
		           {label : "Blue", value : "bluevalue"},
		           {label : "Purple", value : "purplevalue"}]
};

exampleCheckbox = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", conceptId : "soccervalue"},
		           {label : "Football", conceptId : "footballvalue"},
		           {label : "Calvinball", conceptId : "calvinballvalue"}]
};

examplePage = {
	header : {
		text : "Working Test Config",
		theme : "b"
	},
	footer : {
		theme : "b"
	},
	content : {
		theme : "c",
		views : [exampleTextField,
		         exampleNumberField,
		         exampleRadio,
		         exampleCheckbox]
	}
};

exampleForm = {
		
};

init = function() {
	var createdPageView = new PageView(examplePage);
	$("body").append(createdPageView.$el);
	
	createdPageView.render();
	
	$.mobile.changePage(createdPageView.$el);
};

initialized = false;
$(document).on('pageinit', function() {
	if (!initialized) {
		initialized = true;
		init();
	}
});