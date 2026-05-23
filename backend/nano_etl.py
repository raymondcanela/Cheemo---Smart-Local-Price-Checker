import os
import psycopg2
from dotenv import load_dotenv
from pathlib import Path

# Load .env from project root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

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
(title, category, price)
VALUES (%s, %s, %s)
""", ("Test Product", "Electronics", 999))

conn.commit()

print("Inserted successfully!")

cursor.close()
conn.close()