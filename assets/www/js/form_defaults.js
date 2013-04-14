DefaultsService = {
	defaults : new DefaultList;
	
	registerDefaults : function(path, defaults) {
	},
	
	getDefaults : function(componentName, options) {
	}
};

Default = Backbone.Model.extend({
});

DefaultList = Backbone.Collection.extend({
	model : Default
});

{
	globalDefaults = {
			theme : "c"
	};
	pageDefaults = {
			
	};
	headerDefaults = {
			title : '????TITLE NOT ENTERED?????'
	};
	contentDefaults = {
			
	};
	footerDefaults = {
			
	};
	
	DefaultsService.registerDefaults('global', GlobalDefaults);
}

BlankForm = {
	form : {
		global : {
			theme : ''
		},
		pages : [
		         {
		        	 header : {
		        		 title : '',
		        		 theme : ''
		        	 },
		        	 content : {
		        		 views : [
		        		          ]
		        	 },
		        	 footer : {
		        		 theme : ''
		        	 }
		         }
		]
	},
	
	concepts : {
	},
	
	obs : {
	}
}