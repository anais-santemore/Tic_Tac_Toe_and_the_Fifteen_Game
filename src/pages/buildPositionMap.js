// In Play With Coach mode X always goes first.
// All moves are made by click, no bot.



// const positionMap = generatePositionMap()


// function generatePositionMap() {
//     // Returns an array of objects where the 
//     // Key is a moveList and the
//     // Value is that moveList's ndpStatus
    
//     // let positionList = reachablePositions().flat(1)

//     // Filter to get Final Positions separated out from the Still Playing Positions
//     let allPositions = reachablePositions()
//     let gameContinues = allPositions.gameContinues
//     let gameComplete = allPositions.gameComplete

//     let xWinsOnTurnFive = gameComplete[5] 
//     let xWinsOnTurnSeven = gameComplete[7] 
//     let xWinsOnTurnNine = gameComplete[9].filter(game => xWins(game))
//     console.log(`Number of xWinsOnTurnNine: ${xWinsOnTurnNine.length}`)
//     let xsWinningPositions = xWinsOnTurnFive.concat(xWinsOnTurnSeven).concat(xWinsOnTurnNine) 
    
//     let oWinsOnTurnSix = gameComplete[6]
//     let oWinsOnTurnEight = gameComplete[8]
//     let osWinningPositions = oWinsOnTurnSix.concat(oWinsOnTurnEight) 

//     let drawingPositions = gameComplete[9].filter(game => (!xWins(game) && oWins(game)))

//     for (let i = gameContinues.length - 1; i >= 0; i--) {
//         let position = gameContinues.pop()
//         let children = getChildren(position)

//         if (xGoesNext(position)) {
//             if (intersect(children, xsWinningPositions).length > 0) {  // xGoesNext and has a win
//                 xsWinningPositions.unshift(position)
//             }
//             else if (intersect(children, drawingPositions).length > 0) {  // xGoesNext and best is to draw
//                 drawingPositions.unshift(position)
//             }
//             else if (intersect(children, osWinningPositions).length === children.length) {  // xGoesNext and all children are winning for O
//                 osWinningPositions.unshift(position)
//             }
//             else {
//                 console.error(`Uh oh. I didn't think this line would ever print.`)
//             }
//         }
//         else if (oGoesNext(position)) {
//             if (intersect(children, osWinningPositions).length > 0) {  // xGoesNext and has a win
//                 osWinningPositions.unshift(position)
//             }
//             else if (intersect(children, drawingPositions).length > 0) {  // xGoesNext and best is to draw
//                 drawingPositions.unshift(position)
//             }
//             else if (intersect(children, xsWinningPositions).length === children.length) {  // xGoesNext and all children are winning for O
//                 xsWinningPositions.unshift(position)
//             }
//             else {
//                 console.error(`Uh oh. I didn't think this line would ever print.`)
//             }
//         }
//         else {
//             console.error(`Uh oh. Neither X nor O thinks it's their turn.`)
//         }

//         console.assert(reachablePositions.length === xsWinningPositions.length + drawingPositions.length + osWinningPositions.length, `It seems not all positions got sorted.`)
        
        
//     }
    
//     return {
//         "X Winning": xsWinningPositions,
//         "O Winning": osWinningPositions,
//         "Drawing": drawingPositions
//     }
    
//     // let postionMap = new Map()

// }

function generatePositionMap() {
    let sorted = sortedPositionObject()

    // let gameContinues = allPositions.gameContinues
    // let gameComplete = allPositions.gameComplete

    
    let xsWinningPositions = sorted.turnFive.winningForX.concat(sorted.turnSeven.winningForX).concat(sorted.turnNine.winningForX)
    let osWinningPositions = sorted.turnSix.winningForO.concat(sorted.turnEight.winningForO)
    let drawingPositions = sorted.turnNine.drawing

    sorted.turnEight.gameContinues.forEach(parent => {
        if (intersect(getChildren(parent), sorted.turnNine.winningForX).length > 0) {
            sorted.turnEight.winningForX.push(parent)
        }
    })


    
    return sorted
}



function sortedPositionObject() {
    let zeroThruFour = reachableInFourMoves()
    let turnFive = validExtensions(zeroThruFour[4])
    let turnSix = validExtensions(turnFive.gameContinues)
    let turnSeven = validExtensions(turnSix.gameContinues)
    let turnEight = validExtensions(turnSeven.gameContinues)
    let turnNine = validExtensions(turnEight.gameContinues)
    
    let sorted = {
        "turnZero": zeroThruFour[0],
        "turnOne": zeroThruFour[1],
        "turnTwo": zeroThruFour[2],
        "turnThree": zeroThruFour[3],
        "turnFour": zeroThruFour[4],
        "turnFive": turnFive,
        "turnSix": turnSix,
        "turnSeven": turnSeven,
        "turnEight": turnEight,
        "turnNine": turnNine,
    }
    return sorted
}


