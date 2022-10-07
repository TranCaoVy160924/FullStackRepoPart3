import React from 'react'

const DisplayPhoneNum = ({ persons, handleDeleteClick }) => {
    return (
        <>
            <h2>Numbers</h2>
            <table>
                <tbody>
                    {persons.map(person =>
                        <tr key={person.id}>
                            <td>{person.name}</td>
                            <td>{person.number}</td>
                            <td>
                                <button
                                    onClick={handleDeleteClick(person.id)}>
                                    Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

export default DisplayPhoneNum