import React, {Component} from 'react';
import EsriLoaderReact from 'esri-loader-react';

export default class BasicMap extends Component {


  static  widgetDef = [
    {type: 'Map', path: 'esri/Map'},
    {type: 'MapView', path: 'esri/views/MapView'},
    {type: 'Graphic', path: 'esri/Graphic'},
    {type: 'Point', path: 'esri/geometry/Point'},
    {type: 'SimpleMarkerSymbol', path: 'esri/symbols/SimpleMarkerSymbol'},
    {type: 'Polyline', path: 'esri/geometry/Polyline'},
    {type: 'SimpleLineSymbol', path: 'esri/symbols/SimpleLineSymbol'},
    {type: 'Polygon', path: 'esri/geometry/Polygon'},
    {type: 'SimpleFillSymbol', path: 'esri/symbols/SimpleFillSymbol'},
  ];

  constructor(props) {
    super(props);
    this.state = {shapes: [], isLoading: true};
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/shapes')
      .then(response => response.json())
      .then(data => this.setState({shapes: data, isLoading: false}));
  }

  addPoint(view, shape, Point, Graphic, SimpleMarkerSymbol) {

    const markerSymbol = new SimpleMarkerSymbol({
      color: [227, 139, 79, 0.8],
      outline: {
        color: [0, 0, 0],
        width: 1
      }
    });
    const p =  shape.points[0];
    const point = new Point({
      longitude: p.longitude,
      latitude: p.latitude
    });

    const pointGraphic = new Graphic({
      geometry: point,
      symbol: markerSymbol
    });
    view.graphics.add(pointGraphic);
  }

  addLine(view, shape, Polyline, Graphic, SimpleLineSymbol) {
    // var polyline = new Polyline({
    //   paths: [
    //     [-84.42, 33.78],
    //     [-84.42, 33.80]
    //   ]
    // });
    // // Create a symbol for drawing the line
    // var lineSymbol = new SimpleLineSymbol({
    //   color: [226, 119, 40],
    //   width: 4
    // });
    //
    // // Create a line graphic
    // var polylineGraphic = new Graphic({
    //   geometry: polyline,
    //   symbol: lineSymbol
    // })
    //
    // // Add the graphic to the view
    // view.graphics.add(polylineGraphic);
    const lineSymbol = new SimpleLineSymbol({
      color: [227, 139, 79, 0.8],
      width: 2
    });
    let polylinePoints = [];

    shape.points.forEach(point => {
      polylinePoints.push([point.longitude, point.latitude]);
    });
    console.log(polylinePoints);
    const polyline = new Polyline({
      paths: polylinePoints
    });

    const polylineGraphic = new Graphic({
      geometry: polyline,
      symbol: lineSymbol
    });
    view.graphics.add(polylineGraphic);
  }


  addPolygon(view, shape, Polygon, Graphic, SimpleFillSymbol) {

    const fillSymbol = new SimpleFillSymbol({
      color: [227, 139, 79, 0.8],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    });
    let polygonRings = [];

    shape.points.forEach(point => {
      polygonRings.push([point.longitude, point.latitude]);
    });

    const polygon = new Polygon({
      rings: polygonRings
    });


    const polygonGraphic = new Graphic({
      geometry: polygon,
      symbol: fillSymbol
    });
    view.graphics.add(polygonGraphic);
  }

  onReady = (Map, MapView, Graphic, Point, SimpleMarkerSymbol, Polyline, SimpleLineSymbol, Polygon, SimpleFillSymbol, containerNode) => {
    const {shapes} = this.state;

    const map = new Map({basemap: 'topo'});

    const view = new MapView({
      container: containerNode,
      map: map,
      center: [-84.4, 33.78],
      zoom: 12
    });

    shapes.forEach(shape => {
      const shapeType = shape.shape;
      switch (shapeType) {
        case 'Point' :
          this.addPoint(view, shape, Point, Graphic, SimpleMarkerSymbol);
          break;
        case 'Line' :
          this.addLine(view, shape, Polyline, Graphic, SimpleLineSymbol);
          break;
        case 'Polygon' :
          this.addPolygon(view, shape, Polygon, Graphic, SimpleFillSymbol);
          break;
        default:
          console.log('Unmapped shape: ' + shape.shape);
      }
    });
  }

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const paths = BasicMap.widgetDef.map(w => w.path);
    // console.log(paths);

    const options = {
      url: 'https://js.arcgis.com/4.9/init.js'
    };

    return (
      <div style={{flex: '1 1 auto'}}>
        <EsriLoaderReact
          options={options}
          modulesToLoad={paths}
          onReady={({loadedModules: [Map, MapView, Graphic, Point, SimpleMarkerSymbol, Polyline, SimpleLineSymbol, Polygon, SimpleFillSymbol], containerNode}) => {
            this.onReady(Map, MapView, Graphic, Point, SimpleMarkerSymbol, Polyline, SimpleLineSymbol, Polygon, SimpleFillSymbol, containerNode)
          }}
        />
        );
      </div>
    );
  }
}