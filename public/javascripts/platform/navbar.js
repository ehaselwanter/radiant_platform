var NavBar = new Class({
  Extends: Bouncer,
  initialize: function (element) {    
    this.head = element.getElement('thead');
    this.opento = element.getHeight();
    this.closeto = this.head.getHeight() - 1;
    this.parent(element);
  },
  transitionIn: function () { return Fx.Transitions.Bounce.easeOut; },
  transitionOut: function () { return Fx.Transitions.Cubic.easeOut; },
  durationIn: function () { return 'normal'; },
  durationOut: function () { return 'long'; },
  setShownAndHiddenStates: function () {
    this.when_hiding = {'height' : this.closeto};
    this.when_showing = {'height' : this.opento};
  },
  afterInitialize: function () { this.hide(); },
  beforeShowing: function () { this.container.addClass('open'); this.visible = true; },
  afterHiding: function () { this.container.removeClass('open'); this.visible = false;  }
});

activations.push(function (scope) {
	scope.getElements('#navigation').each(function (div) { new NavBar(div); });
});
