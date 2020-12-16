// Create map instance
let map = am4core.create("chartdiv", am4maps.MapChart);

// Set map definition
map.geodata = am4geodata_japanLow;

// Set projection
map.projection = new am4maps.projections.Miller();

// Create map polygon series
let JapanSeries = map.series.push(new am4maps.MapPolygonSeries());

// Make map load polygon (like country names) data from GeoJSON
JapanSeries.useGeodata = true;

// Set zoom event when touch items
JapanSeries.mapPolygons.template.events.on("hit", function (ev) {
    map.zoomToMapObject(ev.target);
});

// Configure series
let polygonTemplate = JapanSeries.mapPolygons.template;

// Set tool tip text
polygonTemplate.tooltipText = "{name}: {value}";
var hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#F99F48");

polygonTemplate.fill = am4core.color("#999");

// Add heat rule
JapanSeries.heatRules.push({
    "property": "fill",
    "target": JapanSeries.mapPolygons.template,
    "min": am4core.color("#bfe9ff"),
    "max": am4core.color("#ff6e7f"),
    "logarithmic": true
});

// Set Map Center to Kyoto
map.homeGeoPoint = { latitude: 34.8030573, longitude: 135.690382 };
map.homeZoomLevel = 8;



// Map Overlay
let KyotoSeries = map.series.push(new am4maps.MapPolygonSeries())
KyotoSeries.geodataSource.url = "./map_data/kyoto.json"
KyotoSeries.reverseGeodata = true;
let KyotoTemplate = KyotoSeries.mapPolygons.template;
KyotoTemplate.fill = am4core.color("#999");

KyotoTemplate.tooltipText = "{name}:{value}";
let pref_hs = KyotoTemplate.states.create("hover");


pref_hs.properties.fill = am4core.color("#F99F48");
KyotoSeries.data = [
    { id: "京都府京都市", value: 15 }
]

// Add heat rule
KyotoSeries.heatRules.push({
    "property": "fill",
    "target": KyotoSeries.mapPolygons.template,
    "min": am4core.color("#bfe9ff"),
    "max": am4core.color("#ff6e7f"),
    "logarithmic": true
});

// Set up heat legend
let japanheatmap = map.createChild(am4maps.HeatLegend);
japanheatmap.series = JapanSeries, KyotoSeries;
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



// Data like Json object
JapanSeries.data = [
    { id: "北海道", value: 88 },
    { id: "青森県", value: 12 },
    { id: "岩手県", value: 15 },
    { id: "宮城県", value: 5 },
    { id: "秋田県", value: 83 },
    { id: "山形県", value: 10 },
    { id: "福島県", value: 75 },
    { id: "茨城県", value: 15 },
    { id: "栃木県", value: 98 },
    { id: "群馬県", value: 57 },
    { id: "埼玉県", value: 34 },
    { id: "千葉県", value: 79 },
    { id: "東京都", value: 84 },
    { id: "神奈川県", value: 35 },
    { id: "新潟県", value: 41 },
    { id: "富山県", value: 90 },
    { id: "石川県", value: 7 },
    { id: "福井県", value: 75 },
    { id: "山梨県", value: 76 },
    { id: "長野県", value: 54 },
    { id: "岐阜県", value: 47 },
    { id: "静岡県", value: 39 },
    { id: "愛知県", value: 96 },
    { id: "三重県", value: 65 },
    { id: "滋賀県", value: 75 },
    { id: "京都府", value: 68 },
    { id: "大阪府", value: 81 },
    { id: "兵庫県", value: 56 },
    { id: "奈良県", value: 62 },
    { id: "和歌山県", value: 50 },
    { id: "鳥取県", value: 71 },
    { id: "島根県", value: 24 },
    { id: "岡山県", value: 67 },
    { id: "広島県", value: 71 },
    { id: "山口県", value: 66 },
    { id: "徳島県", value: 76 },
    { id: "香川県", value: 14 },
    { id: "愛媛県", value: 7 },
    { id: "高知県", value: 95 },
    { id: "福岡県", value: 85 },
    { id: "佐賀県", value: 66 },
    { id: "長崎県", value: 13 },
    { id: "熊本県", value: 22 },
    { id: "大分県", value: 38 },
    { id: "宮崎県", value: 74 },
    { id: "鹿児島県", value: 85 },
    { id: "沖縄県", value: 14 },
];

