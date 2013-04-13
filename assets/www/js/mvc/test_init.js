exampleTextField = {
	viewType : "text",
	label : "What is your full name?"
};

exampleNumberField = {
		viewType : "number",
		label : "How many boats do you own?"
};

exampleRadio = {
		viewType : "radio",
		label : "Which is your favorite color?",
		options : [{label : "Green", value : "greenvalue"},
		           {label : "Blue", value : "bluevalue"},
		           {label : "Purple", value : "purplevalue"}]
};

exampleCheckbox = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", value : "soccervalue"},
		           {label : "Football", value : "footballvalue"},
		           {label : "Calvinball", value : "calvinballvalue"}]
};

examplePage = {
	header : {
		text : "Working Test Config",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		views : [exampleTextField,
		         exampleNumberField,
		         exampleRadio,
		         exampleCheckbox]
	}
}

init = function() {
	//defaultContent = $.mobile.activePage.children(":jqmData(role='content')");
	//defaultContent.html("Loading...");
	
//	var createdPageEl = $("<div></div>").appendTo($("body"));
	var createdPageView = new PageView(examplePage);
	$("body").append(createdPageView.$el);
	
	createdPageView.render();
	
	$.mobile.changePage(createdPageView.$el);
}

initialized = false;
$(document).on('pageinit', function() {
	if (!initialized) {
		initialized = true;
		init();
	}
});