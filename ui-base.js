'use strict';

/* ToggleAttirbute */
var toggleAttirbute = function(attribute, el){
	if( el.getAttribute(attribute) == 'true' ){
		el.setAttribute(attribute, 'false');
	} else {
		el.setAttribute(attribute, 'true');
	};
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
		a.parentElement.parentElement.previousElementSibling.firstChild.textContent = a.innerText; // gte IE9
	}
};
window.onclick = function(event) {
	dropdown.outFocus(event);
};