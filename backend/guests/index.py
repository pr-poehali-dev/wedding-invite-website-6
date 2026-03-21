import json
import os
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Сохранение и получение списка гостей свадьбы."""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        name = body.get("name", "").strip()
        surname = body.get("surname", "").strip()
        attendance = body.get("attendance", "").strip()

        if not name or not surname or attendance not in ("yes", "no"):
            return {
                "statusCode": 400,
                "headers": cors,
                "body": json.dumps({"error": "Заполните все поля"}),
            }

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO guests (name, surname, attendance) VALUES (%s, %s, %s)",
            (name, surname, attendance),
        )
        conn.commit()
        cur.close()
        conn.close()

        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"ok": True}),
        }

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "SELECT id, name, surname, attendance, created_at FROM guests ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        cur.close()
        conn.close()

        guests = [
            {
                "id": r[0],
                "name": r[1],
                "surname": r[2],
                "attendance": r[3],
                "created_at": r[4].isoformat(),
            }
            for r in rows
        ]
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"guests": guests}),
        }

    return {"statusCode": 405, "headers": cors, "body": json.dumps({"error": "Method not allowed"})}
