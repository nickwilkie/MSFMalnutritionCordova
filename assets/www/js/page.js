var PageView = Backbone.View.extend({
	defaults : {
		pageTheme : "c",
		header : {},
		content : {},
		footer : {},
		views : []
	},
	
	tagName: "div",
	
	initialize : function() {
		console.log("PageView initialized");
		this.template = $("#tmpl-page").html();
		this.options = _.defaults(this.options, this.defaults);
		
		this.viewModels = new FormItemViewModelList;
		this.viewModels.add(this.options.content.views);
	},
	
	render : function() {
		this.$el.html(_.template(this.template, this.options, {variable : "data"}));
		this.$el.attr('data-role', 'page').attr('data-theme', this.options.pageTheme);
		
		this.header = new Header(_.extend({el : this.$el.children(":jqmData(role='header')"), page : this}, this.options.header));
		this.content = new Content(_.extend({el : this.$el.children(":jqmData(role='content')"), page : this}, this.options.content));
		this.footer = new Footer(_.extend({el : this.$el.children(":jqmData(role='footer')"), page : this}, this.options.footer));
		
		this.header.render();
		this.content.render();
		this.footer.render();
		
		this.$el.page();
	}
});

var Header = Backbone.View.extend({
	defaults : {
		theme : "d",
		text : "NO TITLE"
	},
	
	initialize : function() {
		console.log("Header initialized");
		this.template = $("#tmpl-header").html()
		
		this.options = _.defaults(this.options, this.defaults);
		this.page = this.options.page;
	},
	
	render : function() {
		this.$el.attr('data-theme', this.options.theme);
		this.$el.html(_.template(this.template, this.options, {variable : "data"}));
	}
});

var Content = Backbone.View.extend({
	defaults : {},
	views : [],
	
	initialize : function() {
		console.log("Content initialized");
		
		this.options = _.defaults(this.options, this.defaults);
		this.render();
	},
	
	render : function() {
		this.$el.attr('data-theme', this.options.theme);
		
		this.renderModels(this.$el, this.options.page.viewModels);
	},
	
	renderModels : function(parentElement, modelList) {
		modelList.each(function(model) {
			model.generateView($("<div></div>").appendTo(parentElement));
		});
	}
});

var Footer = Backbone.View.extend({
	defaults : {
		theme : "c",
		
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
		console.log("Footer initialized");
		
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
		this.$el.attr('data-theme', this.options.theme);
		
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
		console.log('prev button pressed');
	},
	
	help : function(e) {
		console.log('help button pressed');
	},
	
	next : function(e) {
		console.log('next button pressed');
	},
	
	submit : function(e) {
		console.log('submit button pressed');
	}
});

