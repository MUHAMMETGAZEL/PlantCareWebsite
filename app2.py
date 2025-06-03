from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
DATABASE = 'bitkiler2.db'
                 
def init_db():
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS bitkiler (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                adi TEXT,
                bilimselAdi TEXT,
                toprak TEXT,
                sulama TEXT,
                gunes TEXT,
                foto TEXT
            )
        ''')
    conn.close()

init_db()

@app.route('/bitkiler/<int:id>', methods=['PUT'])
def update_bitki(id):
    data = request.json
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('''
            UPDATE bitkiler
            SET adi = ?, bilimselAdi = ?, toprak = ?, sulama = ?, gunes = ?, foto = ?
            WHERE id = ?
        ''', (data['adi'], data['bilimselAdi'], data['toprak'], data['sulama'], data['gunes'], data['foto'], id))
        conn.commit()
    return jsonify({'status': 'success'}), 200


@app.route('/bitkiler/<int:id>', methods=['DELETE'])
def delete_bitki(id):
    with sqlite3.connect(DATABASE) as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM bitkiler WHERE id = ?', (id,))
        conn.commit()
    return jsonify({'status': 'success'}), 200


@app.route('/bitkiler', methods=['GET', 'POST'])
def bitkiler():
    if request.method == 'POST':
        data = request.json
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO bitkiler (adi, bilimselAdi, toprak, sulama, gunes, foto)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (data['adi'], data['bilimselAdi'], data['toprak'], data['sulama'], data['gunes'], data['foto']))
            conn.commit()
        return jsonify({'status': 'success'}), 201
    
    elif request.method == 'GET':
        with sqlite3.connect(DATABASE) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM bitkiler')
            rows = cursor.fetchall()
        return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True, port=5002) 
