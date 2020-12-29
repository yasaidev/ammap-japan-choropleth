import "core-js/stable";
import "regenerator-runtime/runtime";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"

import japan from "./util_js/japan_geodata"

// インスタンス作成・全体設定
let map = am4core.create("chartdiv", am4maps.MapChart);
map.projection = new am4maps.projections.Miller();

// 日本地図: 読み込み
let JapanSeries = map.series.push(new am4maps.MapPolygonSeries());
JapanSeries.useGeodata = true;
JapanSeries.geodata = japan;

// 日本地図: ポリゴン設定
let JapanPolygon = JapanSeries.mapPolygons.template;

// 日本地図: ツールチップ
JapanPolygon.tooltipText = "{name}: {value}";
JapanPolygon.fill = am4core.color("#74B266");

// 日本地図: ホバー
let JapanHs = JapanPolygon.states.create("hover");
JapanHs.properties.fill = am4core.color("#ff6e7f");

// 日本地図: ヒートマップ
JapanSeries.heatRules.push({
    "property": "fill",
    "target": JapanPolygon,
    "min": am4core.color("#ffd194"),
    "max": am4core.color("#70e1f5"),
});

let JapanHeatLegend = map.createChild(am4maps.HeatLegend);
JapanHeatLegend.series = JapanSeries;
JapanHeatLegend.align = "right";
JapanHeatLegend.valign = "bottom";
JapanHeatLegend.height = am4core.percent(80);
JapanHeatLegend.orientation = "vertical";
JapanHeatLegend.valign = "middle";
JapanHeatLegend.marginRight = am4core.percent(4);
JapanHeatLegend.valueAxis.renderer.opposite = true;
JapanHeatLegend.valueAxis.renderer.dx = - 25;
JapanHeatLegend.valueAxis.strictMinMax = false;
JapanHeatLegend.valueAxis.fontSize = 9;
JapanHeatLegend.valueAxis.logarithmic = true;

// 日本地図: 配送量データ読み込み(モック)
// TODO: 環境変数にする，本番はAPIエンドポイントに変えるだけ？
JapanSeries.dataSource.url = "./assets/mockup_data/japan_data.json"

// 市町村別地図: 読み込み・設定
// ドリルマップ: https://www.amcharts.com/docs/v4/tutorials/building-drill-down-maps/
let CitySeries = map.series.push(new am4maps.MapPolygonSeries());
CitySeries.useGeodata = true;
CitySeries.hide();

// 市町村別地図: ポリゴン設定
let CityPolygon = CitySeries.mapPolygons.template;

// 市町村別地図: ツールチップ
CityPolygon.tooltipText = "{id}: {value}";
CityPolygon.fill = am4core.color("#74B266");

// 市町村別地図: ホバー
let CityHs = CityPolygon.states.create("hover");
CityHs.properties.fill = am4core.color("#ff6e7f");

// 市町村別地図: ヒートマップ
CitySeries.heatRules.push({
    "property": "fill",
    "target": CityPolygon,
    "min": am4core.color("#ffd194"),
    "max": am4core.color("#70e1f5"),
});
let CityHeatLegend = map.createChild(am4maps.HeatLegend);
CityHeatLegend.series = CitySeries;
CityHeatLegend.align = "right";
CityHeatLegend.valign = "bottom";
CityHeatLegend.height = am4core.percent(80);
CityHeatLegend.orientation = "vertical";
CityHeatLegend.valign = "middle";
CityHeatLegend.marginRight = am4core.percent(4);
CityHeatLegend.valueAxis.renderer.opposite = true;
CityHeatLegend.valueAxis.renderer.dx = - 25;
CityHeatLegend.valueAxis.strictMinMax = false;
CityHeatLegend.valueAxis.fontSize = 9;
CityHeatLegend.valueAxis.logarithmic = true;
CityHeatLegend.hide();


