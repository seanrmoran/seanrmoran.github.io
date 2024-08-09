# app.py

from flask import Flask, render_template, request, redirect, url_for, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/')
@app.route('/')
def main():
    conn = sqlite3.connect('rankcentral.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Order by track_number instead of rank
    cursor.execute("SELECT * FROM Songs ORDER BY track_number")
    songs = cursor.fetchall()
    conn.close()

    return render_template('rankcentral.html', songs=songs)


@app.route('/songs/<album_id>')
def get_songs_for_album(album_id):
    conn = sqlite3.connect('rankcentral.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    # Convert album_id to integer if necessary
    try:
        album_id_int = int(album_id)
    except ValueError:
        return jsonify({'error': 'Invalid album ID'}), 400

    cursor.execute("SELECT * FROM Songs WHERE album_id = ?", (album_id_int,))
    songs = cursor.fetchall()
    conn.close()

    songs_json = [{'song_id': song['song_id'], 'name': song['name'], 'track_number': song['track_number']} for song in songs]
    return jsonify({'songs': songs_json})


@app.route('/get_categories')
def get_categories():
    conn = sqlite3.connect('rankcentral.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Categories")
    categories = cursor.fetchall()
    conn.close()
    return jsonify([{'id': cat[0], 'name': cat[1]} for cat in categories])

@app.route('/get_bands/<category_id>')
def get_bands(category_id):
    conn = sqlite3.connect('rankcentral.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Bands WHERE category_id = ?", (category_id,))
    bands = cursor.fetchall()
    conn.close()
    return jsonify([{'id': band[0], 'name': band[1]} for band in bands])

@app.route('/get_albums/<band_id>')
def get_albums(band_id):
    conn = sqlite3.connect('rankcentral.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Albums WHERE band_id = ?", (band_id,))
    albums = cursor.fetchall()
    conn.close()
    return jsonify([{'id': album[0], 'name': album[1]} for album in albums])



@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':

        # Print raw JSON payload for debugging
        data = request.json
        print("Received JSON:", data)

        conn = sqlite3.connect('rankcentral.db')
        cursor = conn.cursor()

        # Use data.get to access the JSON values
        user = data.get('user')
        category_id = data.get('category_id')
        band_id = data.get('band_id')
        album_id = data.get('album_id')


        # Insert submission details into Submissions table
        cursor.execute('INSERT INTO Submissions (user, category_id, band_id, album_id) VALUES (?, ?, ?, ?)',
                       (user, category_id, band_id, album_id))
        submission_id = cursor.lastrowid  # Retrieve the last inserted ID

        # Extract song data sent as JSON
        song_data = data.get('songs')
        for song in song_data:
            # Print each song's data for debugging
            print("Processing song:", song)
            song_id = song.get('song_id')  # Use the correct key
            rank = song['rank']
            tier = song['tier']
            description = song['description']
            # Now insert into RankedSongs
            cursor.execute('INSERT INTO RankedSongs (submission_id, song_id, rank, tier, description) VALUES (?, ?, ?, ?, ?)',
                           (submission_id, song_id, rank, tier, description))

        conn.commit()
        conn.close()

        return jsonify({'status': 'success'})

    # For GET requests
    return render_template('submit.html')


if __name__ == '__main__':
    app.run(debug=True)
