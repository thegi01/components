'use strict';

/* ToggleAttirbute */
var toggleAttirbute = function(attribute, el){
	if( el.getAttribute(attribute) == 'true' ){
		el.setAttribute(attribute, 'false');
	} else {
		el.setAttribute(attribute, 'true');
	};
};

/* checkbox, radio */
var checkboxCheck = function(el){
	toggleAttirbute('checked', el);
};
var radio = {
	current : undefined,
	check : function(el){
		var attribute = 'checked',
			idx = el.getAttribute('data-idx');
		if(this.current == idx ) return;
		if(this.current){
			el.form[el.name][this.current].setAttribute(attribute, 'false');
		};
		el.setAttribute(attribute, 'true');
		this.current = idx;
	}
};

/* Dropdown */
var dropdown = {
	expanedEl : undefined,
	attribute : 'aria-expanded',
	toggle : function(el){
		if( this.expanedEl && this.expanedEl != el ) {
			this.expanedEl.setAttribute(this.attribute, 'false');
		};
		toggleAttirbute(this.attribute, el);
		this.expanedEl = el;
	},
	outFocus : function(event){
		var target = event.target || event.srcElement; // Support IE6-8
		if( target.getAttribute('data-toggle') != 'dropdown' && this.expanedEl) {
			dropdown.expanedEl.setAttribute(this.attribute, 'false');
			dropdown.expanedEl = undefined;
		};
	},
	getItem : function(a){
		a.parentElement.parentElement.previousElementSibling.firstChild.textContent = a.innerText + ' '; // gte IE9
	}
};
window.onclick = function(event) {
	dropdown.outFocus(event);
};

/* File upload */
var hadleFilesTrigger = function( btn ){
	btn.nextElementSibling.click(); // input:file click()
};
var hadleFiles = function( files ){
	var i, 
		filesLen = files.length,
		tp;
	tp = '<span class="uploadFile-txt">{name}</span>';
	tp += '<button type="button" class="btn btn--default btn--xs" onclick="handleFilesCancel(this)">Cancel</button>';
	for(i=0; i<filesLen ; i++){
		var item = document.createElement('li');
		item.className = 'uploadFile-item';
		item.innerHTML = tp.replace( '{name}', files[i].name );
		document.getElementById('uploadFileLst').appendChild(item);
	};
};
var handleFilesCancel = function( cancelBtn ){
	cancelBtn.parentElement.remove();
};
/*var fileUpload = {
	exec : function( btn ){
		btn.nextElementSibling.click(); // input:file click()
	},
	itemCreate : function( files ){
		var i, 
			filesLen = files.length,
			tp;
		tp = '<span class="uploadFile-txt">{name}</span>';
		tp += '<button type="button" class="btn btn--default btn--xs" onclick="fileUpload.remove(this)">Cancel</button>';
		for(i=0; i<filesLen ; i++){
			var item = document.createElement('li');
			item.className = 'uploadFile-item';
			item.innerHTML = tp.replace( '{name}', files[i].name );
			document.getElementById('uploadFileLst').appendChild(item);
		};
	},
	remove : function( cancelBtn ){
		cancelBtn.parentElement.remove();
	}
};*/


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
	}
};


