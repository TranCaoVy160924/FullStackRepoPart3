import React from 'react'
import { useState, useEffect } from 'react'
import PersonService from './services/persons'
import DisplayPhoneNum from './components/DisplayPhoneNum'
import SearchByName from './components/SearchByName'
import AddPersonForm from './components/AddPersonForm'
import DisplayMessage from './components/DisplayMessage'

const App = () => {
   const [persons, setPersons] = useState([])
   const [newName, setNewName] = useState('')
   const [newPhoneNum, setNewPhoneNum] = useState('')
   const [keyword, setKeyword] = useState('')
   const [renderPersons, setRenderPersons] = useState(persons)
   const [message, setMessage] = useState(null)

   useEffect(() => {
      PersonService.getAll()
         .then(initialData => {
            setPersons(initialData)
            setRenderPersons(initialData)
         })
   }, [])

   const isEmptyString = (string) =>
      string.trim() === '' || string === null

   const containInsensitive = (string, subString) =>
      string.trim().toLowerCase()
         .includes(subString.trim().toLowerCase())

   const searchPersons = () => {
      if (isEmptyString(keyword)) {
         setRenderPersons(persons)
      }
      else {
         let searchResult = persons.filter((x) =>
            containInsensitive(x.name, keyword))
         setRenderPersons(searchResult)
      }
   }

   const addName = (event) => {
      event.preventDefault()
      console.log('current data: ', persons)
      let existedIndex = persons
         .findIndex(x => x.name === newName)
      // console.log(event.target)

      const personObject = {
         name: newName,
         number: newPhoneNum
      }

      // add person to list if not exist or alert
      if (existedIndex === -1) {
         PersonService.createPerson(personObject)
            .then(response => {
               let messageText = `add ${response.name}`

               setPersons(persons.concat(response))
               setRenderPersons(persons.concat(response))
               setNewName('')
               setNewPhoneNum('')
               createMessage(messageText, false)
            })

      }
      else {
         console.log('existed index: ', existedIndex)
         if (persons[existedIndex].number !== personObject.number) {
            if (window.confirm('update id: ' + existedIndex
               + ', name: ' + personObject.name)) {
               console.log('updating ', persons[existedIndex])
               PersonService.updatePerson(existedIndex + 1, personObject)
                  .then(response => {
                     let newData = persons
                        .map(person => person.id !== (existedIndex + 1) ?
                           person : response)
                     let messageText = `updated ${response.name}`

                     console.log(newData)
                     setPersons(newData)
                     setRenderPersons(newData)
                     setNewName('')
                     setNewPhoneNum('')
                     createMessage(messageText, false)
                  })
                  .catch(error => {
                     let newData = persons
                        .filter(person => person.id !== existedIndex + 1)
                     let messageText = `Information of ${personObject.name} `
                        + 'has been deleted from the server'
                     console.log(newData)

                     setPersons(newData)
                     setRenderPersons(newData)
                     createMessage(messageText, true)
                  })
            }
         } else {
            alert(newName + " is already added to phone book")
         }
      }
   }

   const handleStateChange = (stateSetter) => {
      return (event) => {
         stateSetter(event.target.value)
      }
   }

   const handleDeleteClick = (id) => {
      return () => {
         if (window.confirm('delete person?')) {
            let deletedPerson = persons
               .find(person => person.id === id)

            console.log('deleting ', id)
            PersonService.deletePerson(id)
               .then(() => {
                  let newData = persons
                     .filter(person => person.id !== id)
                  let messageText = `deleted ${deletedPerson.name}`

                  console.log(newData)
                  setPersons(newData)
                  setRenderPersons(newData)
                  createMessage(messageText, false)

                  return
               })
               .catch(error => {
                  let messageText = `Information of ${deletedPerson.name} `
                     + 'has been deleted from the server'

                  createMessage(messageText, true)
               })
         }
      }
   }

   const createMessage = (text, isError) => {
      setMessage({ text, isError })

      const timer = setTimeout(() => {
         setMessage(null)
         clearTimeout(timer)
      }, 5000)

   }

   const formState = { name: newName, phone: newPhoneNum }
   const formHandleFunc = {
      name: handleStateChange(setNewName),
      phone: handleStateChange(setNewPhoneNum)
   }

   return (
      <div>
         <h2>Phonebook</h2>

         <SearchByName keyword={keyword}
            handleChange={handleStateChange(setKeyword)}
            searchFunc={searchPersons} />

         <AddPersonForm handleSubmit={addName}
            states={formState}
            handleChange={formHandleFunc}
            createMessage={createMessage} />

         <DisplayPhoneNum persons={renderPersons}
            handleDeleteClick={handleDeleteClick} />

         <DisplayMessage message={message} />
      </div>
   )
}


export default App