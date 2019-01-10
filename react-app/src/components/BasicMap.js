import React, {Component} from 'react';
import EsriLoaderReact from 'esri-loader-react';

export default class BasicMap extends Component {


  static  widgetDef = [
    {type: 'Map', path: 'esri/Map'},
    {type: 'MapView', path: 'esri/views/MapView'},
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

  static addPoint(view, shape) {

    const markerSymbol = {
      type: 'simple-marker',
      color: [227, 139, 79, 0.8],
      outline: {
        color: [0, 0, 0],
        width: 1
      }
    };

    const p =  shape.points[0];
    const point = {
      type: 'point',
      longitude: p.longitude,
      latitude: p.latitude
    };

    const pointGraphic = {
      type: 'graphic',
      geometry: point,
      symbol: markerSymbol
    };

    view.graphics.add(pointGraphic);
  }

  static addLine(view, shape) {
    const lineSymbol = {
      type: 'simple-line',
      color: [227, 139, 79, 0.8],
      width: 2
    };
    let polylinePoints = [];

    shape.points.forEach(point => {
      polylinePoints.push([point.longitude, point.latitude]);
    });
    const polyline = {
      type: 'polyline',
      paths: polylinePoints
    };

    const polylineGraphic = {
      type: 'graphic',
      geometry: polyline,
      symbol: lineSymbol
    };

    view.graphics.add(polylineGraphic);
  }


  static addPolygon(view, shape) {

    const fillSymbol = {
      type: "simple-fill",
      color: [227, 139, 79, 0.8],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };
    let polygonRings = [];

    shape.points.forEach(point => {
      polygonRings.push([point.latitude, point.longitude]);
    });

    // const polygon = new Polygon({
    const polygon = {
      type: 'polygon',
      rings: polygonRings
    };

    const polygonGraphic = {
      type: 'graphic',
      geometry: polygon,
      symbol: fillSymbol
    };

    view.graphics.add(polygonGraphic);
  }

  static addBorder(view) {
    const fillSymbol = {
      type: 'simple-fill',
      color: [0, 0, 0, 0.1],
      outline: {
        color: [255, 255, 255],
        width: 1
      }
    };

    const polygon = {
      type: 'polygon',
      rings: [
        [0, 10],
        [64, 10],
        [64, 45],
        [0, 45],
        [0, 10],
      ]
    };

    const polygonGraphic = {
      type: 'graphic',
      geometry: polygon,
      symbol: fillSymbol
    };

    view.graphics.add(polygonGraphic);
  }

  onReady = (Map, MapView, containerNode) => {
    const {shapes} = this.state;

    const map = new Map({basemap: 'topo'});

    const view = new MapView({
      container: containerNode,
      map: map,
      center: [37.5, 22.5],
      zoom: 4
    });

    BasicMap.addBorder(view);

    shapes.forEach(shape => {
      const shapeType = shape.shape;
      switch (shapeType) {
        case 'Point' :
          BasicMap.addPoint(view, shape);
          break;
        case 'Line' :
          BasicMap.addLine(view, shape);
          break;
        case 'Polygon' :
          BasicMap.addPolygon(view, shape);
          break;
        default:
          console.log('Unmapped shape: ' + shape.shape);
      }
    });
  };

  render() {
    const {isLoading} = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }

    const paths = BasicMap.widgetDef.map(w => w.path);

    const options = {
      url: 'https://js.arcgis.com/4.9/init.js'
    };

    return (
      <div style={{flex: '1 1 auto'}}>
        <EsriLoaderReact
          options={options}
          modulesToLoad={paths}
          onReady={({loadedModules: [Map, MapView], containerNode}) => {
            this.onReady(Map, MapView, containerNode)
          }}
        />
      </div>
    );
  }
}