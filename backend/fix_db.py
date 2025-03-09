import psycopg

conn = psycopg.connect("postgresql://Tourism_owner:npg_60jHaONMuotz@ep-divine-meadow-a8caqzu0-pooler.eastus2.azure.neon.tech/Tourism?sslmode=require")
cur = conn.cursor()
cur.execute("ALTER TABLE tourism_destination DROP COLUMN location;")
conn.commit()
cur.close()
conn.close()
print("Column 'location' removed successfully.")
