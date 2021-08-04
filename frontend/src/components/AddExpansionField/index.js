import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, IconButton } from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

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
            <IconButton
              onClick={() => {
                handleChange(null, index, 'delete');
              }}
              children={'Delete'}
              icon={<SmallCloseIcon />}
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

const AddButton = styled.div`
  font-weight: bold;
  cursor: pointer;
  padding: 8px 0;
  color: steelblue;
`;
