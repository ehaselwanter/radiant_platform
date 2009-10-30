var menu = null;

var Menu = new Class({
  initialize: function(element){
    this.container = element;
    this.items = [];
    this.item_height = 24;
    this.container.getElements('li.mi').each(function (li) { 
      this.items.push(new MenuItem(li, this));
    }, this);
    menu = this;
  },
  topMargin: function () {
    return this.container.getTop();
  },
  bottomMargin: function () {
    return this.topMargin() + (this.items.length * this.item_height);
  },
  marginAbove: function (item) {
    var pos = this.items.indexOf(item);
    var offset = 0;
    if (pos == -1) offset = this.bottomMargin();
    else offset = this.topMargin() + (pos * this.item_height);
    return offset;
  }
});

var MenuItem = new Class({
  Extends: Bouncer,
  initialize: function (li, nav) {
    this.nav = nav;
    this.head = li.getElement('a');
    this.head.addClass('head');
    this.head.set('tween', {duration : 'short'});
    this.submenu = li.getElement('ul');
    this.parent(li);
    this.delay_before_hiding = 400;
  },
  setShownAndHiddenStates: function () {
    this.when_hiding = {
      'padding' : 0,
      'margin' : 4,
      'font-size' : 12
    };
    this.when_showing = {
      'padding' : 4,
      'margin' : 0,
      'margin-left' : -16,
      'margin-top' : -8,
      'font-size' : 22
    };
    if (this.head) {
      var awidth = this.head.getWidth();
      var liwidth = this.container.getWidth();
      this.container.setStyles({
        'width' : awidth + 2,
        'left' : liwidth - awidth - 4
      });
      this.when_hiding['width'] = this.container.getWidth();
    }
    if (this.submenu) {
      this.when_showing['width'] = parseInt((this.when_hiding['width'] + this.submenu.measure( function(){ return this.getWidth(); } )) * 1.8, 10);
      this.submenu.setStyle('display', 'inline');
    } else {
      this.when_showing['width'] = parseInt(((this.when_hiding['width'] - 4) * 2) + 4, 10);
    }
  },
  afterInitialize: function () {
    this.container.pin();
    var offset = this.nav.marginAbove(this);
    this.container.setStyle('top', offset);
    return this;
  },
  beforeShowing: function () {
    this.container.addClass('over');
    this.head.tween('color', '#d1005d');
    this.container.bringForward();
  },
  beforeHiding: function () {
    this.head.tween('color', '#e0ded8');
  },
  afterHiding: function () {
    this.container.removeClass('over');
  }
});




activations.push(function (scope) {
	scope.getElements('ul.navbubbles').each(function (ul) { new Menu(ul); });
});
