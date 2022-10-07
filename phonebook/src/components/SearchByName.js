import React from 'react'

const SearchByName = ({ keyword, handleChange, searchFunc }) => (
    <>
        <div>
            <input value={keyword}
                onChange={handleChange} />
        </div>
        <button onClick={searchFunc}>Search</button>
    </>
)

export default SearchByName