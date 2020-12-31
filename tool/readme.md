# Tool

## [download_prefcitymap.py](download_prefcitymap.py)

[Geoshapeリポジトリ](https://geoshape.ex.nii.ac.jp/)からコロプレス地図のtopojsonを一括ダウンロードする．

### dependency

- Python = 3.8~

## [translate_topo2geo.py](translate_topo2geo.py)

topojsonからgeojsonに一括変換する．

### dependency

- Python = 3.8~
- [TopoJson](https://github.com/topojson/topojson)
    > shellからtopojsonが呼び出せる必要がある．

## [add_geojson_property.py](add_geojson_property.py)

geojsonのFIDを簡素化して、市町村名だけのshort_nameのpropertyを追加する。

### dependency

- Python = 3.8~
