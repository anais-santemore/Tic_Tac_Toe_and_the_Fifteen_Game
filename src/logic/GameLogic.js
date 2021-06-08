// X always goes first! X and O will be shorthand for the player who goes First and the player who goes second.
// PlayerOne and PlayerTwo are NOT markers of who goes first or second in any given game!
// In the 15 game, PlayerOne and PlayerTWo are distinguished by dark-blue and light-blue

// All functions exported from this module are used by PlayVsHuman.js PlayVsBot.js PlayWithCoach 
// There is some potential to add back in the 15 gameusing these same Game Logic helpers and a different version of the board.

// Most functions here assume they will be called with a Move List String as the sole parameter. (just the exported ones?)





function gameStatus(mls) {
    if (xHasWon(mls)) {
        return ("xWins")
    }
    else if (oHasWon(mls)) {
        return ("oWins")
    }
    else if (mls.length === 9) {
        return ("draw")
    }
    else {
        return nextPlayer(mls)  // "xNext" || "oNext"
    }
}
function nextPlayer(mls) {
    return (mls.length % 2 === 0) ? "xNext" : "oNext"
}


////////////////////////////////////////////////////////////////
// Check if Game is Over, has been Won or Drawn: BOOLEAN
////////////////////////////////////////////////////////////////
function gameOver(mls) {
    return (mls.length === 9 || gameHasBeenWon(mls)) ? true : false
}
function gameHasBeenWon(mls) {
    return (xHasWon(mls) || oHasWon(mls)) ? true : false
}
function xHasWon(mls) {
    return sumsOfThree(xNumbers(mls)).includes(15)
}
function oHasWon(mls) {
    return sumsOfThree(oNumbers(mls)).includes(15)
}
function gameWillBeDrawn(mls) {
    // TODO
}


////////////////////////////////////////////////////////////////
// Isolate each players' claimed numbers: ARRAY(NUM)
////////////////////////////////////////////////////////////////
export function xNumbers(mls) {
    return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 0)
}
export function oNumbers(mls) {
    return moveListStringToArray(mls).filter((move, turn) => turn % 2 === 1)
}
export export function playerOneNumbers(mls) {  // Always the Human
    return (playerOneIsX) ? xNumbers(mls) : oNumbers(mls)
}
export function playerTwoNumbers(mls) {  // Human or Bot, Depending on mode
    return (playerOneIsX) ? oNumbers(mls) : xNumbers(mls)
}

////////////////////////////////////////////////////////////////
// Convert Move List Representations:   String <--> Array
////////////////////////////////////////////////////////////////
function moveListStringToArray(mls) {               // "123" --> [1,2,3]
    return Array.from(mls).map(e => Number(e))
}
function moveListArrayToString(mla) {               // [1,2,3] --> "123"
    return mla.toString().replaceAll(",", "")
}



////////////////////////////////////////////////////////////////
// Get Children and Helpers:  An Array of move list Strings
////////////////////////////////////////////////////////////////
export function getChildren(mls) {
    let children = []
    getValidMoves(mls).forEach(move => children.push(mls + move))
    // this.validMoves(mls).forEach(move => children.push(mls + move))
    return children
}
function getValidMoves(mls) {
    if (gameOver(mls)) {
        return []
    }
    else {
        return availableNumbers(mls)
    }
}
function availableNumbers(mls) {
    let availableNumbers = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9])
    for (let i = 0; i < mls.length; i++) {
        // availableNumbers.delete(Number(mls.charAt(i)))
        // availableNumbers.delete(mls.charAt(i).parseInt())
        availableNumbers.delete(parseInt(mls.charAt(i)))
    }
    // console.log(`Available Squares: ${availableNumbers}`)
    return Array.from(availableNumbers)
}
export function getParent(ml) {
    return ml.slice(0, ml.length - 1)
}

