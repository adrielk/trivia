import React, { useState, useEffect } from "react";

import {
  Paper,
  Button,
  Typography,
  ButtonGroup,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

//https://cssgradient.io/ (gradient generator)
const useStyles = makeStyles({
  root: {
    width: '100%',
    margin: 'auto',
    textAlign:'center',
    backgroundColor:"#444444",
    color: "white",
    background: "linear-gradient(0deg, rgba(34,143,195,1) 0%, rgba(255,223,223,1) 100%)"

  },
  title:{
    padding:30,
    fontWeight: "bold",
    fontSize:70,
    textShadow: "3px 3px #ffffff",
    borderRadius:10,
    color: "#03254c"
    // background: "radial-gradient(circle, rgba(34,143,195,1) 0%, rgba(255,255,255,1) 100%)"
  },
  title2:{
    padding:30,
    fontWeight: "bold",
    fontSize:40,
    textShadow: "3px 3px #2069e0",
    borderRadius:10,
  },
  qCard:{
    mHeight: 500,
    backgroundColor:"#bebebe",
    color:"white",
    marginBottom:50,
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    borderStyle:"double",
    borderColor:"black",
  },
  question:{
    fontWeight:"bold",
    textShadow: "3px 3px #444444",
    backgroundColor:"#1167b1",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    padding:10
  },
  questionCorrect:{
    fontWeight:"bold",
    textShadow: "3px 3px #444444",
    backgroundColor:"#00FF7F",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    padding:10
  },
  questionWrong:{
    fontWeight:"bold",
    textShadow: "3px 3px #444444",
    backgroundColor:"#00FF7F",
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    padding:10
  },
  box:{
    width: '50%',
    margin:'auto'
  },
  buttonDefault:{
    borderRadius: 0,
    backgroundColor:"white",
    height: 50,
    textAlign: "center",
    fontWeight:"bold",
    // border:"double"
  },
  buttonDefaultDisabled:{//too much copy pasta...
    borderRadius: 0,
    backgroundColor:"white",
    height: 50,
    textAlign: "center",
    fontWeight:"bold",
    pointerEvents:"none"
  },
  buttonCorrect:{
    borderRadius: 0,
    backgroundColor:"#00FF7F",
    height: 50,
    textAlign: "center",
    pointerEvents: "none",
    fontWeight:"bold",
  },
  buttonWrong:{
    borderRadius: 0,
    backgroundColor:"#DE3163",
    height: 50,
    textAlign: "center",
    pointerEvents: "none",
    fontWeight:"bold",
  },
  formControl: {
    margin: 10,
    width: "30%",
    backgroundColor:"white",
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 30,
    fontWeight: "bold",
    fontColor:"white"
  },
  buttonSettings:{
    width:"30%", 
    height:"100%", 
    margin:"auto",
  },
  counterLabel:{
    position: "fixed",
    bottom: 0,
    right: 0,
    width: 250,
    height:40,
    textAlign:"center",
    fontSize:30,
    fontWeight:"bold",
    backgroundColor:"#696969",
    textShadow: "3px 3px #444444",
    borderRadius:5,
    zIndex:2
  }
});


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function Spacer({height}){
  return (
    <Box style={{height:height}}/>
  )
}

function Counter({correctCount}){
  const classes = useStyles()
  return(
    <div>
      <Typography className={classes.counterLabel}> 
        Correct: {correctCount}
      </Typography>
    </div>

  )
}

function SettingsBar({setFetchAddress, setQuestions, numQuestions, setNumQuestions, categoryNum, setCategoryNum}){
  const classes = useStyles()

  const handleNumberChange = (e) =>{
    setNumQuestions(e.target.value)
  }
  
  const handleCategoryChange = (e) =>{
    setCategoryNum(e.target.value)
  }

  const handleFetch = () =>{
    let fetchAddress = "https://opentdb.com/api.php?amount="+numQuestions+"&category="+categoryNum+"&encode=base64"
    // setQuestions([])
  }
  

  return (
    <div>
      <Box display="flex" justifyContent="center" m={1} p={1}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            id="outlined-number"
            type="number"
            label="Number of Questions"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={numQuestions}
            onChange={handleNumberChange}
          />
        </FormControl>

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={categoryNum}
            onChange={handleCategoryChange}
            label="Age"
          >
            {/* <MenuItem value="any">Any Category</MenuItem> */}
            <MenuItem value="9">General Knowledge</MenuItem>
            <MenuItem value="10">Entertainment: Books</MenuItem>
            <MenuItem value="11">Entertainment: Film</MenuItem>
            <MenuItem value="12">Entertainment: Music</MenuItem>
            <MenuItem value="13">Entertainment: Musicals/Theatres</MenuItem>
            <MenuItem value="14">Entertainment: Television</MenuItem>
            <MenuItem value="15">Entertainment: Video Games</MenuItem>
            <MenuItem value="16">Entertainment: Board Games</MenuItem>
            <MenuItem value="17">Science/Nature</MenuItem>
            <MenuItem value="18">Science: Computers</MenuItem>
            <MenuItem value="19">Science: Mathematics</MenuItem>
            <MenuItem value="20">Mythology</MenuItem>
            <MenuItem value="21">Sports</MenuItem>
            <MenuItem value="22">Geography</MenuItem>
            <MenuItem value="23">History</MenuItem>
            <MenuItem value="24">Politics</MenuItem>
            <MenuItem value="25">Art</MenuItem>
            <MenuItem value="26">Celebrities</MenuItem>
            <MenuItem value="27">Animals</MenuItem>
            <MenuItem value="28">Vehicles</MenuItem>
            <MenuItem value="29">Entertainment: Comics</MenuItem>
            <MenuItem value="30">Science: Gadgets</MenuItem>
            <MenuItem value="31">Entertainment: Japanese Anime/Manga</MenuItem>
            <MenuItem value="32">Entertainment: Cartoon/Animations</MenuItem>
          </Select>

        </FormControl>
        <Button onClick={handleFetch} className={classes.buttonSettings} variant="contained" color="primary">Apply Settings</Button>
      </Box>
    </div>
  )
}

function SingleAnswer({answer, setIsAnswered, isAnswered, setCorrectCount, correctCount}){ 
  const classes = useStyles()
  const [isAnsweredCorrectly, setAnsweredCorrectly] = useState(false)
  const [isAnsweredWrong, setIsAnsweredWrong] = useState(false)

  const handleAnswer = (answer) =>{
    if(answer.isCorrect === true){
      setAnsweredCorrectly(true)
      // setCorrectCount(correctCount+1)
    } else{
      setIsAnsweredWrong(true)
    }
    setIsAnswered(true)//question has been answered, so no more selections allowed
  }
  let style;
  if(isAnswered === false){
    style = classes.buttonDefault
  }else{
    style = (answer.isCorrect === true) ? classes.buttonCorrect : classes.buttonWrong
  }
  return (<Button className={style} onClick={()=>handleAnswer(answer)}>{atob(answer.answer)}</Button>)

}

//note: react is picky about naming convention. Must be capitalized
function QuestionGroup({answersList, setCorrectCount, correctCount}){
  const [isAnswered, setIsAnswered] = useState(false)
  
  return(
    <div>
      
      <ButtonGroup
        orientation="vertical"
        variant="outlined"
        color="primary"
        style={{width:"100%"}}
        >
        {
        answersList.map((answer)=>{
            return(
              <SingleAnswer answer={answer} setIsAnswered={setIsAnswered} isAnswered={isAnswered} setCorrectCount={setCorrectCount} correctCount={correctCount}/>
            )
          })
        }
      </ButtonGroup>

    </div>
  )
}



export default function App() {
  const classes = useStyles()
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({incorrect_answers:[], correct_answers:[]})
  const [fetchAddress ,setFetchAddress] = useState("https://opentdb.com/api.php?amount=10&category=18&encode=base64")

  const [numQuestions, setNumQuestions] = useState("10")
  const [categoryNum, setCategoryNum] = useState("18")
  const [correctCount, setCorrectCount] = useState(0)

  const getAnswerList = (currentQuestion) =>{
  

    let answers = currentQuestion.incorrect_answers
    answers = answers.map((answer)=>{
      return ({answer:answer, isCorrect: false, answeredCorrect: false})
    })
    let correct_index = getRandomInt(answers.length+1)
    let random_slice = answers.slice(0, correct_index)
    let answers_shuffled = random_slice.concat([{answer: currentQuestion.correct_answer, isCorrect: true, answeredCorrect: false}])
                            .concat(answers.slice(correct_index, answers.length))
    
    return(
    
      <QuestionGroup answersList={answers_shuffled} setQuestions={setQuestions} setCorrectCount={setCorrectCount} correctCount={correctCount}/>
   
    )
    
  }

  const handleFetchLoad = () =>{
    let fetchAddress = "https://opentdb.com/api.php?amount="+numQuestions+"&category="+categoryNum+"&encode=base64"
    setFetchAddress(fetchAddress)
    fetchData()
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // console.log(fetchAddress)
  }

  const fetchData = () =>{
    fetch(fetchAddress)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      setQuestions([])
      setQuestions(res.results);
    });
  }
  
  useEffect(() => {
    fetchData()
  }, [fetchAddress]);

  return (
    <div className={classes.root}>
      {/* <Counter correctCount={correctCount}/> */}
      <Box className={classes.box}>
        <Spacer height={10}/>
        <Typography className={classes.title} variant="h3" gutterBottom>
          Triva Trouble
        </Typography>
        <SettingsBar 
          setFetchAddress={setFetchAddress} 
          setQuestions={setQuestions}
          numQuestions={numQuestions}
          categoryNum={categoryNum}
          setNumQuestions={setNumQuestions}
          setCategoryNum={setCategoryNum}
        />
        {
          questions.map((question)=>{
            return(
              <Paper className={classes.qCard} elevation={15}>
                <Typography className={classes.question} variant="h5" gutterBottom>
                  {atob(question.question)}
                </Typography>
                {
                  getAnswerList(question)
                }
              </Paper>
            )
          })
        }
      </Box>
        {/* Make sure to only display once all questions have been answered. Or a pop up? */}
      <Typography className={classes.title2} variant="h3" gutterBottom>
          Want More Questions?
      </Typography>
      <Button onClick={handleFetchLoad} variant="contained" color="primary">Load More Questions</Button>

      <Spacer height={100}/>
    </div>
  );
}
