import FormDialog from './popupDialog';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import './admin.css';

import plus from '../../assets/plus.png';
import fillerImg from '../../assets/fillerImg.png';

const cards = [1, 2];

const theme = createTheme();

export default function Album() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    {/* <CameraIcon sx={{ mr: 2 }} /> */}
                    <Typography variant="h6" color="inherit" noWrap>
                        Make Quiz
                    </Typography>
                </Toolbar>
            </AppBar>
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        {/* <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Make Quiz
                        </Typography> */}
                        <Typography
                            variant="h5"
                            align="center"
                            color="text.secondary"
                            paragraph
                        >
                            Make a new quiz or edit a recent one.
                        </Typography>
                        {/* <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="contained">
                                Main call to action
                            </Button>
                            <Button variant="outlined">Secondary action</Button>
                        </Stack> */}
                    </Container>
                </Box>
                <Container sx={{ py: 8 }} maxWidth="md">
                    {/* End hero unit */}
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
                                        New Quiz
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    {/* <Button size="small">Get Started</Button> */}
                                    <FormDialog></FormDialog>
                                    {/* <Button size="small">Edit</Button> */}
                                </CardActions>
                            </Card>
                        </Grid>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
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
                                        image={fillerImg}
                                        alt="random"
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            Quiz {card}
                                        </Typography>
                                        <Typography>
                                            Date Placeholder
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small">View</Button>
                                        <Button size="small">Edit</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            {/* Footer */}
            {/* <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Something here to give the footer a purpose!
                </Typography>
            </Box> */}
            {/* End footer */}
        </ThemeProvider>
    );
}


// ---IF ALL ELSE STOPS, COME BACK HERE

// import {db} from '../../firebase-config';
// import React, { useState } from 'react'
// import { collection, doc, setDoc } from "firebase/firestore"; 


// const ManagerConsole = () => {
// 	const [q1 , setq1] = useState("");
// 	const [q2 , setq2] = useState("");
// 	const [q3 , setq3] = useState("");

// const dataRef = collection(db, "data");


// const sub = (e) => {
//     console.log("hello")
//     e.preventDefault();

//     setDoc(doc(dataRef, "quiz1"), {
//         q1: q1,
//         q2: q2,
//         q3: q3 });

//     alert("done")
    
    // Add data to the store
    // db.collection("data").add({
    // 	Name: name,
    // 	Age: age,
    // 	CourseEnrolled: course
    // })
    // .then((docRef) => {
    //     alert("Data Successfully Submitted");
    // })
    // .catch((error) => {
    //     console.error("Error adding document: ", error);
    // });
// }
	
//   return (
//     <div>
// 			<center>
// 				<form style={{marginTop:"200px" }}
// 				onSubmit={(event) => {sub(event)}}>
// 					<input type="text" placeholder="enter question"
// 					onChange={(e)=>{setq1(e.target.value)}} />
// 					<br/><br/>
// 					<input type="text" placeholder="enter question"
// 					onChange={(e)=>{setq2(e.target.value)}}/>
// 					<br/><br/>
// 					<input type="text" placeholder="enter question"
// 					onChange={(e)=>{setq3(e.target.value)}}/>
// 					<br/><br/>
// 					<button type="submit">Submit</button>
// 				</form>
// 			</center>
//     </div>
//   )
// }

// export default ManagerConsole

// import db from '../../firebase-config';
// import {useState} from 'react';

// const ManagerConsole = () => {
// 	const [name , Setname] = useState("");
// 	const [age , Setage] = useState("");
// 	const [course , Setcourse] = useState("");
// 	const sub = (e) => {
// 		e.preventDefault();
		
// 		// Add data to the store
// 		db.collection("data").add({
// 			Nane: name,
// 			Age: age,
// 			CourseEnrolled: course
// 		})
// 		.then((docRef) => {
// 			alert("Data Successfully Submitted");
// 		})
// 		.catch((error) => {
// 			console.error("Error adding document: ", error);
// 		});
// 	}

// 	return (
// 		<div>
			// <center>
			// 	<form style={{marginTop:"200px" }}
			// 	onSubmit={(event) => {sub(event)}}>
			// 		<input type="text" placeholder="your name"
			// 		onChange={(e)=>{Setname(e.target.value)}} />
			// 		<br/><br/>
			// 		<input type="number" placeholder="your age"
			// 		onChange={(e)=>{Setage(e.target.value)}}/>
			// 		<br/><br/>
			// 		<input type="text" placeholder="Course Enrolled"
			// 		onChange={(e)=>{Setcourse(e.target.value)}}/>
			// 		<br/><br/>
			// 		<button type="submit">Submit</button>
			// 	</form>
			// </center>
// 		</div>
// 	);
// }

// export default managerConsole;
