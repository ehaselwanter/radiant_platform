var menu = null;

var Menu = new Class({
  initialize: function(element){
    this.container = element;
    this.menu = [];
    this.container.getElements('li.mi').each(function (li) { this.menu.push(new MenuItem(li, this)); }, this);
    menu = this;
  }
});


/* these stretch rightwards on mouseover */

var MenuItem = new Class({
  initialize: function (li, nav) {
    this.container = li;
    this.nav = nav;
    this.head = li.getElement('a');
    this.submenu = li.getElement('ul');
    
    this.showing = {
      'margin': '-4px 0 0 -6px',
      'font-size': '17px',
      'padding': '3px'
    };
    this.hiding = {
      'margin': '3px',
      'font-size': '14px',
      'padding': '0'
    };
    
    var clone = this.container.clone().setStyles(this.showing).setStyles({'display': 'inline', 'margin-left': '-2000px'}).inject(this.nav.container);
    this.hiding['width'] = this.head.getWidth() + 6;
    this.showing['width'] = clone.getWidth();
    clone.destroy();
    var offset = nav.menu.length * 24;
    var boundary = this.nav.container.getCoordinates();
    this.container.setStyles({
      'position':'fixed',
      'top': boundary.top + offset + 'px',
      'left': (boundary.left + boundary.width + 6 - this.hiding['width']) + 'px'
    });
    
    this.head.addClass('head');
    this.container.set('morph', {duration: 'short'});
    this.container.addEvent('mouseenter', this.enter.bindWithEvent(this));
    this.container.addEvent('mouseleave', this.leave.bindWithEvent(this));
    this.hide();
  },
  
  enter: function (argument) {
    this.container.bringForward();
    this.container.addClass('over');
    this.show();
  },
  leave: function (argument) {
    this.hideSoon();
  },
  interrupt: function () {
    $clear(this.timer);
    this.container.get('morph').cancel();
  },
  show: function (e) {
    unevent(e);
    this.interrupt();
    this.container.get('morph').start(this.showing);
  },
  hide: function (e) {
    unevent(e);
    this.interrupt();
    this.container.get('morph').start(this.hiding).chain(this.finishHiding.bind(this));
  },
  hideSoon: function (e) {
    unevent(e);
    this.timer = this.hide.bind(this).delay(200);
  },
  finishHiding: function () {
    this.container.removeClass('over');
  }
});

activations.push(function (scope) {
	scope.getElements('.navbubbles').each(function (div) { new Menu(div); });
});
