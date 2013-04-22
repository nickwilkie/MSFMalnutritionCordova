FormService = {
	views : [],	
	
	viewValueChange : function(sourceView) {
		var conceptId = sourceView.model.get('conceptId');
		var value = sourceView.getValue();
		console.log('FormService registered viewValueChange: ' + conceptId);
		
		ObsService.setObs(conceptId, value);
	},
	
	registerView : function(view) {
		console.log('register view ' + view.id);
		
		this.views.push(view);
		view.on('viewValueChange', FormService.viewValueChange);
		
		var conceptId = view.model.get('conceptId');
//		if (conceptId) {
//			var value = ObsService.getObs(conceptId);
//			view.setValue(value);
//		}
	},
	
	unregisterView : function(view) {
		var index = this.views.indexOf(view);
		this.views.splice(index, 1);
	}
};


ObsService = {
	obsList : new ObsList,	
	
	setObs : function(conceptId, value) {
		console.log('set obs ' + conceptId + ' to ' + value);
		return this.obsList.setValue(conceptId, value);
	},

	getObs : function(conceptId) {
		console.log('get obs ' + conceptId);
		return this.obsList.getValue(conceptId);
	}
};

var PageService = {
	pageModels : undefined,
	activeIndex : -1,
	
	setPageModels : function(pages) {
		if (!this.pageModels) {
			this.pageModels = new Backbone.Collection(pages, {
				model : PageModel
			});
		} else {
			this.pageModels.reset(pages);
		}
	},
	
	renderPages : function() {
		this.pageModels.each(function(page) {
			page.generatePageView();
		});
	},
	
	setActivePageIndex : function(pageIndex) {
		if (pageIndex + 1 > this.pageModels.length) {
			alert('PageIndex exceeds number of pages!');
			return;
		}

		if (pageIndex < 0) {
			alert('PageIndex cannot be less than 0!');
			return;
		}

		this.activeIndex = pageIndex;
		
		var pageModel = this.pageModels.at(pageIndex);
		var pageView = pageModel.pageView;
		
		$.mobile.changePage(pageView.$el);
	},
	
	prevPage : function(force) {
		if (!force) {
			//check that all requirements are met
		}
		this.setActivePageIndex(this.activeIndex - 1);
	},
	
	nextPage : function(force) {
		if (!force) {
			//check that all requirements are met
		}
		this.setActivePageIndex(this.activeIndex + 1);
	},
	
	getActivePageIndex : function() {
		return this.activeIndex;
	},
	
	getPageFromElement : function(element) {
		var model;
		for(var i = 0; i < this.pageModels.length; i++) {
			model = this.pageModels.at(i);
			if (model.pageView.el == element) {
				return model.pageView;
			}
		}
	}
};