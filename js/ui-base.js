"use strict";

/* dataset */
var dataset = {
	get : function( el, attr ){
		return el.dataset[attr];
	},
	set : function( el, attr, val ){
		el.dataset[attr] = val;
	},
	del : function ( el, attr ) {
		delete el.dataset[attr];
	},
	polyfill : function(){
		return;
	}
};
// dataset polyfill
var hasDataset = 'dataset' in document.body;
if(!hasDataset) {
	dataset.get = function( el, attr ){
		return el.getAttribute('data-' + attr);
	};
	dataset.set = function( el, attr, val ){
		el.setAttribute('data-' + attr, val);
	};
	dataset.del = function( el, attr ) {
		el.removeAttribute('data-' + attr);
	};
	dataset.polyfill = function( el ){
		return;
	};
}

/* 
* Current pattern
* Component's data-current control
*/
// Set data-current index
var setCurrent = function(el, idx){
	dataset.set( el, 'current', idx);
	dataset.polyfill(el);
};
// Toggle data-current 
var setCurrentToggle = function(el, idx){
	if(dataset.get(el, 'current') ==  idx){
		dataset.del(el, 'current');
	} else {
		dataset.set( el, 'current', idx);
	}
	dataset.polyfill(el);
};
// Next
var setCurrentNext = function(el, len, nth){
	var idx = dataset.get(el, 'current');
	nth = nth || 1;
	idx = getIdxNext(idx, len, nth);
	setCurrent(el, idx);
};
// Prev
var setCurrentPrev = function(el, len, nth){
	var idx = dataset.get(el, 'current');
	nth = nth || 1;
	idx = getIdxPrev(idx, len, nth);
	setCurrent(el, idx);
};


/* Control data-current module 
 * @param [Element] cpnt 
 * @param [String] direction, 'next' and 'prev'
 * @param [Number] len, item's length
 * @param [Number] time, auto play interval time
 * @param [Number] nth, shift item's unit
 */
var CurrentModule = function(cpnt, direction, len, time, nth){
	this.cpnt = cpnt;
	this.direction = direction;
	this.len = len;
	this.time = time;
	this.nth = nth;
};
CurrentModule.prototype = {
	set : function(idx){
		setCurrent( this.cpnt, idx );
	},
	next : function(){
		setCurrentNext( this.cpnt, this.len, this.nth);
		this.clearPlay();
		this.direction = 'next';
	},
	prev : function(){
		setCurrentPrev( this.cpnt, this.len, this.nth);
		this.clearPlay();
		this.direction = 'prev';
	},
	play : function(){
		var self = this;
		dataset.set( this.cpnt, 'control', 'play');
		this.interval = setInterval(function(){
			if( self.direction == 'next'){
				self.next();
			} else {
				self.prev();
			}
		}, self.time);
	},
	pause : function(){
		window.clearInterval( this.interval );
		dataset.set( this.cpnt, 'control', 'pause');
	},
	clearPlay : function(){
		if( dataset.get( this.cpnt, 'control') == 'play' ){
			window.clearInterval( this.interval );
			this.play();
		}
	}
};


/* Tabs simple, prev and next only, not apply play and stop
 * Use SetCurrent 
 * @param [Element] cpnt
 * @param [String] showpanel, tab item click function name
 * @param [String] btnNextId, button next id 
 * @param [String] btnPrevId, button prev id 
 * @param [Number] len, tab item's length
 */
var tabs = function(cpnt, showpanel, btnNextId, btnPrevId, len){
	if(showpanel){
		window[showpanel] = function(idx, el){
			setCurrent(cpnt, idx);
			if(el) focusElByHref(el);
		};
	}
	if(btnNextId){
		document.getElementById(btnNextId).onclick = function(){
			setCurrentNext(cpnt, len);
		};
	}
	if(btnPrevId){
		document.getElementById(btnPrevId).onclick = function(){
			setCurrentPrev(cpnt, len);
		};
	}
};	

/* Tabs with play and stop 
 * use CurrentModule
 * @param [Object] instance of currentModule
 * @param [String] showpanel, tab item click function name
 * @param [String] btnNextId, button next id 
 * @param [String] btnPrevId, button prev id 
 * @param [String] btnPlayId, button play id 
 * @param [String] btnPauseId, button pause id 
 * @param [Boolean] autoPlay, tabs auto play
 */
