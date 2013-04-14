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
		return this.obsList.setValue(conceptId, value);
	},

	getObs : function(conceptId) {
		console.log('get obs ' + conceptId);
		return this.obsList.getValue(conceptId);
	}
};