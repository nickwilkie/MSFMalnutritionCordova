window.getConfig = function() {
	var result = {};
	result.pages = [{headerText : "Working Test Config", headerTheme : "b", views :
		[{label : "What is your favorite color?", conceptId : "favoriteColor", viewType : "text"},
		 {label : "What is your favorite number?", conceptId : "favoriteNumber", viewType : "number"},
		 {label : "Which do you like the most?", conceptId : "favoriteSport", viewType : "radio", options : 
			 [{label : "Football", value : "ftbll"}, {label : "Baseball", value : "bsbll"}, {label : "Hockey", value : "hcky"}]},
		 {label : "Which foods to you enjoy?", viewType : "checkboxgroup", children : 
			 [{label : "Football", value : "ftbll"}, {label : "Baseball", value : "bsbll"}, {label : "Hockey", value : "hcky"}]}
		]},
	                {headerText : "Second page!", headerTheme : "c"}];
	result.concepts = [{name : "Text Concept", id : "textconcept", datatype : "text"}];
	
	return result;
}

window.getObs = function() {
	return [];
}

var FormApp = {
	initialized : false,
	concepts : new ConceptList,
	obs : new ObsList,
	pages : [],
	
	currentPage : undefined,
	
	initialize : function() {
		//initialize concept
		this.initialized = true;
		this.config = getConfig();
		
		//add concepts
		if (this.config.concepts) {
			this.concepts.add(this.config.concepts);
		}
		
		//initialize obs (if any)
		var existingObs = getObs();
		this.obs.add(existingObs);
		
		//initialize pages
		for(var i=0;i<this.config.pages.length;i++) {
			var pageEl = $("<div></div>").appendTo($("body"));
			var page = new PageView(this.config.pages[i]);
			page.setElement(pageEl);
			this.pages.push(page);
			page.render();
		}
		
		//Go to the first page
		this.currentPage = this.pages[0];
		this.currentPageIdx = 0;
		$.mobile.changePage(this.currentPage.$el);
	},
	
	nextPage : function() {
		this.currentPage = this.pages[++this.currentPageIdx];
		$.mobile.changePage(this.currentPage.$el);
	},
	
	prevPage : function() {
		this.currentPage = this.pages[--this.currentPageIdx];
		$.mobile.changePage(this.currentPage.$el);
	}
};

//Add it when DOM is ready
$(document).on('ready', function() {
	if (!FormApp.initialized) {
		FormApp.initialize();
	}
});

//Ensure that the footer always stays on the bottom
window.positionFooter = function(event) {
	var content = $.mobile.activePage.children(":jqmData(role='content')");
	content.css("min-height", "0px");
	
	var headerHeight = $.mobile.activePage.children(":jqmData(role='header')").outerHeight();
	var contentHeight = content.outerHeight();
	var footerHeight = $.mobile.activePage.children(":jqmData(role='footer')").outerHeight();
	
	var pageHeight = headerHeight + contentHeight + footerHeight;
	if(pageHeight < window.innerHeight) {
		var contentMargin = content.outerHeight() - content.height();
		var targetContentHeight = window.innerHeight - headerHeight - footerHeight - contentMargin;
		content.css("min-height", targetContentHeight + "px");
	}
}

$(document).on('pageshow', positionFooter);
$(window).on('resize', positionFooter);