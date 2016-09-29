'use strict';

/* ToggleAttirbute */
var toggleAttirbute = function(attribute, el){
	if( el.getAttribute(attribute) == 'true' ){
		el.setAttribute(attribute, 'false');
	} else {
		el.setAttribute(attribute, 'true');
	};
	el.className = el.className; // ie8
};

/* checkbox, radio */
var checkboxCheck = function( el ){
	toggleAttirbute('checked', el);
};
var radio = {
	current : undefined,
	check : function( el ){
		var attribute = 'checked',
			idx = el.getAttribute('data-idx');
		if(this.current == idx ) return;
		if(this.current){
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
	attribute : 'aria-expanded',
	toggle : function( el ){
		if( this.expanedEl && this.expanedEl != el ) {
			this.expanedEl.setAttribute(this.attribute, 'false');
		};
		if( el.getAttribute(this.attribute) == 'true' ){
			el.setAttribute(this.attribute, 'false');
		} else {
			el.setAttribute(this.attribute, 'true');
			window.onclick = function( evt ) {
				dropdown.outFocus(evt);
			};
		};
		// toggleAttirbute(this.attribute, el);
		el.className = el.className; // ie8
		this.expanedEl = el;
	},
	outFocus : function( evt ){
		var target = evt.target || evt.srcElement; // Support IE6-8
		if( target.getAttribute('data-toggle') != 'dropdown' && this.expanedEl) {
			dropdown.expanedEl.setAttribute(this.attribute, 'false');
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
	dataVisible : 'data-visible',
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
			viewEl.setAttribute(this.dataVisible, 'true'); 
			viewEl.className = viewEl.className; // ie8
			viewEl.textContent = 'Password and confirm password must be equal.'
		};
	},
	view : function( el, type, viewEl ){
		viewEl = viewEl ? viewEl : el.nextElementSibling;
		if( this[type]( el.value ) ){
			viewEl.setAttribute(this.dataVisible, 'false'); 
		} else {
			viewEl.setAttribute(this.dataVisible, 'true'); 
		};
		viewEl.className = viewEl.className; // ie8
	}
};

/* tabs */
var tabs = function( el, id ){
	var idx = el.parentElement.getAttribute('data-idx');
	document.getElementById(id).setAttribute('data-current', idx);
	document.getElementById(id).className = document.getElementById(id).className; // ie8
};

