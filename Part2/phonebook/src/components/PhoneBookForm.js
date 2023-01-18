import React from 'react';

export default function PhoneBookForm({addPerson, newContact, handleFormChange}) {
    return(
        <div>
            <form onSubmit={addPerson}>
                <div>
                    name:
                    <input
                        name="name"
                        type="text"
                        value={newContact.name}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        name="number"
                        type="text"
                        value={newContact.number}
                        onChange={handleFormChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}