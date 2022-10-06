const mongoose = require('mongoose')
const numberOfArgument = process.argv.length

if (numberOfArgument < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://liacod1210:${password}@vende-database.hcl7gcm.mongodb.net/phonebook?retryWrites=true&w=majority`
const newName = process.argv[3]
const newNumber = process.argv[4]

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const saveNewPerson = () => {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
            let newPerson = createNewPerson()
            return newPerson.save()
        })
        .then(() => {
            console.log(`add ${newName} number ${newNumber} to phonebook`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}

const createNewPerson = () => {
    let newPerson = new Person({
        name: newName.toString(),
        number: newNumber.toString()
    })
    return newPerson
}

const showAllPerson = (query) => {
    let queryResult = []
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            Person.find(query).then(result => {
                result.forEach(per => {
                    console.log(per)
                })
                mongoose.connection.close()
            })
        })
        .catch((err) => console.log(err))
    return queryResult
}

if (numberOfArgument == 3) {
    showAllPerson()
}

if (numberOfArgument == 5) {
    saveNewPerson({})
}


