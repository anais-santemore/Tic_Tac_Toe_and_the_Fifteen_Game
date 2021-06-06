// X ALWAYS GOES FIRST

export default positionToOutcomeMap = generatePositionToOutcomeMap()

function generatePositionToOutcomeMap() {
    let outcomeMap = new Map()

    let positions = listOfPossiblePositions()

    for (let length = 9; length >= 0; length--) {
        let parentsOfLength = positions[length]
        
        for (let p = 0; p < parentsOfLength.length; p++) {
            let position = parentsOfLength[p]
            let outcome = "error"
            if (gameOver(position)) {
                if (xWins(position)) {
                    outcome = "xWins"
                }
                if (oWins(position)) {
                    outcome = "oWins"
                }
                if (position.length === 9) {
                    outcome = "draw"
                }
            }
            else {
                let children = getChildren(position)
                let childrensOutcomes = children.map(child => outcomeMap.get(child))
                console.log(`Position: ${position} --> childrensOutcomes: ${childrensOutcomes}`)
                if (xGoesNext(position)) {
                    console.log(`X is going Next.`);
                    if (childrensOutcomes.includes("xWins")) {
                        console.log(`X found a way to win.`);
                        outcome = "xWins"
                    }
                    else if (childrensOutcomes.includes("draw")) {
                        console.log(`X found a way to draw.`);
                        outcome = "draw"
                    }
                    else {
                        console.warn(`X could not find a way to win OR draw!!!`);
                        outcome = "oWins"
                    }
                }
                else {
                    console.log(`O is going Next.`);
                    if (childrensOutcomes.includes("oWins")) {
                        console.log(`O found a way to win.`);
                        outcome = "oWins"
                    }
                    else if (childrensOutcomes.includes("draw")) {
                        console.log(`O found a way to draw.`);
                        outcome = "draw"
                    }
                    else {
                        console.warn(`O could not find a way to win OR draw!!!`);
                        outcome = "xWins"
                    }
                }
            }
            outcomeMap.set(position, outcome)
        }
    }


    function listOfPossiblePositions() {
        // Returns an array of arrays of arrays
        // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
        // Layer 2) an array of all the move lists of that length
        // Layer 3) actual moveList arrays
        let positionsList = [[[]]]
        for (let parentLength = 0; parentLength < 9; parentLength++) {
            let parentPositions = positionsList[parentLength]
            
            let childPositions = parentPositions.map(parent => getChildren(parent)).flat()
            positionsList.push(childPositions)
        }
        return positionsList
    }
    // function listOfPossiblePositions2() {
    //     // Returns an array of arrays of arrays
    //     // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
    //     // Layer 2) an array of all the move lists of that length
    //     // Layer 3) actual moveList arrays
    //     let positionsList = [[[]]]
    //     for (let parentLength = 0; parentLength < 9; parentLength++) {
    //         let parentPositions = positionsList[parentLength]
    //         for ()
    //         let childPositions = parentPositions.map(parent => getChildren(parent)).flat()
    //         positionsList.push(childPositions)
    //     }
    //     return positionsList
    // }

    function getChildren(ml) {
        let children = []
        validMoves(ml).forEach(move => children.push(ml.concat(move)))
        return children
    }

    function validMoves(ml) {
        if (gameOver(ml)) {
            return []
        }
        else {
            return availableNumbers(ml)
        }
    }
    
    function gameOver(ml) {
        if (ml.length < 5) {
            return false
        }
        else {
            return (ml.length === 9 || xWins(ml) || oWins(ml)) ? true : false
        }
    }
    function xWins(ml) {
        return sumsOfThree(xNumbers(ml)).includes(15)
    }
    function oWins(ml) {
        return sumsOfThree(oNumbers(ml)).includes(15)
    }
    function xNumbers(ml) {
        return ml.filter((move, turn) => turn % 2 === 0)
    }
    function oNumbers(ml) {
        return ml.filter((move, turn) => turn % 2 === 1)
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
    function availableNumbers(ml) {
        let availableNumbers = [];
        let sorted = ml.concat().sort(numCompare)
        // console.log(`sorted: ${sorted}`)
        let start = 0
        for (let num = 1; num <= 9; num++) {
            let index = sorted.indexOf(num, start)
            if (index === -1) {
                availableNumbers.push(num)
            }
            else {
                start = index
            }
        }
        return availableNumbers;
    }

    function numCompare(first, second) {
        return (first - second)
    }
    function xGoesNext(ml) {
        return (ml.length % 2 === 0) ? true : false
    }

    
    function winningNextMove(ml) {
        if (xGoesNext(ml)) {
            return intersect(complementOf(sumsOfTwo(xNumbers(ml))), availableNumbers(ml))
        }
        else {
            return intersect(complementOf(sumsOfTwo(oNumbers(ml))), availableNumbers(ml))
        }
    }

    function forcedNextMove(ml) {
        console.assert(winningNextMove(ml).length === 0, `error`)
        if (xGoesNext(ml)) {
            return intersect(complementOf(sumsOfTwo(xNumbers(ml))), availableNumbers(ml))
        }
        else {
            return intersect(complementOf(sumsOfTwo(oNumbers(ml))), availableNumbers(ml))
        }
        
    }

    function sumsOfTwo(moveSet) {
        let sums = []
        if (moveSet.length < 2) {
            return sums
        }
        for (let i = 0; i < moveSet.length - 1; i++) {
            for (let j = i + 1; j < moveSet.length; j++) {
                let sum = moveSet[i] + moveSet[j]
                sums.push(sum)
            }
        }
        return sums
    }
    const trios = generateTrioList()
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

    return outcomeMap


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


function oGoesNext(ml) {
    if (xGoesFirst) {
        return (ml.length % 2 === 1) ? true : false
    }
    else {
        return (ml.length % 2 === 0) ? false : true
    }
}


function getParent(ml) {
    return ml.slice(0, ml.length - 1)
}

function intersect(listOne, listTwo) {
    let intersect = []
    let pointer = 0
    let one = listOne.concat().sort(numCompare)
    let two = listTwo.concat().sort(numCompare)
    for (let i = 0; i < one.length; i++) {
        while (one[i] > two[pointer]) {
            pointer++
        }
        if (one[i] === two[pointer]) {
            intersect.push(one[i])
        }
    }
    return intersect
}








function inefficientIntersect(listOne, listTwo) {
    return listOne.filter(item => listTwo.includes(item))
}
function inefficientAvailableNumbers(ml) {
    let availableNumbers = [];
    for (let num = 1; num <= 9; num++) {
        if (!ml.includes(num)) {
            availableNumbers.push(num)
        }
    }
    return availableNumbers;
}



// function reachablePositionsMap() { }
// function expectedOutcomes() { }
// function allChildrenAreLosing(parent) { }
// function nextPlayerCanGetADraw(parent) { }
// function nextPlayerLoses(parent) { }
// function getExpectedOutcome(ml) { }
// function completedPositions() {
//     return getPositionsArray()[9]
// }
// function unreachable(ml) {
//     return (xWins(ml) && oWins(ml))
// }
// function reachable(ml) {
//     return (!xWins(ml) && !oWins(ml))
// }

// function listUnreachable() {
//     return completedPositions().filter(position => unreachable(position))
// }
