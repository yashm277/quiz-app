import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import './Result.css';

function Result() {
    const [users, setUsers] = useState([]);
    const [userAnswer, setUserAnswer] = useState(0);
    const usersCollectionRef = collection(db, 'users');

    const updateUser = async (id, age) => {
        const userDoc = doc(db, 'users', id);
        const newFields = { userAnswer: userAnswer };
        await updateDoc(userDoc, newFields);
    };

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getUsers();
    }, []);

    let marks = 0;
    let totalmarks = 0;

    {
        users.map((user) => {
            if (user.userAnswer == user.age) {
                marks = marks + 1;
            } else {
                marks = marks;
            }
        });
    }

    {
        users.map((user) => {
            console.log('User: ', user);
            if (user.userAnswer == user.age) {
                totalmarks = totalmarks + 1;
            } else {
                totalmarks = totalmarks + 1;
            }
        });
    }

    const percentage_score = ((marks / totalmarks) * 100).toFixed(2);

    return (
        <div className="result">
            {/* <span className="title">Final Score : {percentage_score}</span> */}
            <h1>Marks: {marks}</h1>
            <h1>Total Marks: {totalmarks}</h1>
            <h1>Percentage: {percentage_score} %</h1>

            {/* <Button
        variant="contained"
        color="secondary"
        size="large"
        style={{ alignSelf: "center", marginTop: 20 }}
        href="/"
      >
        Go to homepage
      </Button> */}
        </div>
    );
}

export default Result;
