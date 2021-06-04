// In Play With Coach mode X always goes first.
// All moves are made by click, no bot.



const positionMap = generatePositionMap()


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
function getPositionsArray() {
    // Returns an array of arrays of arrays
    // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
    // Layer 2) an array of all the move lists of that length
    // Layer 3) actual moveList arrays
    let positionsList = [[[],[],[],[],[],[],[],[],[],[]]]
    for (let moveListLength = 0; moveListLength < 9; moveListLength++) {
        let parentList = positionsList[moveListLength]
        let childrenList = positionsList[moveListLength + 1]
        
        for (let p = 0; p < parentList.length; p++) {
            let parent = parentList[p]
            if (gameOver(parent)) {
                continue
            }
            let children = getChildren(parent)
            childrenList.push(children)
        }

        positionsList[moveListLength + 1] = childrenList
    }
    return positionsList
}

function completedPositions() {
    return getPositionsArray()[9]
}

function unreachable(ml) {
    return (xWins(ml) && oWins(ml))
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