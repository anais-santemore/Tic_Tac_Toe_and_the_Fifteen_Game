import React, { useState } from 'react';

// My Logical Components
import positionToOutcomeMap from "../pages/positionToOutcomeMap";
import { status, outcome, gameOver, xHasWon, oHasWon, gameDrawn, xNumbers, oNumbers, nextPlayer, getValidMoves, availableNumbers, getChildren } from "../logic/GameLogic";
import { selectMoveRandomly, winningMoves, urgentDefensiveMoves, winningMovesForBot, sortBotMoves } from "../logic/BotLogic";


// My React Components
import Board from "../components/Board";
import BotPanel from "../components/Panels/BotPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 'calc(100% - 3.8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    boardContainer: {
        width: '100%',
        paddingTop: 'min(100%, 50vh)',
        height: '0',
        position: 'relative',
    },
    boardArea: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
    },
    panelArea: {
        width: '100%',
        flex: '2 1 35vh',
        margin: '0rem auto',
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
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        moveList={moveList}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <BotPanel
                    moveList={moveList}
                    record={record}
                    handleNewGameClick={handleNewGameClick}
                    handleBotGoFirstClick={handleBotGoFirstClick}
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
    function humansGoesNext(mls) {  
        if (humanPlaysX) {
            return (nextPlayer(mls) === "xNext")
        } 
        else {
            return (nextPlayer(mls) === "oNext")
        }
    }
    // function botsNumbers(mls) {  // Human or Bot, Depending on mode
    //     return (humanPlaysX) ? oNumbers(mls) : xNumbers(mls)
    // }


    // CLICK HANDLERS
    function handleSquareClick(squareClickedString) {
        if (gameOver(moveList)) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(squareClickedString)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClickedString)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleCardClick(cardClicked) {
        // console.log(`handleCardClick called with cardId: ${cardClicked} `)
        if (humansGoesNext(moveList)) {
            console.warn("NO EFFECT. Be patient, the bot takes a second to move. ")
            return 1
        }
        else if (moveList.includes(cardClicked)) {
            console.warn("NO EFFECT. That number has already been claimed.")
            return 1
        }
        else if (gameOver(moveList)) {
            console.warn("NO EFFECT. The Game is already over.")
            return 1
        }
        else {
            let updatedMoveList = moveList.concat(cardClicked)
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

        if (result === "Game Over. Draw.") {
            setRecord([record[0], record[1], ++record[2]])
        }
        else if (result === "Player Wins!") {
            setRecord([++record[0], record[1], record[2]])
        }
        else if (result === "Bot Wins!") {
            setRecord([record[0], ++record[1], record[2]])
        }
        else {
            console.error(`handleGameOver called with invalid game result: ${result}. `)
        }
    }

    
    
    function handleNewGameClick() {
        setMoveList(startingPosition);
    }

    function handleBotGoFirstClick() {
        console.assert(moveList.length === 0, `handleLetBotGoFirstClick was called but it is not the frst move of the game!`)
        setHumanPlaysX(false)
        handleBotsTurn('') // if the bot is going first the movelist is empty.
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
        console.log(`Hard Protocol called for move list: [${ml}]`)
        if (ml.length <= 1) {
            return getOpeningBookMove(ml)
        }
        else if (nextMoveIsForced(ml)) {
            let forced = forcedMoves(ml)
            console.log(`Bot found forced moves: ${forced}`)
            return selectMoveRandomly(forced)
        }
        else {
            let sorted = sortMoves(ml)
            console.log(`BOT SORTED its choices from position [${ml}]:`)
            console.log(`   winning: ${sorted.winningForBot}`)
            console.log(`   drawing: ${sorted.drawing}`)
            console.log(`   losing:  ${sorted.winningForHuman}`)
            console.log(`   uncertain:  ${sorted.uncertain}`)
            return pickBestMove(sorted)
        }
    }

    function getOpeningBookMove(ml = moveList) {
        console.assert(ml.length < 2)
        console.log(`BOT MAKING AN OPENING BOOK MOVE.`)

        if (ml.length === 0) {
            return selectMoveRandomly(unclaimedNumbers(ml))
        }
        else if (ml[0] === 5) {
            return selectMoveRandomly([2, 4, 6, 8])
        }
        else if (ml[0] % 2 === 0) {  // If player took a corner, bot must take center.
            return [5]
        }
        else {
            return selectMoveRandomly(blockingMoves(ml))
        }
    }
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

