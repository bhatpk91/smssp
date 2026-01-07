import pandas as pd
import json

csv_file = "sanskrit final 2.xlsx.csv"
df = pd.read_csv(csv_file)
catalog = df.to_dict('records')

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

print(f"{len(catalog)} records ready in catalog.json!")
