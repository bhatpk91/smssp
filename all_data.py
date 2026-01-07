import pandas as pd
import json

catalog = []

# Sanskrit CSV
df1 = pd.read_csv("sanskrit final 2.xlsx.csv")
catalog.extend(df1.to_dict('records'))
print(f"Sanskrit: {len(df1)} records")

# Catalog.xlsx ಇದ್ದರೆ (skip if not found)
try:
    df2
