var activations = [];
var top_z = null;

window.addEvent('domready', function(){
  activate();
});

activations.push(function (scope) {
  fadeNotices.delay(4000);
});

var activate = function (scope) {
  if (!scope) scope = document;
  activations.each(function (fun) { fun.run(scope); });
};

var topZ = function () {
  if (top_z) return top_z;
  $$('*').each(function (element) {
    z = parseInt(element.getStyle('z-index'), 10);
    if (z > top_z) top_z = z;
  });
  return top_z;
};

var fadeNotices = function () {
  $$('div.notice, div.error').fade('out');
};

Element.implement({
  front: function () {
    top_z = topZ() + 1;
    this.setStyle('z-index', top_z);
  }
});
