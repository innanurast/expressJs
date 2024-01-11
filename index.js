const express = require('express');
const app = express();
const port = 8000;

const connection = require('./Connect/koneksi');

// Middleware untuk menghandle body JSON
app.use(express.json());

app.get('/', function (req, res) {
    //query
    connection.query('SELECT * FROM posts', function (err, rows) {
        if (err) {
            return res.status(500).json({
                status: false,
                message: 'Internal server error.',
            });
        } else {
            return res.status(200).json({
                status: true,
                message: 'Data successfully retrieved.',
                data: rows
            });
        }
    });
});

app.post('/postRequest', (req, res) => {
    const { userId, id, title, body } = req.body;
    let errors = false;

    if (!title || title.length === 0) {
        errors = true;
        // Jika title kosong, kembalikan respon error
        return res.status(400).json({ error: 'Silahkan Masukkan Title' });
    }

    if (!body || body.length === 0) {
        errors = true;
        // Jika body kosong, kembalikan respon error
        return res.status(400).json({ error: 'Silahkan Masukkan Konten' });
    }

    const formData = {
        userId: userId,
        id: id,
        title: title,
        body: body
    };

    // Query untuk menyimpan data ke database
    connection.query('INSERT INTO posts SET ?', formData, (err, result) => {
        if (err) {
            // Jika terjadi kesalahan, kembalikan respon error
            return res.status(500).json({
                error: err.message
            });
        } else {
            // Jika data berhasil disimpan, kembalikan respon sukses
            return res.status(201).json({
                message: 'Data Berhasil Disimpan!',
                data: formData
            });
        }
    });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
