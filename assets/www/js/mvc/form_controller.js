FormService = {
	views : [],	
	
	viewValueChange : function(sourceView) {
	},
	
	registerView : function(view) {
		console.log('register view ' + view.id);
		
		this.views.push(view);
		view.on('viewValueChange', FormService.viewValueChange);
		
		var conceptId = view.model.get('conceptId');
		if (conceptId) {
			var value = ObsService.getObs(conceptId);
			view.setValue(value);
		}
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
		return obsList.setValue(conceptId, value);
	},

	getObs : function(concept) {
		console.log('get obs ' + conceptId);
		return obsList.getValue(conceptId);
	}
};