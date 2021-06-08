// X ALWAYS GOES FIRST

export default generatePositionToOutcomeMap

function testMapGenerator() {
    console.time("makingMap")
    let positionToOutcomeMap = generatePositionToOutcomeMap()
    console.log(positionToOutcomeMap);
    console.timeEnd("makingMap")
    // console.log(`TEST: took ${makingMap}`);
    return positionToOutcomeMap
}

function testPossiblePositionListGenerator() {
    console.time("position lister")
    let list = listOfPossiblePositions()
    console.log(list);
    console.timeEnd("position lister")
    return list
}


function generatePositionToOutcomeMap() {
    let outcomeMap = new Map()
    let list = listOfPossiblePositions()
    for (let length = 9; length >= 0; length--) {
        let parents = list[length]

        for (let p = 0; p < parents.length; p++) {
            let parent = parents[p]
            let outcome = (gameOver(parent)) ? result(parent) : prediction(parent)
            
            
            outcomeMap.set(parent, outcome)
        }
    }

    return outcomeMap

    function result(mls) {
        let outcome = "error"
        if (xHasWon(mls)) {
            outcome = "xWins"
        }
        else if (oHasWon(mls)) {
            outcome = "oWins"
        }
        else if (mls.length === 9) {
            outcome = "draw"
        }
        else {
            console.error(`Error in getting result of completed game: ${mls}`)
            outcome = "error"
        }
        // console.log(`looking for the result in position: ${mls} Found: ${outcome}`);
        return outcome
    }

    function prediction(parent) {
        let outcome = "error"

        let childrensOutcomes = getChildren(parent).map(child => outcomeMap.get(child))
        // console.log(`Position: ${position} --> childrensOutcomes: ${childrensOutcomes}`)
        if (xGoesNext(parent)) {

            if (childrensOutcomes.includes("xWins")) {
                // console.log(`X found a way to win.`);
                outcome = "xWins"
            }
            else if (childrensOutcomes.includes("draw")) {
                // console.log(`X found a way to draw.`);
                outcome = "draw"
            }
            else {
                // console.warn(`X could not find a way to win OR draw!!!`);
                outcome = "oWins"
            }
        }
        else {

            // console.log(`O is going Next.`);
            if (childrensOutcomes.includes("oWins")) {
                // console.log(`O found a way to win.`);
                outcome = "oWins"
            }
            else if (childrensOutcomes.includes("draw")) {
                // console.log(`O found a way to draw.`);
                outcome = "draw"
            }
            else {
                // console.warn(`O could not find a way to win OR draw!!!`);
                outcome = "xWins"
            }
        }
        // console.log(`making a prediciton for position: ${parent} Found: ${outcome}`);
        return outcome
    }
    

}


// function anyChildHasStatus(parent, status) {
//     console.assert(status === "xWins" || status === "oWins" || status === "draws", `anyChildHasStatus called with invalid status: ${status}`)
//     let searchSet = (status === "xWins") ? xCanWin : (status === "oWins") ? oCanWin : draws
//     let children = getChildren(parent)
//     children.forEach(child => {
//         if (searchSet.has(child)) {
//             return true
//         }
//     })
//     return false

// }





function listOfPossiblePositions() {
    // Returns an array of arrays of strings
    // Layer 1) indices 0 thru 8 correspond to the lengths of the move lists contained there
    // Layer 2) an array of all the move lists of that length
    // Layer 3) actual moveList arrays converted toStrings
    let positionsList = [[""]]
    for (let parentLength = 0; parentLength < 9; parentLength++) {
        let parentPositions = positionsList[parentLength]

        let childPositions = parentPositions.map(parent => getChildren(parent)).flat()
        positionsList.push(childPositions)
    }
    return positionsList
}

function getChildren(mls) {
    let children = []
    validMoves(mls).forEach(move => children.push(mls + move))
    // validMoves(mls).forEach(move => children.push(moveListArrayToString(mls.concat(move))))
    return children
}

