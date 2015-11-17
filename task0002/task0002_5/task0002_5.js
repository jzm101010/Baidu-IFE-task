window.onload = InitPage();

function InitPage() {
	var leftwrap = document.getElementById('leftdiv'),
	    rightwrap = document.getElementById('rightdiv'),
	    leftdiv = leftwrap.getElementsByTagName('div'),
	    rightdiv = rightwrap.getElementsByTagName('div'),
	    movediv;

	for(var i=0; i<leftdiv.length; i++){
		leftdiv[i].ondragstart = dragstartEvent;
	}

	for(var i=0; i<rightdiv.length; i++){
		rightdiv[i].ondragstart = dragstartEvent;
	}

	leftwrap.ondrop = dropEvent;
	rightwrap.ondrop = dropEvent;

	leftwrap.ondragover = function(ev){
		ev.preventDefault();
	}

	rightwrap.ondragover = function(ev){
		ev.preventDefault();
	}

	function dropEvent(ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = "move";
		this.appendChild(movediv);
	}

	function dragstartEvent(ev) {
		movediv = this;
		ev.dataTransfer.effectAllowed = "move";
	}
}
