import json
import re
import glob
import os
from collections import OrderedDict
from types import ClassMethodDescriptorType

GEOJSON_PATH = "./src/assets/map_data/"
SAVE_PATH = "./editted_geojson/"

os.makedirs(SAVE_PATH, exist_ok=True)

for geojson_path in glob.glob(GEOJSON_PATH+"*.json"):
    with open(geojson_path, "r", encoding="utf-8_sig") as f:
        print(geojson_path)
        geojson = json.load(f, object_pairs_hook=OrderedDict)

    for feature in geojson["features"]:
        try:
            short_name = feature["properties"]["N03_004"]
        except KeyError:
            short_name = feature["properties"]["N03_003"]

        print(short_name)
        feature["properties"]["name"] = short_name
        feature["id"] = feature["properties"]["N03_001"] + short_name

    with open(SAVE_PATH+os.path.basename(geojson_path), "w", encoding="utf-8_sig") as f:
        json.dump(geojson, f, ensure_ascii=False)
