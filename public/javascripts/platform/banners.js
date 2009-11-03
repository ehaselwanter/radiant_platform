var Banner = new Class({
  Extends: Bouncer,
  initialize: function (element) {    
    this.caption = element.getElement('div.caption');
    this.parent(element);
  },
  afterInitialize: function () { this.hide(); },
  activeElement: function () { return this.caption; },
  durationIn: function () { return 100; },
  setShownAndHiddenStates: function () {
    this.when_hiding = {'height' : 0};
    this.when_showing = {'height' : 46};
  }
});

activations.push(function (scope) {
	scope.getElements('a.banner').each(function (a) { new Banner(a); });
});
