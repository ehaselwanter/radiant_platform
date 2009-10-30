var ImageList = new Class({
  initialize: function (element) { 
    this.container = element;
    this.contents = [];
    this.container.getElements('li').each(function (li) { this.contents.push(new ImageListItem(li, this)); }, this);
  }
});

var ImageListItem = new Class({
  initialize: function (element, list) { 
    this.ready = false;
    this.list = list;
    this.container = element;
    this.image = this.container.getElement('img');
    this.container.addEvent('mouseover', this.caption.bindWithEvent(this));
    this.url = this.image.get('src').replace('_small', '_full');
    this.preview = new Asset.image(this.url, {title: this.image.get('title'), onload: this.makeReady.bind(this)});
  },
  caption: function (e) {
    unevent(e);
    captioner.display(this);
  },
  makeReady: function () {
    
  }
});

var Captioner = new Class({
  Extends: Bouncer,
  initialize: function () {
    this.parent(new Element('div', {'class' : 'captioner'}));
    this.zoomer = new Element('a', {'class' : 'zoomer', 'href' : '#'}).inject(this.container);
    this.image = new Element('img', {'class' : 'captioned'}).inject(this.zoomer);
    this.title = new Element('h4', {'class' : 'title'}).inject(this.container);
    this.caption = new Element('p', {'class' : 'caption'}).inject(this.container);
    this.container.inject(document.body);
    this.now_showing = null;
    this.visible = false;
    this.container.set('morph', {'duration' : 'short'});
    this.container.set('tween', {'duration' : 'normal'});
    this.zoomer.addEvent('click', this.zoom.bindWithEvent(this));
  },
  setTriggers: function () {
    this.container.addEvent('mouseleave', this.hideSoon.bindWithEvent(this));
  },
  display: function (item) {
    this.now_showing = item;
    this.placeOver();
    this.copyFrom();
    this.show();
  },
  placeOver: function () {
    var itemat = this.now_showing.image.getCoordinates();
    var to = {
      left: itemat['left'] - 8,
      top: itemat['top'] - 8,
      width: itemat['width']
    };
    // if (this.visible) this.container.morph(to);
    
    this.container.setStyles(to);
  },
  copyFrom: function () {
    this.caption.set('text', this.now_showing.image.get('title'));
    this.title.set('text', this.now_showing.image.get('alt'));
    this.image.set('src', this.now_showing.image.get('src'));
  },
  afterHiding: function () {
    this.now_showing = null;
    this.visible = false;
  },
  beforeShowing: function () {
    this.visible = true;
  },
  zoom: function (e) {
    unevent(e);
    if (this.now_showing) {
      console.log('zoom!');
    }
  }
});


var captioner = null;

activations.push(function (scope) {
  captioner = new Captioner();
  scope.getElements('ul.imagelist').each( function (ul) { new ImageList(ul); }); 
});
