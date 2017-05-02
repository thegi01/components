function patternCurrentEventHandler(targetId, handlerName, el) {
    if ( !targetId || !handlerName ) {
        alert('올바르지 않은 값입니다');
        return false; 
    }

    cc[handlerName]( cc.getModel(targetId), el ); 
}


var cc = {
    __update__: '2017-02-07',
    init: function() {
        var divElement = document.createElement('div'); 
        this.isDataset = ('dataset' in divElement); 
        this.isClassList = ('classList' in divElement); 

        var linkElement = document.createElement('link'); 
        this.isMedia = ('media' in linkElement); 
    },

    isDataset: undefined,
    isClassList: undefined,
    isMedia: undefined,

    __toNumber: function(str) {
        var num = Number(str); 
        if ( typeof num === 'number' ) {
            return num; 
        }

        window.alert('올바르지 않습니다');
        return false;         
    },
    __toBoolean: function(str) {
        var state = Boolean(str); 
        if ( typeof state === 'boolean' ) {
            return state; 
        }

        window.alert('올바르지 않습니다'); 
        return false; 
    },




    __repaint: function(el) {
        el.className = el.className; 
    },
    __setAttr: function(el, key, val) {
        el.setAttribute(key, val); 
    },
    __getAttr: function(el, key) {
        return el.getAttribute(key); 
    },
    __removeAttr: function(el, key) {
        el.removeAttribute(key); 
    },

    datasetOptionCurrent: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-option-current', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-option-current'); 
        }
    },
    datasetOption: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-option', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-option'); 
        }
    },
    datasetCurrent: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-current', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-current'); 
        }
    },
    datasetLength: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-length', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-length'); 
        }
    },
    datasetIndex: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-index', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-index'); 
        }
    },
    datasetSoldout: function(el, val) {
        if ( val !== undefined ) {
            this.__setAttr(el, 'data-soldout', val); 
            this.__repaint(el); 
        } else {
            return this.__getAttr(el, 'data-soldout'); 
        }
    }, 
    removeDatasetIndex: function(el) {
        this.__removeAttr(el, 'data-index'); 
    },
    datasetSelected: function(el, val) {
        this.__setAttr(el, 'data-selected', val); 
        this.__repaint(el);
    },
    datasetHidden: function(el, val){
        this.__setAttr(el, 'data-hidden', val); 
        this.__repaint(el);
    },
    datasetOpen: function(el, val){
        this.__setAttr(el, 'data-open', val); 
        this.__repaint(el);
    },
    datasetExpanded: function(el, val){
        this.__setAttr(el, 'data-expanded', val); 
        this.__repaint(el);
    },
    datasetChecked: function(el, val){
        this.__setAttr(el, 'data-checked', val); 
        this.__repaint(el);
    },
    datasetState: function(el, val){
        this.__setAttr(el, 'data-state', val); 
        this.__repaint(el);
    },
    datasetMore: function(el, val){
        this.__setAttr(el, 'data-more', val); 
        this.__repaint(el);
    },
    datasetTablet: function(el, val) {
        this.__setAttr(el, 'data-tablet', val); 
        this.__repaint(el); 
    },
    textContent: function(el, val) {
        el.textContent = val+1; 
    },





    __getClassList: function(el) {
        return el.className.split(' '); 
    },
    __classListSync: function(el, list) {
        el.className = list.join(' '); 
    },
    classListAdd: function(el, token) {
        var arr = this.__getClassList(el); 

        arr.push(token); 
        this.__classListSync(el, arr); 
    },
    classListRemove: function(el, token) {
        var arr = this.__getClassList(el); 

        arr.splice(this.classListIndex(el, token), 1);
        this.__classListSync(el, arr); 
    },
    classListToggle: function(el, token) {
        if ( this.classListContains(el, token) ) {
            this.classListRemove(el, token); 
            return true; 
        }

        this.classListAdd(el, token); 
        return false;
    },
    classListContains: function(el, token) {
        var arr = this.__getClassList(el); 

        for ( var i = 0; i < arr.length; i++ ) {
            if( arr[i] === token ) {
                return true; 
            }
        }
        
        return false; 
    },
    classListItem: function(el, index) {
        var arr = this.__getClassList(el); 

        return arr[index]; 
    },
    classListIndex: function(el, token) {
        var arr = this.__getClassList(el); 

        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i] === token ) {
                return i; 
            }
        }
    },




    



    nextIndex: function(idx, len) {
        idx++; 

        if ( idx === len ) {
            idx = len - 1;
        }

        return idx; 
    }, 
    previousIndex: function(idx, len) {
        idx--; 

        if ( idx < 0 ) {
            idx = 0;
        }

        return idx; 
    }, 
    nextIndexLoop: function(idx, len) {
        idx++; 

        if ( idx === len ) {
            idx = 0; 
        }

        return idx; 
    }, 
    previousIndexLoop: function(idx, len) {
        idx--; 

        if ( idx < 0 ) {
            idx = len - 1; 
        }

        return idx; 
    }, 


    __addModelFunctionMap__: {
        bindElementById: function(id) {
            if ( id in window ) {
                return window[id];
            }

            window[id] = document.getElementById(id); 

            if ( !window[id] ) {
                window.alert( id + '가 유효하지 않습니다'); 
                return false; 
            }

            return window[id];
        },
        elCompnt: function(id) {
            return this.bindElementById('elCompnt'+id); 
        }, 
        elInner: function(id) {
            return this.bindElementById('elInner'+id); 
        }, 
        elHeader: function(id) {
            return this.bindElementById('elHeader'+id); 
        },
        elHeaderText: function(id) {
            return this.bindElementById('elHeader'+id); 
        },
        elTitle: function(id) {
            return this.bindElementById('elTitle'+id);   
        },
        elTabs: function(id) {
            return this.bindElementById('elTabs'+id); 
        },
        elPanels: function(id) {
            return this.bindElementById('elPanels'+id); 
        },
        elList: function(id) {
            return this.bindElementById('elList'+id);
        },
        elItems: function(id) {
            return this.bindElementById('elItems'+id).children; 
        },
        elPrev: function(id) {
            return this.bindElementById('elPrev'+id); 
        }, 
        elNext: function(id) {
            return this.bindElementById('elNext'+id); 
        }, 
        elPlay: function(id) {
            return this.bindElementById('elPlay'+id); 
        },
        elStop: function(id) {
            return this.bindElementById('elStop'+id); 
        },
        elMarks: function(id) {
            return this.bindElementById('elMarks'+id).children; 
        },
        elLinks: function(id) {
            return this.bindElementById('elLinks'+id).children;
        },
        elCurrent: function(id) {
           return this.bindElementById('elCurrent'+id);
        }, 
        elLength: function(id) {
            return this.bindElementById('elLength'+id);
        },
        elButton: function(id) {
            return this.bindElementById('elButton'+id); 
        },
        elOpen: function(id) {
            return this.bindElementById('elOpen'+id);
        },
        elClose: function(id) {
            return this.bindElementById('elClose'+id);
        },
        elCancel: function(id) {
            return this.bindElementById('elCancel'+id);
        }, 
        elSubmit: function(id) {
            return this.bindElementById('elSubmit'+id); 
        }
    },
    addModel: function(obj) {
        var elMap = obj.elMap; 
        var len = elMap.length; 
        var id = obj.id;

        for ( var i = 0; i < len; i++ ) {
            if ( !(elMap[i] in this.__addModelFunctionMap__) ) {
                window.alert(elMap[i] + ' 함수가 존재하지 않습니다');
                continue;
            }
            obj[elMap[i]] = this.__addModelFunctionMap__[elMap[i]](id); 
        }

        if ( obj.onInterval ) {
            obj.__interval__ = '';
            obj.__stop = function() {
                clearInterval(this.__interval__); 
            };
            obj.__play = function() {
                this.__interval__ = setInterval(function() {
                    obj.elNext.onclick(); 
                }, obj.timer); 
            };
        }

        this[id] = obj;

        return obj; 
    },
    getModel: function(id) {
        return this[id];
    },


    setCurrent: function(obj, val) {
        obj.current = val; 
    },
    


    playCurrent: function(index) {
        this[index].__play(); 
    },
    stopCurrent: function(index) {
        this[index].__stop(); 
    },
    




    "$p": function(obj) { 
        var __new = this.previousIndexLoop( obj.current, obj.elItems.length );
        this.$x__(obj, __new); 
    },
    "$n": function(obj) {
        var __new = this.nextIndexLoop( obj.current, obj.elItems.length );
        this.$x__(obj, __new);   
    }, 
    "$x__": function(obj, newCurrent) {
        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
    },


    "$p2": function(obj) { 
        var newCurrent = this.previousIndex( obj.current, obj.elItems.length );
        this.$x2__(obj, newCurrent); 
    },
    "$n2": function(obj) {
        var newCurrent = this.nextIndex( obj.current, obj.elItems.length );
        this.$x2__(obj, newCurrent);   
    }, 
    "$x2__": function(obj, newCurrent) {
        var scroll = newCurrent * 192; 

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 

        if ( obj.elList.scrollLeft !== scroll ) {
            obj.elList.scrollLeft = scroll; 
        }
    },


    "$pp": function(obj) { 
        var __new = this.previousIndexLoop( obj.current, obj.elItems.length );
        this.$xx__(obj, __new); 
    },
    "$nn": function(obj) {
        var __new = this.nextIndexLoop( obj.current, obj.elItems.length );
        this.$xx__(obj, __new);   
    },
    "$xx__": function(obj, newCurrent) {
        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
        this.textContent(obj.elCurrent, newCurrent);  
    },


    
    "$ppp": function(obj) {
        var oldCurrent = obj.current; 
        var newCurrent = this.previousIndexLoop( oldCurrent, obj.elItems.length );

        this.$xxx__(obj, oldCurrent, newCurrent);         
    }, 
    "$nnn": function(obj) {
        var oldCurrent = obj.current; 
        var newCurrent = this.nextIndexLoop( oldCurrent, obj.elItems.length );

        this.$xxx__(obj, oldCurrent, newCurrent);     
    }, 
    "$xxx__": function(obj, oldCurrent, newCurrent) {
        if ( obj.onInterval ) {
            this.stopCurrent(obj.id); 
        }

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
        this.textContent(obj.elCurrent, newCurrent); 

        this.datasetSelected( obj.elItems[oldCurrent], false ); 
        this.datasetSelected( obj.elItems[newCurrent], true ); 

        this.classListRemove( obj.elInner, 'current--'+oldCurrent ); 
        this.classListAdd( obj.elInner, 'current--'+newCurrent ); 

        this.classListToggle( obj.elItems[oldCurrent], 'item-selected--true' ); 
        this.classListToggle( obj.elItems[newCurrent], 'item-selected--true' ); 

        if ( obj.onInterval ) {
            this.playCurrent(obj.id); 
        }
    },

    "$p_j1": function(obj){

        var oldCurrent = obj.current; 
        var newCurrent = this.previousIndexLoop( oldCurrent, obj.elItems.length );

        this.$x_j1(obj, oldCurrent, newCurrent); 

    },

    "$n_j1": function(obj){

        var oldCurrent = obj.current; 
        var newCurrent = this.nextIndexLoop( oldCurrent, obj.elItems.length );

        this.$x_j1(obj, oldCurrent, newCurrent);  

    },

    "$x_j1": function(obj, oldCurrent, newCurrent){

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 

        this.datasetSelected( obj.elItems[oldCurrent], false ); 
        this.datasetSelected( obj.elItems[newCurrent], true );
    
    },

    "$p_j2": function(obj){

        var oldCurrent = obj.current; 
        var newCurrent = this.previousIndexLoop( oldCurrent, obj.elItems.length );
       
        this.$x_j2(obj, oldCurrent, newCurrent); 

        this.datasetSelected( obj.elItems[oldCurrent+(obj.viewItem-1)], false ); 
        this.datasetSelected( obj.elItems[newCurrent], true );

    },

    "$n_j2": function(obj){

        var oldCurrent = obj.current; 
        var newCurrent = this.nextIndexLoop( oldCurrent, obj.elItems.length );
       
        this.$x_j2(obj, oldCurrent, newCurrent);  

        
        this.datasetSelected( obj.elItems[oldCurrent], false ); 
        this.datasetSelected( obj.elItems[newCurrent+(obj.viewItem-1)], true );

    },

    "$x_j2": function(obj, oldCurrent, newCurrent){

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 

        if ( newCurrent === 0) {

            this.datasetState (obj.elCompnt, "first");
            obj.isFirst = true; 
        }
         
        if ( newCurrent > 0) {

            this.datasetState (obj.elCompnt, "none");
            obj.isFirst = false;
            obj.isLast = false;
        }

        if ( (newCurrent + obj.viewItem) === obj.elItems.length ) {

            this.datasetState (obj.elCompnt, "last");
            obj.isLast = true; 
        } 
        
    }, 

    "$nxx": function(obj) {
        if ( obj.isLast ) {
            if ( obj.isLastTablet === false ) {
                obj.isLastTablet = true; 
                this.datasetTablet(obj.elCompnt, 'last'); 

                return false; 
            }
        }

        this['$n_j2'](obj); 
    },


    "$pxx": function(obj) {
    	if ( obj.isLast ) {
    		if ( obj.isLastTablet ) {
    			if ( document.body.clientWidth >= 980 ) { 
    				this['$p_j2'](obj);
    			}
    			
    			obj.isLastTablet = false; 
    			this.datasetTablet(obj.elCompnt, ''); 
    			return false; 
        	}
    	}

        this['$p_j2'](obj);
    },

    

    "$basket-option-window": function(obj) {
        obj.hidden = (obj.hidden) ? false : true; 
        this.datasetHidden(obj.elCompnt, obj.hidden);
        this.datasetHidden(obj.elOpen, obj.hidden);
    },

    

    "$toggleHidden": function(obj) {
        obj.hidden = (obj.hidden) ? false : true; 
        this.datasetHidden(obj.elCompnt, obj.hidden);
    },

    "$scrollLeft": function(obj, tabElement) {
        var newCurrent = this.nextIndex( obj.current, obj.elItems.length );
        var windowWidth = window.innerWidth; 
        var isWide = (windowWidth >= 980); 
        var widthPx = (isWide) ? 245 : 256; 
        var count = (isWide) ? 4 : 3; 
        var len = obj.elItems.length; 

        obj.elList.scrollLeft = newCurrent * widthPx;

        if ( newCurrent === (len-count) ) {
            this.datasetState(obj.elCompnt, 'last');
            return false; 
        }

        this.datasetState(obj.elCompnt, 'none');
        this.setCurrent(obj, newCurrent); 
    }, 

    "$openTopmenuTabpanels": function(obj) {
        this.datasetCurrent(obj.elCompnt, obj.current); 
    },
    
    "$closeTopmenuTabpanels": function(obj) {
        this.datasetCurrent(obj.elCompnt, ''); 
    },

    "$optionChangeEvent": function(obj, el){

        var len = obj.elItems.length;
        var elIdx = this.datasetIndex(el); 

        for ( var i = 0; i < len ; i++ ) {
             
             this.datasetChecked(obj.elItems[i], false);    
        }

        this.datasetChecked(obj.elItems[elIdx], true);   
        
        this.setCurrent(obj, elIdx);
        this.datasetCurrent(obj.elCompnt, elIdx); 

        obj.elHeaderText.innerText= el.children[0].innerText;

        this['$toggleExpanded'](obj);
    },

    "$tabCurrent": function(obj, el) {
        var newCurrent = this.datasetIndex(el); 

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
    }, 

    "$buttonCurrent": function(obj, el) {
        var newCurrent = this.datasetIndex(el); 

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
    },


    // 상품상세 옵션들 
    "$toggleCurrent-ProductDetailOptions": function(obj, optionType) {
    	// 단순 CSS로 on/off를 수행하므로 스크롤한 상태에서 off하고 다시 on했을 때 스크롤을 처음으로 이동시키는 목적
    	// 옵션마다의 첫 아이템, 메시지를 항상 노출할 목적 
    	cc.getModel( (obj.current === '') ? optionType : obj.current ).elList.scrollTop = 0;
    	
    	obj.current = (obj.current === optionType) ? '' : optionType;
    	this.datasetCurrent(obj.elCompnt, obj.current); 
    },

    "$toggleOpen": function(obj) {
    	obj.open = (obj.open) ? false : true; 
        this.datasetOpen(obj.elCompnt, obj.open);
    },
    "$toggleExpanded": function(obj) {
        obj.expanded = (obj.expanded) ? false : true; 
        this.datasetExpanded(obj.elCompnt, obj.expanded);
    },
    "$toggleSelected": function(obj, el) {
        var oldCurrent = obj.current; 
        var newCurrent = this.datasetIndex(el); 

        if ( oldCurrent !== undefined ) {
            this.datasetSelected( obj.elItems[oldCurrent], false ); 
        }

        if ( newCurrent !== 'undefined' ) {
            this.datasetSelected( obj.elItems[newCurrent], true );
        }

        if ( newCurrent === 'undefined' ) {
            this.setCurrent(obj, undefined); 
            this.datasetCurrent(obj.elCompnt, '');
            return false; 
        }

        this.setCurrent(obj, newCurrent); 
        this.datasetCurrent(obj.elCompnt, newCurrent); 
    },
    "$compnt-option--x@basket": function(obj, el) {
        // this['$toggleExpanded'](obj); 
        this['$toggleSelected'](obj, el); 

        obj.elTitle.innerText = obj.elItems[obj.current].getElementsByTagName('SPAN')[0].innerText; 
    }, 
    "$compnt-option--xx@basket": function(obj, className) {
        var __expanded = true; 

        if ( obj.current === className ) {
            __expanded = false; 
            className = ''; 
        }

        obj.expanded = __expanded;
        this.datasetExpanded(obj.elCompnt, __expanded);

        this.setCurrent(obj, className); 
        this.datasetCurrent(obj.elCompnt, className); 
    }
};


var lo = {
    thisLocation: {},
    fileName: '', 
    className: '',
    setFileName: function() {
        var pathname = this.thisLocation.pathname; 
        var arr = pathname.split('/'); 
        var arrLenght = arr.length; 

        this.fileName = arr[arrLenght-1]; 
    },
    getFileName: function() {
        return this.fileName; 
    }, 
    setClassName: function() {
        this.className = this.fileName.replace('.', '--'); 
    },
    getClassName: function() {
        return className; 
    }, 
    setBodyClassName: function() {
    	document.body.className = this.className; 
    }, 
    init: function() {
        this.thisLocation = window.location; 
        this.setFileName(); 
        this.setClassName(); 
        this.setBodyClassName(); 
    }
};

 
lo.init();
cc.init(); 
