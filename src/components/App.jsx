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

  useEffect(
    () => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    },
    // prevState => {
    //   console.log(contacts);
    //   if (prevState.contacts !== contacts)
    //     localStorage.setItem('contacts', JSON.stringify(contacts));
    //   if (prevState.contacts.length < contacts.length)
    //     toast.success('Create new contact');
    //   if (prevState.contacts.length > contacts.length)
    //     toast.error('Delete contact');
    // },
    [contacts]
  );

  const createContact = ({ name, number }) => {
    const newContact = { name: name, number: number, id: nanoid() };

    setContacts(prevContacts => {
      if (
        prevContacts.find(
          contact =>
            contact.name.toLowerCase() === newContact.name.toLowerCase()
        )
      ) {
        toast.error(`${newContact.name} is already in contacts`);
        return prevContacts;
      }
      return [newContact, ...prevContacts];
    });
  };

  // const createContact = newContact => {
  //   setContacts(prevContacts => {
  //     if (
  //       prevContacts.find(
  //         contact =>
  //           contact.name.toLowerCase() === newContact.name.toLowerCase()
  //       )
  //     ) {
  //       alert(`${newContact.name} is already in contacts`);
  //       return prevContacts;
  //     }
  //     return [newContact, ...prevContacts];
  //   });
  // };

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
