import {useEffect, useState} from 'react';
import axios from 'axios';
import personService from './services/persons'
import PhoneBookForm from "./components/PhoneBookForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() => {
        console.log('effect')
        personService
            .getAll()
            .then(initialPersons => {
                console.log('promis fulfilled')
                setPersons(initialPersons)
            })
            .catch(err => {
                console.log('fail')
            })

    },[])
    const handleFormNameChange = (e) => {
        // console.log(e.target.value)
        setNewName(e.target.value);
    }
    const handleFormNumberChange = (e) => {
        // console.log(e.target.value)
        setNewPhone(e.target.value);
    }
    const handleFilter = (e) => setFilter(e.target.value.toLowerCase());
    const filterNames = persons && persons.filter(p => p.name.toLowerCase().includes(filter));
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
        personService
            .create(personObject)
            .then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName('');
                setNewPhone('');
            })
            .catch(err => {
                console.log('fail')
            })
    }
    const deletePerson = (person) => {
        const {id, name} = person;
        const confirmMsg = window.confirm(`Delete ${person.name} ?`)
        console.log(person)

        confirmMsg &&
        personService
            .deletePerson(id)
            .then(() => {
                setPersons(persons.map(p => p.id !== id))
        })
            .catch(err => {
                alert(
                    `the person with name '${person.name}' was already deleted from server`
                )
            })
    }
    // console.log(filterNames)
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleFilter = {handleFilter}/>
            <h2>Add a new</h2>
            <PhoneBookForm
                name={newName}
                handleFormNameChange={handleFormNameChange}
                addPerson={addPerson}
                phone = {newPhone}
                handleFormPhoneChange ={handleFormNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={filterNames} deletePerson ={deletePerson}/>
        </div>
    )
}

export default App