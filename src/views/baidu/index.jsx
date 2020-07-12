import React from "react"

import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import { transform } from 'ol/proj';

import * as proj from 'ol/proj';


import projzh from 'projzh';
import * as olExtent from 'ol/extent';
import './style.scss'

import coordtransform from 'coordtransform'

export default class Test extends React.Component {

  constructor() {
    super();
    this.state = {
      homehot1: [],
    }
  }

  componentDidMount() {
    
    var extent = [72.004, 0.8293, 137.8347, 55.8271];

    var baiduMercator = new proj.Projection({
      code: 'baidu',
      extent: olExtent.applyTransform(extent, projzh.ll2bmerc),
      units: 'm'
    });
    
    proj.addProjection(baiduMercator);
    proj.addCoordinateTransforms('EPSG:4326', baiduMercator, projzh.ll2bmerc, projzh.bmerc2ll);
    proj.addCoordinateTransforms('EPSG:3857', baiduMercator, projzh.smerc2bmerc, projzh.bmerc2smerc);

    var bmercResolutions = new Array(19);
    for (var i = 0; i < 19; ++i) {
      bmercResolutions[i] = Math.pow(2, 18 - i);
    }


    var map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            tileGrid: new TileGrid({
              resolutions: bmercResolutions,
              origin: [0, 0],
              extent: olExtent.applyTransform(extent, projzh.ll2bmerc),
              tileSize: [256, 256]
            }),
            tileUrlFunction: function(tileCoord) {
              var URLS_LENGTH = 5

              var x = tileCoord[1]
              var y = -tileCoord[2] -1
              var z = tileCoord[0]

              var hash = (x << z) + y
              var index = hash % URLS_LENGTH
              index = index < 0 ? index + URLS_LENGTH : index

              if (x < 0) {
                  x = 'M' + (-x)
              }
              if (y < 0) {
                  y = 'M' + (-y)
              }
              return 'http://online{}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=2'
                  .replace('{}', index).replace('{x}', x).replace('{y}', y).replace('{z}', z)
            }
          })
        })
      ],
      view: new View({
        center: transform([113.263865, 23.124012], 'EPSG:4326', 'EPSG:3857'),
        zoom: 10,
      })
    });

    map.on('click', function (evt) {
      let coord =transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326')
      console.log('bd09togcj02',coordtransform.bd09togcj02 (coord[0],coord[1]))
      console.log('gcj02tobd09',coordtransform.gcj02tobd09 (coord[0],coord[1]))
      console.log('wgs84togcj02',coordtransform.wgs84togcj02 (coord[0],coord[1]))
      console.log('gcj02towgs84',coordtransform.gcj02towgs84 (coord[0],coord[1]))
    })

  }

  render() {
    return (
      <div className="map-box">
        <div id="map" className="map"></div>
      </div>

    )
  }
}



