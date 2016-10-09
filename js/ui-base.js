'use strict';

/* dataset */
var dataset = {
	get: function( el, attr ){
		return el.dataset[attr];
	},
	set : function( el, attr, val ){
		el.dataset[attr] = val;
	},
	del: function ( el, attr) {
		delete el.dataset[attr];
	}
};
// dataset polyfill
var hasDataset = 'dataset' in document.body;
if(!hasDataset) {
	dataset = {
		get : function( el, attr ){
			return el.getAttribute('data-' + attr);
		},
		set : function( el, attr, val ){
			el.setAttribute('data-' + attr, val)
		},
		del: function ( el, attr) {
			el.removeAttribute('data-' + attr);
		}
	};
};

/* ToggleAttirbute */
var toggleAttirbute = function(attribute, el){
	if( el.getAttribute(attribute) == 'true' ){
		el.setAttribute(attribute, 'false');
	} else {
		el.setAttribute(attribute, 'true');
	};
};

/* checkbox, radio */
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
		};
		el.setAttribute(attribute, 'true');
		el.className = el.className; // ie8
		this.current = idx;
	}
};
/* Dropdown */
var dropdown = {
	expanedEl : undefined,
	toggle : function( el ){
		var dataAttribute = 'expanded';
		if( this.expanedEl && this.expanedEl != el ) {
			dataset.set(this.expanedEl, dataAttribute, 'false');
		};
		if( dataset.get(el, dataAttribute) == 'true' ){
			dataset.set(el, dataAttribute, 'false');
		} else {
			dataset.set(el, dataAttribute, 'true');
			window.onclick = function( evt ) {
				dropdown.outFocus(evt);
			};
		};
		// toggleAttirbute(dataAttribute, el);
		el.className = el.className; // ie8
		this.expanedEl = el;
	},
	outFocus : function( evt ){
		var target = evt.target || evt.srcElement; // Support IE6-8
		if( dataset.get(target, 'toggle') != 'dropdown' && this.expanedEl) {
			dataset.set(dropdown.expanedEl, 'expanded', 'false');
			dropdown.expanedEl.className = dropdown.expanedEl.className; // ie8
			dropdown.expanedEl = undefined;
		};
	},
	getItem : function( a ){
		a.parentElement.parentElement.previousElementSibling.firstChild.textContent = a.innerText + ' '; // gte IE9
	}
};
/*window.onclick = function( evt ) {
	dropdown.outFocus(evt);
};*/

/* File upload : handelFile */
var handleFileSelect = function( evt ){
	evt.stopPropagation();
	evt.preventDefault();
	var tp, i,
		target = evt.target,
		files = evt.dataTransfer ? evt.dataTransfer.files : target.files,
		filesLen = files.length,
		item = [],
		uploadFileLst = target.parentElement.lastElementChild; //ie9
	tp = '<span class="fileUpload-txt">{name}</span>';
	tp += '<button type="button" class="btn btn--default btn--xs" onclick="handleFileRemove(this)">Cancel</button>';
	for(i=0; i<filesLen ; i++){
		item.push('<li class="fileUpload-item">', 
					tp.replace( '{name}', escape(files[i].name) ), 
					'</li>');
	};
	uploadFileLst.innerHTML += item.join('');
	uploadFileLst.lastElementChild.getElementsByTagName('button')[0].focus(); // ie9
};
var handleFileTrigger = function( btn ){
	btn.nextElementSibling.click(); // input:file click()
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
			viewEl.className = viewEl.className; // ie8
			viewEl.textContent = 'Password and confirm password must be equal.'
		};
	},
	view : function( el, type, viewEl ){
		var dataVisible = 'visible';
		viewEl = viewEl ? viewEl : el.nextElementSibling;
		if( this[type]( el.value ) ){
			dataset.set(viewEl, dataVisible, 'false'); 
			// viewEl.setAttribute(dataVisible, 'false'); 
		} else {
			dataset.set(viewEl, dataVisible, 'true'); 
			// viewEl.setAttribute(dataVisible, 'true'); 
		};
		viewEl.className = viewEl.className; // ie8
	}
};

/* Tabs */
var tabs = function( idName, idx ){
	// var item = el.parentElement,
	// 	cpnt = item.parentElement.parentElement,
	// 	idx = dataset.get(item, 'idx');
	var cpnt = document.getElementById(idName);
	dataset.set(cpnt, 'current', idx);
	cpnt.className = cpnt.className; // ie8
};

/* Modal*/
var cpntModal = document.getElementById('modal'),
	cpntDimmed = document.getElementById('dimmed'),
	modalHideTarget = undefined;
var modalShow = function( el ){
	dataset.set(cpntModal, 'visible', 'true');
	dataset.set(cpntDimmed, 'visible', 'true');
	modalHideTarget = el;
};
var modalShowAnimate = function( el ){
	// Animate pre appply
	dataset.set(cpntModal, 'animation', 'true');
	dataset.set(cpntDimmed, 'animation', 'true');
	// CpntDimmed show
	dataset.set(cpntDimmed, 'visible', 'true');
	// After cpntDimmed animatin end, cpntModal show
	setTimeout(function(){	
		dataset.set(cpntModal, 'visible', 'true');
	}, 150);
	modalHideTarget = el;
};
var modalMiddle = function(){
	dataset.set(cpntModal, 'middle', 'true');
	var w = document.createElement('div');
	w.className = 'modal--middle-block';
	window.wrap( cpntModal.children[0], w );
};
var modalHide = function(){
	dataset.set(cpntModal, 'visible', 'false');
	dataset.set(cpntDimmed, 'visible', 'false');
	modalHideTarget.focus();
	modalHideTarget = undefined;
	// If cpntModal vertical align middle
	if( dataset.get(cpntModal, 'middle') == 'true' ){
		window.unwrap( cpntModal, cpntModal.children[0] );
		cpntModal.dataset.middle = 'fasle';
	};
	// If cpntModal has animation
	if( dataset.get(cpntModal, 'animation') == 'true'){
		// Atter cpntDimmed animatin end, animation attribute set false;
		setTimeout(function(){
			dataset.set(cpntModal, 'animation', 'fasle');
			dataset.set(cpntDimmed, 'animation', 'false');
		}, 450);
	};
};

/* wrap */
var wrap = function(el, wrapper){
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
var unwrap = function(el, wrapper) {
    el.innerHTML = wrapper.innerHTML;
};


