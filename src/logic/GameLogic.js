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

////////////////////////////////////////////////////////////////
// Lowest Level Logic
////////////////////////////////////////////////////////////////
function intersect(listOne, listTwo) {
    return listOne.filter(item => listTwo.includes(item))
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

////////////////////////////////////////////////////////////////
// Constants: Trio List & Outcome Maps
////////////////////////////////////////////////////////////////
export const trioList = generateTrioList()
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

// function factorial(num) {
//     console.assert(num >= 0 && num <=9, `Factorial called with a number out of this game's range!`)
//     let product = 1
//     for (let i = 1; i <= num; i++) {
//         product = product * i
//     }
//     return product
//     // This led to a fun research rabbit hole about how to more efficiently compute factorials using Paschals Triangle
// }

// function inEfficientUnclaimedNumbers(ml) {
//     let unclaimedNumbers = [];
//     for (let i = 1; i <= 9; i++) {
//         if (!ml.includes(i)) {
//             unclaimedNumbers.push(i)
//         }
//     }
//     // console.log(`List Empty Squares: ${emptySquaresList}`)
//     return unclaimedNumbers;
// }

