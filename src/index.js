import "core-js/stable";
import "regenerator-runtime/runtime";
import * as am4core from "@amcharts/amcharts4/core"
import * as am4map from "@amcharts/amcharts4/maps"
import japan from "./util_js/japan"

let map = am4core.create("chartdiv", am4map.MapChart);

// 日本全体読み込み
map.geodata = japan;

map.projection = new am4map.projections.Miller();

let polygonSeries = new am4map.MapPolygonSeries();
polygonSeries.useGeodata = true;
map.series.push(polygonSeries);

// Configure series
let polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}: {value}";
polygonTemplate.fill = am4core.color("#74B266");

// Create hover state and set alternative fill color
let hs = polygonTemplate.states.create("hover");
hs.properties.fill = am4core.color("#367B25");