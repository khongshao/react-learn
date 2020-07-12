import React from "react"

import 'ol/ol.css';
import { Map, View } from 'ol';
import {Tile as TileLayer , Vector as VectorLayer} from 'ol/layer';
import {XYZ,Cluster,Vector as VectorSource} from 'ol/source';
import {Circle as olCircle, Fill, Stroke, Style, Text} from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import './style.scss'

export default class Test extends React.Component {

  componentDidMount() {


    const gaodeMapLayer = new TileLayer({
      source: new XYZ({
        url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7'
      })
    });
    const map = new Map({
      target: 'map',
      layers: [gaodeMapLayer],
      view: new View({
        center: [113.263865,  23.124012],
        projection: 'EPSG:4326',
        zoom: 10
      })
    });
    
    map.on('click',function(evt){
      console.log(evt)
      map.forEachFeatureAtPixel(evt.pixel,e=>{
        console.log(e)
      })
    })


    var count = 500;
        var features = new Array(count);
        for(var i = 0; i < count; i++){

            var coordinates = [110+ Math.random() * 10 , 20+ Math.random() * 10]
            features[i] = new Feature(
                new Point(coordinates)
            );
        }
        //矢量要素数据源
        var source = new VectorSource({
            features: features
        });
        //聚合标注数据源
        var clusterSource = new Cluster({
            distance: 40,               //聚合的距离参数，即当标注间距离小于此值时进行聚合，单位是像素
            source: source              //聚合的数据源，即矢量要素数据源对象
        });
        //加载聚合标注的矢量图层
        var styleCache = {};                    //用于保存特定数量的聚合群的要素样式
        var clusters = new VectorLayer({
            source: clusterSource,
            style: function (feature, resolution){
                var size = feature.get('features').length;          //获取该要素所在聚合群的要素数量
                var style = styleCache[size];
                if(!style){
                    style = [
                        new Style({
                            image: new olCircle({
                                radius: 10,
                                stroke: new Stroke({
                                    color: '#fff'
                                }),
                                fill: new Fill({
                                    color: '#3399CC'
                                })
                            }),
                            text: new Text({
                                text: size.toString(),
                                fill: new Fill({
                                    color: '#fff'
                                })
                            })
                        })
                    ];
                    styleCache[size] = style;
                }
                return style;
            }
        });
        map.addLayer(clusters);
  }

  render() {
    return (
      <div className="map-box">
        <div id="map" className="map"></div>
      </div>

    )
  }
}