var tabsModule = function(cpnt, showpanel, btnNextId, btnPrevId, btnPlayId, btnPauseId, autoPlay){
	if(showpanel){
		window[showpanel] = function(idx, el){
			cpnt.set(idx);
			if(el) focusElByHref(el);
		};
	}
	if(btnNextId){
		document.getElementById(btnNextId).onclick = function(){
			cpnt.next();
		};
	}
	if(btnPrevId){
		document.getElementById(btnPrevId).onclick = function(){
			cpnt.prev();
		};
	}
	if(btnPlayId){
		document.getElementById(btnPlayId).onclick = function(){
			cpnt.play();
		};
	}
	if(btnPauseId){
		document.getElementById(btnPauseId).onclick = function(){
			cpnt.pause();
		};
	}
	if(autoPlay){
		cpnt.play();
	}
};

/* Slider 
 * @param [Element] cpnt
 * @param [Boolean] is set width panelId
 * @param [String] btnNextId, button next id 
 * @param [String] btnPrevId, button prev id 
 * @param [Number] len, slider item's length
 * @param [Number] nth, slider item's shift unit
 */
var slider = function(cpnt, panelId, btnNextId, btnPrevId, len, nth){
	if(panelId){
		document.getElementById(panelId).style.width = Math.ceil(len/nth) * 100 + '%';
	}
	if(btnNextId){
		document.getElementById(btnNextId).onclick = function(){
			setCurrentNext(cpnt, len, nth);
		};
	}
	if(btnPrevId){
		document.getElementById(btnPrevId).onclick = function(){
			setCurrentPrev(cpnt, len, nth);
		};
	}
};

/* Slider with play and stop 
 * use CurrentModule
 * @param [Object] instance of currentModule
 * @param [String] panelId, set panels's width
 * @param [String] btnNextId, button next id 
 * @param [String] btnPrevId, button prev id 
 * @param [String] btnPlayId, button play id 
 * @param [String] btnPauseId, button pause id 
 * @param [Boolean] autoPlay, tabs auto play
 */
var sliderModule = function(cpnt, panelId, btnNextId, btnPrevId, btnPlayId, btnPauseId, autoPlay){
	if(panelId){
		document.getElementById(panelId).style.width = Math.ceil(cpnt.len/cpnt.nth) * 100 + '%';
	}
	if(btnNextId){
		document.getElementById(btnNextId).onclick = function(){
			cpnt.next();
		};
	}
	if(btnPrevId){
		document.getElementById(btnPrevId).onclick = function(){
			cpnt.prev();
		};
	}
	if(btnPlayId){
		document.getElementById(btnPlayId).onclick = function(){
			cpnt.play();
		};
	}
	if(btnPauseId){
		document.getElementById(btnPauseId).onclick = function(){
			cpnt.pause();
		};
	}
	if(autoPlay){
		cpnt.play();
	}
};



/* Accordion */
var accordion = function( cpnt, idx, el ){
	setCurrentToggle(cpnt, idx);
	if(dataset.get(cpnt, 'animation')=='true'){
		var panel, cnts;
		if(el) {	// onclick
			panel = document.getElementById(el.getAttribute('href').split('#')[1]);
		} else { 	// init
			panel = cpnt.childNodes[2*idx+1].childNodes[3];
		}
		cnts = panel.childNodes[1];

		if(cpnt.collapsed == panel) {
			panel.style.height = '0';
			cpnt.collapsed = undefined;
		} else {
			if(cpnt.collapsed) 
				cpnt.collapsed.style.height = '0';
			panel.style.height = cnts.offsetHeight + 'px';
			cpnt.collapsed = panel;
		}
	}
};

/* Dropdown */
var dropdown = {
	toggler : undefined,
	toggle : function( el ){
		var dataExpanded = 'expanded';
		if( this.toggler && this.toggler != el ) {
			dataset.set(this.toggler, dataExpanded, 'false');
		}
		if( dataset.get(el, dataExpanded) == 'true' ){
			dataset.set(el, dataExpanded, 'false');
		} else {
			dataset.set(el, dataExpanded, 'true');
			window.onclick = function( evt ) {
				dropdown.outFocus(evt);
			};
		}
		// toggleAttirbute(data, el);
		dataset.polyfill(el);
		this.toggler = el;
	},
	outFocus : function( evt ){
		var target = evt.target || evt.srcElement; // Support IE6-8
		if( dataset.get(target, 'toggle') != 'dropdown' && this.toggler) {
			dataset.set(this.toggler, 'expanded', 'false');
			dataset.polyfill(this.toggler);
			this.toggler = undefined;
		}
	},
	getItem : function( txt ){
		this.toggler.firstChild.textContent = txt + ' '; 
	}
};
/*window.onclick = function( evt ) {
	dropdown.outFocus(evt);
};*/

