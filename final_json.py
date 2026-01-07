import pandas as pd
import json

catalog = []

# 1. Sanskrit CSV (existing)
print("📄 Loading sanskrit final 2.xlsx.csv...")
df1 = pd.read_csv("sanskrit final 2.xlsx.csv", encoding='utf-8')
catalog.extend(df1.to_dict('records'))
print(f"✅ Sanskrit: {len(df1)} records")

# 2. catalog.xlsx (if exists)
try:
    print("📄 Loading catalog.xlsx...")
    sheets = pd.read_excel("catalog.xlsx", sheet_name=None)
    for name, df in sheets.items():
        catalog.extend(df.to_dict('records'))
        print(f"  Sheet '{name}': {len(df)} records")
except FileNotFoundError:
    print("⚠️ catalog.xlsx not found - skipping")

# Save
with open('full_catalog.json', 'w', encoding='utf-8') as f:
    json.dump(catalog, f, ensure_ascii=False, indent=2)

print(f"\n🎉 TOTAL {len(catalog)} records -> full_catalog.json READY!")
print("Copy to script.js!")
