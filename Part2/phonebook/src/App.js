import { useState } from 'react'
import PhoneBookForm from "./components/PhoneBookForm";
// import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', phone: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleFormNameChange = (e) => {
        // console.log(e.target.value)
        setNewName(e.target.value);
    }
    const handleFormNumberChange = (e) => {
        // console.log(e.target.value)
        setNewPhone(e.target.value);
    }
    let exsitingNames = persons.map(p => p.name)
    const addPerson = (e) => {
        e.preventDefault();
        let personObject = {
            name: newName,
            phone: newPhone
        }
        if(exsitingNames.includes(newName)){
            alert(`${newName} is already added to phonebook`)
        }else {
            setPersons(persons.concat(personObject))
            setNewName('');
            setNewPhone('');
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <PhoneBookForm
                name={newName}
                handleFormNameChange={handleFormNameChange}
                addPerson={addPerson}
                phone = {newPhone}
                handleFormPhoneChange ={handleFormNumberChange}
            />
            <h2>Numbers</h2>
            {/*<Numbers persons={persons}/>*/}
            {persons.map((p,index) => <li key={index}>{p.name} {p.phone}</li>)}
        </div>
    )
}

export default App