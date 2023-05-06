import { Contacts } from './Contacts/Contacts';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import {
  PhoneBook,
  ContactsTitle,
  ContactsWrapper,
} from 'components/App.styled';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'redux/contactsOptions';

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <PhoneBook>
      <ContactForm />
      <ContactsWrapper>
        <ContactsTitle>Contacts</ContactsTitle>
        <Filter />
        <Contacts />
      </ContactsWrapper>
    </PhoneBook>
  );
};
