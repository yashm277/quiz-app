import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState } from 'react';
// import fruits from '../../assets/fruits.jpeg';
import { Button, MenuItem, TextField } from "@material-ui/core";
import ErrorMessage from "../Error/ErrorMessage";
import Categories from "../../data/Categories";
import "./customerHomepage.css";


// const Homepage = () => {
//     const navigate = useNavigate();
//     const auth = getAuth();
//     const [display, setDisplay] = useState(false);

//     const [user, setUser] = useState(null);

//     onAuthStateChanged(auth, (user) => {
//         if (!user) navigate("/customer-login");
//         else {
//             setDisplay(true);
//             setUser(user);
//         }
//     });

//     if (!display) return <></>;

const CustomerHomepage = ({ name, setName, fetchQuestions }) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);
  
    const history = useNavigate();
  
    const handleSubmit = () => {
      if (!category || !difficulty || !name) {
        setError(true);
        return;
      } else {
        setError(false);
        fetchQuestions(category, difficulty);
        history.push("/quiz");
      }
    };

    return (
        <div className="content">
        <div className="settings">
          <span style={{ fontSize: 30 }}>Choose your quiz!</span>
          <div className="settings__select">
            {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}
            {/* <TextField
              style={{ marginBottom: 25 }}
              label="Enter Your Name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            /> */}
            <TextField
              select
              label="Select quiz name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              {Categories.map((cat) => (
                <MenuItem key={cat.category} value={cat.value}>
                  {cat.category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select Difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              variant="outlined"
              style={{ marginBottom: 30 }}
            >
              <MenuItem key="Easy" value="easy">
                Easy
              </MenuItem>
              <MenuItem key="Medium" value="medium">
                Medium
              </MenuItem>
              <MenuItem key="Hard" value="hard">
                Hard
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Start Quiz
            </Button>
          </div>
        </div>
        <img src="https://canopylab.com/wp-content/uploads/2020/05/Working-with-adaptive-quizzes-A-beginners-guide.jpg" className="banner" alt="quiz app" />
      </div>
    );
};

export default CustomerHomepage;
