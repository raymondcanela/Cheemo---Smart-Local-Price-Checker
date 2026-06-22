import json

file_path = "D:/Documents/Python stuff/Cheemo/backend/datasets/meta_Appliances.jsonl"

def read_jsonl_file(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        for line in file:
            if line.strip():
                yield json.loads(line)