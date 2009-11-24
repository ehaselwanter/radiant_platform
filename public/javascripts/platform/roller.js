var SlidingTab = new Class({
  Extends: Tab,
  findOrCreateSet: function (argument) {
    this.tabset = tabsets[this.settag] || new SlidingSet(this.settag);
    this.tabset.addTab(this);
  },
  setTriggers: function () {
    this.tabhead.onclick = this.select.bindWithEvent(this);
  }
});

var roller = null;
var SlidingSet = new Class ({
  Extends: TabSet,
  initialize: function (tag) {
    this.parent(tag);
    this.slidecontainer = $(this.tag + '_container');
    this.slideholder = $(this.tag + '_scroller');
    this.slidecontainer.setStyle('width', 10000 );
    this.slideholder.setStyle('overflow', 'hidden');
    this.fx = new Fx.Scroll(this.slideholder, {transition: 'cubic:out'});
    $$('a.' + this.tag + '_next').each(function (a) { a.addEvent('click', this.showNext.bindWithEvent(this)); }, this);
    $$('a.' + this.tag + '_previous').each(function (a) { a.addEvent('click', this.showPrev.bindWithEvent(this)); }, this);
    this.toggles = $$('a.stopit');
    this.toggles.each(function (a) { a.addEvent('click', this.toggle.bindWithEvent(this)); }, this);
    this.timer = null;
    this.rolling = false;
    this.roll();
  },
  select: function (tab) {
    this.stop();
    this.selectWithoutStop(tab);
  },
  selectWithoutStop: function (tab) {
    if (!tab) tab = this.next();
    tab.show();
    this.fx.toElement(tab.tabbody);
    if (this.foreground) this.foreground.hide();
    this.foreground = tab;
  },
  moveAndRoll: function (e) {
    unevent(e);
    this.selectWithoutStop();
    this.roll();
  },
  roll: function () {
    this.timer = this.selectWithoutStop.bind(this).delay(8000);
    this.rolling = true;
    this.toggles.each(function (a) { 
      a.removeClass('paused'); 
      if (a.get('text') != '' ) a.set('text', 'stop');
    });
  },
  stop: function (e) {
    unevent(e);
    $clear(this.timer);
    this.rolling = false;
    this.toggles.each(function (a) { 
      a.addClass('paused'); 
      if (a.get('text') != '' ) a.set('text', 'go');
    });
  },
  toggle: function (e) {
    return this.rolling ? this.stop(e) : this.moveAndRoll(e);
  }
});

activations.push(function (scope) {
  scope.getElements('.rollertab').each(function (a) { new SlidingTab(a); });
});
