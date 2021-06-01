import React, { useState } from 'react';


import '../styles/TicTacToe.css';
// My Components
import Board from "../components/Board";
import Panel from "../components/Panels/CoachPanel";

// MUI  components
import Box from '@material-ui/core/Box';

// Custom Styling
import '../styles/TicTacToe.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        // border: 'solid purple 1px',
        width: '100%',
        height: 'calc(100% - 3.8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'space-between',
    },
    boardContainer: {
        // border: 'solid orange 1px',
        width: '100%',
        paddingTop: 'min(100%, 50vh)',
        height: '0',
        position: 'relative',
    },
    boardArea: {
        // border: 'solid yellow 1px',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',

    },
    panelArea: {
        // border: 'solid yellow 1px',
        color: theme.palette.common.white,
        backgroundColor: theme.palette.common.black,
        width: '100%',
        // width: '50vh',
        padding: '1.0rem',
        flex: '2 1 35vh',
        margin: '0rem auto',

    },
}));

// In Play With Coach mode X always goes first

export default function PlayWithCoach(props) {
    const classes = useStyles();
    const mode = props.mode;

    let [moveList, setMoveList] = useState([]);
    let [xGoesFirst, setXGoesFirst] = useState(true);
    let [gameNumber, setGameNumber] = useState(1);     // In ODD numbered games X goes first
    let [record, setRecord] = useState([0, 0, 0]);     // 3 element counter for humanWins, botWins, and tieGames.
    // let [showHints, setShowHints] = useState(false);
    let [showHints, setShowHints] = useState(true);


    const trioList = generateTrioList()

    let positionMap = new Map()
    positionMap = generatePositionMap()


    return (
        <Box className={classes.root} >
            <Box className={classes.boardContainer}>
                <Box className={classes.boardArea} >
                    <Board
                        boardIcons={getBoardIcons()}
                        boardColors={getBoardColors()}
                        handleSquareClick={handleSquareClick}
                    />
                </Box>
            </Box>
            <Box className={classes.panelArea}>
                <Panel
                    gameNumber={gameNumber}
                    moveNumber={moveList.length + 1}
                    gameOver={gameOver(moveList)}
                    gameStatus={getStatus()}
                    commentary={getCommentary()}
                    record={record}
                    handleUndoClick={handleUndoClick}
                    handleNewGameClick={handleNewGameClick}
                    toggleShowHints={toggleShowHints}
                />
            </Box>
        </Box>
    );

    //////////////////////////////////////////////////
    // Use a Map instead of an Object for faster lookup of the ndpStatus 
    // of each child of a given position
    // 
    // We can safely omit move lists of length 9 from the map because the last move is always forced,
    // There is s 1:1 correspondence between MLs of length 8 and MLs of length 9.
    // 
    ////////////////////////////////////////////////////

    

    function generatePositionMap() {
        // Returns an array of objects where the 
        // Key is a moveList and the
        // Value is that moveList's ndpStatus
        
        let positionsList = listOfPossiblePositions().flat(1)
        let postionMap = new Map()
        
        for (let i = positionsList.length - 1; i >= 0; i--) { // Work backward thru the position list
            let ml = positionsList[i]
            // let mlString = ml.toString()
            let ndpStatus = getNdpStatus(ml)
            positionMap.set(ml, ndpStatus)
        }
        return positionMap
    }
    function listOfPossiblePositions() {
        // Returns an array of arrays of arrays
        // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
        // Layer 2) an array of all the move lists of that length
        // Layer 3) actual moveList arrays
        let positionsList = [[[]]]
        for (let parentLength = 0; parentLength < 8; parentLength++) {
            let parentPositions = positionsList[parentLength]
            let childPositions = parentPositions.map(parent => getChildren(parent)).flat()
            positionsList.push(childPositions)
        }
        return positionsList
    }
    

    function getNdpStatus(ml) {
        // if BOTH players have a win get parent ml until only one player has a win
        while (xWins(ml) && oWins(ml)) {
            ml = getParent(ml)
        }

        // if ONE player or the other has a win --> determining ndpStatus is simple
        if (xWins(ml)) {
            return (xGoesNext(ml)) ? "next" : "prev"
        }
        if (oWins(ml)) {
            return (oGoesNext(ml)) ? "next" : "prev"
        }

        // if NEITHER player has a win --> examine all children 
        //      if npdStatus of ALL children is "next" the other player will win no matter what you do now. 
        //          read: it is your turn and your opponent's "previous" move was a winning move.
        //      if npdStatus of ANY children is "prev" creating that position now set you up to force a win 
        //          read: it is your turn and your opponent's "previous" move was a winning move.
        //      else there is no winning strategy and at least one drawing strategy so that is your 
        //          best case outcome
        let children = getChildren(ml)
        let outcomes = children.map(child => positionMap.get(child))
        if (outcomes.includes("prev")) {
            return "next"
        }
        else if (outcomes.includes("draw")) {
            return "draw"
        }
        else {
            return "prev"
        }
    }
    
    // Position is winning for player One or Two or else it is Drawing.
    function getOneDrawTwoStatus(ml) {
        
    }

    // ML . get parent is easy --> just remove the last element off the end of the child. 

    function firstIdOfMoveListsOfLength(num) { 
        // AKA total numberOfMoveListsOfLengthLessThan(num) 
        let count = 0
        for (let i = 0; i < num; i++) {
            count += numberOfMoveListsOfLength(i)
        }
        return count
    }
    function lastIdOfMoveListsOfLength(num) {
        // AKA total numberOfMoveListsOfLengthLessThanOrEqualTo(num) 
        let count = 0
        for (let i = 0; i <= num; i++) {
            count += numberOfMoveListsOfLength(i)
        }
    }
    function lastIdOfMoveListsOfLength(num) {  // AKA First ID for moveList of length = num
        // When looking for children start searcing the positionMap from this index
    }
    

    function numberOfMoveListsOfLength(num) {
        let count = (factorial(9) / factorial(9 - num))
        // console.log(`There are ${count} MLs of length: ${num}  `)
        return count
    }
    

    
    

    // The board data to render is always the latest entry in history.  We will have an 'undo' but not a 'redo' button.  May add a Make Computer Move
    function getBoardIcons(ml = moveList) {
        let data = Array(10).fill('_');  // Start with an array representing a board of NINE empty squares
        ml.forEach((squareId, turn) => {
            if (xGoesFirst) {
                data[squareId] = (turn % 2 === 0) ? 'x' : 'o'
            }
            else {
                data[squareId] = (turn % 2 === 0) ? 'o' : 'x'
            }
        })
        return data; // this method only deals with current board position, not hypotheticals.  Thus, it wants to use a version of helper squaresClaimedByPlayer() that does not require a moveList be explicitly passed in.
    }

    function getBoardColors(ml = moveList) {
        let colors = Array(10).fill('noColor')
        if (xWins(ml) || oWins(ml)) {
            colors = highlightWins(ml)
        }

        if (mode === 'learn') {
            // console.log(`Board Hints: ${getBoardHints()}`)
            return (showHints === true) ? getBoardHints() : Array(9).fill('noColor');
        }

        return colors
    }
    
    
    // TODO
    function getBoardHints() {
        
    }


    
    // HIGH-LEVEL PANEL HELPERS no params
    function getStatus(ml = moveList) {
        if (xWins(ml)) {
            return (`X wins!`)
        }
        else if (oWins(ml)) {
            return (`O wins!`)
        }
        else if (ml.length === 9) {
            return (`Draw.`)
        }
        else if (ml.length % 2 === 0) {
            return (`X's turn.`)
        }
        else if (ml.length % 2 === 1) {
            return (`O's turn.`)
        }
        else {
            console.error("A call to getStatus() did not work!");
            return
        }
    }


    function getCommentary(ml = moveList) {
        // console.log(`getCommentary() called while showCommentary = ${showCommentary}`)
        if (gameOver(ml)) {
            return `Game Over: ${getStatus(ml)}`
        }
        if (mode === 'play') {
            return `Coach's commentary would appear here in learn mode. TODO w-l-d record`
        }

        // If no moves have been made
        if (ml.length === 0) {
            return `It may look like X has  9 different options but 
            when you consider symmetry there are really only 3: Center, Edge, or Corner.
            None of X's current options would be mistakes, but nor do any of them lead to a forced win.`
        }

        // If one move has been made
        if (ml.length === 1 && ml[0] === 4) {
            return `The center opening is the most popular because there are more three-in-a-rows that 
            include the center square than any other square.  Though it is sound for X, the center opening 
            is also the easiest for O to defend against.
            Considering symmetry, O really only has two options, edge or corner. 
            One is good and keeps O on track for a draw. The other is bad and opens the door for X to force a win.`
        }
        if (ml.length === 1 && ml[0] !== 4 && ml[0] % 2 === 0) {
            return `The corner opening can lead X to a winning double attack if O makes a mistake on their first move.
            Unfortunately for X, the only sound move that O has in this position is also the most intuitive one.
            Proove this to yourself by going through each of O's losing options and finding a plan for X that guarantees a win.`
        }
        if (ml.length === 1 && ml[0] % 2 === 1) {
            return `The Edge opening is the least commonly played and is the most complex to analyze.
            There are tricks and traps in this position that both players can take advantage of! 
            O has five non-symmetrical options. Don't settle for just finding one move that lets O force a draw, 
            dig into each of the five options and find the ones that maximize the chances X will make a mistake.`
        }

        // If two moves has been made
        // if (ml.length === 2) {
        //     let message = '';
        //     if (thereIsADistantForcedWinCreatingMove()) {
        //         message = `O's first move was a mistake and now X can ensure victory! But how?`
        //     }
        //     else {
        //         let answer = (gameLosingMoves().length > 0) ? 'Yes! So be careful.' : 'No! You\'re safe no matter what.';
        //         message = `O's first move was sound. None of X's current options ensure victory, but do any actually lose?  ${answer}`
        //     }
        //     return message;
        // }

        // If three moves have been made
        // if (ml.length >= 3) {
        //     let message = '';
        //     if (thereIsAnImmediateWin()) {
        //         message = `You have a winning move! Defensive moves are irrelevant.`
        //     }
        //     else if (thisIsADoubleAttack()) {
        //         message = `You cannot win right now and cannot block all of your opponent's threats. Which move led you to from a draw to defeat?`
        //     }
        //     else if (thereIsADoubleAttackCreatingMove()) {
        //         message = `You can set up a winning double attack! Don't settle for empty threats, 
        //         think hard and be sure that you are setting yourself up to win no matter what!`
        //     }
        //     else if (thereIsAnUrgentDefensiveMove()) {
        //         message = `You cannot win right now so you must defend the one key square.`
        //     }

        //     else {
        //         let answer = (gameLosingMoves().length > 0) ?
        //             'Nonetheless, it is possible for you to make a mistake and lose right now. Play carefully!' :
        //             'You\'re on track for a draw no matter what move you play in this position.';
        //         message = `You have neither a winning attack nor an urgent defensive move. ${answer}`
        //     }
        //     return message;
        // }

    }

    // MID-LEVEL HELPERS for getBoardColors() and getBoardHints()
    function highlightWins(ml) {
        console.assert(!gameOver(), `highlightWins() was called but found that the game is not over`);

        let colors = Array(10).fill('noColor')
        let Xs = xNumbers(ml)
        let Os = oNumbers(ml)
        let winningTrios = trioList.filter(trio =>
            intersect(trio, Xs).length === 3 || intersect(trio, Os).length === 3
        )

        winningTrios.flat().forEach(num => colors[num] = 'win')
        return colors
    }


    // CLICK HANDLERS
    function handleSquareClick(squareClicked) {
        if (gameOver()) {
            console.log("return without effects from handleSquareClick(). The Game is already over.")
            return;
        }
        if (moveList.includes(squareClicked)) {
            console.log("return without effects from handleSquareClick(). That square has already been claimed.")
            return;
        }
        // If we reach this point the clicked square is open and the game is not over yet ... 
        let updatedMoveList = moveList.concat(squareClicked)
        console.log(`MoveList: ${updatedMoveList}`)

        setMoveList(updatedMoveList);
        // This function does not pass along any of its results, it acts thru side-effects. It calls setHistory and use of that hook tells React it needs to re-render all components that depend on the state "history".
    }
    function handleUndoClick() {
        const shortenedMoveList = moveList.slice(0, moveList.length - 1)
        console.log(`handleUndoClick() removed ${moveList[moveList.length - 1]} . New Shortened history: ${shortenedMoveList}`);
        setMoveList(shortenedMoveList);
    }
    function handleNewGameClick() {
        setMoveList([]);
    }
    function toggleShowHints() {
        // console.log(`toggleShowHintsSwitch called, setting  to ${!showHints}`);
        setShowHints(!showHints)
    }

    

    ///////////////////////////////////////////////////
    // Low Level Helpers
    ///////////////////////////////////////////////////
    function xNumbers(ml) {
        if (xGoesFirst) {
            return ml.filter((move, turn) => turn % 2 === 0)
        }
        else {
            return ml.filter((move, turn) => turn % 2 === 1)
        }
    }
    function oNumbers(ml) {
        if (xGoesFirst) {
            return ml.filter((move, turn) => turn % 2 === 1)
        }
        else {
            return ml.filter((move, turn) => turn % 2 === 0)
        }
    }
    function gameIsWon(ml) {
        return (xWins(ml) || oWins(ml)) ? true : false
    }
    function gameOver(ml) {
        return (ml.length === 9 || xWins(ml) || oWins(ml)) ? true : false
    }
    function xWins(ml) {
        return sumsOfThree(xNumbers(ml)).includes(15)
    }
    function oWins(ml) {
        return sumsOfThree(oNumbers(ml)).includes(15)
    }
    
    function oGoesNext(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 1) ? true : false
        }
        else {
            return (ml.length % 2 === 0) ? false : true
        }
    }
    function xGoesNext(ml) {
        if (xGoesFirst) {
            return (ml.length % 2 === 0) ? true : false
        }
        else {
            return (ml.length % 2 === 1) ? false : true
        }
    }
    function getChildren(ml) {
        // Optimized by removing dependency on unclaimed?
        // Could optimize further by creating a sorted ml and handling includes manually 
        // with a for loop with a pointer to where to start scanning in the sorted ml.
        let children = []
        for (let n = 1; n <= 9; n++) {
            if (!ml.includes(n)) {
                children.push(ml.concat(n))
            }
        }
        return children
    }
    function getParent(ml) {
        return ml.slice(0, ml.length - 1)
    }
    function intersect(listOne, listTwo) {
        return listOne.filter(item => listTwo.includes(item))
    }
    function factorial(num) {
        console.assert(num >= 0 && num <=9, `Factorial called with a number out of this game's range!`)
        let product = 1
        for (let i = 1; i <= num; i++) {
            product = product * i
        }
        return product
    }
    function sumsOfThree(moveSet) {
        let sums = []
        if (moveSet.length < 3) {
            return sums
        }
        for (let i = 0; i < moveSet.length - 2; i++) {
            for (let j = i + 1; j < moveSet.length - 1; j++) {
                for (let k = j + 1; k < moveSet.length; k++) {
                    let sum = moveSet[i] + moveSet[j] + moveSet[k]
                    sums.push(sum)
                }
            }
        }
        return sums
    }
    function generateTrioList() {
        let trioList = []
        for (let i = 1; i <= 7; i++) {
            for (let j = i + 1; j <= 8; j++) {
                let k = complementOf(i + j)
                if (k > j && k <= 9) {
                    let newTrio = [i, j, k]
                    trioList.push(newTrio)
                }
            }
        }
        return trioList
    }
    function complementOf(sumOfTwo) {
        return (15 - sumOfTwo)
    }

}
