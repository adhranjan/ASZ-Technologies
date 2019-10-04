let seats = {
    a: [
        {id: 'a2', left: 'a1', right: 'a3', status: 'A', rank: 2},
        {id: 'a1', left: null, right: 'a2', status: 'A', rank: 1},
        {id: 'a3', left: 'a2', right: 'a4', status: 'R', rank: 3},
        {id: 'a4', left: 'a3', right: 'a5', status: 'S', rank: 4},
        {id: 'a5', left: 'a4', right: null, status: 'S', rank: 5},
    ],
    b: [
        {id: 'b1', left: null, right: 'b2', status: 'A', rank: 1},
        {id: 'b2', left: 'b1', right: 'b3', status: 'A', rank: 2},
        {id: 'b3', left: 'b2', right: 'b4', status: 'A', rank: 3},
        {id: 'b4', left: 'b3', right: 'b5', status: 'A', rank: 4},
        {id: 'b5', left: 'b4', right: null, status: 'A', rank: 5},
    ]
}
let availableRows = Object.keys(seats);

sortByRank = function (seatOne, seatTwo) {
    return seatOne.rank - seatTwo.rank
}


availableRows.forEach((function (row) {
    seats[row].sort(sortByRank);
}));


changeStatus = function(seatId, status){
    let row = seatId.slice(0,1);
    seat = seats[row].find((seat)=>{
        return seat.id === seatId
    })
    if(seat){
        seat.status = status;
        return true;
    }
    return false;
}

module.exports = {
    seats:seats,
    availableRows : availableRows,
    changeStatus:changeStatus,
    availableStatus : ['A','S','R']
};
