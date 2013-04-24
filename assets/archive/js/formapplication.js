function success(successCallback) {
    return typeof successCallback !== 'function' ? null : function (result) {
        successCallback(result);
    }
}

function error(errorCallback) {
    return typeof errorCallback !== 'function' ? null : function (code) {
        errorCallback(code);
    };
}

//Need to use these if we want to handle hash changes with a mobile router
//$.mobile.hashListeningEnabled = false;
//$.mobile.linkBindingEnabled = false;

//Data handling
$(document).on('pageinit', function() {
	if (window.FormApp == undefined) {
		FormApp = new AppView;
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
	
var FormItemModelCollection = Backbone.Collection.extend({
	model : FormItemModel
});

//Footer
var FooterModel = Backbone.Model.extend({
	defaults: function() {
		return {
			labels : ["Previous", "Help", "Next", "Submit"],
			actions : ["prev", "help", "next", "submit"],
			icons : ["arrow-l", "info", "arrow-r", "plus"],
			theme : ["a", "a", "a", "e"],
			iconpos : "top",
			firstPage : false,
			lastPage : false
		}
	}
});
	
var Footer = Backbone.View.extend({			
	events: {
		"click" : "render",
		"click a[action='prev']" : "prev",
		"click a[action='help']" : "help",
		"click a[action='next']" : "next",
		"click a[action='submit']" : "submit"
	},
	
	initialize: function() {
		this.model = new FooterModel();
		this.render();
		
		this.$el.parents("div:jqmData(role='page')").bind('pagebeforeshow', function(prevPage) {
			$(this).find("div:jqmData(role='footer') a").removeClass("ui-btn-active");
		});
		
		var this2 = this;
		var renderCallback = function(model) {
			this2.render.apply(this2, [model]);
		};
		this.model.on('change:firstPage', renderCallback);
		this.model.on('change:lastPage', renderCallback);
	},
	
	//use the properties either from the defaults or those set to make buttons
	render : function() {
		var list = $("<ul></ul>");
		var actions = this.model.get("actions");
		for (var i=0;i<3;i++) { 
			if(this.model.get("lastPage") & i == 2) { //TODO: clean this up man
				//Use the fourth object for the submit button on the last page
				i++;
			}
			
			var listItem = $("<li></li>").
				html($("<a></a>", {
					action : this.model.get("actions")[i],
					'data-theme' : this.model.get("theme")[i],
					'data-icon' : this.model.get("icons")[i],
					text : this.model.get("labels")[i]
				}));
			list.append(listItem);
		}
		var navbar = $("<div></div>", {
			'data-role' : "navbar",
			'data-theme' : this.model.get("theme")[0],
			'data-iconpos' : this.model.get("iconpos")
		}).html(list);
		this.$el.html(navbar);
		
		//make JQueryMobile process it
		navbar.navbar();
		
		if (this.model.get("firstPage")) {
			var prevButton = this.$el.find("a[action='prev']");
			this.disableButton(prevButton);
		}
		
		if (this.$el.attr("data-position") == 'fixed') {
			this.$el.fixedtoolbar().fixedtoolbar("show");
		}
	},
	
	disableButton : function(button) {
		button.addClass('ui-disabled');
		button.removeAttr('action');
	},
	
	prev : function(e) {
		FormApp.prevPage();
	}, 
	
	help : function(e) {
		FormApp.showHelp();
	}, 
	
	next : function(e) {
		FormApp.nextPage();
	},
	
	submit : function(e) {
		FormApp.submit();
	}
});

//View for each page
var PageView = Backbone.View.extend({
	initialize : function() {
		var footerElement = this.$el.find("div:jqmData(role='footer')");
		if (footerElement.length == 0) {
			$("<div data-role='footer'></div>").appendTo(this.$el);
		}
		this.footer = new Footer({el : footerElement[0] });
	},
	
	events : {
		"pageshow" : "onShowPage"
	},
	
	onShowPage : function() {
		if (this.processed) {
		} else {
			//Initialize form views
			var formViewElements = this.$el.find("[formview]");
			var pageIdx = FormApp.indexOfPage(this.$el);
			
			formViewElements.each(function(index, element) {
				var model = new FormItemModel({}, [pageIdx, element]);
				if (model.formView != undefined) {
					FormApp.formItemModels.add(model);
				}
			});
			
			//Initialize UI views (which don't store any data)
			this.$el.find("[uiview]").each(function(index, element) {
				var uiview = getUIView(element);
				if (uiview != undefined) {
					FormApp.uiviews.push(uiview);
				}
			});
			
			this.processed = true;
		}
	},
	
	attemptTransition : function() {
	},
	
	/**
	 * Find a view object on this page either using a CSS selector string or
	 * a jQuery DOM object. Returns an array of results.
	 */
	findViews : function(query) {
		var result = [];
		var formView;
		for(var i=0;i<this.formViews.length;i++) {
			formView = this.formViews[i];
			if (formView.$el.is(query)) {
				result.push(formView);
			}
		}
		return result;
	}
});

//Application
var AppView = Backbone.View.extend({
	formItemModels : new FormItemModelCollection,
	
	initialize : function() {
		this.pages = [];
		this.uiviews = [];
		this.setElement($("body")[0]);
		
		//Initialize pages
		var pageElements = this.$el.children("div:jqmData(role='page')");
		for (var i=0;i<pageElements.length;i++) {
			//store the page in the pages array
			var pageElement = $(pageElements[i]);
			this.pages.push(new PageView({el : pageElement}));
		}
		
		this.pages[0].footer.model.set('firstPage', true);
		this.pages[this.pages.length - 1].footer.model.set('lastPage', true);
		
		//$(document).on('beforepageshow', pageChanged);
	},
	
	pageChanged : function(event) {
		var currentPage = this.currentPage();
		currentPage.onShowPage.apply(currentPage);
	},
	
	getPage : function(pageElement) {
		for(var i=0;i<this.pages.length;i++) {
			if($(this.pages[i].$el).is(pageElement)) {
				return this.pages[i];
			}
		}
		return undefined;
	},
	
	indexOfPage : function(pageElement) {
		for(var i=0;i<this.pages.length;i++) {
			if($(this.pages[i].$el).is(pageElement)) {
				return i;
			}
		}
		return -1;
	},
	
	currentPageIndex : function() {
		for(var i=0;i<this.pages.length;i++) {
			if($(this.pages[i].$el).is($.mobile.activePage)) {
				return i;
			}
		}
		return -1;
	},
	
	currentPage : function() {
		return this.pages[this.currentPageIndex()];
	},
	
	nextPage : function() {
		var pageIndex = this.currentPageIndex();
		if (pageIndex < (this.pages.length - 1)) {
			$.mobile.changePage(this.pages[pageIndex + 1].$el,
					{transition : "slide", reverse : false});
		}
	},
	
	prevPage : function() {
		var pageIndex = this.currentPageIndex();
		if (pageIndex > 0) {
			$.mobile.changePage(this.pages[pageIndex - 1].$el,
					{transition : "slide", reverse : true});
		}
	},
	
	showHelp : function() {
	},
	
	submit : function() {
		var result = JSON.stringify(this.formItemModels.toJSON());
		return result;
	}
});
