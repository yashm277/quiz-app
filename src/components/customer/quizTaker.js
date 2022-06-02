import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    onSnapshot,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function QuizTaker() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userAnswer, setUserAnswer] = useState(0);
    const usersCollectionRef = collection(db, 'users');

    const updateUser = async (id, age) => {
        const userDoc = doc(db, 'users', id);
        const newFields = { userAnswer: userAnswer };
        await updateDoc(userDoc, newFields);
    };

    //   useEffect(() => {
    //     const getUsers = async () => {
    //       const data = await getDocs(usersCollectionRef);
    //       setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //     };
    //     getUsers();
    //   }, []);

    useEffect(() => {
        if (usersCollectionRef) {
            onSnapshot(usersCollectionRef, async () => {
                const data = await getDocs(usersCollectionRef);
                setUsers(
                    data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                );
            });
        }
    }, []);

    return (
        <div className="App">
            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Question: {user.name}</h1>
                        <input
                            type="number"
                            placeholder="Your Answer..."
                            onChange={(event) => {
                                setUserAnswer(event.target.value);
                            }}
                        />
                        <button
                            onClick={() => {
                                updateUser(user.id, user.age);
                            }}
                        >
                            {' '}
                            Submit!
                        </button>
                    </div>
                );
            })}
            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Question: {user.name}</h1>
                        <h3>Option1: {user.opt1}</h3>
                        <h3>Option2: {user.opt2}</h3>
                        <h3>Option3: {user.opt3}</h3>
                        <h3>Option4: {user.opt4}</h3>
                        <input
                            type="number"
                            placeholder="Your Answer..."
                            onChange={(event) => {
                                setUserAnswer(event.target.value);
                            }}
                        />
                    </div>
                );
            })}
            <button onClick={() => navigate('/results')}>
                SUBMIT THE QUIZ !
            </button>
        </div>
    );
}

export default QuizTaker;
