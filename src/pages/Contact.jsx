import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createFeedbackApi } from '../apis/Api';
import '../css/contactstyle.css';

const ContactUs = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', fullname);
        formData.append('email', email);
        formData.append('number', number);
        formData.append('message', message);

        createFeedbackApi(formData)
            .then((res) => {
                if (res.data.success === false) {
                    toast.error(res.data.message);
                } else {
                    toast.success(res.data.message);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error('Internal Server Error!');
            });
    };

    return (
        <div className="contact-us-background">
            <div className="form-container">
                <h1>Contact Us</h1>
                <div className="input-group">
                    <label htmlFor="name">Name</label><br />
                    <input
                        type="text"
                        placeholder="Please enter your name"
                        id="name"
                        name="name"
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="emailll">Email</label><br />
                    <input
                        type="text"
                        placeholder="Please enter your email"
                        id="emaill"
                        name="emaill"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="phone">Phone Number</label><br />
                    <input
                        type="tel"
                        placeholder="Please enter your phone"
                        id="phone"
                        name="phone"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="message">Message</label><br />
                    <textarea
                        placeholder="Please enter your message"
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default ContactUs;
