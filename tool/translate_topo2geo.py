import subprocess
import glob
import os
import sys

TOPOJSON_PATH = "./pref_citymap/"
SAVE_PATH = "./geojson/"
BASE_CMD = "topo2geo city={output} < {input}"

os.makedirs(SAVE_PATH, exist_ok=True)

for topojson_path in glob.glob(TOPOJSON_PATH+"*.json"):
    print("Translate: " + os.path.basename(topojson_path))
    proc = subprocess.run(
        BASE_CMD.format(
            output=SAVE_PATH+os.path.basename(topojson_path),
            input=topojson_path
        ),
        shell=True,
        stdout=sys.stdout,
        text=True
    )
