const mongoose = require('mongoose') 
const password = 'baza123'
const dbname = 'korisnici-api'

const url = `mongodb+srv://oarwa-am:${password}@cluster0.46fij.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useCreateIndex: true,  
    useFindAndModify: false
})
const korisnikSchema = new mongoose.Schema({  
    imePrezime: String,  
    email: String,  
}) 
const Korisnik = mongoose.model('Korisnik', korisnikSchema, "korisnici")

/*const noviKorisnik = new Korisnik({  
    imePrezime: "Nikolina Josic",
    email: "njosic@pmfst.hr"
})
noviKorisnik.save()  
.then(result => {    
    console.log('Korisnik spremljen')    
    console.log(result);    
    mongoose.connection.close()  })*/

    Korisnik.find({})
    .then(result => {
      result.forEach(k =>{
        console.log(k)
      })
      mongoose.connection.close()
    })