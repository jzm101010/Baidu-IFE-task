window.onload = InitPage();

function InitPage() {
	var div = document.getElementsByTagName('div')[0];
	slide(div, false, true, 5000);
}

function slide(elm, sequence, loop, time){
	var	NOW = 0,
		count = 0,
		img = elm.getElementsByTagName('ol')[0].getElementsByTagName('li'),
		imgNum = img.length;

	var pointctl = elm.getElementsByTagName('div')[0];
	var ctldiv = document.createElement('ol');
	ctldiv.setAttribute('class', 'pointwrap');
	pointctl.appendChild(ctldiv);

	if(sequence){
		var NEXT = 1;
	}else{
		var NEXT = imgNum - 1;
	}

	for(var i=0; i<imgNum; i++){
		var point = document.createElement('li');
		if(i==0){
			point.setAttribute('class', 'point-0 active');
		}else{
			point.setAttribute('class', 'point-' + i);
		}
		point.onclick = slideCtlEvent;
		ctldiv.appendChild(point);
	}
    
	var points = ctldiv.childNodes;

	var step = function(){
		if(!loop && count == 3){
			clearTimeout(timer1);
		}else{
			delClass(img[NOW], 'active');
			addClass(img[NEXT], 'active');
			for(var i=0; i<imgNum; i++){
				if(i==NEXT && points[NEXT].className.indexOf('active') == -1){
					addClass(points[i], 'active');
				}else{
					delClass(points[NOW], 'active');
				}
			}

			if(sequence){
				NEXT += 1;
				NOW += 1;
			}else{
				NEXT -= 1;
				NOW -= 1;
			}

			judge();
			count += 1;
		}

		timer1 = setTimeout(arguments.callee, time);
	}

	var judge = function() {
		if(NEXT == imgNum){
			NEXT = 0;
		}else if(NOW == imgNum){
			NOW = 0;
		}else if(NEXT == -1){
			NEXT = imgNum - 1;
		}else if(NOW == -1){
			NOW = imgNum - 1;
		}
	}

	function slideCtlEvent() {
		if(this.className.indexOf('active') != -1){
			return;
		}

		var index = parseInt(this.className.charAt(6));
		if(sequence){
			NEXT = index + 1;
		}else{
			NEXT = index - 1;
		}

		NOW = index;

		judge();

		for(var i=0; i<imgNum; i++){
			if(i == index){
				addClass(img[i], 'active');
				addClass(points[i], 'active');
			}else{
				delClass(img[i], 'active');
				delClass(points[i], 'active');
			}
		}
	}

	setTimeout(step, time);

}

function delClass(elm, str) {
	var _class = elm.className.split(' ');
	elm.className = '';
	for(var i=0; i< _class.length; i++){
		if(str != _class[i]){
			elm.className += _class[i];
		}
	}
}

function addClass(elm, str) {
	elm.className += ' ' + str;
}
