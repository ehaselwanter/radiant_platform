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

var SlidingSet = new Class ({
  Extends: TabSet,
  initialize: function (tag) {
    this.parent(tag);
    this.slidecontainer = $(this.tag + '_container');
    this.slideholder = $(this.tag + '_scroller');
    this.slidecontainer.setStyle('width', 10000 );
    this.slideholder.setStyle('overflow', 'hidden');
    this.fx = new Fx.Scroll(this.slideholder, {transition: 'cubic:out'});
    $$('a.' + this.tag + '_next').each(function (a) { a.addEvent('click', this.showNext.bind(this)); }, this);
    $$('a.' + this.tag + '_next').each(function (a) { a.addEvent('click', this.showPrev.bind(this)); }, this);
    this.timer = null;
    this.rolling = false;
    // this.play();
  },
  select: function (tab) {
    this.stop();
    this.selectWithoutStop(tab);
  },
  selectWithoutStop: function (tab) {
    if (!tab || tab == this.foreground) return false;
    tab.show();
    this.fx.toElement(tab.tabbody);
    if (this.foreground) this.foreground.hide();
    this.foreground = tab;
  },
  play: function (e) {
    unevent(e);
    this.rolling = true;
    this.selectWithoutStop(this.next());
    this.timer = window.setInterval( function () { this.selectWithoutStop(this.next()); }, 8000 );
    $$('a.stopit').each(function (element) { 
      element.removeClass('paused'); 
      if (element.get('text') != '' ) element.set('text', 'stop bloody moving.');
    });
  },
  stop: function (e) {
    unevent(e);
    $clear(this.timer);
    this.rolling = false;
    $$('a.stopit').each(function (element) { 
      element.addClass('paused'); 
      if (element.get('text') != '' ) element.set('text', 'bored now. do something.');
    });
  },
  toggle: function (e) {
    return this.rolling ? this.stop(e) : this.play(e);
  }
});

activations.push(function (scope) {
  scope.getElements('.rollertab').each(function (a) { new SlidingTab(a); });
});
