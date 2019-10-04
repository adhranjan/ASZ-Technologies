let _ = require('lodash')
let seats = require('./seats').seats;
let rows = require('./seats').availableRows;

findNextSeat = function (row, currentSeat) {
    return seats[row].find((seat) => {
        return  currentSeat.id === seat.left;
    })
}

getSeatsOnGivenRow = function (row, required) {
    let i =0;
    let reservationList = [];
    let seatsInCurrentRow = seats[row];
    while(required !== reservationList.length && seatsInCurrentRow[i]!= void 0){

        let seat = seatsInCurrentRow[i]
        i++;

        let isAvailable = seat.status === "A";

        if(!isAvailable){
            // If not available go to next seat
            continue;
        }

        if(required-1 === reservationList.length){
            /* if the seat is available and
             satifies the total number of required seat
             push to array and break the loop
             */
            reservationList.push(seat);
            break;
        }
        try{
            /* if the seat is available and
                doesnot satisfy  the total number of required seat
                check if next seat is available
            */
            let next = findNextSeat(row, seat);
            isAvailable = next.status === "A";
            if(isAvailable){
                reservationList.push(seat)
            }else{
                reservationList = [];
            }

        }catch (e) {
            reservationList = [];
            // There is no next seat

        }
    }
    return reservationList;

}

getSeats = function(requiredSeats){
    let totalRows = rows.length;
    let seats = [];

    for(i = 0; i < totalRows; i++){
        let seatsOnGivenRow = getSeatsOnGivenRow(rows[i],requiredSeats);
        if(seatsOnGivenRow.length == requiredSeats){
            seats = seatsOnGivenRow;
            break;
        }
    }
    return _.map(seats,"id");
}

module.exports = {
    getSeats
}
