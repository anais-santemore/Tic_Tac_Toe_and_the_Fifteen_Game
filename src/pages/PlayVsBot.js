import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { status, outcome, gameOver, xHasWon, oHasWon, gameDrawn, xNumbers, oNumbers, nextPlayer, getValidMoves, availableNumbers, getChildren } from "../logic/GameLogic";
import { selectMoveRandomly, winningMoves, urgentDefensiveMoves, winningMovesForBot, sortBotMoves } from "../logic/BotLogic";


// My React Components
import TicTacToeBoard from "../components/Board/TicTacToeBoard";
import BotPanel from "../components/Panels/BotPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 3.6rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    boardArea: {
        padding: '0.7rem',
        width: 'min(55vh, 100%)',
        height: '55vh',
        display: 'flex',
        justifyContent: 'center',
    },
    panelArea: {
        width: '100%',
        height: '45vh',
    },
}));

// In Play With Coach mode X always goes first

export default function PlayVsBot(props) {
    const classes = useStyles();

    const xGoesFirst = true  // X always goes first
    let [humanPlaysX, setHumanPlaysX] = useState(true);
    
    let startingPosition = ""  // vs []
    let [moveList, setMoveList] = useState(startingPosition);

    let [gameNumber, setGameNumber] = useState(1);
    let [record, setRecord] = useState([0, 0, 0]);

    let [difficultyMode, setDifficultyMode] = useState("hard") // In "hard" mode my bot never makes a mistake.

    return (
        <Box className={classes.root} >
            <Box className={classes.boardArea}>
                <TicTacToeBoard
                    moveList={moveList}
                    handleBoardClick={handleBoardClick}
                />
            </Box>
            <Box className={classes.panelArea}>
                <BotPanel
                    gameNumber={gameNumber}
                    status={status(moveList)}
                    moveList={moveList}
                    record={record}
                    difficultyMode={difficultyMode}
                    humanPlaysX={humanPlaysX}
                    handleNewGameClick={handleNewGameClick}
                    handleBotGoFirstClick={handleBotGoFirstClick}
                    handleDifficultyModeChange={handleDifficultyModeChange}
                />
            </Box>
        </Box>
    )

    function humansNumbers(mls) {  
        return (humanPlaysX) ? xNumbers(mls) : oNumbers(mls)
    }
    function botsNumbers(mls) {  
        return (humanPlaysX) ? oNumbers(mls) : xNumbers(mls)
    }
    function humanGoesNext(mls) {  
        if (humanPlaysX) {
            return (nextPlayer(mls) === "xNext")
        } 
        else {
            return (nextPlayer(mls) === "oNext")
        }
    }
    

    // CLICK HANDLERS
    function handleBoardClick(num) {
        if (!humanGoesNext(moveList)) {
            console.warn("NO EFFECT. Be patient, the bot takes a second to move. ")
            return 1
        }
        else if (moveList.includes(num)) {
            console.warn("NO EFFECT. That number has already been claimed.")
            return 1
        }
        else if (gameOver(moveList)) {
            console.warn("NO EFFECT. The Game is already over.")
            return 1
        }
        else {
            let updatedMoveList = moveList.concat(num)
            // console.log(`updatedMoveList: ${updatedMoveList} `)
            setMoveList(updatedMoveList)
            if (gameOver(updatedMoveList)) {
                handleGameOver(updatedMoveList)
            } else {
                handleBotsTurn(updatedMoveList)
            }
            return 0
        }
    }


    function handleGameOver(ml) {
        // console.assert(gameIsOver(ml), `NO EFFECT. handleGameOver called but the game isn't actually over!`)
        let result = status(ml)

        if (result === "draw") {
            setRecord([record[0], record[1], ++record[2]])
        }
        else if (result === "xWins") {
            if (humanPlaysX) {
                setRecord([++record[0], record[1], record[2]])
            }
            else {
                setRecord([record[0], ++record[1], record[2]])
            }
        }
        else if (result === "oWins") {
            if (humanPlaysX) {
                setRecord([record[0], ++record[1], record[2]])
            }
            else {
                setRecord([++record[0], record[1], record[2]])
            }
        }
        else {
            console.error(`handleGameOver called with invalid game result: ${result}. `)
        }
    }

    
    
    function handleNewGameClick() {
        setGameNumber(++gameNumber)
        setHumanPlaysX(true)
        setMoveList(startingPosition)
    }

    function handleBotGoFirstClick() {
        console.assert(moveList.length === 0, `handleLetBotGoFirstClick was called but it is not the frst move of the game!`)
        setHumanPlaysX(false)
        handleBotsTurn('') // if the bot is going first the movelist is empty.
    }

    function handleDifficultyModeChange(newDifficulty) {
        setGameNumber(1)
        setHumanPlaysX(true)
        setRecord([0, 0, 0])
        setMoveList(startingPosition)
        setDifficultyMode(newDifficulty)
    }


    // Find and make a move for the Bot with a slight delay. 
    function handleBotsTurn(ml = moveList) {
        let botMove = getBotMove(ml)
        let updatedMoveList = ml.concat(botMove)
        setTimeout(() => {
            setMoveList(updatedMoveList)
            if (gameOver(updatedMoveList)) {
                console.log("Don't let player move again. Call handleGameOver instead.")
                handleGameOver(updatedMoveList)
                return 1
            }
        }, 800)
    }

    //////////////////////////////////////////////////////////////     
    //  GET  BOT  MOVE  PROTOCOLS
    ////////////////////////////////////////////////////////////// 

    function getBotMove(ml = moveList) {
        if (difficultyMode === "easy") {
            return easyProtocol(ml)
        }
        else if (difficultyMode === "medium") {
            return mediumProtocol(ml)
        }
        else if (difficultyMode === "hard") {
            return hardProtocol(ml)
        }
        else {
            console.error(`getBotMove called with invalid difficulty mode!!!`)
        }
    }

    // In EASY mode: Bot wins immediately if it can and otherwise selects a random move. 
    function easyProtocol(ml) {
        if (winningMoves(ml).length > 0) {
            console.log(`BOT FOUND IMMEDIEATELY WINNING MOVES: ${winningMoves(ml)}`)
            return selectMoveRandomly(winningMoves(ml))
        }
        else {
            return selectMoveRandomly(availableNumbers(ml))
        }
    }

    // In MEDIUM mode, Bot wins immediately if possible.
    // In MEDIUM mode, Bot blocks any immediate threats but does not look any further ahead. 
    function mediumProtocol(ml) {
        let wins = winningMoves(ml)
        let defensiveMoves = urgentDefensiveMoves(ml)
        if (wins.length > 0) {
            console.log(`BOT FOUND IMMEDIATELY WINNING MOVES: ${wins}`)
            return selectMoveRandomly(wins)
        }
        else if (defensiveMoves.length > 0) {
            console.log(`BOT FOUND URGENT DEFENSIVE MOVES: ${defensiveMoves}`)
            return selectMoveRandomly(defensiveMoves)
        }
        else {
            return selectMoveRandomly(availableNumbers(ml))
        }
    }

    // In HARD mode Bot looks for forcing moves that will allow it to make double attacks on its next move.
    // In HARD mode Bot avoids letting Player make forcing moves that will lead to double attacks.
    function hardProtocol(ml) {
        console.log(`Outcome Graph Hard Protocol called for move list: [${ml}]`)
        console.time('getHardFromGraph')

        let sorted = sortBotMoves(ml, humanPlaysX)
        
        console.log(`BOT SORTED its choices from position [${ml}]:`)
        console.log(`Bot found these Winning Moves: ${sorted.winningForBot}`)  
        console.log(`Bot found these Drawing Moves: ${sorted.drawing}`)
        console.log(`Bot found these Losing Moves: ${sorted.winningForHuman}`)


        if (sorted.winningForBot.length > 0) {
            return selectMoveRandomly(sorted.winningForBot)
        }
        else if (sorted.drawing.length > 0) {
            return selectMoveRandomly(sorted.drawing)
        }
        else {
            console.error(`Bot Found NEITHER Winning NOR Drawing Moves!!! Picking from Losing Moves: ${sorted.winningForHuman} `)
            return selectMoveRandomly(sorted.winningForHuman)    
        }
        
        
    }
    // function hardProtocolWithShortcuts(ml) {
    //     console.log(`Hard Protocol called for move list: [${ml}]`)
    //     if (ml.length <= 1) {
    //         return getOpeningBookMove(ml)
    //     }
    //     let wins = winningMoves(ml)
    //     let blocks = urgentDefensiveMoves(ml)

    //     if (wins.length > 0) {
    //         return selectMoveRandomly(wins)
    //     }
    //     else if (blocks.length > 0) {
    //         return selectMoveRandomly(blocks)
    //     }

    //     else {


    //     }
    // }

    

    function pickBestMove(sorted) {
        if (sorted.winningForBot.length > 0) {
            console.log(`Bot Found Winning Moves: ${sorted.winningForBot}`)
            return selectMoveRandomly(sorted.winningForBot)
        }
        else if (sorted.drawing.length > 0) {
            console.log(`Bot Found Drawing Moves: ${sorted.drawing}`)
            return selectMoveRandomly(sorted.drawing)
        }
        else {
            console.error(`Bot Found NEITHER Winning NOR Drawing Moves!!! Picking from Losing Moves: ${sorted.losing} Unsorted Moves: ${sorted.uncertain}.`)
            return selectMoveRandomly(sorted.uncertain)
        }
    }
    
}

