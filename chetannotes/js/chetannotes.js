var onReady = function() {
	var me = this;
	me.controller = me.initController();

	me.controller.model = me.initModel();
	me.controller.view = me.initView();

	me.reRender();

};

var reRender = function() {
	var me  = this;
	me.controller.view.renderDefaultView();
	for (var i in me.controller.model.noteText) {
		me.controller.view.addNote(me.controller.model.noteText[i]);
	}	
}

var onNoteAdd = function(noteText) {
	var me = this;
	var inputNotes = document.getElementById('inputNotes');
	var warningDiv = document.getElementById('warningDiv');
	if(inputNotes.value) {
		warningDiv.innerHTML = "";
		me.controller.addNoteOperation(inputNotes.value);
		inputNotes.value = "";
		inputNotes.focus();
	} else {
		warningDiv.innerHTML = "";
		warningDiv.innerHTML = '<div class="warningIcon"></div><div class="warningDivText">' + "Note cannot be empty!" + '</div>';
		inputNotes.focus();
	}
};

var onNoteDelete = function(noteCounter) {
	var me = this;
	me.controller.model.remove(noteCounter);
	me.reRender();
};

var initController = function() {
	var me = this;

	var controller = function() {
		this.view = null;
		this.model = null;
		return this;
	};
	controller.prototype.addNoteOperation = function(noteText) {
		var addObj = this.model.add(noteText);
		this.view.addNote(addObj); 
	};

	return (new controller());
};

var initView = function() {

	var mainDiv = document.getElementById('mainDiv');

	var view = function() {
		return this;
	};

	view.prototype.getTemplate = function(noteText, noteTime, noteCounter) {
		var template = 
			'<div class="notesDiv">' +
			'<div class="deleteButton" onclick="onNoteDelete(\'' + '' + noteCounter + '' + '\')">' +
			'</div>' +
			'<div class="notesText">' +
				noteText +
			'</div>' +
			'<div class="notesCount">' +
				+ noteTime.getHours() + ':' + noteTime.getMinutes() +
			'</div>' +
			'</div>'
		;
		return template;
	};
	view.prototype.renderDefaultView = function() {
		mainDiv.innerHTML = '';
	};
	view.prototype.addNote = function(addObj) {
		var mainDiv = document.getElementById('mainDiv');
		if(mainDiv) {
			mainDiv.innerHTML += this.getTemplate(addObj.noteText,new Date(addObj.noteTime), addObj.noteCounter);
		}
	};

	return (new view());
};

var initModel = function() {

	// creation of model class

	var model = function() {
		this.noteText = {};
		this.counter = 0;
		return this;
	};

	// CRUD support for model

	model.prototype.add = function(noteText) {
		this.counter++;
		var addObj = {
			noteText : noteText,
			noteTime : Date.now(),
			noteCounter : this.counter
		};
		this.noteText['' + this.counter] = addObj;
		return addObj;
	};
	model.prototype.remove = function(counter) {
		if(this.noteText.hasOwnProperty(counter)) {
			delete this.noteText['' + counter];
		}
	};
	model.prototype.getData = function() {
		return this.noteText;
	};
	model.prototype.getCount = function() {
		return this.counter;
	};

	return (new model());
};

