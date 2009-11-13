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
    this.container.getElements('a.route').each(function (a) { 
      this.routes.push(new Route(a, this)); 
      a.dispose(); 
    }, this);
  },
  domify: function (string) {
    return this.viewer.parseXML( string );
  },
  displayRoute: function (route) {
    var line = route.buildPolyLine();
    this.viewer.addOverlay(line);
    route.markers.each(function (m) {
      var mark = this.viewer.createMarker( m.point, {'text' : m.mark});
      var label = null;
      if (m.name) label = "<h3>" + m.name + "</h3>";
      if (m.comment) label = label + "<p>" + m.comment + "</p>";
      if (label) mark.setInfoBoxContent(label);

    }, this);
    this.points.extend(route.points);
    this.reposition();
  },
  reposition: function () {
    this.viewer.goToPosition( this.viewer.getAutoScaleLocation( this.points ) );
  }
});

var Route = new Class ({
  initialize: function (element, mmap) { 
    this.mmap = mmap;
    this.url = element.get('href');
    this.title = element.get('text');
    this.points = [];
    this.markers = [];
    this.polyline = null;
    this.request = new Request({method : 'GET', url : this.url, onSuccess : this.parseGPX.bind(this)});
    this.request.send();
  },
  parseGPX: function (response) {
    var gpx = this.mmap.domify( response );
    elements = gpx.documentElement.getElementsByTagName('trkpt');
    if (elements.length == 0) elements = gpx.documentElement.getElementsByTagName('rtept');

    // elements is a NodeList, not an array, and doesn't have an each().
    for( var i = 0; i < elements.length && i < 1000; ++i ) {
      el = elements[i];
      var lat = parseFloat(el.getAttribute('lat'));
      var lon = parseFloat(el.getAttribute('lon'));
      var point = new MMLatLon( lat, lon);
      this.points.push(point);

      var name_element = el.getElementsByTagName('name')[0];
      var comment_element = el.getElementsByTagName('desc')[0];
      var name = name_element ? name_element.firstChild.nodeValue : el.getAttribute('title');
      var comment = comment_element ? comment_element.firstChild.nodeValue : null;
      if (comment || (name && !name.match(/^WP/))) this.addMarker(point, '!', name, comment);
    };
    if (this.points.length > 0) {
      this.addMarker(this.points[0], '>', this.title);
      this.addMarker(this.points.getLast(), '@', 'finish');
    }    
    this.display();
  },
  addMarker: function (point, mark, name, comment) {
    if (!mark) mark = "!";
    this.markers.push( {'point' : point, 'mark' : mark, 'name' : name, 'comment' : comment} );
  },
  buildPolyLine: function () {
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
