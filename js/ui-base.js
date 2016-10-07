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
	toggle : function( el ){
		var attribute = 'aria-expanded';
		if( this.expanedEl && this.expanedEl != el ) {
			this.expanedEl.setAttribute(attribute, 'false');
		};
		if( el.getAttribute(attribute) == 'true' ){
			el.setAttribute(attribute, 'false');
		} else {
			el.setAttribute(attribute, 'true');
			window.onclick = function( evt ) {
				dropdown.outFocus(evt);
			};
		};
		// toggleAttirbute(attribute, el);
		el.className = el.className; // ie8
		this.expanedEl = el;
	},
	outFocus : function( evt ){
		var target = evt.target || evt.srcElement; // Support IE6-8
		if( target.getAttribute('data-toggle') != 'dropdown' && this.expanedEl) {
			dropdown.expanedEl.setAttribute('aria-expanded', 'false');
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
			viewEl.setAttribute('data-visible', 'true'); 
			viewEl.className = viewEl.className; // ie8
			viewEl.textContent = 'Password and confirm password must be equal.'
		};
	},
	view : function( el, type, viewEl ){
		var dataVisible = 'data-visible';
		viewEl = viewEl ? viewEl : el.nextElementSibling;
		if( this[type]( el.value ) ){
			viewEl.setAttribute(dataVisible, 'false'); 
		} else {
			viewEl.setAttribute(dataVisible, 'true'); 
		};
		viewEl.className = viewEl.className; // ie8
	}
};

/* Tabs */
var tabs = function( el ){
	var item = el.parentElement,
		cpnt = item.parentElement.parentElement,
		idx = item.getAttribute('data-idx');
	cpnt.setAttribute('data-current', idx);
	cpnt.className = cpnt.className; // ie8
};

/* classList : Get IE10, polyfill */
var modal = {
	cpnt : document.getElementById('modal'),
	dimmed : document.getElementById('dimmed'),
	show : function( btn, key ){
		var dataVisibile = 'data-visible',
			dataAni = 'data-ani',
			dataMiddle = 'data-middle',
			time = 0,
			self = this;
		if( key == 'ani' ){
			this.cpnt.setAttribute(dataAni, 'true');
			this.dimmed.setAttribute(dataAni, 'true');
			time = 50;
		};
		if( key == 'middle' ){
			var wrapper = document.createElement('div');
			wrapper.className = 'modal--middle-block';
			window.wrap( modal.cpnt.children[0], wrapper );
			this.cpnt.setAttribute(dataMiddle, 'true');
		};
		this.dimmed.setAttribute(dataVisibile, 'true');
		this.polyfill();

		setTimeout(function(){
			self.cpnt.setAttribute(dataVisibile, 'true');
			self.polyfill();
		}, time);
		this.cpnt.focus();
		this.target = btn;
	},
	hide : function(){
		var dataVisibile = 'data-visible',
			dataAni = 'data-ani',
			dataMiddle = 'data-middle',
			time = 0,
			self = this;
		if( this.cpnt.getAttribute(dataAni) == 'true' ){
			time = 300;
		};
		if( this.cpnt.getAttribute(dataMiddle) == 'true' ){
			window.unwrap( this.cpnt, this.cpnt.children[0] );
			this.cpnt.setAttribute(dataMiddle, 'fasle');
		};

		this.cpnt.setAttribute(dataVisibile, 'false');
		this.dimmed.setAttribute(dataVisibile, 'false');
		this.polyfill();
		
		setTimeout(function(){
			self.cpnt.setAttribute(dataAni, 'fasle');
			self.dimmed.setAttribute(dataAni, 'false');
			self.polyfill();
		}, time);

		this.target.focus();
		this.target = null;
	},
	polyfill : function(){
		this.dimmed.className = this.dimmed.className;
		this.cpnt.className = this.cpnt.className;
	}
};

/* wrap */
var wrap = function(el, wrapper){
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
};
var unwrap = function(el, wrapper) {
    el.innerHTML = wrapper.innerHTML;
};


