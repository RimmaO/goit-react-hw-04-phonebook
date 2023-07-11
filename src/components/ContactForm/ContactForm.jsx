import PropTypes from 'prop-types';

import { useState } from 'react';
import { Button, Input, Text, Wrap } from './ContactForm.styled';

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;

      case 'number':
        setNumber(event.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    const contact = {
      name: name,
      number: number,
    };

    onSubmit(contact);

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Wrap>
        <Text>Name</Text>
        <label>
          <Input
            onChange={handleChange}
            value={name}
            type="text"
            name="name"
            placeholder="Enter a contact name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces.For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
      </Wrap>
      <Wrap>
        <Text>Number</Text>
        <label>
          <Input
            onChange={handleChange}
            value={number}
            type="tel"
            name="number"
            placeholder="Enter a contact number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
      </Wrap>

      <Button type="submit">Add contact</Button>
    </form>
  );
}

ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };
