import React from "react";
import Board from "./components/Board";

export default function App() {
  const [seconds, setSeconds] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);
  const [totalRightWords, setTotalRightWords] = React.useState(null);
  const [paragraphNum, setParagraphNum] = React.useState(0);
  const [wrongWordsArray, setWrongWordsArray] = React.useState([]);
  const [mistakesOn, setMistakesOn] = React.useState(false);
  const [levelSeleted, setLevelSeleted] = React.useState(true);
  const [typeToStarOn, setTypeToStarOn] = React.useState(false);
  const [text, setText] = React.useState("");
  const [paragraph, setParagraph] = React.useState(["As you know, we have been working on the new perfume that we are launching in April and we are unsure about some of the packaging details. We have seen some of your creative work in the sales department and we think you have a very good eye for detail. \n Do you have some time before close of business this Friday to sit down with us and talk through some of our designs? We would truly appreciate your advice on this.", "Teenagers might have their parents to thank for their smartphone and social media addiction as their parents were the early adopters of the smartphone. Peter, 38 and father of two teenagers, reports that he used to be on his phone or laptop constantly. I was always connected and I felt like I was always working, he says. How could I tell my kids to get off their phones if I was always in front of a screen myself? So, in the evenings and at weekends, he takes his sim card out of his smartphone and puts it into an oldstyle mobile phone that can only make calls and send text messages.", "When Gabriela became aware of the cultural differences between her and her team, she took the initiative to have an open conversation with them about their feelings about her leadership. Pleased to be asked for their thoughts, Gabriela's team openly expressed that they were not used to being told what to do. They enjoyed having more room for initiative and creative freedom. When she told her team exactly what she needed them to do, they felt that she didn't trust them to do their job well. They realised that Gabriela was taking it personally when they tried to challenge or make changes to her decisions, and were able to explain that it was how they'd always worked. \n With a better understanding of the underlying reasons behind each other's behaviour, Gabriela and her team were able to adapt their way of working."])

  // console.log("wrongWordsArray :" + wrongWordsArray)
  // console.log("rightWordsArray :" + rightWordsArray)
  // console.log("isActive :" + isActive)
  // console.log("levelSeleted :" + levelSeleted)
  // console.log("paragraphNum :" + paragraphNum)

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      setSeconds(0)
      setIsActive(false)
      setMistakesOn(true)
      document.getElementById("textAreaId").setAttribute("class", "textAreaStyle_Block")
      document.getElementById("textAreaId").blur()
      calculator()
    }
  }
  function level(event){
    setIsActive(false)
    setMistakesOn(false)
    setLevelSeleted(false)
    setText("")
    setWrongWordsArray([])
    setTotalRightWords(null)
    setSeconds(event.target.value)
    setParagraphNum(event.target.name)
    document.getElementById("textAreaId").focus()
    document.getElementById("textAreaId").setAttribute("class", "textAreaStyle_Enabled")
  }
  function startGameByTyping(event){
    const {value} = event.target
    setText(value)
    setIsActive(true)
    setTypeToStarOn(true)
  }
  function resetGame(){
    setSeconds(0)
    setText("")
    setTotalRightWords(null)
    setParagraphNum(null)
    setIsActive(false)
    setMistakesOn(false)
    setTypeToStarOn(false)
    setLevelSeleted(true)
    setWrongWordsArray([])
    document.getElementById("textAreaId").setAttribute("class", "textAreaStyle_Disabled")
  }
  function calculator(){
    setMistakesOn(true)
    const wordsArray = text.trim().split(" ")
    const paragraphArray = paragraph[paragraphNum].split(" ")

      for (let i = 0; i < wordsArray.length; i++){
        if (paragraphArray[i] === wordsArray[i]){
          setTotalRightWords(prevState => prevState + 1)
        } else {   
          setWrongWordsArray(prevArray => [...prevArray, wordsArray[i]])
        }
    }
  }

  React.useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } 
    if (isActive && seconds === 0) {
      clearInterval(interval);
      document.getElementById("textAreaId").setAttribute("class", "textAreaStyle_Block")
      document.getElementById("textAreaId").blur()
      calculator()
    }
    return () => clearInterval(interval);
  },[isActive, seconds]);

  return (
    <div className="App">
      <Board
      startGameByTyping={startGameByTyping}
      resetGame={resetGame}
      handleKeyPress={handleKeyPress}
      level={level}
      isActive={isActive}
      seconds={seconds}
      totalRightWords={totalRightWords}
      paragraph={paragraph}
      wrongWordsArray={wrongWordsArray}
      paragraphNum={paragraphNum}
      mistakesOn={mistakesOn}
      levelSeleted={levelSeleted}
      typeToStarOn={typeToStarOn}
      text={text}
      />
    </div>
  );
}