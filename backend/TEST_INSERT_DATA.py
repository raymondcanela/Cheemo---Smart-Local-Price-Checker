import os
import psycopg2
from dotenv import load_dotenv
from pathlib import Path

env_path = Path(__file__).resolve().parent / ".env"
load_dotenv(dotenv_path=env_path)

print("ENV PATH:", env_path)
print("DB_HOST:", os.getenv("DB_HOST"))

conn = psycopg2.connect(
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    database=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD")
)

cursor = conn.cursor()

cursor.execute("""
INSERT INTO products
(title, category, price, rating, description)
VALUES (%s, %s, %s, %s, %s)
""", ("baril ni ace", "Guns", 6700, 1.0, "baril ng bipolar"))

conn.commit()
cursor.close()
conn.close()

print("Inserted successfully!")