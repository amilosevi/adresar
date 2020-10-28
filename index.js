const express = require('express')
//require('dotenv').config()

const cors = require('cors')
//const { default: Korisnik } = require('../frontend/src/components/Korisnik')
const app = express()
app.use(express.static('build'))

app.use(cors())
app.use(express.json())

const mongoose = require("mongoose")

const Korisnik = require('./models/korisnik')
//const korisnik = require('./models/korisnik')


const zahtjevInfo = (req, res, next) => {
    console.log('Metoda:', req.method);
    console.log('Putanja:', req.path);
    console.log('Tijelo:', req.body);
    console.log('---');
    next();
}

app.use(zahtjevInfo);

let korisnici = [
    {
        id: "5f955020fa27390a0c7d4ccb",
        imePrezime: "Nikolina Josic",
        email: "njosic@pmfst.hr"
    },
    {
        imePrezime: "Ana Milosevic",
        email: "amilosevi@pmfst.hr",
        id: "5f954ef46db95c2cac51c0a3"
    }
]
app.get('/', (req, res) => {
    res.send('<h1>...</h1>')
})
app.get('/api/korisnici', (req, res) => {
    Korisnik.find({}).then(result => {
        res.json(result)
    })

})
app.get('/api/korisnici/:id', (req, res, next) => {
    //const id = Number(req.params.id)  
    //const korisnik = korisnici.find(k => k.id === id)
    Korisnik.findById(req.params.id)
        .then(korisnik => {
            if (korisnik) {
                res.json(korisnik)
            } else {
                res.status(404).end()
            }
        }).catch(err => next(err))

})
app.delete('/api/korisnici/:id', (req, res, next) => {
    //const id = Number(req.params.id)
    //korisnici = korisnici.filter(k => k.id !== id)
    Korisnik.findByIdAndRemove(req.params.id)
    .then(result => {
        res.status(204).end()
    }).catch(err => next(err))
})

app.post('/api/korisnici', (req, res, next) => {
    //const maxId = korisnici.length > 0 ? 
    //Math.max(...korisnici.map(k => k.id)) : 0;

    const podatak = req.body;
    if (!podatak.imePrezime) {
        return res.status(400).json({
            error: "Nedostaje sadržaj korisnici"
        });
    }
    const korisnik = new Korisnik({
        imePrezime: podatak.imePrezime,
        email: podatak.email
    })
    korisnik.save().then(spremljeniKorisnik => {
        res.json(spremljeniKorisnik)
    }).catch(err => next(err))

    //korisnici = korisnici.concat(korisnik);
    //res.json(korisnik);
});

app.put('/api/korisnici/:id', (req, res, next) => {
    const objekt = req.body
    const id = req.params.id
    const korisnik = {
        imePrezime: objekt.imePrezime,
        email: objekt.email
    }
    //console.log(objekt);
    //res.json(objekt)
    Korisnik.findByIdAndUpdate(id, korisnik, {new : true})
    .then(noviKorisnik => {
        res.json(noviKorisnik)
    }).catch(err => next(err))
})


const errorHandler = (err, req, res, next) => {
    console.log(err.message);
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'krivi format ID-a' })
    } else if (err.name === "ValidationError") {
        return res.status(400).send({ error: err.message })
    }
    next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log(`Posluzitelj je pokrenut na portu ${PORT}`)
})