import React, { useState } from 'react';
import styled from 'styled-components';
import { Input } from '@chakra-ui/react';

export default function AddExpansionField({ parentCallback }) {
  const [itemsArray, setItemsArray] = useState([]);

  const handleChange = (e, index, type) => {
    const list = [...itemsArray];
    type === 'delete' ? list.splice(index, 1) : (list[index] = e.target.value);
    setItemsArray(list);
    parentCallback(list);
  };

  return (
    <div>
      {itemsArray?.map((item, index) => {
        return (
          <div style={{ display: 'flex', marginTop: 8 }} key={index}>
            <Input
              placeholder={`Expansion ${index + 1} Name...`}
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
      <AddButton
        onClick={() =>
          setItemsArray(() => {
            const list = [...itemsArray];
            list.push('');
            setItemsArray(list);
          })
        }
      >
        Add Expansion
      </AddButton>
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
