from psycopg2.extras import execute_values

def get_or_create_store(cursor, store_name):
    cursor.execute("""
        INSERT INTO public.stores (store_name)
        VALUES (%s)
        ON CONFLICT (store_name)
        DO UPDATE SET store_name = EXCLUDED.store_name
        RETURNING store_id;
    """, (store_name,))
    return cursor.fetchone()[0]

def bulk_insert_products(cursor, products, store_id):
    rows = [
        (
            p["title"],
            p["main_category"],
            p["description"],
            p["average_rating"],
            p["image_url"],
            store_id
        )
        for p in products
    ]
    query = """
        INSERT INTO public.products (
            title, main_category, description,
            average_rating, image_url, store_id
        )
        VALUES %s
        RETURNING product_id;
    """
    return execute_values(cursor, query, rows, fetch=True)

def bulk_insert_prices(cursor, product_ids, products):
    rows = [
        (pid, p["price"])
        for pid, p in zip(product_ids, products)
    ]
    query = "INSERT INTO public.prices (product_id, price) VALUES %s;"
    execute_values(cursor, query, rows)
