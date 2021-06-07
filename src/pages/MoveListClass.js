class MoveList {
    constructor(mls) {
        this.asString = mls
        this.asArray = toArray(mls)
        this.status = getStatus(mls)  // xWins, oWins, xNext, oNext, draw.


        this.validMoves = getValidMoves(mls)
        // this.children = getChildren(mls)

        // this.outcome = getStatus(mls)  // xWins, oWins, xNext, oNext, draw.

    }
    get outcome() {

    }
    get asString() {
        return this.asString
    }

    toArray(mls) {
        return Array.from(mls).map(e => Number(e))   // "123" --> [1,2,3]
    }
    toString(mla) {
        return mla.toString().replaceAll(",", "")    // [1,2,3] --> "123"
    }
    getChildren(mls) {
        let children = []
        getValidMoves(mls).forEach(move => children.push(mls + move))
        // this.validMoves(mls).forEach(move => children.push(mls + move))
        return children
    }
    getValidMoves(mls) {
        if (gameOver(mls)) {
            return []
        }
        else {
            return availableNumbers(mls)
        }
    }

}