import pandas as pd
import json

excel_file = input("Excel ಫೈಲ್ ಹೆಸರು ನಮೂದಿಸಿ (or Enter catalog.xlsx): ") or "catalog.xlsx"
print(f"Reading {excel_file}...")

sheets = pd.read_excel(excel_file, sheet_name=None, engine='openpyxl')
catalog = []

for sheet_name, df in sheets.items():
    records = df.to_dict('records')
    catalog.extend(records)
    print(f"  {sheet_name}: {len(records)} records")

with open('catalog.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

print(f"\n✅ {len(catalog)} total records in catalog.json!")
print("script.js ಗೆ copy ಮಾಡಿ table ಕೆಲಸ ಮಾಡುತ್ತದೆ!")
