import React from 'react'

export default function PhoneBookForm(props) {
    return(
        <div>
            <form onSubmit={props.addPerson}>
                <div>
                    name:
                    <input
                    type="text"
                    value={props.name}
                    onChange={props.handleFormNameChange}
                    />
                </div>
                <div>
                    number:
                    <input
                        type="text"
                        value={props.phone}
                        onChange={props.handleFormPhoneChange}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}