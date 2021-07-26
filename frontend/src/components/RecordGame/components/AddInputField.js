import React, { useState } from 'react';
import styled from 'styled-components';

export default function AddInputField({ parentCallback }) {
  const [itemsArray, setItemsArray] = useState([]);

  const handleChange = (e, index, type) => {
    const list = [...itemsArray];
    type === 'delete' ? list.splice(index, 1) : (list[index] = e.target.value);
    setItemsArray(list);
    parentCallback(itemsArray);
  };

  return (
    <div>
      {itemsArray?.map((item, index) => {
        return (
          <div style={{ display: 'flex', marginTop: 8 }} key={index}>
            <Input
              placeholder={`Expansion Name...${index}`}
              value={item}
              onChange={(e) => {
                handleChange(e, index);
              }}
            />
            <Delete
              onClick={() => {
                handleChange(null, index, 'delete');
              }}
              children={'Delete'}
            />
          </div>
        );
      })}
      <AddButton onClick={() => setItemsArray((prev) => prev.concat(''))}>Add Expansion</AddButton>
    </div>
  );
}

const Delete = styled.div`
  cursor: pointer;
  padding: 8px;
`;

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`;

const Input = styled.input`
  outline: none;
  border-radius: 5px;
  border: solid 2px grey;
  padding: 8px;
  flex: 1;
`;
