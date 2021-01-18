import pandas as pd
import json
import re
import glob
import os
from collections import OrderedDict

GEOJSON_PATH = "./src/assets/map_data/"
SAVE_PATH = "./editted_geojson/"
PREF_LIST = ["北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県", "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県", "静岡県", "愛知県",
             "三重県", "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県", "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県", ]

os.makedirs(SAVE_PATH, exist_ok=True)

all_id_data = pd.DataFrame()

for pref in PREF_LIST:
    geojson_path = GEOJSON_PATH+pref+".json"
    with open(geojson_path, "r", encoding="utf-8_sig") as f:
        print(geojson_path)
        geojson = json.load(f, object_pairs_hook=OrderedDict)

    id_list = []

    for feature in geojson["features"]:
        # print(feature["id"])
        id_list.append(feature["id"])

    id_series = pd.Series(data=id_list, name=feature["properties"]["N03_001"],)
    # print(id_series)
    all_id_data = pd.concat([all_id_data, id_series], axis=1,)

print(all_id_data)
all_id_data.to_csv(SAVE_PATH+"all_id.csv", encoding="utf-8-sig")
