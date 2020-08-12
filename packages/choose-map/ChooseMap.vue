<template>
  <el-dialog :visible.sync="show" :close-on-click-modal="false" :show-close="false" :append-to-body="appendbody" :title="title" width="740px" class="choose-map-dialog">
    <div id="container" class="map-container" tabindex="0"></div>
    <div class="map-picker">
      <input id="pickerInput" class="map-picker-input" placeholder="输入关键字选取地点">
      <div class="map-picker-info"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeMap">取 消</el-button>
      <el-button type="primary" @click="confirmMap">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
let map, 
  mapPromise, 
  marker, 
  infoWindow;
export default {
  name: 'lfn-choose-map',
  props: {
    title: {
      type: String,
      default: '选择地址'
    },
    show: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: ''
    },
    longitude: {
      type: String | Number,
      default: '' | 0
    },
    latitude: {
      type: String | Number,
      default: '' | 0
    },
    appendbody: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show: {
      immediate: true,
      handler() {
        if (!this.show) return;
        const _this = this;
        if (mapPromise) {
          mapPromise.then(() => {
            //创建地图
            // eslint-disable-next-line no-undef
            map = new AMap.Map('container', {
              zoom: 18
            });
            //加载UI控件
            // eslint-disable-next-line no-undef
            AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker) => {
              const poiPicker = new PoiPicker({
                input: 'pickerInput'
              });
              // eslint-disable-next-line no-undef
              marker = new AMap.Marker();
              // eslint-disable-next-line no-undef
              infoWindow = new AMap.InfoWindow({
                // eslint-disable-next-line no-undef
                offset: new AMap.Pixel(0, -30)
              });
              //地图点击选择位置
              map.on('click', (e) => {
                map.remove(marker);
                infoWindow.close();
                // eslint-disable-next-line no-undef
                const geocoder = new AMap.Geocoder({});
                const lnglat = e.lnglat;
                geocoder.getAddress(lnglat, (status, result) => {
                  if (status === 'complete' && result.regeocode) {
                    const address = result.regeocode.formattedAddress;
                    _this.selectedAddress = {
                      location: lnglat.toString(),
                      address
                    };
                    _this.showMark(
                      marker,
                      infoWindow,
                      lnglat,
                      `<div>地址：${address}</div>`
                    );
                  } else {
                    console.info('根据经纬度查询地址失败');
                  }
                });
              });
              //选取了某个POI
              poiPicker.on('poiPicked', (poiResult) => {
                const source = poiResult.source,
                  poi = poiResult.item,
                  info = {
                    source,
                    id: poi.id,
                    name: poi.name,
                    location: poi.location.toString(),
                    address: poi.address
                  };
                _this.selectedAddress = info;
                _this.showMark(
                  marker,
                  infoWindow,
                  poi.location,
                  `<div>${info.name}</div><div>地址：${info.address}</div>`
                );
              });
              poiPicker.onCityReady(() => {
                if (_this.location && _this.longitude && _this.latitude) {
                  // eslint-disable-next-line no-undef
                  const position = new AMap.LngLat(_this.longitude, _this.latitude);
                  _this.showMark(
                    marker,
                    infoWindow,
                    position,
                    `<div>地址：${_this.location}</div>`
                  );
                } else if (_this.location) {
                  poiPicker.suggest(_this.location);
                }
              });
            });
          });
        }
      }
    }
  },
  created() {
    //加载高德地图js
    mapPromise = new Promise((resolve, reject) => {
      if (window.AMap && window.AMapUI) {
        resolve();
        return;
      }
      let script = document.createElement('script');
      script.type = 'text/javascript';
      //key密钥 plugin插件
      script.src =
        'https://webapi.amap.com/maps?v=1.4.14&key=8403d1b4ece5876f429589f4f7e36427&plugin=AMap.Geocoder';
      document.head.appendChild(script);
      script.onload = () => {
        script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://webapi.amap.com/ui/1.0/main.js?v=1.0.11';
        document.head.appendChild(script);
        script.onload = () => {
          resolve();
        };
      };
      script.onerror = () => {
        reject();
      };
    });
  },
  destroyed() {
    // eslint-disable-next-line no-unused-expressions
    map && map.destroy();
  },
  methods: {
    //确定选择地址
    confirmMap() {
      this.closeMap();
      if (!this.selectedAddress) return;
      this.$emit('confirmMap', this.selectedAddress);
    },
    //关闭地图
    closeMap() {
      this.$emit('closeMap');
      // eslint-disable-next-line no-unused-expressions
      map && map.destroy();
    },
    // eslint-disable-next-line no-shadow
    showMark(marker, infoWindow, position, content) {
      map.remove(marker);
      infoWindow.close();

      marker.setMap(map);
      infoWindow.setMap(map);

      marker.setPosition(position);
      infoWindow.setPosition(position);

      infoWindow.setContent(content);
      infoWindow.open(map, marker.getPosition());

      map.setCenter(marker.getPosition());
    }
  }
};
</script>
<style scoped lang="less">
.map-container {
  width: 700px;
  height: 500px;
  margin: 0px;
  font-size: 13px;
}
.map-picker {
  position: absolute;
  z-index: 9999;
  top: 100px;
  left: 30px;
  width: 300px;
}
.map-picker-input {
  z-index: 9999;
  width: 300px;
  padding: 5px 5px;
  height: 50px;
  font-size: 16px;
  border-radius: 30px;
  border: 1px solid #f3f3f1;
  padding-left: 20px;
}
.map-picker-info {
  background: #fff;
}
.amap_lib_placeSearch .poibox.highlight {
  background-color: #cae1ff;
}
.amap_lib_placeSearch .poi-more {
  display: none !important;
}
.choose-map-dialog /deep/ .el-dialog__body{
  padding: 10px 20px;
}
</style>
