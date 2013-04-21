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

exampleCheckbox1 = {
		viewType : "checkboxgroup",
		label : "What sports do you like?",
		children : [{label : "Soccer", conceptId : "soccervalue"},
		           {label : "Football", conceptId : "footballvalue"},
		           {label : "Calvinball", conceptId : "calvinballvalue"}]
};

exampleCheckbox2 = {
		viewType : "checkboxgroup",
		label : "What are you allergic to?",
		children : [{label : "Sulfa", conceptId : "sulfaallergy"},
		           {label : "Wheat", conceptId : "wheatallergy"},
		           {label : "Nickel", conceptId : "nickelallergy"}]
};

examplePage1 = {
	header : {
		title : "Working Test Config",
		theme : "b"
	},
	footer : {
		theme : "c"
	},
	content : {
		theme : "c",
		views : [exampleTextField,
		         exampleNumberField,
		         exampleRadio,
		         exampleCheckbox1]
	}
};

examplePage2 = {
		header : {
			theme : "b",
			title : "Second page!!!"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : [exampleCheckbox2]
		}
	};

SubmitPage = {
		header : {
			title : "Submit form data",
			theme : "b"
		},
		footer : {
			theme : "c"
		},
		content : {
			theme : "c",
			views : [{viewType : "submitpage"}]
		}
};

exampleForm = {
	global : {
	},
	
	pages : [SubmitPage,
	         examplePage1,
	         examplePage2]
};

init = function() {
//	var createdPageView = new PageView(examplePage);
//	$("body").append(createdPageView.$el);
//	
//	createdPageView.render();
	Body = new BodyView({el : $("body")});
	
	PageService.setPageModels(exampleForm.pages);
	PageService.renderPages();
	
//	$.mobile.changePage(PageService.pageModels.at(0).pageView.$el);
	PageService.setActivePageIndex(0);
};

initialized = false;
$(document).on('pageinit', function() {
	if (!initialized) {
		initialized = true;
		init();
	}
});