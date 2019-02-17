function    loadGoogleIconsCSS(){
      let myStyle = document.createElement('link')
      myStyle.setAttribute('rel', "stylesheet")
      myStyle.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
      document.body.appendChild(myStyle) 
      console.log(myStyle)
    }

loadGoogleIconsCSS();
class MenuThis{
    constructor(
    myThis = window, 
    Id = 'id_' + Math.random(),
    x = 0,
    y = 0,
    parentObject = window.document
  ){
    this.Id = Id;
    this.myThis = myThis;
    this.x = x;
    this.y = y;
    this.items = [];  //test for relavalance
    this.name = null;
    this.className = null;
    this.attached = [];
    this.attachedMenu = null;
    this.BGcolor     = null; 
    this.fontFamily  = "Arial";
    this.textColor    = "navy";
    this.borderColor = "navy";
    this.borderWidth = 1; //testing 1 VS 1
    this.textSize     = 12;
    this.borderRadius = 3;
    this.textAlign    = "center",
    this.onRemove    = null;
    this.zIndex = null;
    this.mouseover   = { isOn: false, callback: null, exitCallback: null };
    this.contextMenu = null;
    this.childObjs   = {};
    this.data        = {};
    this.parentObject = parentObject;
    this.holdParentObject = [];
  }
  defaultPositionStyles(x,y, el = this.returnLastChild() ) { 
    el.style.position = "absolute";
    el.style.top = this.y + y + "px";
    el.style.left = this.x + x + "px";
    return this;
  }
  defaultBaseStyles(el,x,y) { 
    this.defaultPositionStyles(x, y, el);
    this.nonPositionBaseStyles(el);
  }
  nonPositionBaseStyles(el) {
    el.id = this.Id;
    if( this.className !== null)
      el.className = this.className;
    el.style.zIndex = this.zIndex;
    el.style.textAlign = this.textAlign;
    el.style.fontSize = this.textSize+"px";
    el.style.fontFamily = this.fontFamily;
    el.style.color = this.textColor;
    el.style.background = this.BGcolor;
    el.style.cursor = 'pointer';
  }
  defaultBorderStyles(el) {
    this.getBorderXY(el);
    el.style.borderStyle = "solid";
    el.style.borderRadius = this.borderRadius + "px";
    el.style.borderWidth = this.borderWidth + "px";
    el.style.borderColor = this.borderColor;
  }
  getBorderXY(el = this.returnLastChild() ) {
    const tx = el.style.left.slice(0,-2)-this.borderWidth;
    const ty = el.style.top.slice(0,-2)-this.borderWidth;
    el.style.top = ty + "px";
    el.style.left = tx + "px";
  }
  appendParent(child) {
    if( this.parentObject === window.document ) {
      // console.log('ParentOpject:', this.parentObject);
      document.body.appendChild(child);
    } else {
      // console.log('ParentOpject:', this.parentObject);
      this.parentObject.appendChild(child);
    }
  }
  startChildren( lastChild = this.returnLastChild() ) {
    this.holdParentObject.push( this.parentObject );
    this.parentObject = lastChild;
    return this;
  }
  endChildren() {
    if( this.holdParentObject.length > 0 ) {
      this.parentObject = this.holdParentObject.pop();
    } else {
      this.parenObject = window.document;
    }
    // console.log('endChildren:', this.parentObject)
    return this;
  }
  setContextMenuCallback(callback){
    this.contextMenu = callback;
    return this;
  }
  setMouseoverCallback (callback){
    this.mouseover.callback = callback;
    this.mouseover.isOn = true;
    return this;
  }
  setMouseoverExitCallback (callback) {
    this.mouseover.exitCallback = callback;
    return this;
  }
  setMouseoverIsOn (flag = false){
    this.mouseover.isOn = flag;
    return this;
  }
  setOnRemove (callBack){
    this.onRemove = callBack;
    return this;
  }
  setAttached( items ) {
    this.attached = items;
    return this;
  }
  setName( name ) {
    this.name = name;
    return this;
  }
  setClassName( className ) {
    this.className = className;
    return this;
  }
  pushAttached( items ) {
    this.attached.push(...items);
    return this;
  }
  clearAttached() {
    this.attached = [];
    return this;
  }
  setAttachedMenu(menu) {
    this.attachedMenu = menu;
    return this;
  }
  setAttachedMenuName(menuName) {
    this.attachedMenu = menuName;
    return this;
  }
  removeAttached() {
    this.attached.forEach( el => {
      el.remove();
      // console.log(el.parentNode);
      // if( el.parentNode !== null)
        // el.parentNode.removeChild(el)
  });
    this.attached = [];
  }
  setBGcolor (color){
    this.BGcolor = color;
    return this;
  }
  setBorderColor (color){
    this.borderColor = color;
    return this;
  }
  setBorderWidth (width){
    this.borderWidth = width;
    return this;
  }
  setZindex (zIndex){
    this.zIndex = zIndex;
    return this;
  }
  setBorderRadius (radius){
    this.borderRadius = radius;
    return this;
  }
  setFontFamily (font){
    this.fontFamily = font;
    return this;
  }
  setTextColor (color){
    this.textColor = color;
    return this;
  }
  setTextSize (size){
    this.textSize = size;
    return this;
  }
  setTextAlign (align){
    this.textAlign = align;
    return this;
  }
  returnLastChild(){
    if( this.parentObject === window.document ) {
      return document.body.lastChild;
    } else {
      return this.parentObject.lastChild;
    }

  }
  resetStyles(lastChild = this.returnLastChild() ) {
    lastChild.style = null;
    if( lastChild.children ) {
      console.log( 'ResetStyles:', lastChild, lastChild.children, lastChild.childNodes);
      Array.from(lastChild.children).map((child) => child.style = null);
      //_.map( lastChild.children, (child) => child.style = null);
    }
    return this;
  }
  addClass(classToAdd) {
    document.body.lastChild.classList.add(classToAdd);
    if( document.body.lastChild.children ) {
      Array.from(document.body.lastChild.children).map(child => {
        child.classList.add(classToAdd);
      });
      //_.map( document.body.lastChild.children, child => {
        //child.classList.add(classToAdd);
      //})
    }
    return this;
  }
  removeClass(classToRemove){
    document.body.lastChild.classList.remove(classToReove);
    return this;
  }
  action(action, callback){
    let lastM = document.body.lastChild;
    lastM[action] = callback;
    if( lastM.tagName === 'DIV' && false) {
      lastM = lastM.previousSibling;
      if( lastM.tagName === 'CANVAS') {
          lastM[action] = callback;
      }
    }
    return this;
  }
  addListener(eventType, callback, bubble = false){
    let lastM = document.body.lastChild;
    lastM.addEventListener(eventType, callback, bubble);
    if( lastM.tagName === 'DIV' && false) {
      lastM = lastM.previousSibling;
      if( lastM.tagName === 'CANVAS') {
          lastM.addEventListener(eventType, callback, bubble);
      }
    }
    return this;
  }
  attribute(attr, propSetting){
    let lastM = document.body.lastChild;
    lastM.setAttribute(attr, propSetting);
     return this;
  }
  property(prop, propSetting){
    let lastM = document.body.lastChild;
    //console.log(lastM);
    lastM[prop] = propSetting;
    return this;
  }
  cssOnCondition(condition, prop, propSetting, lastM = document.body.lastChild){
    if(condition){
      lastM.style[prop] = propSetting;
    }
    return this;
  }
  css(prop, propSetting, lastM = this.returnLastChild() ){
    //let lastM = document.body.lastChild;
    if( lastM.tagName === 'DIV' 
        && lastM.previousSibling.tagName === 'CANVAS'
        && prop === 'background') {
      lastM.previousSibling.style[prop] = propSetting;
    } else {
      lastM.style[prop] = propSetting;
    }
    return this;
  }
  onCondition( condition ){
    if( !condition ) {
      let lastM = document.body.lastChild;
      document.body.removeChild(lastM);
      if( lastM.canvas){
        document.body.removeChild(lastM.canvas)
      }
    }
    return this;
  }
  itemRemoveTimer( mils = 10){//this.parent
    let lastM = document.body.lastChild;
    setTimeout( ()=> {
      document.body.removeChild(lastM);
      if( lastM.canvas){
        document.body.removeChild(lastM.canvas)
      }
    }, mils*1000);
    return this;
  }
  hide( vis ){
    let lastM = document.body.lastChild;
    if(vis){
      document.body.removeChild(lastM);
    } else {
      document.body.appendChild(lastM);
    }
  }
  addLastChild(key){
    this.childObjs[key] = document.body.lastChild;
    return this;
  }
  createKey(dataKey, valueKey = "innerHTML"){
    this.data[dataKey] = document.body.lastChild;
    return this;
  }
  returnDataBinding(key, lastChild = this.returnLastChild() ){
    console.log(lastChild[key])
    return (x) => lastChild[key] = x;
  }
  returnDataBindingProp(prop, key, lastChild = document.body.lastChild ){
    //let lastChild = document.body.lastChild;
     return (x) => lastChild[prop][key] = x;
  }
  bindDataToKey(obj, key, binding = 'innerHTML' ){
    obj[key] = this.returnDataBinding(binding);
    return this;
  }
  returnDataBindingAttribute(attribute, lastChild = document.body.lastChild ){
    //let lastChild = document.body.lastChild;
    console.log('hasAttribute:', lastChild.hasAttribute(attribute))
    return (x) => {
      console.log(lastChild,attribute,x);
      lastChild.setAttribute(attribute, x);
    }
  }
  bindAttributeToKey(obj, key, attribute = 'name' ){
    obj[key] = this.returnDataBindingAttribute(attribute);
    return this;
  }
  bindDataToPropKey(obj, key, bindProp = 'style', bindKey = 'background'){
    obj[key] = this.returnDataBindingProp(bindProp, bindKey);
    return this;
  }
  setData(bindDataKey, valueKey, value){
    console.log(bindDataKey, valueKey, value)
    this.data[bindDataKey][valueKey] = value;
    console.log(this.data[bindDataKey][valueKey])
    return this;
  }
  log(title = '') {
    console.log({
      title,
      el: document.body.lastChild,
      children: document.body.lastChild.children,
    })
    return this;
  }
}
MenuThis.prototype.clear = function(){
  var x = document.getElementById(this.Id);
  this.items = [];
  while(x != null){
    if( x.id === this.Id){
      this.items.push(x);
      try {
        x.remove();
      }
      catch ( err ) {
        console.log('I cought it',err);
      }
    }
    x = document.getElementById(this.Id);
  }
  x = document.getElementById(this.attachedMenu);
   while(x != null){
    if( x.id === this.attachedMenu){
      this.items.push(x);
      x.remove();
    }
    x = document.getElementById(this.attachedMenu);
  }
  if( this.attached.length !== 0) {
    this.attached.forEach( (a) => {
      this.items.push(a);
      a.remove();
    })
  }
  return this;
};
MenuThis.prototype.renderAttached = function() {
 if( this.attached !== [] ) {
   this.attached.forEach( el => {
      //if( el.parentNode !== null) {
        // el.parentNode.removeChild(el);
        // el.remove();
         this.appendParent(el);
      //}
    })
 }
}
MenuThis.prototype.unClear = function(){
  this.items.forEach( (x) => this.appendParent(x) );
  this.renderAttached();
  //this.attached.forEach( (x) => this.appendParent(x) );
  return this;
}
MenuThis.prototype.loadAttachedDeprecated = function(){
  if( this.attached.length !== 0 ) {
      this.attached.forEach( (a) => {
        this.items.push(a) 
      })
  }
  return this;
};
MenuThis.prototype.loadAttachedMenu = function(){
  if( this.attachedMenu !== null) {
    this.attached = this.attachedMenu.returnItems();
    this.items = [...this.items, ...this.attached];
    console.log('mergedItems:', this.items);
  }
  return this;
};
MenuThis.prototype.loadAttached = function(){
  var x = this.parentObject.getElementById(this.attachedMenu);
  while(x != null){
    if( x.id === this.attachedMenu){
      this.items.push(x);
    }
    x = x.nextElementSibling;
  }
  return this;
};
MenuThis.prototype.load = function(){
  var x = this.parentObject.getElementById(this.Id);
  this.items = [];
  while(x != null){
    if( x.id === this.Id){
      this.items.push(x);
    }
    x = x.nextElementSibling;
  }
  return this;
};
MenuThis.prototype.returnItems = function(){
  this.load()
  return this.items;
};
MenuThis.prototype.menuRemoveTimer = function( seconds = 10){
  setTimeout( () => this.clear(), seconds*1000);
  return this;
}
MenuThis.prototype.minamize= function(offsetX = 0, offsetY = 0){
  this.clear();
  const mn = new MenuThis(null, this.Id+"minimize")
    .textXR(
      '-'+this.Id+'-', 
      Number(this.items[0].style.left.slice(0, -2)) + offsetX,
      Number(this.items[0].style.top.slice( 0, -2)) + offsetY,
      () => this.unClear()
    )
    .css('backgroundColor','white');
  return this;
}
MenuThis.prototype.moveTo = function(
  x,
  y,
  callback = null,
  attachedItems = null,
  moveWith = false,
) {
  this.load();
  this.loadAttached();
  const myX = Number(this.items[0].style.left.slice( 0, -2));
  const myY = Number(this.items[0].style.top.slice( 0, -2));
  console.log('MoveTo',x,y,myX,myY);
  this.moveBy(x - myX,y - myY);
}
MenuThis.prototype.move = function(
  callback = null, 
  offsetX = 0, 
  offsetY = 0, 
  attachedItems = null, 
  moveWith = false
) {
  this.load();
  this.loadAttached();
  const myOnmousemove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    //event.cancelBubble = true;
    this.moveBy(event.movementX, event.movementY);
    if( moveWith ) {
      let itemZeroXm = parseInt(this.items[0].style.left.slice(0, -2));
      let itemZeroYm = parseInt(this.items[0].style.top.slice(0, -2));
      callback(itemZeroXm, itemZeroYm);
    }
  }
  const myOnmouseup = () => {
    //this.clear();
    //this.unClear();
    if(callback !== null && this.items[0]){
      let itemZeroX = parseInt(this.items[0].style.left.slice(0, -2));
      let itemZeroY = parseInt(this.items[0].style.top.slice(0, -2));
      this.items = [];
      callback(itemZeroX, itemZeroY);
    }
    document.removeEventListener('mousemove',myOnmousemove);
    document.removeEventListener('mouseup',myOnmouseup);
  }
  document.addEventListener('mousemove',myOnmousemove);
  document.addEventListener('mouseup',myOnmouseup);
  return this;
}
MenuThis.prototype.moveBy= function(dx, dy){
  this.x += dx;
  this.y += dy;
  this.items.forEach( (x) => {
    x.style.left = (Number(x.style.left.slice(0,-2)) + dx)+"px";
    x.style.top  = (Number(x.style.top.slice( 0,-2)) + dy)+"px";
  });
  return this;
}
MenuThis.prototype.mergeOptions = function ( defaultOptions, optionsToAdd) {
  let combinedOptions = defaultOptions;
  for(let key in optionsToAdd) {
    if( key !== 'parentRule') {
      combinedOptions[key] = optionsToAdd[key];
    }
  }
  return combinedOptions;
}
MenuThis.prototype.input = function(
  text, 
  x, y = null, 
  callback = null,
  defaultValue = '',
  options = {},
  uniqueOptions = {}
) {
  let defaultOptions = {
    BGcolor: 'pink',
    xOffset: 0,
    deleteOnInput: true,
    removeOnInput: false,
    clearOnInput: true,
  }
  if( typeof defaultValue !== 'string' ) {
    uniqueOptions = options;
    // options = defaultValue; this line or the next will work.
    // testing object lifecycle
    Object.assign(options, defaultValue);
    defaultValue = '';
  }
  const el = document.createElement("input");
  if( typeof x === 'function' ) {
    uniqueOptions = typeof callback === 'object' ? callback : {};
    options = typeof y === 'object' && y !== null ? y : {};
    callback = x;
  }
  if( y === null || typeof y === 'object') {
    this.nonPositionBaseStyles(el);
  }  else {
    this.defaultBaseStyles(el, x, y);
  }
  this.defaultBorderStyles(el);
  this.mergeOptions(options, uniqueOptions);
  this.mergeOptions(defaultOptions, options);
  defaultValue && defaultValue !== ''  ? el.value = defaultValue : null;
  el.style.width = '100px';
  el.style.textAlign = 'left';
  el.style.paddingLeft = "6px";
  el.style.cursor = 'text';
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  //el.type  = options.type || "text";//Testing
  if( options.hasOwnProperty('attributes')) {
    Object.keys(options.attributes).forEach( att => {
      console.log({
        setAtt: 'input:',
        att: att,
        optAtt: options.attributes[att],
      })
      el.setAttribute(att,options.attributes[att])
    })
  }
  if( callback !== null ){
    el.onchange = (e) => {
      callback(e);
      if( defaultOptions.clearOnInput ) {
        e.target.value = '';
      }
      if( defaultOptions.deleteOnInput) {
        this.clear();
      }
      if( defaultOptions.removeOnInput ){
        if(el) {
          console.log(el.parentNode.tagName);
          console.log(el.parentElement);
          if( el.parentNode.tagName === 'LABEL') {
            el.parentElement.remove();
          } else {
            el.remove();
          }
          // el.parentNode.removeChild(el);  
        }
      }
    }
    //el.onkeydown = (e)  => {
      //document.body.font = e.target.style.fontSize + ' ' + e.target.style.fontFamily;
      //const dashWidth = .measureText('_').width; 
      //const width = Number(el.style.width.slice(0,-2));
      //if( myTextContext.measureText(el.value).width > ( width - dashWidth ) && width !== 0) {
        //el.style.width = width + dashWidth  + 'px'
      //}
    //}
    el.onkeyup = (e)  => {
      if( options.continuous ) {
        callback(e);
      }
      //if( e.keyCode === 13) {
        //console.log(el.value);
        //onchange(e);
      //}
    }

  }
  if( text !== null && text !== '' && text !== '-'){
    var submit = document.createElement("label");
    let xoff = options.xOffset ? options.xOffset : 0;
    if(!options.hasOwnProperty('xOffset') || options.xOffset === 0){
      xoff = myTextContext.measureText(text).width + 6;
      console.log('xoff:',xoff, text, text.length);
    }
    this.defaultBaseStyles(submit, x - xoff, y);
    submit.innerText = text;
    el.style.position = 'relative';
    el.style.left = '6px';
    el.style.top = '0px';
    submit.appendChild(el);
    this.appendParent(submit);
  } else {
    this.appendParent(el);
  }
  if( options.focus ) {
    el.focus()
  }
  el.tabIndex = options.tabIndex || "0";
  return this;
}
MenuThis.prototype.checkboxOnOff = function(
  textOn, 
  textOff, 
  x, y, 
  callback = null,  
  checked = false,
  options = {},
) {
  console.log('checkbox')
  const el = document.createElement("input");
  const checkTextEl = document.createElement("div");
  this.defaultBaseStyles(el,x,y);
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  el.name = textOn;
  el.value = 'checkbox';
  el.checked = checked;
  el.type = "checkbox";
  el.onchange = (e) => {
    if( el.checked ){
      callback(e);
      checkTextEl.innerHTML = textOff;
    } else {
      callback(e);
      checkTextEl.innerHTML = textOn;   
    }
  };
  this.defaultBaseStyles(checkTextEl, x + 30, y);
  this.defaultBorderStyles(checkTextEl);
  this.mergeOptions(checkTextEl.style, options.style  )
  this.mergeOptions(checkTextEl, options.el);
  checkTextEl.innerHTML = checked ? textOff : textOn;
  this.appendParent(el);
  this.appendParent(checkTextEl);
  return this;
}
MenuThis.prototype.pushTagToObject= function(
  obj,
  tag, 
  text, 
  callback = null,
  options = {}
){
  const el = document.createElement(tag);
  this.nonPositionBaseStyles(el);
  this.setCallbacks(el, callback);
  this.mergeOptions(el.style, options.style);
  this.mergeOptions(el, options.el);
  // this.appendParent(el);
  if( text instanceof HTMLElement ) { // HTMLDivElement
    el.appendChild(text);
  }
  if( Array.isArray(text) && text[0] instanceof HTMLElement ) {
    text.forEach( elm => el.appendChild(elm) )
  }else  {
    el.innerHTML = text;
  }
  if(obj.hasOwnProperty('tags') && Array.isArray(obj.tags)){
     obj.tags.push(el);
  } else {
     obj.tags = [el];
  }
  console.log('pushTagToObject',el);
  return this;
}
MenuThis.prototype.returnTag = function(
  tag, 
  text,
  callback = null,
  options = {},
  children = [],
){
  const el = document.createElement(tag);
  this.nonPositionBaseStyles(el);
  if( typeof callback === 'function') {
    this.setCallbacks(el, callback);
  } else {
    children = Array.isArray(options) ? options : [];
    options = callback ? callback : {};
    callback = null;
  }
  this.mergeOptions(el.style, options.style);
  this.mergeOptions(el, options.el);
  this.attachChildren(el, text, children);
  /*
  if( text instanceof HTMLElement ) { // HTMLDivElement
    el.appendChild(text);
  } else if( Array.isArray(text) && text[0] instanceof HTMLElement ) {
    text.forEach( elm => el.appendChild(elm) )
  } else  {
    el.innerHTML = text;
  }
  children.forEach( elm => el.appendChild(elm) )
  // console.log('returnTags',el);
  */
  return el;
}
MenuThis.prototype.attachChildren= function(
  el,
  html = null,
  children = [],
){
  if( html instanceof HTMLElement ) { // HTMLDivElement
    el.appendChild(html);
  } else if( Array.isArray(html)) {
    html.forEach( elm => {
      if( elm instanceof HTMLElement )
        el.appendChild(elm);
    })
  } else  {
    el.innerHTML = html;
  }
  children.forEach( elm => {
    if( elm instanceof HTMLElement )
      el.appendChild(elm)
  })
}
MenuThis.prototype.createTag= function(
  tag, 
  text,
  x, 
  y = null, 
  callback = null,
  options = {},
  children = []
){
  const el = document.createElement(tag);
  if( typeof x === 'function' || x === null ) {
    // uniqueOptions = typeof callback === 'object' ? callback : {};
    options = typeof y === 'object' && y !== null ? y : {};
    children = callback !== null ? callback : [];
    callback = x;
  }
  if( y === null || typeof y === 'object') {
    this.nonPositionBaseStyles(el);
  }  else {
    this.defaultBaseStyles(el, x, y);
  }
  this.mergeOptions(el.style, options.style);
  this.mergeOptions(el, options.el);
  this.setCallbacks(el, callback);
  this.attachChildren(el, text, children);
  this.appendParent(el);
  // console.log('createTag',el, children);
  return this;
}
MenuThis.prototype.HTML = function(
  html,
  x,
  y,
  callback,
  options = {},
){ 
   console.log('HTML');
   if( typeof run.value === 'function') {
      this.text(run.value(html),x,y,callback,null,null,options);
   } else {
     console.log('HTML.fail')
     this.text(html,x,y,callback,null,null,options);
   }
  return this;
}
MenuThis.prototype.icon= function(
  icon, x, y, 
  callback = null, 
  color = null, 
  size = null, 
  options = {}
){
  const el = document.createElement('i');
  this.appendParent(el);
  this.defaultBaseStyles(el,x,y);
  this.mergeOptions(el.style, options.style);
  this.mergeOptions(el, options.el);
  el.className = "material-icons"
  el.style.fontSize  =  size ? size + 'px' : el.style.fontSize.slice(0,-2) * 2 + "px"; //size
  el.style.color = color || el.style.color;
  el.style.fontFamily = null;
  el.innerHTML = icon;
  if ( callback !== null ) {
    el.onclick = (e, data) => {
      console.log(`${icon}:click`,e, data);
      if( typeof callback === 'function'){
        callback(e);
      }
    };
  }
  if ( this.mouseover.isOn ) {
    el.onmouseover = (e) => this.mouseover.callback(e);
    if( this.mouseover.exitCallack !== null ) {
      el.onmouseleave = (e) => this.mouseover.exitCallback(e);
    }
  }
  return this;
}
MenuThis.prototype.img= function(
  src, x, y, 
  callback = null, 
  width = 200, 
  height = 200, 
  options = {}
){
  let el = document.createElement('img');
  this.defaultBaseStyles(el, x, y);
  //this.defaultBorderStyles(el);
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  el.setAttribute('src', src);
  el.style.height = height + "px";
  el.style.width = width + "px";
  this.setCallbacks(el, callback);
  this.appendParent(el);
  return this;
}
MenuThis.prototype.button= function(text, x, y, callback = null, options = {}){
  let el = document.createElement('button');
  this.defaultBaseStyles(el, x, y);
  this.defaultBorderStyles(el);
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  //el.type = 'button';
  el.innerHTML = text;
  el.onclick = (e) => {
    if(typeof callback === 'function') 
      callback(e);
  };
  this.appendParent(el);
  return this;
}
MenuThis.prototype.radioButton = function(
  text, x, y, 
  callback, 
  group = "myRadio",
  checked = 'checked',
  options = {}
){
  const el = document.createElement("input");
  const radioTextEl = document.createElement("div");
  this.defaultBaseStyles(el, x, y);
  el.value          = text;
  el.name           = group;
  el.checked        = checked;
  el.type           = "radio";
  el.onchange = (e) => {
    if( typeof callback === 'function') {
      callback(e);
    }
    el.checked = "checked";     
    if( el.checked && false){
      if(el.value === 'checked'){
        textDiv.innerHTML = "<strike>"+text+"</strike>";
      } else {
        textDiv.innerHTML = el.value 
      }
    } else {
      console.log("radioButton.else");   
    }
  }
  this.defaultBaseStyles(radioTextEl, x+30, y);
  this.mergeOptions(radioTextEl.style, options.style  )
  this.mergeOptions(radioTextEl, options.el);
  radioTextEl.innerHTML = text;
  this.appendParent(el);
  this.appendParent(radioTextEl);
  return this;
}
MenuThis.prototype.range = function(
  text, x, y, 
  callback = null,
  min = 0,
  max = 100,
  defaultValue = 50,
  continous = true,
  options = {}
){
  const el = document.createElement("input");
  this.defaultBaseStyles(el,x,y);
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  el.min = min;
  el.max = 100 + min;
  el.value = defaultValue
  el.type  = "range";
  el.className = text;
  if (callback !== null && !continous) {
    el.onchange = (e) => {
      callback((e.target.value*max/100));
    }
  } else if (callback !== null && continous) {
    el.oninput = (e) => {
      callback((e.target.value*max/100));
   }
  }
  this.appendParent(el);
  return this;
}
MenuThis.prototype.rect = function(
  x, 
  y, 
  width,
  height, 
  backgroundColor = this.BGcolor,
  zIndex = null, 
  callback = null,
  options = {}
) { 
  const el = document.createElement('div');
  this.defaultBaseStyles(el, x, y);
  el.style.width = width + 'px';
  el.style.height = height + 'px';
  el.style.zIndex = zIndex;
  el.style.background = backgroundColor;
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  //const ctx = new Drawing(0,0,0, cv);
  //ctx.clearScreen(backgroundColor);
  this.appendParent(el);
  if( callback !== null ) {
    el.addEventListener('click',(e) => callback(e));
  }
  return this;
}
MenuThis.prototype.text = function(
  text,
  x,
  y, 
  callback = null, 
  textColor = null, 
  BGcolor = null, 
  options = {},
  boundData = {},
  //bindKey = text,
) { 
  var el = document.createElement("div");
  this.defaultBaseStyles(el, x, y);
  el.style.padding= "0 4px 0 4px";
  el.style.background = null;
  if( text instanceof HTMLDivElement ) {
    el.appendChild(text);
  }
  if( Array.isArray(text) && text[0] instanceof HTMLDivElement ) {
    text.forEach( elm => el.appendChild(elm) )
  }else  {
    el.innerHTML = text;
  }
  if( textColor ) {
    el.style.color = textColor;
  }
  if( BGcolor) {
    el.style.background = BGcolor;
  }
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  //el.style.color = textColor ? textColor : el.style.color;
  //el.style.background = BGcolor ? BGcolor : el.style.background;
  this.setCallbacks(el, callback);
  this.appendParent(el);
  //console.log(boundData);
  if( options.right === true ) {
    const tempLeft = el.style.left;
    el.style.left = null;
    el.style.right = tempLeft;
  }
  if( options.log === true )
    console.log('text.el:', el)
  if( boundData !== {} && boundData.hasOwnProperty('obj')) {
    boundData.obj[boundData.key] = this.returnDataBinding('innerHTML'); // , el); //[[Object.keys(boundData)[0]]]
  }
  return this;
}
MenuThis.prototype.textarea= function(
  text,
  x, 
  y, 
  callback = null, 
  rows = 20, 
  cols = 60, 
  options = {}
){
  const el = document.createElement('textarea');
  this.defaultBaseStyles(el, x, y);
  this.defaultBorderStyles(el);
  this.mergeOptions(el.style, options.style  )
  this.mergeOptions(el, options.el);
  el.style.cursor = 'text';
  el.style.textAlign = 'left';
  el.rows = rows;
  el.cols = cols;
  if ( options.continuous && callback !== null ) {
    el.onkeyup = (e) => callback(e);
  }
  if ( callback !== null ) {
    el.onclick = (e) => { 
      if( typeof callback === 'function'){
         callback(e);
      }
    };
  }
  el.value = text;
  this.appendParent(el);
  return this;
}
MenuThis.prototype.select= function(
  text, 
  x,
  y, 
  callback = null, 
  selections =[null],
  options = {},
  boundData = {}
){
  let el = document.createElement('SELECT');
  this.defaultBaseStyles(el, x, y);
  if( callback !== null ){
    el.onclick = (e) => {    
      if( typeof callback === 'function'){
        callback(e);
      }
    }
  }
  for(let i = 0; selections[i]; i++){
    let option = document.createElement("option");
    option.text = selections[i];
    option.value = selections[i];
    el.add(option);
  }
  this.appendParent(el);
  if( boundData !== {} && boundData.hasOwnProperty('obj')) {
    boundData.obj[boundData.key] = this.returnDataBinding('value'); // , el); //[[Object.keys(boundData)[0]]]
  }
  el.value = text;
  return this;
}
MenuThis.prototype.setCallbacks = function (el, callback, remove = false ) {
  if( callback !== null ) {
    el.addEventListener('click', (event) => { 
      event.stopPropagation();
      if( remove === 'delete' ) {
        console.log('delete.el')
        document.body.removeChild(el);  
      } else if( remove === 'remove' || remove === true ) {
        console.log('remove.el')
        this.clear();
        if( this.onRemove !== null && typeof this.onRemove === 'function' ){
          this.onRemove();
        }
      }
      if( typeof callback === 'function'){
        callback(event);
      } else if ( Array.isArray(callback) ) {
        // eval(this.callbackToString(callback));
        this.callArrayAsFn(callback);
      }
    });
  }
  if ( this.mouseover.isOn ) {
    el.onmouseover = (e) => this.mouseover.callback(e);
    if( this.mouseover.exitCallack !== null ) {
      el.onmouseleave = (e) => this.mouseover.exitCallback(e);
    }
  }
}

MenuThis.prototype.callArrayAsFn = function (callback) {//test
  let myCallback = this.myThis;
  if( typeof callback !== 'string' ) {
    for( let i = 0; callback[i]; i++){
      myCallback = myCallback[ callback[i] ];
      console.log(typeof myCallback);
      console.log(myCallback, callback.slice(i+1));
      if(typeof myCallback === "function" ){
        myCallback.bind(this.myThis)(...callback.slice(i+1));
        break;
      }
    }
  }
  else{
      return callback;
  }
};


