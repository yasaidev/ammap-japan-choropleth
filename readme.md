# 日本全国(最小市町村単位での)ヒートマップ(コロプレス図) by Amchart4

## About

日本全国を最小市町村単位で色付けするコロプレス図で表示するJSコード．

## Special Thanks to [Anamorphosis Networks Co., Ltd.](https://anamorphosis.net/)

本成果物は[Anamorphosis Networks社](https://anamorphosis.net/)のインターンで作成しました.

業務の一環で作成したコードの公開を許可していただき誠にありがとうございます．

## Demo

<https://older4.github.io/ammap-japan-choropleth/>
![demo](./readme-img/demo.gif)

## Tech

[Amchart4](https://www.amcharts.com/docs/v4/chart-types/map/)が提供するMap機能を用いて実装．

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

### Develop

環境変数として[`./env/dev.js`](./.env/dev.js)を読み込む．

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

### Production

環境変数として`./env/prd.js`を読み込む．(git追跡対象外)

EX: `prd.js`

```js
export default {
    MODE: "dynamic_noparam",
    API_ENDPOINT: "http://example.com/api/",
    MAP_DATA: "http://example.com/data/mapdata/"
}
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

### 任意のページに埋め込む方法

1. 任意のモードやエンドポイントを設定した`./.env/prd.js`を用意
2. `npm run build`
3. `./dist/`以下のファイルをすべてサーバにアップロード
   > `index.html`は確認用のページなどで不要であれば消して良い．
   >
   > ここでは例として，`http://example.com/heatmap/`以下にアップロードとしたとする．
   >
   > この際`./dist/assets/map_data/`のサーバ上でのPathは`http://example.com/heatmap/assets/map_data/`となるので，`./.env/prd.js`の`MAP_DATA: "http://example.com/heatmap/assets/map_data/"`として設定する．
4. 対象のページに以下を追加する

EX: target.html

```html
<!DOCTYPE html>
<html>
<body>
    <!-- #################### insert start ################## -->
    <div id="chartdiv" data-paramid="XXXXXXX">
    <script src="http://example.com/heatmap/index.js"></script>
    <!-- #################### insert end ################## -->
</body>
</html>
```

`id="chartdiv"`の`div`要素にマップが表示される．また，`data-paramid`属性に`dynamic_param`モードで使うIDを設定する．

### Mode

#### 静的JSON参照(static)

`Mode: "static"`とenv用のjsファイルで定義することで，API_ENDPOINTに応じた静的JSONを参照して可視化する．

EX: `./dev.js`

```js
export default {
    MODE: "static",
    API_ENDPOINT: "http://example.com/data/",
    MAP_DATA: "http://example.com/data/map_data/"
}
```

`http://example.com/data/`を`API_ENDPOINT`としてJSONを参照して，コロプレス図を色づけている．

参照するURLの形式は以下になる．

- 日本全体: <http://example.com/data/japan_data.json>
- 京都府市町村単位: <http://example.com/data/京都府.json>
- 兵庫県市町村単位: <http://example.com/data/兵庫県.json>
- 都道府県市町村単位: <http://example.com/data/都道府県名.json>

#### API経由(dynamic_noparam)

`Mode: "dynamic_noparam"`とenv用のjsファイルで定義することで，JSONを返すAPI_ENDPOINTに応じたクエリを含むURLを参照して可視化する．
このモードではパラメータ（商品ID等）を含めてapiに情報を渡すことはできない．

EX: `./dev.js`

```js
export default {
    MODE: "dynamic_noparam",
    API_ENDPOINT: "http://example.com/api/",
    MAP_DATA: "http://example.com/data/map_data/"
}
```

参照するURLの形式は以下になる．

- 日本全体: <http://example.com/api/?q=japan_data>
- 京都府市町村単位: <http://example.com/api/?q=京都府>
- 兵庫県市町村単位: <http://example.com/api/?q=兵庫県>
- 都道府県市町村単位: <http://example.com/api/?q=都道府県名(~県まで含む)>

#### API経由パラメータ付き(dynamic_param)

`Mode: "dynamic_param"`とenv用のjsファイルで定義することで，JSONを返すAPI_ENDPOINTに応じたクエリを含むURLを参照して可視化する．
このモードではパラメータ（商品ID等）をhtmlのdata属性`data-paramid`に経由で設定する．

EX: `index.html`

```html
<!DOCTYPE html>
<html>
<body>
    <div id="chartdiv" data-paramid="XXXXXXX">
    <script src="index.js"></script>
</body>
</html>
```

EX: `./dev.js`

```js
export default {
    MODE: "dynamic_param",
    API_ENDPOINT: "http://example.com/api/",
    MAP_DATA: "http://example.com/data/map_data/"
}
```

参照するURLの形式は以下になる．

- 日本全体: <http://example.com/api/?q=japan_data&id=XXXXXXX>
- 京都府市町村単位: <http://example.com/api/?q=京都府&id=XXXXXXX>
- 兵庫県市町村単位: <http://example.com/api/?q=兵庫県&id=XXXXXXX>
- 都道府県市町村単位: <http://example.com/api/?q=都道府県名(~県まで含む)&id=XXXXXXX>

### 対応JSON形式

[`./src/assets/mockup_data/`](./src/assets/mockup_data/)以下のファイルが参考になる．

key`id`に都道府県名や市町村名(**都道府県名から始める**)を入れ，value`value`に任意の数値を入れたJsonであれば良い．
> 京都府の市町村の数値データであれば，`{"id":"京都府京都市","value": 100}`となる．

具体的なIDについては[`ALL_Fid_list.csv`](All_Fid_list.csv)で確認可能である．

**注意点として**，idが与えられなかった都道府県，市町村に対しては**デフォルト値0**が与えられる．

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

### ヒートマップの色

env用のjsファイルで以下の様に定義する．設定しない場合はデフォルト値が使用される．
EX: `./dev.js`

```js
export default {
    MODE: "dynamic_param",
    API_ENDPOINT: "http://example.com/api/",
    MAP_DATA: "http://example.com/data/map_data/",
    MAX_COLOR: "#161821",
    MIN_COLOR: "#FFFFFF",
    HOVER_COLOR:"#FF0000"
}
```

|             | デフォルト値                                                          |
| ----------- | --------------------------------------------------------------------- |
| MIX_COLOR   | ![](https://via.placeholder.com/16/e4f1d9/FFFFFF/?text=%20) `#e4f1d9` |
| MAX_COLOR   | ![](https://via.placeholder.com/16/51AA12/FFFFFF/?text=%20) `#51AA12` |
| HOVER_COLOR | ![](https://via.placeholder.com/16/2D5E0A/FFFFFF/?text=%20) `#2D5E0A` |

### License

GPL v3

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
