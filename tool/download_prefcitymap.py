import urllib.request
import time
import os

TOPOJSON_URL = "https://geoshape.ex.nii.ac.jp/city/topojson/{version}/{pref_number}/{pref_number}_city_dc.{resolution}.topojson"
TOPOJSON_VERSION = "20200101"
# l:low i:mid h:high f:fullsize
TOPOJSON_RESOLUTION = "l"
SAVE_PATH = "./pref_citymap/"
PREF_NAME_LIST = [
    "北海道",
    "青森県",
    "岩手県",
    "宮城県",
    "秋田県",
    "山形県",
    "福島県",
    "茨城県",
    "栃木県",
    "群馬県",
    "埼玉県",
    "千葉県",
    "東京都",
    "神奈川県",
    "新潟県",
    "富山県",
    "石川県",
    "福井県",
    "山梨県",
    "長野県",
    "岐阜県",
    "静岡県",
    "愛知県",
    "三重県",
    "滋賀県",
    "京都府",
    "大阪府",
    "兵庫県",
    "奈良県",
    "和歌山県",
    "鳥取県",
    "島根県",
    "岡山県",
    "広島県",
    "山口県",
    "徳島県",
    "香川県",
    "愛媛県",
    "高知県",
    "福岡県",
    "佐賀県",
    "長崎県",
    "熊本県",
    "大分県",
    "宮崎県",
    "鹿児島県",
    "沖縄県",
]

os.makedirs(SAVE_PATH, exist_ok=True)

for i in range(47):
    print(f"Downloading: {str(i+1)}/47")
    target_url = TOPOJSON_URL.format(
        version=TOPOJSON_VERSION,
        pref_number=str(i+1).zfill(2),
        resolution=TOPOJSON_RESOLUTION
    )
    print(target_url)
    urllib.request.urlretrieve(
        url=target_url,
        filename=f"{SAVE_PATH}{PREF_NAME_LIST[i]}.json"
    )
    time.sleep(3)
