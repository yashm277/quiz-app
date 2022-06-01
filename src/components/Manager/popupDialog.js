import ActionAlerts from './alert';
import { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { v4 as uuidv4 } from 'uuid';

export let uniqueID;

export default function FormDialog() {
    const navigate = useNavigate();

    const textfield = useRef();

    const [quizName, setQuizName] = useState('');
    const [open, setOpen] = useState(false);

    const handleDialogChange = (e) => {
        const setname = e.target.value;
        setQuizName(setname);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDone = () => {
        if (quizName !== '') {
            setOpen(false);
            console.log(quizName);
            uniqueID = uuidv4();
            navigate(`/quiz-maker/${uniqueID}`);
        } else {
            alert('Quiz name cannot be an empty field.');
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Get Started
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Enter Quiz Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will be redirected to the quiz maker once you click
                        DONE.
                    </DialogContentText>
                    <TextField
                        value={quizName}
                        onChange={(e) => handleDialogChange(e)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Quiz Name"
                        type="string"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Link to={`/quiz-maker/${Date.now()}`}> */}
                    <Button onClick={handleDone}>Done</Button>
                    {/* </Link> */}
                </DialogActions>
            </Dialog>
        </div>
    );
}
