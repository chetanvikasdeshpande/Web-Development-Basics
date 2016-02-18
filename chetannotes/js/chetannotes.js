var onReady = function() {
	var me = this;
	me.controller = me.initController();

	me.controller.model = me.initModel();
	me.controller.view = me.initView();

	me.controller.view.renderDefaultView();

	for (var i in me.controller.model.noteText) {
		me.controller.view.addNote(me.controller.model.noteText[i].noteText);
	}	

};

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
		warningDiv.innerHTML = "Note cannot be empty!";
		inputNotes.focus();
	}
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

	view.prototype.getTemplate = function(arg1, arg2) {
		var template = 
			'<div class="notesDiv">' +
			'<div class="notesText">' +
				arg1 +
			'</div>' +
			'<div class="notesCount">' +
				+ arg2.getHours() + ':' + arg2.getMinutes() +
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
			mainDiv.innerHTML += this.getTemplate(addObj.noteText,new Date(addObj.noteTime));
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
		if(this.noteText.hasOwnProperty('' + this.counter)) {
			delete this.noteText['' + this.counter];
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

