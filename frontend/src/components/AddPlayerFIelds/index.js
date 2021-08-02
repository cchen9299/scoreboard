import React, { useState } from 'react';
import styled from 'styled-components';
import { capitalizeSingleWord } from '../../util/helper';

export default function AddPlayerFields({
  parentCallback,
  hasFirstField = true,
  buttonCopoy = 'Add Another Player',
  includeScore = false,
}) {
  const [itemsArray, setItemsArray] = useState(
    hasFirstField
      ? includeScore
        ? [{ firstName: '', lastName: '', score: 0 }]
        : [{ firstName: '', lastName: '' }]
      : []
  );

  const handleChange = (index, type, key, value) => {
    const list = [...itemsArray];
    type === 'delete' ? list.splice(index, 1) : (list[index][key] = capitalizeSingleWord(value));
    setItemsArray(list);
    parentCallback(list);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {itemsArray?.map((item, index) => {
        return (
          <div style={{ display: 'flex', marginTop: 8 }} key={index}>
            <Input
              placeholder={`First Name...${index}`}
              value={item.firstName}
              onChange={(e) => {
                handleChange(index, 'add', 'firstName', e.target.value);
              }}
            />
            <Input
              placeholder={`Last Name...${index}`}
              value={item.lastName}
              onChange={(e) => {
                handleChange(index, 'add', 'lastName', e.target.value);
              }}
            />
            {includeScore && (
              <Input
                placeholder={`Score ${index}`}
                value={item.score}
                type={'number'}
                onChange={(e) => {
                  handleChange(index, 'add', 'score', e.target.value);
                }}
              />
            )}
            <Delete
              onClick={() => {
                handleChange(index, 'delete');
              }}
              children={'Delete'}
            />
          </div>
        );
      })}
      <AddButton
        onClick={() => {
          const list = [...itemsArray];
          list.push(
            includeScore
              ? { firstName: '', lastName: '', score: 0 }
              : { firstName: '', lastName: '' }
          );
          setItemsArray(list);
        }}
      >
        {buttonCopoy}
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

const Input = styled.input`
  outline: none;
  border-radius: 5px;
  border: solid 2px grey;
  padding: 8px;
  flex: 1;
  margin-right: 8px;
`;