function reachablePositions() {
    // Returns an array of arrays of arrays
    // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
    // Layer 2) an array of all the move lists of that length
    // Layer 3) actual moveList arrays
    let reachablePositions = [[[]]]
    let gameContinues = [[[]]]
    let gameComplete = [[[]]]


    for (let parentLength = 0; parentLength < 9; parentLength++) {
        let parentPositions = reachablePositions[parentLength]
        let continuableParentPositions = parentPositions.filter(parent => !gameOver(parent))
        
        let childPositions = continuableParentPositions.map(parent => getChildren(parent)).flat()
        reachablePositions.push(childPositions)
        
        gameContinues.push(childPositions.filter(child => !gameOver(child)))
        gameComplete.push(childPositions.filter(child => gameOver(child)))
    }
    return {
        "Reachable Positions": reachablePositions,
        "Game Continues": gameContinues,
        "Game Complete": gameComplete
    }
}



function reachableInFourMoves() {  // Each index of the returnd array holds a list of allp movelists of length equal to that index
    let positions = [[[]]]
    for (let parentLength = 0; parentLength < 4; parentLength++) {
        let parents = positions[parentLength]
        let children = parents.map(parent => getChildren(parent)).flat()
        positions.push(children)
    }
    return positions
}

function validExtensions(parents) {
    let extensions = []
    for (let p = 0; p < parents.length; p++) {
        let parent = parents[p]
        if (gameOver(parent)) {
            continue
        }
        getChildren(parent).forEach(child => extensions.push(child))
    }
    return extensions
}

function sortedValidExtensions(parents) {
    let extensions = {
        "gameContinues": new Array(),
        "winningForX": new Array(),
        "winningForO": new Array(),
        "drawing": new Array(),
    }
    for (let p = 0; p < parents.length; p++) {
        let parent = parents[p]
        let children = getChildren(parent)
        for (let c = 0; c < children.length; c++) {
            let child = children[c]
            if (child.length % 2 === 1 && xWins(child)) {
                extensions.winningForX.push(child)
            }
            else if (child.length % 2 === 0 && oWins(child)) {
                extensions.winningForO.push(child)
            }
            else if (child.length === 9) {  // neither player has won yet and there are still unclaimed squares
                extensions.drawing.push(child)
            }
            else { // neither player has won yet and there are still unclaimed squares
                extensions.gameContinues.push(child)
            }
        }
    }
    return extensions
}


function reachablePositionsObject() {
    
    let reachablePositions = {
        "gameContinues": new Array([[]]),
        "gameComplete": new Array([]),
        "winningForX": new Array([]),
        "winningForO": new Array([]),
        "drawing": new Array([]),
    }
   
    
    for (let parentLength = 0; parentLength < 9; parentLength++) {
        let childLength = parentLength + 1
        let parentPositions = reachablePositions.gameContinues[parentLength]
        console.log(`parentPositions = ${reachablePositions.gameContinues[parentLength]}`);
        let childPositions = parentPositions.flatMap(parent => getChildren(parent))
        childPositions.forEach(child => {
            if (xWins(child)) {
                reachablePositions.gameComplete.push(child)
                reachablePositions.winningForX.push(child)
            }
            else if (oWins(child)) {
                reachablePositions.gameComplete.push(child)
                reachablePositions.winningForO.push(child)
            }
            else if (child.length === 9) {
                reachablePositions.gameComplete.push(child)
                reachablePositions.drawing.push(child)
            }
            else {
                reachablePositions.gameContinues.push(child)
            }
        })
    }
    return reachablePositions
}


function completedPositions() {
    return getPositionsArray()[9]
}

function unreachable(ml) {
    return (xWins(ml) && oWins(ml))
}
function reachable(ml) {
    return (!xWins(ml) && !oWins(ml))
}

function listUnreachable() {
    return completedPositions().filter(position => unreachable(position))
}

function reachableOutcomes() {
    let playerOneWins = []
    let playerTwoWins = []
    let draw = []

    
    let unsorted = completedPositions()

    while (unsorted.length > 0) {
        let position = unsorted.pop()
        
        if (!xWins(position) && !oWins(position)) {
            draw.push(position)
        }
        while (unreachable(position)) {
            position = getParent(position)
        }
        if (xWins(position)) {
            playerOneWins.push(position)
        }
        if (oWins(position)) {
            playerTwoWins.push(position)
        }
    }
    
    return {
        "playerOneWins": playerOneWins,
        "playerTwoWins": playerTwoWins,
        "draw": draw
    }
}




function getParent(ml) {
    return ml.slice(0, ml.length - 1)
}





//////////////////////////////////////////////////
// Use a Map instead of an Object for faster lookup of the ndpStatus 
// of each child of a given position
// 
// We can safely omit move lists of length 9 from the map because the last move is always forced,
// There is s 1:1 correspondence between MLs of length 8 and MLs of length 9.
// 
////////////////////////////////////////////////////




function listOfPossiblePositions() {
    // Returns an array of arrays of arrays
    // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
    // Layer 2) an array of all the move lists of that length
    // Layer 3) actual moveList arrays
    let positionsList = [[[]]]
    for (let parentLength = 0; parentLength <= 9; parentLength++) {
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
function unclaimedNumbers(ml) {
    let unclaimedNumbers = [];
    for (let i = 1; i <= 9; i++) {
        if (!ml.includes(i)) {
            unclaimedNumbers.push(i)
        }
    }
    // console.log(`List Empty Squares: ${emptySquaresList}`)
    return unclaimedNumbers;
}






export default positionMap 