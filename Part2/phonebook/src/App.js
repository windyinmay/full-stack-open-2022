import { useState } from 'react'
import PhoneBookForm from "./components/PhoneBookForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')

    const handleFormNameChange = (e) => {
        // console.log(e.target.value)
        setNewName(e.target.value);
    }
    const handleFormNumberChange = (e) => {
        // console.log(e.target.value)
        setNewPhone(e.target.value);
    }
    const handleFilter = (e) => setFilter(e.target.value.toLowerCase());
    const filterNames = persons.filter(p => p.name.toLowerCase().includes(filter));
    let exsitingNames = persons.map(p => p.name)
    const addPerson = (e) => {
        e.preventDefault();
        let personObject = {
            name: newName,
            number: newPhone,
            // id: `nn${Math.floor(Math.random()*100000) + 1}`
            id: persons[persons.length-1].id + 1
        }
        if(exsitingNames.includes(newName)){
            alert(`${newName} is already added to phonebook`)
        }else {
            setPersons(persons.concat(personObject))
            setNewName('');
            setNewPhone('');
        }
    }
    console.log(filterNames)
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter = {handleFilter}/>
            <h3>Add a new</h3>
            <PhoneBookForm
                name={newName}
                handleFormNameChange={handleFormNameChange}
                addPerson={addPerson}
                phone = {newPhone}
                handleFormPhoneChange ={handleFormNumberChange}
            />
            <h3>Numbers</h3>
            <Persons persons={filterNames}/>
            {/*{persons.map((p,index) => <li key={index}>{p.name}  {p.number}</li>)}*/}
        </div>
    )
}

export default App