function validMoves(mls) {
    if (gameOver(mls)) {
        return []
    }
    else {
        return availableNumbers(mls)
    }
}

function gameOver(mls) {
    if (mls.length < 5) {
        return false
    }
    else {
        return (mls.length === 9 || xHasWon(mls) || oHasWon(mls)) ? true : false
    }
}
function xHasWon(mls) {
    return sumsOfThree(xNumbers(mls)).includes(15)
}
function oHasWon(mls) {
    return sumsOfThree(oNumbers(mls)).includes(15)
}
function xNumbers(mls) {
    let mla = moveListStringToArray(mls)
    // console.log(`Move List String: ${mls}  Move List Array: ${mla}`);
    return mla.filter((move, turn) => turn % 2 === 0)
}
function oNumbers(mls) {
    let mla = moveListStringToArray(mls)
    return mla.filter((move, turn) => turn % 2 === 1)
}

function moveListStringToArray(mls) {               // "123" --> [1,2,3]
    return Array.from(mls).map(e => Number(e))
}
function moveListArrayToString(mla) {               // [1,2,3] --> "123"
    return mla.toString().replaceAll(",", "")
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
function availableNumbers(mls) {
    let mla = moveListStringToArray(mls)
    let availableNumbers = [];
    let sorted = mla.sort(numCompare)
    // console.log(`sorted: ${sorted}`)
    let start = 0
    for (let num = 1; num <= 9; num++) {
        let index = sorted.indexOf(num, start)
        if (index === -1) {
            availableNumbers.push(num)
        }
        else {
            start = index + 1
        }
    }
    return availableNumbers;
}

function numCompare(first, second) {
    return (first - second)
}



// function winningNextMove(ml) {
//     if (xGoesNext(ml)) {
//         return intersect(complementOf(sumsOfTwo(xNumbers(ml))), availableNumbers(ml))
//     }
//     else {
//         return intersect(complementOf(sumsOfTwo(oNumbers(ml))), availableNumbers(ml))
//     }
// }

// function forcedNextMove(ml) {
//     console.assert(winningNextMove(ml).length === 0, `error`)
//     if (xGoesNext(ml)) {
//         return intersect(complementOf(sumsOfTwo(xNumbers(ml))), availableNumbers(ml))
//     }
//     else {
//         return intersect(complementOf(sumsOfTwo(oNumbers(ml))), availableNumbers(ml))
//     }

// }

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
function xGoesNext(mls) {
    return (mls.length % 2 === 0)
}



//////////////////////////////////////////////////
// Use a Map instead of an Object for faster lookup of the predicted and real outcomes 
// of each child of a given position
// 
// We can safely omit move lists of length 9 from the map because the last move is always forced,
// There is s 1:1 correspondence between MLs of length 8 and MLs of length 9.
// 
////////////////////////////////////////////////////






///////////////////////////////////////////////////
// Low Level Helpers
///////////////////////////////////////////////////



// function getParent(ml) {
//     return ml.slice(0, ml.length - 1)
// }

// function intersect(listOne, listTwo) {
//     let intersect = []
//     let pointer = 0
//     let one = listOne.concat().sort(numCompare)
//     let two = listTwo.concat().sort(numCompare)
//     for (let i = 0; i < one.length; i++) {
//         while (one[i] > two[pointer]) {
//             pointer++
//         }
//         if (one[i] === two[pointer]) {
//             intersect.push(one[i])
//         }
//     }
//     return intersect
// }

// function inefficientIntersect(listOne, listTwo) {
//     return listOne.filter(item => listTwo.includes(item))
// }
// function inefficientAvailableNumbers(ml) {
//     let availableNumbers = [];
//     for (let num = 1; num <= 9; num++) {
//         if (!ml.includes(num)) {
//             availableNumbers.push(num)
//         }
//     }
//     return availableNumbers;
// }



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
