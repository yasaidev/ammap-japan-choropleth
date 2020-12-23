# ammap-testing

## Init

```bash
git clone https://github.com/older4/ammap-testing.git
npm install
```

## Build

`./dist`以下にビルド

```
npm run build
```

## Develop

Dev用のサーバが立ち上げ

```
npm run serve
```

## Ammap用都道府県別の市町村geojsonを用意するための手順書

### 境界データ(topojson)の入手

<https://geoshape.ex.nii.ac.jp/city/>
CC4.0だから基本なんでもOK

ライセンス表記は必要

### topojsonをgeojsonに変換

<https://mapshaper.org/>

### 読み込む際geojsonをrewind

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

もしくは，Json自体をRewindして用意する．
> <https://observablehq.com/@bumbeishvili/rewind-geojson>

### Jsonからモジュール化

参考: [Creating custom maps](https://www.amcharts.com/docs/v4/tutorials/creating-custom-maps/)

#### for JS(ES6)

1. `filename.json`を`filename.js`にリネーム
2. `filename.js`の中身の先頭に`export defalt`を記述

EX

```js
export default{
    "type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"MultiPolygon","coordinates":[[[[141.37077740646836,43.502741103494714],[141.
    // ...略
}
```
