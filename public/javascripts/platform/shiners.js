var Shiner = new Class({
  Extends: Bouncer,
  initialize: function (element) {    
    this.foreground = element.getElement('img');
    this.parent(element);
    this.delay_before_hiding = 250;
  },
  setShownAndHiddenStates: function () {
    this.when_hiding = {'opacity' : 0.2};
    this.when_showing = {'opacity' : 1};
  },
  activeElement: function () { return this.foreground; },
  durationIn: function () { return 100; },
  durationOut: function () { return 'long'; },
  afterInitialize: function () { this.hide(); },
  beforeShowing: function () { this.visible = true; },
  afterHiding: function () { this.visible = false;  }
});

activations.push(function (scope) {
	scope.getElements('.shiner').each(function (div) { new Shiner(div); });
});
