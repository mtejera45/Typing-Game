import React from "react";
import "../style.css"
import { nanoid } from 'nanoid'


export default function Board(props) {

    const mistakes = props.wrongWordsArray.map(elements => <div 
        key={nanoid()}
        >{elements}</div>)

  return (
    <div className="gameContainer">
        <h2
            className="titleStyle"
        >Typing Game</h2>

        {props.paragraphNum && <div className="paragraph">{props.paragraph[props.paragraphNum]}</div>}
        {props.paragraphNum &&<div className="length">Goal: {props.paragraph[props.paragraphNum].split(" ").length} words/min</div>}
        
        <textarea
            placeholder="Press Enter when you finish to type..."
            className="textAreaStyle_Disabled"
            id="textAreaId"
            name="textAreaName"
            onChange={props.startGameByTyping}
            onKeyPress={props.handleKeyPress}
        ></textarea>
        <div
            className="timeStyle"
        >Time remaining: {props.seconds} {props.seconds > 0? "second" : "seconds"}</div>

        {props.totalWords&& <div
            className="totalWordsStyle"
        >Words count: {props.totalWords}</div>}

        {props.mistakesOn && props.wrongWordsArray.length > 0? 
        <div className="mistakes">Mistakes:{mistakes}</div> : <div></div>}

        {!props.levelSeleted&& <button
            className="buttonStyle"
            onClick={props.resetGame}
        >RESET</button>}
        
        {props.levelSeleted?
        <div className="parpadea choose">Choose a level</div> 
        : props.check? <div></div> : <div className="parpadea choose">Type to start</div>}
        

        {!props.mistakesOn&& <button 
            onClick={(event)=>props.level(event)}
            value="60"
            name="0"
            className="level">Level 1</button>}
        {!props.mistakesOn&& <button 
            onClick={(event)=>props.level(event)}
            value="60"
            name="1"
            className="level">Level 2</button>}
        {!props.mistakesOn && <button
            onClick={(event)=>props.level(event)} 
            value="60"
            name="2"
            className="level">Level 3</button> }

    </div>
  );
}
