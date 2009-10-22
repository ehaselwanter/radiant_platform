var menu = null;

var Menu = new Class({
  initialize: function(element){
    this.container = element;
    this.items = [];
    this.container.getElements('li.mi').each(function (li) { this.items.push(new MenuItem(li, this)); }, this);
    menu = this;
  },
  size: function () {
    return this.items.length;
  }
});


/* these stretch rightwards on mouseover */

var MenuItem = new Class({
  initialize: function (li, nav) {
    this.container = li;
    this.nav = nav;
    this.head = li.getElement('a');
    this.submenu = li.getElement('ul');
    this.when_hiding = {
      'padding' : 0,
      'margin' : 4,
      'background-color' : '#ffffff'
    };
    this.when_showing = {
      'padding' : 4,
      'margin' : 0,
      'background-color' : '#1bb68b'
    };
    if (this.submenu) {
      var clone = li.clone().addClass('over').setStyle('margin-left', '-2000px').inject(this.nav.container);
      this.when_hiding['width'] = li.getWidth();
      this.when_showing['width'] = clone.getWidth();    
      clone.destroy();
    }
    this.head.addClass('head');
    this.container.set('morph', {duration: 'short'});
    this.container.addEvent('mouseenter', this.enter.bindWithEvent(this));
    this.container.addEvent('mouseleave', this.leave.bindWithEvent(this));
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
    this.container.addClass('over');
    this.container.get('morph').start(this.when_showing);
  },
  hide: function (e) {
    unevent(e);
    this.interrupt();
    this.container.get('morph').start(this.when_hiding).chain(this.finishHiding.delay(200));
  },
  hideSoon: function (e) {
    unevent(e);
    this.timer = this.hide.bind(this).delay(200);
  }
});




activations.push(function (scope) {
	scope.getElements('.navbubbles').each(function (div) { new Menu(div); });
});
