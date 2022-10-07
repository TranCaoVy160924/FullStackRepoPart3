import React from 'react'

const AddPersonForm = (props) => {
    const handleSubmit = props.handleSubmit
    const newName = props.states.name
    const newPhoneNum = props.states.phone
    const handleNameChange = props.handleChange.name
    const handlePhoneChange = props.handleChange.phone

    return (
        <form onSubmit={handleSubmit}>
            <div>
                name:
                <input value={newName} required
                    onChange={handleNameChange} />
            </div>
            <div>
                phone number:
                <input value={newPhoneNum} required
                    onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPersonForm