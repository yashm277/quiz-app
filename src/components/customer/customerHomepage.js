import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FormDialog from '../Manager/popupDialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import plus from '../../assets/fillerImg.png';
// import fruits from '../../assets/fruits.jpeg';
import { Button, MenuItem, TextField } from '@material-ui/core';
import ErrorMessage from '../Error/ErrorMessage';
import Categories from '../../data/Categories';
import './customerHomepage.css';

const CustomerHomepage = ({ name, setName, fetchQuestions }) => {
    const [category, setCategory] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [error, setError] = useState(false);

    const history = useNavigate();

    const handleQ1 = () => {
        history('/quiz-taker');
    };

    const handleSubmit = () => {
        if (!category || !difficulty) {
            setError(true);
            return;
        } else {
            setError(false);
            // fetchQuestions(category, difficulty);
            history('/quiz-taker');
        }
    };

    return (
        <div className="content">
            <div className="settings">
                {/* <Container sx={{ py: 8 }} maxWidth="md"> */}
                <Grid container spacing={4} className="padding-remove">
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '0%',
                                }}
                                image={plus}
                                alt="New Quiz"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    Quiz 1
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {/* <Button size="small">Get Started</Button> */}
                                {/* <FormDialog></FormDialog> */}
                                <Button size="small" onClick={handleQ1}>
                                    Attempt Quiz
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    // 16:9
                                    pt: '0%',
                                }}
                                image={plus}
                                alt="New Quiz"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="h2"
                                >
                                    Quiz 2
                                </Typography>
                            </CardContent>
                            <CardActions>
                                {/* <Button size="small">Get Started</Button> */}
                                {/* <FormDialog></FormDialog> */}
                                <Button size="small" onClick={handleQ1}>
                                    Attempt Quiz
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <img
                src="https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg"
                className="banner"
                alt="quiz app"
            />
        </div>
    );
};

export default CustomerHomepage;

// import React from 'react'
// import { doc, getDoc} from "firebase/firestore";
// import {db} from '../../firebase-config';

// function customerHomepage() {
//   const docRef = doc(db, "data", "quiz1");
// const docSnap =  getDoc(docRef);
// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }

//   return (
//     <div>
//       <h1>Hello</h1>
//     </div>
//   )
// }

// export default customerHomepage

// {/* <span style={{ fontSize: 30 }}>Choose your quiz!</span>
// <div className="settings__select">
// {error && (
// <ErrorMessage>Please Fill all the fields</ErrorMessage>
// )}
/* <TextField
              style={{ marginBottom: 25 }}
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            /> */
//     <TextField
//         select
//         label="Select quiz name"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//         variant="outlined"
//         style={{ marginBottom: 30 }}
//     >
//         {Categories.map((cat) => (
//             <MenuItem key={cat.category} value={cat.value}>
//                 {cat.category}
//             </MenuItem>
//         ))}
//     </TextField>
//     <TextField
//         select
//         label="Select Difficulty"
//         value={difficulty}
//         onChange={(e) => setDifficulty(e.target.value)}
//         variant="outlined"
//         style={{ marginBottom: 30 }}
//     >
//         <MenuItem key="Easy" value="easy">
//             Easy
//         </MenuItem>
//         <MenuItem key="Medium" value="medium">
//             Medium
//         </MenuItem>
//         <MenuItem key="Hard" value="hard">
//             Hard
//         </MenuItem>
//     </TextField>
//     <Button
//         variant="contained"
//         color="primary"
//         size="large"
//         onClick={handleSubmit}
//     >
//         Start Quiz
//     </Button>
// </div>
