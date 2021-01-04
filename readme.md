# 日本全国(最小市町村単位での)コロプレス図 by Amchart4

## About

日本全国を最小市町村単位で色付けするコロプレス図で表示するJSコード．

## Demo

<https://older4.github.io/ammap-testing/>
![demo](./readme-img/demo.gif)

## Tech

[Amchart4](https://www.amcharts.com/docs/v4/chart-types/map/)が提供するMap機能を用いて，実装．

各地図は[Geoshapeリポジトリ](https://geoshape.ex.nii.ac.jp/)から入手したTopoJSONをGeoJSONに変換して利用．

## Usage

### 注意

組み込んでいるマップデータは[Geoshapeリポジトリ](https://geoshape.ex.nii.ac.jp/)から取得して加工したものであるため，使用する際は以下のクレジット表記が必要である．

>『歴史的行政区域データセットβ版』（CODH作成）

### Init

```bash
git clone https://github.com/older4/ammap-testing.git
npm install
```

### Develop Mode

**動的に数値を変更する必要がない場合**はモックアップデータのJsonを書き換えることで任意のデータで色付けする静的ページを作成できる．

環境変数として[`./env/dev.js`](./.env/dev.js)を読み込む．

[`./assets/mockup_data/`](./src/assets/mockup_data)を`API_ENDPOINT`としてモックアップデータを参照して，コロプレス図を色づけている．

#### Build:dev

`./dist`以下にビルド

```bash
npm run build:dev
```

#### Serve:dev

Dev用のwebpack-dev-serverを起動

```bash
npm run serve
```

### Production Mode

**動的に数値を変更して色付けを行う場合**に使う．サーバにJSONを返すエンドポイントを設けることで，フロントエンドとバックエンドを分離して利用可能である．

環境変数として`./env/prd.js`を読み込む．(git追跡対象外)

EX:`prd.js`

```js
export default {
    MODE: "prd",
    API_ENDPOINT: "http://example.com/api/"
}
```

与えられた`API_ENDPOINT`に以下のURLの書式でJsonをGETする．

- 日本全体: <http://example.com/api/?q=japan_data>
- 京都府市町村単位: <http://example.com/api/?q=京都府>
- 都道府県市町村単位: <http://example.com/api/?q=都道府県名(~県まで含む)>

応答すべきJson形式はそれぞれ以下を参考にする．

- 日本全体: [`japan_data.json`](./src/assets/mockup_data/japan_data.json)
- 各都道府県: [`京都府.json`](./src/assets/mockup_data/京都府.json)

key`id`に都道府県名や市町村名(**都道府県名から始める**)を入れ，value`value`に任意の数値を入れたJsonであれば良い．

**注意点として**，valueが0の都市や都道府県に対しても，`id`と`"value": 0`を設定する必要がある．

```json
[
    {
        "id": "北海道",
        "value": 88
    },
        {
        "id": "青森県",
        "value": 12
    },
    ...
]

```

#### Build:prd

`./dist`以下にビルド

```bash
npm run build
```

#### Serve:prd

Production用のenvを読み込んだwebpack-dev-serverを起動

```bash
npm run serve:prd
```

## 都道府県別市町村単位GeoJsonの取得手順書

### Tools

[使用したスクリプト集](./tool/)

### 境界データ(topojson)の入手

<https://geoshape.ex.nii.ac.jp/city/>
CC4.0/ライセンス表記は必要
>ライセンス
>
>このウェブサイトのコンテンツは、CC BY 4.0の下に提供されています。
>
>ただし、本サイトで利用している国土数値情報「行政区域データ」の利用規約については、国土数値情報ダウンロードサービスをご参照下さい。
>
>データセットをご利用の際には、以下のようなクレジットを表示して下さい。
>
>『歴史的行政区域データセットβ版』（CODH作成）

### topojsonをgeojsonに変換

- 一括変換: [translate_topo2geo.py](./tool/translate_topo2geo.py)
- 個別変換: <https://mapshaper.org/>

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
