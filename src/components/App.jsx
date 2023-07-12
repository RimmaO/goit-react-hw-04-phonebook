import { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { Toaster, toast } from 'react-hot-toast';

import Section from './Section/Section';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (name, number) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return toast.error(`${name} is already in contacts`);
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };

    setContacts(contacts => [newContact, ...contacts]);
  };

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <>
      <Toaster />
      <Section title="Phonebook">
        <ContactForm onSubmit={createContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} handleChangeFilter={handleChangeFilter} />
        <ContactList
          contacts={getFilterContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
