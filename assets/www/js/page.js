var PageView = Backbone.View.extend({
	defaults : {
		pageTheme : "c",
		headerTheme : "c",
		headerText : "NO TITLE",
		contentTheme : "c",
		footerTheme : "c",
		headerOptions : {},
		contentOptions : {},
		footerOptions : {},
		views : []
	},
	
	initialize : function() {
		this.options = _.defaults(this.options, this.defaults);
		
		this.viewModels = new FormItemViewModelList;
		this.viewModels.add(this.options.views);
	},
	
	render : function() {
		var template = $("#tmpl-page").html();
		this.$el.html(_.template(template, this.options, {variable : "data"}));

		this.header = new Header(_.extend({el : this.$el.children(":jqmData(role='header')"), page : this}, this.options.headerOptions));
		this.content = new Content(_.extend({el : this.$el.children(":jqmData(role='content')"), page : this}, this.options.contentOptions));
		this.footer = new Footer(_.extend({el : this.$el.children(":jqmData(role='footer')"), page : this}, this.options.footerOptions));
		
		this.$el.attr('data-role', 'page').attr('data-theme', this.options.pageTheme).trigger('create').page();
	}
});


var Header = Backbone.View.extend({
	defaults : {},
	
	initialize : function(){
		this.options = _.defaults(this.options, this.defaults);
		this.page = this.options.page;
	}
});

var Content = Backbone.View.extend({
	defaults : {},
	views : [],
	
	initialize : function() {
		this.options = _.defaults(this.options, this.defaults);
		this.page = this.options.page;
		this.render();
	},
	
	render : function() {
		this.renderModels(this.$el, this.page.viewModels);
	},
	
	renderModels : function(parentElement, modelList) {
	}
});

var Footer = Backbone.View.extend({
	defaults : {
		footerIconPosition : "top",
		
		footerButton1Text : "Previous",
		footerButton1Theme : "a",
		footerButton1Icon : "arrow-l",
		footerButton1Action : "prev",
		footerButton1Disabled : false,
		

		footerButton2Text : "Help",
		footerButton2Theme : "a",
		footerButton2Icon : "info",
		footerButton2Action : "help",
		footerButton2Disabled : false,
		

		footerButton3Text : "Next",
		footerButton3Theme : "a",
		footerButton3Icon : "arrow-r",
		footerButton3Action : "next",
		footerButton3Disabled : false
	},
	
	initialize : function() {
		this.options = _.defaults(this.options, this.defaults);
		this.page = this.options.page;
		this.render();
	},
	
	events: {
		"click" : "render",
		"click a[action='prev']" : "prev",
		"click a[action='help']" : "help",
		"click a[action='next']" : "next",
		"click a[action='submit']" : "submit"
	},
	
	render : function() {
		this.$el.html(_.template($("#tmpl-footer").html(), this.options, {variable : "data"}));
		this.$el.children().navbar();
		
		if (this.options.footerButton1Disabled) {
			this.disableButton($(this.$el.find("li > a")[0]));
		}
		
		if (this.options.footerButton2Disabled) {
			this.disableButton($(this.$el.find("li > a")[1]));
		}
		
		if (this.options.footerButton3Disabled) {
			this.disableButton($(this.$el.find("li > a")[2]));
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
	},
	
	next : function(e) {
		FormApp.nextPage();
	},
	
	submit : function(e) {
	}
});