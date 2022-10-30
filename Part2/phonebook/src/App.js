import { useState } from 'react'
import PhoneBookForm from "./components/PhoneBookForm";
import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')
    const handleFormChange = (e) => {
        // console.log(e.target.value)
        setNewName(e.target.value);
    }
    const addPerson = (e) => {
        e.preventDefault();
        let personObject = {
            content: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('');
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <PhoneBookForm name={newName} handleFormChange={handleFormChange} addPerson={addPerson}/>
            <h2>Numbers</h2>
            <Numbers persons={persons}/>
        </div>
    )
}

export default App