CitySeries.geodataSource.events.on("done", function (ev) {
    JapanSeries.hide();
    JapanHeatLegend.hide();
    CitySeries.show();
    CityHeatLegend.show();
});

// 市町村別地図: 地図・配送データの動的読み込みのためのイベントを日本地図側に設定
JapanPolygon.events.on("hit", function (ev) {
    map.zoomToMapObject(ev.target, 20, true, 10);
    onoff_zoompan(false, 20);

    let pref_name = ev.target.dataItem.dataContext.name;
    if (pref_name) {
        ev.target.isHover = false;
        // 市町村別地図: 地図データ読み込み
        CitySeries.geodataSource.url = "./assets/map_data/" + pref_name + ".json";
        CitySeries.geodataSource.load();

        // 市町村別地図: 配送量データ読み込み(モック)
        // TODO: 環境変数にする，本番はAPIエンドポイントに変えるだけ？
        CitySeries.dataSource.url = "./assets/mockup_data/" + pref_name + ".json";
        CitySeries.dataSource.load();
        back.show();
    }
});

// ズームアウト: ボタン
// TODO: デザインの改良
const back = map.createChild(am4core.ZoomOutButton);
back.align = "right";
back.hide();
back.events.on("hit", function (ev) {
    reset_map();
});

// ズームアウト: 背景クリック時にズームアウト
// 背景の種類に注意: https://github.com/amcharts/amcharts4/issues/1805
map.seriesContainer.background.events.on("hit", function (ev) {
    if (CitySeries.visible) {
        reset_map();
    }
});
map.backgroundSeries.events.on("hit", function (ev) {
    if (CitySeries.visible) {
        reset_map();
    }
});

/**
 * ZoomとPanをinputに応じて有効/無効化する．
 * ズーム時のpan/zoomの無効化: https://www.amcharts.com/docs/v4/tutorials/disabling-zoom-and-pan-on-a-map-chart/
 * @param {boolean} input 有効化する場合:true
 * @param {number} constZoomLevel 固定するZoomLevel
 */
function onoff_zoompan(input, constZoomLevel = 18) {
    if (input) {
        map.seriesContainer.draggable = true;
        map.seriesContainer.resizable = true;
        map.maxZoomLevel = 32;
        map.minZoomLevel = 1;

    } else {
        // map.seriesContainer.draggable = false;
        // map.seriesContainer.resizable = false;
        map.maxZoomLevel = constZoomLevel;
        map.minZoomLevel = constZoomLevel;
        // 以下のコードは公式推奨だが，バグる
        // map.maxZoomLevel = 1;
    }
}

/**
 * マップを日本地図表示に戻す．
 */
function reset_map() {
    onoff_zoompan(true);
    JapanSeries.show();
    JapanHeatLegend.show();
    map.goHome(500);
    CitySeries.hide();
    CityHeatLegend.hide();
    back.hide();
}

// マップの表示初期位置の設定
JapanSeries.mapPolygons.template.events.on("ready", function (ev) {
    let userlocation = {
        latitude: JapanSeries.getPolygonById("京都府").visualLatitude,
        longitude: JapanSeries.getPolygonById("京都府").visualLongitude
    };
    map.homeGeoPoint = userlocation
    map.homeZoomLevel = 8;
    map.goHome(500);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (postion) => {
                userlocation.latitude = postion.coords.latitude;
                userlocation.longitude = postion.coords.longitude;
                map.homeGeoPoint = userlocation
                map.homeZoomLevel = 8;
                map.goHome(500);
            })
    }
});

// ホームボタンの追加
// https://www.amcharts.com/docs/v4/tutorials/adding-home-button-to-map-chart/
const button = map.chartContainer.createChild(am4core.Button);
button.padding(5, 5, 5, 5);
button.align = "right";
button.valign = "bottom";
button.marginRight = 35;
button.events.on("hit", function () {
    reset_map()
    map.goHome();
});

button.icon = new am4core.Sprite();
button.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";



