var tabsets={};

var Tab = new Class({
  initialize: function(element){
    this.tabhead = element;
    this.name = this.tabhead.get('text');
    var parts = element.id.split('_');
    this.tag = parts.pop();
    this.settag = parts.pop();
    this.tabbody = $(this.settag + '_' + this.tag);
    this.tabset = tabsets[this.settag] || new TabSet(this.settag);
    this.tabset.addTab(this);
    this.tabhead.onclick = this.select.bindWithEvent(this);
  },
  select: function (e) {
    unevent(e);
    this.tabset.select(this);
  },
  show: function(){
    this.tabhead.addClass('fg');
    this.tabbody.addClass('fg');
  },
  hide: function(){
    this.tabbody.removeClass('fg');
    this.tabhead.removeClass('fg');
  }
});

var TabSet = new Class({
  initialize: function(tag){
    this.tabs = [];
    this.tag = tag;
    this.foreground = null;
    tabsets[this.tag] = this;
  },
  addTab: function (tab) {
    this.tabs.push(tab);
    if (this.tabs.length == 1) {
      tab.show();
      this.foreground = tab;
    } else {
      tab.hide();
    }
  },
  select: function (tab) {
    this.tabs.each(function (t) { 
      if (t.tag == tab.tag) {
        t.show();
        this.foreground = t;
      } else {
        t.hide();
      }
    }, this);
  }
});

activations.push(function (scope) {
  scope.getElements('.tab').each(function (a) { new Tab(a); });
});
