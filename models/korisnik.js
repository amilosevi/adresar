const mongoose = require('mongoose') 
const password = process.env.ATLAS_PASS
const dbname = 'korisnici-api'

const url = `mongodb+srv://oarwa-am:${password}@cluster0.46fij.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(url, {  
    useNewUrlParser: true,  
    useUnifiedTopology: true,  
    useCreateIndex: true,  
    useFindAndModify: false
}).then(result => {
  console.log("Spojeni smo na bazu!")
}).catch(error => {
  console.log("Greška pri spajanju!", error.message)
})
const korisnikSchema = new mongoose.Schema({  
    imePrezime: {
      type: String,
      required: true
    },  
    email:{
      type: String,
      required: true
    }  
}) 
module.exports = mongoose.model('Korisnik', korisnikSchema, "korisnici")

/*const noviKorisnik = new Korisnik({  
    imePrezime: "Nikolina Josic",
    email: "njosic@pmfst.hr"
})
noviKorisnik.save()  
.then(result => {    
    console.log('Korisnik spremljen')    
    console.log(result);    
    mongoose.connection.close()  })

    Korisnik.find({})
    .then(result => {
      result.forEach(k =>{
        console.log(k)
      })
      mongoose.connection.close()
    })*/

korisnikSchema.set('toJSON', {    
  transform: (doc, ret) => {        
    ret.id = doc._id.toString()        
    delete ret._id        
    delete ret.__v        
    return ret    
  }
})