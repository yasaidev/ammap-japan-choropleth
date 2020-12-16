# Ammap用都道府県別の市町村geojsonを用意するための雑な手順書

## 境界データ(topojson)の入手

<https://geoshape.ex.nii.ac.jp/city/>
CC4.0だから基本なんでもOK

ライセンス表記は必要

## topojsonをgeojsonに変換

<https://mapshaper.org/>

## 読み込む際geojsonをrewind

以下のIssue対策

- [Issue#3117](https://github.com/amcharts/amcharts4/issues/3117)
- [Issue#3144](https://github.com/amcharts/amcharts4/issues/3144)

読み込んだポリゴンシリーズを`reverse=True`

EX

``` js
let KyotoSeries = map.series.push(new am4maps.MapPolygonSeries())
KyotoSeries.geodataSource.url = "./city_data_pref/city.json"
KyotoSeries.reverseGeodata = true;
```
