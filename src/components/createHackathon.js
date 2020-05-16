import React, { useState } from 'react';
import firestore from "./Firestore.js";
import Hackathon from "./hackathon.js";

export default function CreateHackathon() {
    const [email, setEmail] = useState();
    const [password, setPass] = useState();
    const [name, setName] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const [location, setLocation] = useState();
    const [budget, setBudget] = useState();

    const submitForm = (e) => {
        e.preventDefault();
        let hackathon = new Hackathon(email, password, name, new Date(start), new Date(end), location, parseInt(budget));
    }

    return (
        <form onSubmit={submitForm}>
            <input
                type="text"
                name="name"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="text"
                name="name"
                placeholder="Password"
                onChange={e => setPass(e.target.value)}
            />
            <input
                type="text"
                name="name"
                placeholder="Hackathon Name"
                onChange={e => setName(e.target.value)}
            />
            <input
                type="date"
                name="start"
                placeholder="Start Date"
                onChange={e => setStart(e.target.value)}
            />
            <input
                type="date"
                name="end"
                placeholder="End Date"
                onChange={e => setEnd(e.target.value)}
            />
            <input
                type="text"
                name="location"
                placeholder="Hackathon Location"
                onChange={e => setLocation(e.target.value)}
            />
            <input
                type="text"
                name="fullname"
                placeholder="Budget"
                onChange={e => setBudget(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
}