from fastapi import FastAPI
from database import get_connection

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Cheemo backend running"}

@app.get("/db-test")
def db_test():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT version();")
    result = cur.fetchone()
    cur.close()
    conn.close()
    return {"postgres_version": result[0]}