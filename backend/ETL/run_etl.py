import os
import psycopg2
from dotenv import load_dotenv

from .extract import read_jsonl_file
from .transform import transform_product, is_valid_product
from .load import get_or_create_store, bulk_insert_products, bulk_insert_prices

load_dotenv()

BATCH_SIZE = 500

def run_etl(file_path):
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
        database=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD")
    )
    cursor = conn.cursor()

    inserted = 0
    skipped = 0
    batch = []

    try:
        for raw in read_jsonl_file(file_path):
            product = transform_product(raw)
            if not is_valid_product(product):
                skipped += 1
                continue
            batch.append(product)

            if len(batch) >= BATCH_SIZE:
                store_id = get_or_create_store(cursor, batch[0]["store_name"])
                product_ids = bulk_insert_products(cursor, batch, store_id)
                bulk_insert_prices(cursor, product_ids, batch)
                conn.commit()
                inserted += len(batch)
                print(f"Inserted batch of {len(batch)}")
                batch.clear()

        # final leftover batch
        if batch:
            store_id = get_or_create_store(cursor, batch[0]["store_name"])
            product_ids = bulk_insert_products(cursor, batch, store_id)
            bulk_insert_prices(cursor, product_ids, batch)
            conn.commit()
            inserted += len(batch)
            print(f"Inserted final batch of {len(batch)}")

    except Exception as e:
        conn.rollback()
        print("ETL failed:", e)
        print(conn.get_dsn_parameters())

    finally:
        cursor.close()
        conn.close()

    print(f"Inserted: {inserted}")
    print(f"Skipped: {skipped}")

if __name__ == "__main__":
    run_etl("D:/Documents/Python stuff/cold_storage/cheemo_sample_insert_appliances.jsonl")
