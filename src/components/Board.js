import React from "react";
import "../style.css"
import { nanoid } from 'nanoid'

export default function Board(props) {

    const mistakes = props.wrongWordsArray.map(elements => <div 
    key={nanoid()}
    >{elements}</div>)

    return (
        <div className="gameContainer">

            <h2 className="titleStyle">Typing Game</h2>

            {props.paragraphNum && <div className="paragraph">{props.paragraph[props.paragraphNum]}</div>}
            {props.paragraphNum &&<div className="length">Goal: {props.paragraph[props.paragraphNum].split(" ").length} words/min</div>}
            
            <div>
            <textarea
                placeholder="Press Enter when you finish to type..."
                className="textAreaStyle_Disabled"
                id="textAreaId"
                name="textAreaName"
                value={props.text}
                onChange={(event)=>props.startGameByTyping(event)}
                onKeyPress={props.handleKeyPress}
            ></textarea>
            <div className="parpadeaTwo countdown">{props.seconds <=3 && props.seconds > 0? props.seconds : <div></div>}</div>
            </div>


            {props.seconds &&<div
                className="timeStyle"
            >Time remaining: {props.seconds} {props.seconds <= 1? "second" : "seconds"}</div>}

            {props.totalRightWords&& 
            <div
                className="totalWordsStyle"
            >Right Words Count: {props.totalRightWords}</div>}

            {props.mistakesOn && props.wrongWordsArray.length > 0 && 
            <div 
                className="mistakes"
            >Mistakes: {mistakes}</div>}
            
            {props.typeToStarOn && 
            <button
                className="resetStyle"
                onClick={props.resetGame}
            >RESET</button>}
            
            {props.levelSeleted?
            <div 
                className="parpadea choose">Choose a level</div> 
            : props.typeToStarOn? 
            <div></div> 
            : <div className="parpadea choose">Type to start</div>}
            
            {!props.typeToStarOn && <button 
                onClick={(event)=>props.level(event)}
                value="5"
                name="0"
                className="level">Level 1</button>}
            {!props.typeToStarOn && <button 
                onClick={(event)=>props.level(event)}
                value="60"
                name="1"
                className="level">Level 2</button>}
            {!props.typeToStarOn && <button
                onClick={(event)=>props.level(event)} 
                value="60"
                name="2"
                className="level">Level 3</button> }
        </div>
    );
}
