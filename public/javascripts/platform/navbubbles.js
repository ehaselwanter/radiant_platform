var menu = null;

var Menu = new Class({
  initialize: function(element){
    this.container = element;
    this.items = [];
    this.container.getElements('li.mi').each(function (li) { 
      this.items.push(new MenuItem(li, this));
    }, this);
    menu = this;
  },
  topMargin: function () {
    return this.container.getTop();
  },
  bottomMargin: function () {
    return this.topMargin() + (this.items.length * 30);
  },
  marginAbove: function (item) {
    var pos = this.items.indexOf(item);
    var offset = 0;
    if (pos == -1) offset = this.bottomMargin();
    else offset = this.topMargin() + (pos * 30);
    return offset;
  },
  repin: function () {
    this.items.each(function (item) {
      item.pin();
    }, this);
  }
});


/* these stretch rightwards on mouseover */

var MenuItem = new Class({
  initialize: function (li, nav) {
    this.container = li;
    this.nav = nav;
    this.head = li.getElement('a');
    this.head.addClass('head');
    this.submenu = li.getElement('ul');
    this.when_hiding = {
      'padding' : 0,
      'margin' : 4,
      'border-color' : '#ffffff',
      'opacity' : 0.5,
      'font-size' : 12
    };
    this.when_showing = {
      'padding' : 4,
      'margin' : 0,
      'margin-left' : -4,
      'margin-top' : 0,
      'border-color' : '#d1005d',
      'opacity' : 1,
      'font-size' : 16
    };
    if (this.head) {
      var awidth = this.head.getWidth();
      var liwidth = this.container.getWidth();
      this.container.setStyles({
        'width' : awidth + 2,
        'left' : liwidth - awidth - 4
      });
    }
    this.when_hiding['width'] = this.container.getWidth();
    if (this.submenu) {
      this.when_showing['width'] = parseInt((this.when_hiding['width'] + this.submenu.measure( function(){ return this.getWidth(); } )) * 1.32, 10);
      this.submenu.setStyle('display', 'inline');
    } else {
      this.when_showing['width'] = parseInt(((this.when_hiding['width'] - 4) * 1.3) + 4, 10);
    }

    this.container.addEvent('mouseenter', this.enter.bindWithEvent(this));
    this.container.addEvent('mouseleave', this.leave.bindWithEvent(this));
    this.hider = null;
    this.shower = null;
    this.pin();
  },
  pin: function (argument) {
    this.container.pin();
    var offset = this.nav.marginAbove(this);
    this.container.setStyle('top', offset);
    return this;
  },
  lazyGetShower:function (argument) {
    if (!this.shower) this.shower = new Fx.Morph(this.container, {duration: 'short', transition: Fx.Transitions.Sine.easeOut});
    if (this.shower) return this.shower;
  },
  lazyGetHider:function (argument) {
    if (!this.hider) this.hider = new Fx.Morph(this.container, {duration: 'normal', transition: Fx.Transitions.Cubic.easeOut, onComplete : this.finishHiding.bind(this)});
    return this.hider;
  },
  enter: function (e) {
    unevent(e);
    this.show();
  },
  leave: function (e) {
    unevent(e);
    this.hideSoon();
  },
  interrupt: function () {
    $clear(this.timer);
    this.container.get('morph').cancel();
  },
  show: function (e) {
    unevent(e);
    this.interrupt();
    this.container.bringForward();
    this.lazyGetShower().start(this.when_showing);
  },
  hide: function (e) {
    unevent(e);
    this.interrupt();
    this.lazyGetHider().start(this.when_hiding);
    // this.container.get('morph').start(this.when_hiding).chain(this.finishHiding.bind(this));
  },
  hideSoon: function (e) {
    unevent(e);
    this.timer = this.hide.bind(this).delay(400);
  },
  finishHiding: function () {
    // this.container.removeClass('over');
  }
});




activations.push(function (scope) {
	scope.getElements('ul.navbubbles').each(function (ul) { new Menu(ul); });
});
