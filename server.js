const express = require('express')
const fs = require('fs')
const { Server } = require('http')
const mysql = require("mysql")
const multer = require('multer');
const cors = require('cors')
const path = require('path')

const app = express()
app.use(cors());
// untuk memanggil gambar
// app.use('/album', express.static(path.join(__dirname, 'album')));
// app.use(express.static(path.join(__dirname, 'public')));

// untuk mengambil folder public
app.use(express.static('public'));
// app.use('/album', express.static('album'));
app.use('/album', express.static(path.join(__dirname, 'album')));
app.use('/album', express.static(path.join(__dirname, 'public, index.html')));
app.use('/album', express.static(path.join(__dirname, 'public, new_product.html')));

// app.use('/albumss', express.static('albumss'));
const db = mysql.createConnection({
    host: "localhost",
    database: "contoh",
    user: "root",
    password: ""
})

// ================================================= INDEX.HTML ==================================================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();

  db.query(
    'SELECT * FROM finish WHERE LOWER(nama) = ?',
    [nama],
    (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');

      const alat = results[0];
        console.log(results)
      const templatePath = path.join(__dirname, 'public', 'index.html');
      fs.readFile(templatePath, 'utf8', (err, html) => {
        if (err) return res.status(500).send('Error loading template');

        const finalHtml = html
          .replace(/{{nama}}/g, alat.nama)
          .replace(/{{gambar}}/g, alat.gambar);

        res.send(finalHtml);
      });
    }
  );
});

db.connect ( err => {
    if ( err) throw err
    console.log('mysql connected')
})

app.get('/api/finish', (req, res) => {
  db.query('SELECT * FROM finish', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/finish/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();
  db.query('SELECT * FROM finish WHERE LOWER(nama) = ?', [nama], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');
    res.json(results);
  });
});

// ================================================= END INDEX.HTML ==================================================================

// ================================================= NEW_PRODUCT.HTML ==================================================================


app.get('new_product', (req, res) => {
    res.sendFile(path.join(__dirname, 'new_product.html'))
})

app.get('/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();

  db.query(
    'SELECT * FROM new_produk WHERE LOWER(nama) = ?',
    [nama],
    (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');

      const alat = results[0];
        console.log(results)
      const templatePath = path.join(__dirname, 'public', 'new_product.html');
      fs.readFile(templatePath, 'utf8', (err, html) => {
        if (err) return res.status(500).send('Error loading template');

        const finalHtml = html
          .replace(/{{nama}}/g, alat.nama)
          .replace(/{{gambar}}/g, alat.gambar);

        res.send(finalHtml);
      });
    }
  );
});


app.get('/api/new_produk', (req, res) => {
  db.query('SELECT * FROM new_produk', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/new_produk/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();
  db.query('SELECT * FROM new_produk WHERE LOWER(nama) = ?', [nama], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');
    res.json(results);
  });
});


// ================================================= END NEW_PRODUCT.HTML ==================================================================

// ================================================= BEST_SELLER.HTML ==================================================================

app.get('best_seller', (req, res) => {
    res.sendFile(path.join(__dirname, 'best_seller.html'))
})

app.get('/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();

  db.query(
    'SELECT * FROM best_seller WHERE LOWER(nama) = ?',
    [nama],
    (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');

      const alat = results[0];
        console.log(results)
      const templatePath = path.join(__dirname, 'public', 'best_seller.html');
      fs.readFile(templatePath, 'utf8', (err, html) => {
        if (err) return res.status(500).send('Error loading template');

        const finalHtml = html
          .replace(/{{nama}}/g, alat.nama)
          .replace(/{{gambar}}/g, alat.gambar);

        res.send(finalHtml);
      });
    }
  );
});


app.get('/api/best_seller', (req, res) => {
  db.query('SELECT * FROM best_seller', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/best_seller/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();
  db.query('SELECT * FROM best_seller WHERE LOWER(nama) = ?', [nama], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');
    res.json(results);
  });
});


// ================================================= END BEST_SELLER.HTML ==================================================================

// ================================================= PROMO.HTML ==================================================================

app.get('promo', (req, res) => {
    res.sendFile(path.join(__dirname, 'promo.html'))
})

app.get('/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();

  db.query(
    'SELECT * FROM promo WHERE LOWER(nama) = ?',
    [nama],
    (err, results) => {
      if (err) return res.status(500).send('Database error');
      if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');

      const alat = results[0];
        console.log(results)
      const templatePath = path.join(__dirname, 'public', 'promo.html');
      fs.readFile(templatePath, 'utf8', (err, html) => {
        if (err) return res.status(500).send('Error loading template');

        const finalHtml = html
          .replace(/{{nama}}/g, alat.nama)
          .replace(/{{gambar}}/g, alat.gambar);

        res.send(finalHtml);
      });
    }
  );
});


app.get('/api/promo', (req, res) => {
  db.query('SELECT * FROM promo', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

app.get('/api/promo/:nama', (req, res) => {
  const nama = req.params.nama.toLowerCase();
  db.query('SELECT * FROM promo WHERE LOWER(nama) = ?', [nama], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Alat musik tidak ditemukan');
    res.json(results);
  });
});

// ================================================= END PROMO.HTML ==================================================================

app.get('/api/alat_musik', (req, res) => {
  const alat = req.query.alat;
  if (!alat) return res.status(400).json({ error: 'Parameter alat dibutuhkan' });

  db.query('SELECT * FROM alat_musik WHERE LOWER(nama) = LOWER(?) LIMIT 1', [alat], (err, results) => {
    if (err) return res.status(500).json({ error: 'Query error' });
    if (results.length === 0) return res.status(404).json({ error: 'Alat musik tidak ditemukan' });

    res.json(results[0]);
  });
});

// Endpoint untuk semua alat musik
app.get('/api/alat_musik/all', (req, res) => {
  db.query('SELECT * FROM alat_musik', (err, results) => {
    if (err) return res.status(500).json({ error: 'Query error' });
    res.json(results);
  });
});


app.listen(8005, () => {
    console.log('ready')
})