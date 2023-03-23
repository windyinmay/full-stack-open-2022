import { useEffect, useState } from "react";
import personService from "./services/persons";
import PhoneBookForm from "./components/PhoneBookForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");
  const [updateMsg, setUpdateMsg] = useState(null);

  useEffect(() => {
    console.log("effect");
    personService
      .getAll()
      .then((initialPersons) => {
        console.log("promis fulfilled");
        setPersons(initialPersons);
      })
      .catch((err) => {
        console.log("fail");
      });
  }, []);
  // const handleFormNameChange = (e) => {
  //     // console.log(e.target.value)
  //     setNewName(e.target.value);
  // }
  // const handleFormNumberChange = (e) => {
  //     // console.log(e.target.value)
  //     setNewPhone(e.target.value);
  //}
  const handleFormChange = (e) =>
    setNewContact({ ...newContact, [e.target.name]: e.target.value });

  const handleFilter = (e) => setFilter(e.target.value.toLowerCase());
  // let exsitingNames = persons.map(p => p.name)
  const addPerson = (e) => {
    e.preventDefault();
    const exsitingNames = persons.filter(
      (p) => p.name.toLowerCase() === newContact.name.trim().toLowerCase()
    );
    // let personObject = {
    //     name: newName,
    //     number: newPhone,
    //     // id: `nn${Math.floor(Math.random()*100000) + 1}`
    //     id: persons[persons.length-1].id + 1
    // }
    if (exsitingNames.length > 0) {
      // alert(`${newContact.name} is already added to phonebook`)
      const confirmation = window.confirm(
        `${newContact.name} is already added to phonebook, replace the old number with a new one?`
      );

      confirmation &&
        personService
          .update(exsitingNames[0].id, newContact)
          .then((updatedContact) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedContact.id ? updatedContact : p
              )
            );
            setNewContact({ name: "", number: "" });
            setUpdateMsg(`Sucessfully updated ${updatedContact.name}`);
            setTimeout(() => {
              setUpdateMsg(null);
            }, 5000);
            setPersons(persons.filter((p) => p.id !== updatedContact.id));
          })
          .catch((err) => {
            setUpdateMsg("failed");
            setTimeout(() => setUpdateMsg(null), 5000);
          });
    } else {
      //     setPersons(persons.concat(personObject))
      //     setNewName('');
      //     setNewPhone('');
      // }
      personService
        .create(newContact)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewContact({ name: "", number: "" });
          setUpdateMsg(`Added ${returnedPerson.name}`);
          setTimeout(() => setUpdateMsg(null), 5000);
        })
        .catch((err) => {
          setUpdateMsg(err.response.data.error);
          setTimeout(() => setUpdateMsg(null), 5000);
          console.log(err.response.data.error);
        });
    }
  };
  const deletePerson = (person) => {
    const { id, name } = person;
    const confirmMsg = window.confirm(`Delete ${person.name}?`);
    //     console.log(person.id)

    confirmMsg &&
      personService
        .deletePerson(id)
        .then(() => {
          const updatedList = persons.filter((person) => person.id !== id);
          setUpdateMsg(`${person.name} removed`);
          setTimeout(() => setUpdateMsg(null), 5000);
          setPersons(updatedList);
        })
        .catch((error) => {
          setUpdateMsg(
            `the person with name '${person.name}' was already removed from server`
          );
          setTimeout(() => setUpdateMsg(null), 5000);
          setPersons(persons.filter((p) => p.id !== id));
        });
  };

  // const deletePerson = person => {
  //     const url = `http://localhost:3001/persons/${id}`
  //     const person = persons.find(p => p.id === id)
  //     console.log(person)
  //     const confirmMsg = window.confirm(`Delete ${person.name} ?`)
  // const updatedList = persons.slice(id,1)
  // confirmMsg &&
  // axios.put(url, updatedList).then(res => res.data)
  // .catch(err => {
  //                 alert(
  //                     `the person with name '${person.name}' was already deleted from server`
  //                 )
  //             })
  // console.log(persons)
  const filterNames =
    persons.length > 0 &&
    persons.filter((person) => person.name.toLowerCase().includes(filter));
  // console.log(filterNames)
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={updateMsg} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <PhoneBookForm
        newContact={newContact}
        handleFormChange={handleFormChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      {filterNames.length > 0 && (
        <Persons persons={filterNames} deletePerson={deletePerson} />
      )}
    </div>
  );
};

export default App;
