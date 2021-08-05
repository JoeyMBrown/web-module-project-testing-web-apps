import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
});

test('renders the contact form header', ()=> {
    render (<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render (<ContactForm />);
    const firstName = screen.getByLabelText(/first name*/i);
    userEvent.type(firstName, "abcd");

    await waitFor(() => {
        const errorMessage = screen.getByText(/firstName must have at least 5 characters./i)
        expect(errorMessage).toBeInTheDocument();
    })
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render (<ContactForm />);

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const firstNameError = screen.getByText(/firstName must have at least 5 characters./i);
        const lastNameError = screen.getByText(/lastName is a required field./i);
        const emailError = screen.getByText(/email must be a valid email address./i);

        expect(firstNameError).toBeInTheDocument();
        expect(lastNameError).toBeInTheDocument();
        expect(emailError).toBeInTheDocument();
    })
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render (<ContactForm />);

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, "ThIsIsMyNaMe");

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, "ThIsIsMyLaStNaMe");

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const emailError = screen.getByText(/email must be a valid email address./i);
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render (<ContactForm />)

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, "asdw");

    await waitFor(() => {
        const emailError = screen.getByText(/email must be a valid email address./i);
        expect(emailError).toBeInTheDocument();
    })
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />)

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, "ThIsIsMyNaMe");

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, "asdw@email.com");

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const lastNameError = screen.getByText(/lastName is a required field./i);
        expect(lastNameError).toBeInTheDocument();
    })
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    
    const firstNameText = 'johnny';
    const lastNameText = 'lastnamebro';
    const email = "myfrigginemailbro@gmail.com";

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, firstNameText);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, lastNameText);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, email);

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const submitedFirstName = screen.getByText(firstNameText);
        const submitedlastName = screen.getByText(lastNameText);
        const submitedEmail = screen.getByText(email);
        const submittedMessage = screen.queryByTestId('messageDisplay');

        expect(submitedFirstName).toBeInTheDocument();
        expect(submitedlastName).toBeInTheDocument();
        expect(submitedEmail).toBeInTheDocument();
        expect(submittedMessage).toBeNull();
    })


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    
    const firstNameText = 'johnny';
    const lastNameText = 'lastnamebro';
    const email = "myfrigginemailbro@gmail.com";
    const message = 'THIS IS MY FLIPPIN MESSAGE DOG YA DUDE LETS GET IT DUDE THIS IS A MESSAGE';

    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, firstNameText);

    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, lastNameText);

    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, email);

    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, message);

    const submit = screen.getByRole("button");
    userEvent.click(submit);

    await waitFor(() => {
        const submitedFirstName = screen.getByText(firstNameText);
        const submitedlastName = screen.getByText(lastNameText);
        const submitedEmail = screen.getByText(email);
        const submitedMessage = screen.getByTestId('messageDisplay');

        expect(submitedFirstName).toBeInTheDocument();
        expect(submitedlastName).toBeInTheDocument();
        expect(submitedEmail).toBeInTheDocument();
        expect(submitedMessage).toBeInTheDocument();
    })
});