/* Tooltip 
 * @param [Element] el, element of call tooltip
 * @param [String] place, left, right, top, bottom
 */
var tooltip = {
	cpnt : document.getElementById('tooltip'),
	placed : undefined,
	show : function(el, place){
		var cpnt = this.cpnt;
		if( dataset.get(cpnt, 'visible') == 'true' && this.placed === place ) {
			dataset.set(cpnt, 'visible', 'false');
		} else {
			cpnt.childNodes[1].innerText = dataset.get(el, 'tooltip') ; // Get text on data-tooltip
			if(this.placed != place) 
				dataset.set(cpnt, 'place', place);
			if( dataset.get(cpnt, 'visible') == 'false')
				dataset.set(cpnt, 'visible', 'true');
			switch(place){
				case 'left' : 
					cpnt.style.top = (el.offsetTop + el.offsetHeight/2 - cpnt.offsetHeight/2)  + 'px';
					cpnt.style.left = (el.offsetLeft - cpnt.offsetWidth - 5) + 'px';
					break;
				case 'right' :
					cpnt.style.top = (el.offsetTop + el.offsetHeight/2 - cpnt.offsetHeight/2)  + 'px';
					cpnt.style.left = (el.offsetLeft + el.offsetWidth + 5) + 'px';
					break;
				case 'top' :
					cpnt.style.top = (el.offsetTop - cpnt.offsetHeight - 5)  + 'px';
					cpnt.style.left = (el.offsetLeft + el.offsetWidth/2 - cpnt.offsetWidth/2) + 'px';
					break;
				case 'bottom' :
					cpnt.style.top = (el.offsetTop + el.offsetHeight + 5)  + 'px';
					cpnt.style.left = (el.offsetLeft + el.offsetWidth/2 - cpnt.offsetWidth/2) + 'px';
					break;
			}
		}
		this.placed = place;
	},
	hide : function(){
		dataset.set( this.cpnt, 'visible', 'false' );
	}
};


/* Get component's item length */
/*var getItemLen = function(ek, tagName){
	if(dataset.get(ek, 'len')) 
		return dataset.get(ek, 'len');
	else
		return ek.getElementsByTagName(tagName).length;
};*/

/* Idx Control */
var getIdxPrev = function(idx, len, nth){
	nth = nth || 1;
	return (Number(idx) - nth) < 0 ? Math.ceil(len/nth) * nth - nth : Number(idx) - nth;
};
var getIdxNext = function(idx, len, nth){
	nth = nth || 1;
	return (Number(idx) + nth) >= len ? 0 : Number(idx) +  nth;
};

/* Toggle(true/false) element's attribute */
var toggleAttirbute = function(attr, el){
	if( el.getAttribute(attr) == 'true' ){
		el.setAttribute(attr, 'false');
	} else {
		el.setAttribute(attr, 'true');
	}
};

/* focus Element by href attribute */
var focusElByHref = function(el){
	document.getElementById( el.getAttribute('href').split('#')[1] ).focus();
};


/* Checkbox, Radio */
var checkboxCheck = function( el ){
	toggleAttirbute('checked', el);
};
var radio = {
	current : undefined,
	check : function( el ){
		var attribute = 'checked',
			idx = dataset.get(el, 'idx');
		if(this.current == idx ) return;
		if(this.current){
			el.form[el.name][this.current].setAttribute(attribute, 'false');
			el.form[el.name][this.current].setAttribute(attribute, 'false');
		}
		el.setAttribute(attribute, 'true');
		dataset.polyfill(el);
		this.current = idx;
	}
};


/* File upload : handelFile */
// lastElementChild, nextElementSibling : Gte IE9
var handleFileSelect = function( evt ){
	evt.stopPropagation();
	evt.preventDefault();
	var tp, i,
		target = evt.target,
		files = evt.dataTransfer ? evt.dataTransfer.files : target.files,
		filesLen = files.length,
		item = [],
		uploadFileLst = target.parentElement.lastElementChild; 
	tp = '<span class="fileUpload-txt">{name}</span>';
	tp += '<button type="button" class="btn btn--default btn--xs" onclick="handleFileRemove(this)">Cancel</button>';
	for(i=0; i<filesLen ; i++){
		item.push('<li class="fileUpload-item">', 
					tp.replace( '{name}', escape(files[i].name) ), 
					'</li>');
	}
	uploadFileLst.innerHTML += item.join('');
	uploadFileLst.lastElementChild.getElementsByTagName('button')[0].focus(); 
};
var handleFileTrigger = function( btn ){
	btn.nextElementSibling.click(); 
};
var handleFileRemove = function( cancelBtn ){
	cancelBtn.parentElement.remove();
};
var handleFileDragOver = function( evt ){
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
};


