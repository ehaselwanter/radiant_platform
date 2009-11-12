// this is a bit of glue between platform's mootools scripts and the multimap api
// nothing will work unless you also load the multimap javascripts from http://developer.multimap.com/API/maps/1.2/[apikey]

MMDataResolver.setDataPreferences(MM_WORLD_MAP, [904]);

var MMap = new Class({
  initialize: function (element) { 
    this.container = element;
    this.viewer = new MultimapViewer( element );
    this.viewer.addWidget(new MMSmallPanZoomWidget());
    this.viewer.addWidget(new MMMapTypeWidget());
    this.viewer.setAllowedZoomFactors(13, 15);
    this.routes = [];
    this.points = [];
    this.container.getElement('a.route').each(function (a) { 
      this.routes.push(new Route(a, this)); 
      a.dispose(); 
    }, this);
  },
  displayRoute: function (route) {
    this.viewer.addOverlay(route.polyline);
    route.markers.each(function (m) {
      this.viewer.createMarker( m.point, { 'text' : m.mark, 'label' : m.label} ).setInfoBoxContent("<p>" + m.label + "</p>");
    });
    this.points.extend(route.points);
    this.reposition();
  },
  reposition: function () {
    this.viewer.goToPosition( this.viewer.getAutoScaleLocation( this.points ) );
  }
});

var Route = new Class ({
  initialize: function (element, mmap) { 
    this.url = element.get('href');
    this.title = element.get('text');
    this.points = [];
    this.markers = [];
    this.polyline = null;
    new Request({url : this.url, onSuccess : this.parseGPX.bind(this)});
  },
  parseGPX: function (responseText, responseXML) {
    var elements = responseXML.documentElement.getElementsByTagName( 'trkpt' );
    if (elements.length == 0) elements = responseXML.documentElement.getElementsByTagName('rtept');
    elements.each(function (element) {
      var lat = parseFloat(element.getAttribute('lat'));
      var lon = parseFloat(element.getAttribute('lon'));
      var point = new MMLatLon( lat, lon);
      var name_element = element.getElementsByTagName('name')[0];
      this.points.push(point);
      var label = name_element ? name_element.firstChild.nodeValue : element.getAttribute('title');
      if (label && !label.match(/^WP/)) this.addLabel(point, '!', label);
    }, this);
    this.addLabel(this.points.first, '>');
    this.addLabel(this.points.getLast(), '@');
    this.display();
  },
  addLabel: function (point, mark, label) {
    this.markers.push( {'point' : point, 'mark' : mark, 'label' : label} );
  },
  polyLine: function () {
    if (!this.polyline) this.polyline = new MMPolyLineOverlay( this.points, undefined, 0.4, 1, false, undefined );
    return this.polyline;
  },
  display: function () {
    this.mmap.displayRoute(this);
  }
});




activations.push(function (scope) {
	scope.getElements('div.mapviewer').each(function (div) { new MMap(div); });
});
