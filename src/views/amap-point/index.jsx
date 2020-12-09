import React from "react"

import 'ol/ol.css'
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { XYZ, Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Style, Icon } from 'ol/style'
import Overlay from 'ol/Overlay'

import coordImg from '../../assets/images/coord.png'

import './style.scss'

export default class Test extends React.Component {

  constructor() {
    super();
    this.state = {
      center: [113.263865, 23.124012],
      size: 40,
      popupData: {
        center: [],
        size: ''
      }
    }
  }

  componentDidMount() {

    var container = document.getElementById('popup')
    var closer = document.getElementById('popup-closer')
    var overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 50
      }
    })

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    }



    const gaodeMapLayer = new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
      })
    });
    const map = new Map({
      target: 'map',
      layers: [gaodeMapLayer],
      overlays: [overlay],
      view: new View({
        center: this.state.center,
        projection: 'EPSG:4326',
        zoom: 10
      })
    });



    let img = new Image()
    img.src = coordImg
    img.onload = () => {
      let source = new VectorSource({ wrapX: false })
      let Style = this.getCanvas(img)
      let vector = new VectorLayer({
        source: source,
        style: Style
      })
      map.addLayer(vector)
      var PointFeature = new Feature({
        geometry: new Point(this.state.center)
      })
      PointFeature.set('data', this.state)
      vector.getSource().addFeature(PointFeature)
    }

    map.on('click', (evt) => {
      let feature = map.forEachFeatureAtPixel(evt.pixel, e => {
        return e
      })

      if (feature) {
        const data = feature.get('data')
        this.setState({
          popupData: data
        })
        overlay.setPosition(data.center)
        map.getView().setCenter(data.center)
      } else {
        console.log(evt.coordinate)
      }
    })

  }

  getCanvas(img) {
    var canvas = document.createElement('canvas')
    canvas.width = this.state.size
    canvas.height = this.state.size
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, this.state.size, this.state.size)

    return new Style({
      image: new Icon({
        anchor: [0.45, 25], // 锚点
        anchorOrigin: 'top-right', // 锚点源
        anchorXUnits: 'fraction', // 锚点X值单位
        anchorYUnits: 'pixels', // 锚点Y值单位
        offsetOrigin: 'top-right', // 偏移原点
        opacity: 1,
        img: canvas, // 图标的URL
        imgSize: canvas ? [canvas.width, canvas.height] : undefined
      })
    })
  }


  render() {
    const { popupData } = this.state;
    return (
      <div className="map-box">
        <div id="map" className="map"></div>
        <div id="popup" className="ol-popup">
          <div className="popup-top">
            <span className="popup-title">Point info</span>
            <a id="popup-closer" href="#map" className="ol-popup-closer" />
          </div>
          <div className="popup-content">
            <ul id="popup-content" >
              <li>经纬度:{popupData.center}</li>
              <li>iconSize:{popupData.size}</li>

            </ul>
          </div>
        </div>
      </div>

    )
  }
}



