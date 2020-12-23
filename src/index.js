import "core-js/stable";
import "regenerator-runtime/runtime";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4map from "@amcharts/amcharts4/maps"
import japan from "./util_js/japan"

let map = am4core.create("chartdiv", am4map.MapChart);

// 日本全体---------------------------------------
map.geodata = japan;

map.projection = new am4map.projections.Miller();

let JapanSeries = new am4map.MapPolygonSeries();
JapanSeries.useGeodata = true;
map.series.push(JapanSeries);

// 日本地図にタッチイベントを設定
JapanSeries.mapPolygons.template.events.on("hit", function (ev) {
    map.zoomToMapObject(ev.target);
});

// Configure series
let polygonTemplate = JapanSeries.mapPolygons.template;

// ツールチップ
polygonTemplate.tooltipText = "{name}: {value}";
polygonTemplate.fill = am4core.color("#74B266");

// ホバー
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#ff6e7f");

// ヒートマップ
JapanSeries.heatRules.push({
    "property": "fill",
    "target": polygonTemplate,
    "min": am4core.color("#ffd194"),
    "max": am4core.color("#70e1f5"),
});

let japanheatmap = map.createChild(am4map.HeatLegend);
japanheatmap.series = JapanSeries;
japanheatmap.align = "right";
japanheatmap.valign = "bottom";
japanheatmap.height = am4core.percent(80);
japanheatmap.orientation = "vertical";
japanheatmap.valign = "middle";
japanheatmap.marginRight = am4core.percent(4);
japanheatmap.valueAxis.renderer.opposite = true;
japanheatmap.valueAxis.renderer.dx = - 25;
japanheatmap.valueAxis.strictMinMax = false;
japanheatmap.valueAxis.fontSize = 9;
japanheatmap.valueAxis.logarithmic = true;

// モックデータ読み込み
// TODO: モックAPIにする？本番はAPIエンドポイントに変えるだけ？
JapanSeries.dataSource.url = "./assets/mockup_data/japan_data.json"
console.log(JapanSeries.dataFields)

// 市町村単位でのオーバレイ



// マップの表示初期位置の設定
// TODO: ユーザ位置情報から決定する
// 現状はただの京都中心
map.homeGeoPoint = { latitude: 34.8030573, longitude: 135.690382 };
map.homeZoomLevel = 8;

