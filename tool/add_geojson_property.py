import json
import re
import glob
import os
from collections import OrderedDict

GEOJSON_PATH = "./src/assets/map_data/"
SAVE_PATH = "./editted_geojson/"

os.makedirs(SAVE_PATH, exist_ok=True)

for geojson_path in glob.glob(GEOJSON_PATH+"*.json"):
    with open(geojson_path, "r", encoding="utf-8_sig") as f:
        print(geojson_path)
        geojson = json.load(f, object_pairs_hook=OrderedDict)

    for feature in geojson["features"]:
        print(feature["id"])
        regex = r"(?<=都|道|府|県|郡).*[市|町|村|区]"
        try:
            first_regexed = re.findall(regex, feature["id"])[0]
        except:
            first_regexed = feature["id"]

        secound_regexed = re.findall(regex, first_regexed)
        shrot_name = secound_regexed[0] if bool(
            secound_regexed) else first_regexed
        print(shrot_name)
        feature["properties"]["name"] = shrot_name

    with open(SAVE_PATH+os.path.basename(geojson_path), "w", encoding="utf-8_sig") as f:
        json.dump(geojson, f, ensure_ascii=False)
