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
	repaint : function(){
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
	dataset.repaint = function( el ){
		el.className = el.className;
	};
}

/* Variable data attribue */
var dataVisible = 'visible';

/* 
* Current pattern
* Component's data-current control
*/

// Set data-current index
var setCurrent = function(id, idx){
	var el = document.getElementById(id);
	dataset.set( el, 'current', idx);
	dataset.repaint(el);
};

// Toggle data-current 
var setCurrentToggle = function(id, idx){
	var el = document.getElementById(id);
	if(dataset.get(el, 'current') ==  idx){
		dataset.del(el, 'current');
	} else {
		dataset.set( el, 'current', idx);
	}
	dataset.repaint(el);
};
// Next
var setCurrentNext = function(id){
	var cpnt = document.getElementById(id),
		idx = dataset.get(cpnt, 'current');
	idx = getIdxNext(idx, getItemLen(cpnt));
	setCurrent(id, idx);

	setCurrentClearPlay(id, cpnt);

	dataset.set(cpnt, 'direction', 'next');
};
// Prev
var setCurrentPrev = function(id){
	var cpnt = document.getElementById(id),
		idx = dataset.get(cpnt, 'current');
	idx = getIdxPrev(idx, getItemLen(cpnt));
	setCurrent(id, idx);

	setCurrentClearPlay(id);

	dataset.set(cpnt, 'direction', 'prev');
};
// If data-control == 'play', previous clear interval and play
var setCurrentClearPlay = function(id){
	var cpnt = document.getElementById(id);
	if( dataset.get(cpnt, 'control') == 'play' ) {
		window.clearInterval( cpnt.interval );
		setCurrentPlay(id);
	}
};
// Play
var setCurrentPlay = function(id){
	var cpnt = document.getElementById(id);
	dataset.set(cpnt, 'control', 'play');
	cpnt.interval = setInterval(function(){
		if(dataset.get(cpnt, 'direction') ==  'next') 
			setCurrentNext(id);
		else
			setCurrentPrev(id);
	}, dataset.get(cpnt, 'time') );
};
// Pause
var setCurrentPause = function(id){
	var cpnt = document.getElementById(id);
	dataset.set(cpnt, 'control', 'pause');
	window.clearInterval( cpnt.interval );
};
// mouseover
var setCurrentMouseOver = function(id){
	var cpnt = document.getElementById(id);
	if( dataset.get(cpnt, 'control') == 'play' ) {
		setCurrentPause(id);
		cpnt.controlled = 'play';
	}
};
// mouseout
var setCurrentMouseOut = function(id){
	var cpnt = document.getElementById(id);
	if( cpnt.controlled == 'play' ){
		setCurrentPlay(id);
		cpnt.controlled = undefined;
		// delete cpnt.controlled;
	}
};

/* Get component's item length */
var getItemLen = function(cpnt, tagName){
	if(dataset.get(cpnt, 'len')) 
		return dataset.get(cpnt, 'len');
	else
		return cpnt.getElementsByTagName(tagName).length;
};

/* Idx Control */
var getIdxPrev = function(idx, len){
	return (idx == 0) ? len-1 : Number(idx)-1;
};
var getIdxNext = function(idx, len){
	return (idx == len-1) ? 0 : Number(idx)+1;
};

/* Toggle(true/false) element's attribute */
var toggleAttirbute = function(attr, el){
	if( el.getAttribute(attr) == 'true' ){
		el.setAttribute(attr, 'false');
	} else {
		el.setAttribute(attr, 'true');
	}
};

/* Accordion */
var accordion = function( id, idx, el ){
	setCurrentToggle(id, idx);

	var cpnt = document.getElementById(id);
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
		dataset.repaint(el);
		this.current = idx;
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
		dataset.repaint(el);
		this.toggler = el;
	},
	outFocus : function( evt ){
		var target = evt.target || evt.srcElement; // Support IE6-8
		if( dataset.get(target, 'toggle') != 'dropdown' && this.toggler) {
			dataset.set(this.toggler, 'expanded', 'false');
			dataset.repaint(this.toggler);
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
			dataset.set(viewEl, dataVisible, 'true'); 
			// viewEl.setAttribute('data-visible', 'true'); 
			dataset.repaint(viewEl);
			viewEl.textContent = 'Password and confirm password must be equal.';
		}
	},
	view : function( el, type, viewEl ){
		viewEl = viewEl ? viewEl : el.nextElementSibling;
		if( this[type]( el.value ) ){
			dataset.set(viewEl, dataVisible, 'false'); 
			// viewEl.setAttribute(dataVisible, 'false'); 
		} else {
			dataset.set(viewEl, dataVisible, 'true'); 
			// viewEl.setAttribute(dataVisible, 'true'); 
		}
		dataset.repaint(viewEl);
	}
};

/* Modal */
// Variable global
var cpntModal = document.getElementById('modal'),
	cpntDimmed = document.getElementById('dimmed'),
	modalHideTarget;
// Show
var modalShow = function( el ){
	dataset.set(cpntModal, dataVisible, 'true');
	dataset.set(cpntDimmed, dataVisible, 'true');
	modalHideTarget = el;
	dataset.repaint(cpntModal);
	dataset.repaint(cpntDimmed);
};
// Show with animation
var modalShowAnimate = function( el ){
	var dataAnimation = 'animation';
	// Animate pre appply
	dataset.set(cpntModal, dataAnimation, 'true');
	dataset.set(cpntDimmed, dataAnimation, 'true');
	// CpntDimmed show
	dataset.set(cpntDimmed, dataVisible, 'true');
	// After cpntDimmed animatin end, cpntModal show
	setTimeout(function(){	
		dataset.set(cpntModal, dataVisible, 'true');
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
	dataset.set(cpntModal, dataVisible, 'false');
	dataset.set(cpntDimmed, dataVisible, 'false');
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
	dataset.repaint(cpntModal);
	dataset.repaint(cpntDimmed);
};

/* Wrap */
var wrap = function(el, wrapper){
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
var unwrap = function(el, wrapper) {
    el.innerHTML = wrapper.innerHTML;
};







