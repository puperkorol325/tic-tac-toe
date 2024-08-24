import React, { useState } from "react";
import { game } from "../constants/game";
import { whoseTurnToPlay } from "../constants/whoseTurnToPlay";
import { createRoot } from "react-dom/client";
import circle from "../images/circle.png";
import cross from "../images/cross.png"

export const Playgrid = ({ onTurnChange }) => {

    const [playGrid, setPlayGrid] = useState(game);
    const [turn, setTurn] = useState(whoseTurnToPlay);

    const gridDOM = document.getElementsByClassName("square");

    const clearGrid = () => {
        setTimeout(() => {for (let i of gridDOM){
            if (i.children[0]){
                i.children[0].remove();
            }
        }},100);

        setPlayGrid({
            '1': ['','',''],
            '2': ['','',''],
            '3': ['','','']
        });
    }

    const renderSign = (square) => {
        const root = createRoot(gridDOM[square]);
        if (turn == "circles") {
            root.render(<img src={circle} className="sign"/>);
        } else {
            root.render(<img src={cross} className="sign"/>);
        }
    }

    const check = () => {
        for (let i of Object.keys(playGrid)){
            if (playGrid[i][0] != "" && playGrid[i][0] == playGrid[i][1] && playGrid[i][0] == playGrid[i][2]){
                setTimeout(() => alert(turn == "circles" ? "Circles win!" : "Crosses win!"),100);
                return true
            }
        }

        for (let i = 0; i<=2; i++){
            if (playGrid["1"][i] != "" && playGrid["1"][i] == playGrid["2"][i] && playGrid["1"][i] == playGrid["3"][i]){
                setTimeout(() => alert(turn == "circles" ? "Circles win!" : "Crosses win!"),100);
                return true
            }
        }

        if (playGrid["1"][0] != "" && playGrid["1"][0] == playGrid["2"][1] && playGrid["1"][0] == playGrid["3"][2]){
            setTimeout(() => alert(turn == "circles" ? "Circles win!" : "Crosses win!"),100);
            return true
        }

        if (playGrid["1"][2] != "" && playGrid["1"][2] == playGrid["2"][1] && playGrid["1"][2] == playGrid["3"][0]){
            setTimeout(() => alert(turn == "circles" ? "Circles win!" : "Crosses win!"),100);
            return true
        }

        for (let i of Object.keys(playGrid)){
            for (let j = 0; j <= 2; j++){
                if (playGrid[i][j] == ""){
                    return false
                }
            }
        }

        setTimeout(() => alert("Draw!"),100);
        return true
    }

    const placeSign = (numberOfRow, numberOfSquare) => {
        if (playGrid[String(numberOfRow)][numberOfSquare] == ''){
            if (turn == "circles"){
                playGrid[String(numberOfRow)][numberOfSquare] = 'o';
                renderSign((numberOfRow-1)*3+numberOfSquare);
            } else if (turn == "crosses"){
                playGrid[String(numberOfRow)][numberOfSquare] = 'x';
                renderSign((numberOfRow-1)*3+numberOfSquare);
            }
        } else {
            alert("You can't place here!")
        }
        if (!check()){
            setTurn(turn == "circles" ? "crosses" : "circles");
            onTurnChange(turn == "circles" ? "crosses" : "circles");
        }else {
            clearGrid();
            setTurn("circles");
            onTurnChange("circles")
        }
    }

    return (
        <div className="playGrid">
            <div className="row">
                <div className="square" onClick={() => placeSign(1,0)}></div>
                <div className="square" onClick={() => placeSign(1,1)}></div>
                <div className="square" onClick={() => placeSign(1,2)}></div>
            </div>
            <div className="row">
                <div className="square" onClick={() => placeSign(2,0)}></div>
                <div className="square" onClick={() => placeSign(2,1)}></div>
                <div className="square" onClick={() => placeSign(2,2)}></div>
            </div>
            <div className="row">
                <div className="square" onClick={() => placeSign(3,0)}></div>
                <div className="square" onClick={() => placeSign(3,1)}></div>
                <div className="square" onClick={() => placeSign(3,2)}></div>
            </div>
        </div>
    )
}