/* Validation */
var validation = {
	isString : function( str ){
		return (typeof str == 'string' && str.replace(/^\s*|\s*$/g, '') !== '' && isNaN(str));
	},
	isEmail : function( str ){
		var pattern = /^[\w-\.\']{1,}\@([\da-zA-Z\-]{1,}\.){1,}[\da-zA-Z\-]{2,}$/;
		return pattern.test( str );
	},
	isNumber : function( str ){
		 return (!isNaN( str) &&  str.replace(/^\s*|\s*$/g, '') !== '');
	},
	passConfirm : function( pass1, pass2, viewEl ) {
		viewEl = viewEl ? viewEl : pass2.nextElementSibling;
		if( pass2.value && pass1.value != pass2.value){
			dataset.set(viewEl, 'visible', 'true'); 
			// viewEl.setAttribute('data-visible', 'true'); 
			dataset.polyfill(viewEl);
			viewEl.textContent = 'Password and confirm password must be equal.';
		}
	},
	view : function( el, type, viewEl ){
		viewEl = viewEl ? viewEl : el.nextElementSibling;
		if( this[type]( el.value ) ){
			dataset.set(viewEl, 'visible', 'false'); 
			// viewEl.setAttribute('visible', 'false'); 
		} else {
			dataset.set(viewEl, 'visible', 'true'); 
			// viewEl.setAttribute('visible', 'true'); 
		}
		dataset.polyfill(viewEl);
	}
};

/* Modal */
// Variable global
var cpntModal = document.getElementById('modal'),
	cpntDimmed = document.getElementById('dimmed'),
	modalHideTarget;
// Show
var modalShow = function( el ){
	dataset.set(cpntModal, 'visible', 'true');
	dataset.set(cpntDimmed, 'visible', 'true');
	modalHideTarget = el;
	dataset.polyfill(cpntModal);
	dataset.polyfill(cpntDimmed);
};
// Show with animation
var modalShowAnimate = function( el ){
	var dataAnimation = 'animation';
	// Animate pre appply
	dataset.set(cpntModal, dataAnimation, 'true');
	dataset.set(cpntDimmed, dataAnimation, 'true');
	// CpntDimmed show
	dataset.set(cpntDimmed, 'visible', 'true');
	// After cpntDimmed animatin end, cpntModal show
	setTimeout(function(){	
		dataset.set(cpntModal, 'visible', 'true');
	}, 150);
	modalHideTarget = el;
};
// Vertical align middle
var modalMiddle = function(){
	dataset.set(cpntModal, 'middle', 'true');
	var w = document.createElement('div');
	w.className = 'modal--middle-block';
	window.wrap( cpntModal.children[0], w );
};
// Hide
var modalHide = function(){
	var dataAnimation = 'animation';
	dataset.set(cpntModal, 'visible', 'false');
	dataset.set(cpntDimmed, 'visible', 'false');
	modalHideTarget.focus();
	modalHideTarget = undefined;
	// If cpntModal has vertical align middle
	if( dataset.get(cpntModal, 'middle') == 'true' ){
		window.unwrap( cpntModal, cpntModal.children[0] );
		cpntModal.dataset.middle = 'fasle';
	}
	// If cpntModal has animation
	if( dataset.get(cpntModal, dataAnimation) == 'true'){
		// Atter cpntDimmed animatin end, animation attribute set false;
		setTimeout(function(){
			dataset.set(cpntModal, dataAnimation, 'fasle');
			dataset.set(cpntDimmed, dataAnimation, 'false');
		}, 450);
	}
	dataset.polyfill(cpntModal);
	dataset.polyfill(cpntDimmed);
};

/* Wrap */
var wrap = function(el, wrapper){
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
var unwrap = function(el, wrapper) {
    el.innerHTML = wrapper.innerHTML;
};



/* tranform property */
var getTransformProperty = function(node) {
    var properties = [
        'transform',
        'WebkitTransform',
        'msTransform',
        'MozTransform',
        'OTransform'
    ];
    var p;
    while (p = properties.shift()) {
        if (typeof node.style[p] != 'undefined') {
            return p;
        }
    }
    return false;
};







