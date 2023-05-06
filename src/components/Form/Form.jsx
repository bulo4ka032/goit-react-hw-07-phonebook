import { Formik, Form, Field } from 'formik';
import { PhonebookForm, SubmitBtn, FormTitle } from './Form.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'redux/contactsOptions';
import { getContacts } from 'redux/selectors';
import { customAlphabet } from 'nanoid';
import { Notify } from 'notiflix';
import React from 'react';
import * as Yup from 'yup';

const nanoid = customAlphabet('1234567890', 3);
const schema = Yup.object().shape({
  name: Yup.string().min(2).max(70).required(),
  phone: Yup.number().min(4).required(),
});
const initialValues = {
  id: '',
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleSubmit = (values, { resetForm }) => {
    const newContact = {
      id: 'id-' + nanoid(),
      name: values.name,
      phone: values.phone,
    };
    if (contacts.find(contact => contact.name === newContact.name)) {
      return Notify.warning(`${newContact.name} is already in contact`);
    }
    dispatch(addContact(newContact));
    resetForm();
  };

  return (
    <PhonebookForm>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        <Form autoComplete="off">
          <label htmlFor="name">
            <FormTitle>Name</FormTitle>
            <Field type="text" name="name" />
          </label>
          <label htmlFor="phone">
            <FormTitle>Tel</FormTitle>
            <Field type="tel" name="phone" />
          </label>
          <SubmitBtn type="submit">Add contact</SubmitBtn>
        </Form>
      </Formik>
    </PhonebookForm>
  );
};
