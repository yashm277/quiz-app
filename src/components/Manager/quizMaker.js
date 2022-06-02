// yash's quiz maker from test goes here.
import { uniqueID } from './popupDialog';

import React from 'react';
import { useState, useEffect } from 'react';
import './quizMaker.css';
import { db } from '../../firebase-config';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
} from 'firebase/firestore';

function ManagerHome() {
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState(0);
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [userAnswer, setUserAnswer] = useState(0);
    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, uniqueID);

    function ClearFields() {
        document.getElementById('textfield1').value = '';
        document.getElementById('textfield2').value = '';
    }

    const createUser = async () => {
        await addDoc(usersCollectionRef, {
            name: newName,
            age: Number(newAge),
            userAnswer: Number(userAnswer),
        });
    };

    const updateUser = async (id, age) => {
        const userDoc = doc(db, uniqueID, id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
    };

    const deleteUser = async (id) => {
        const userDoc = doc(db, uniqueID, id);
        await deleteDoc(userDoc);
    };

    const createMultipleChoiceQuestion = async () => {
        await addDoc(usersCollectionRef, {
            name: newName,
            opt1: option1,
            opt2: option2,
            opt3: option3,
            opt4: option4,
            age: Number(newAge),
            userAnswer: Number(userAnswer),
        });
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
    }, [usersCollectionRef]);

    return (
        <div className="App">
            <div className="MCQ">
                <input
                    placeholder="Question..."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Which number option is correct..."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />
                <input
                    placeholder="Option 1..."
                    onChange={(event) => {
                        setOption1(event.target.value);
                    }}
                />
                <input
                    placeholder="Option 2..."
                    onChange={(event) => {
                        setOption2(event.target.value);
                    }}
                />
                <input
                    placeholder="Option 3..."
                    onChange={(event) => {
                        setOption3(event.target.value);
                    }}
                />
                <input
                    placeholder="Option 4..."
                    onChange={(event) => {
                        setOption4(event.target.value);
                    }}
                />
                <button onClick={createMultipleChoiceQuestion}>
                    {' '}
                    Create Question
                </button>
            </div>

            <div className="numericalquestion">
                <input
                    placeholder="Question..."
                    onChange={(event) => {
                        setNewName(event.target.value);
                    }}
                />
                <input
                    type="number"
                    placeholder="Answer..."
                    onChange={(event) => {
                        setNewAge(event.target.value);
                    }}
                />
                <button onClick={createUser}> Create Question</button>
            </div>

            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Question: {user.name}</h1>
                        <h1>Answer: {user.age}</h1>
                        <button
                            onClick={() => {
                                updateUser(user.id, user.age);
                            }}
                        >
                            {' '}
                            Increase Answer
                        </button>
                        <button
                            onClick={() => {
                                deleteUser(user.id);
                            }}
                        >
                            {' '}
                            Delete Question
                        </button>
                    </div>
                );
            })}
            {users.map((user) => {
                return (
                    <div>
                        {' '}
                        <h1>Question: {user.name}</h1>
                        <h1>Correct Option: {user.age}</h1>
                        <h3>Option1: {user.opt1}</h3>
                        <h3>Option2: {user.opt2}</h3>
                        <h3>Option3: {user.opt3}</h3>
                        <h3>Option4: {user.opt4}</h3>
                    </div>
                );
            })}
        </div>
    );
}

export default ManagerHome;

// const QuizMaker = () => {
//     return (
//         <div>
//             <div>{uniqueID}</div>
//         </div>
//     );
// };

// export default QuizMaker;
