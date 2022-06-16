import React from 'react';
import { Divider, Input } from 'antd';
import { useState } from 'react';

function Search(props) {

    const [searchField, setSearchField] = useState("")

    const handleChange = (event) => {

        setSearchField(event.target.value)

        props.filterRides(event.target.value)
    }

  return (
    <div>
      <Divider>Search for a ride by closest city</Divider>
      <Input value={searchField} type="search" placeholder='Type city...' name="insertedText" onChange={handleChange} />
    </div>
  );
}

export default Search;
