const express = require('express');

let querySeat = require('./query').getSeats
let availableRows = require('./seats').availableRows;
let changeStatus = require('./seats').changeStatus;
let availableStatus = require('./seats').availableStatus;

let app = express();



/**Find number of availabe seats in a row*******************/
app.post('/api/allocate/:noOfSeats', function (req, res) {
    let requiredSeats = parseInt(req.params.noOfSeats);
    if(isNaN(requiredSeats)){
        res.json({
            message: "Number of seats should be a valid number."
        })
    }else{
        let seats = querySeat(requiredSeats)
        res.json(seats)

    }
});

/**Change the status*******************/
app.post('/api/seats/:status/:seats', function (req, res) {
    let seats = req.params.seats;
    let status = req.params.status;
    if(availableStatus.includes(status)){
        try{
            seats = seats.split(",");
            seats.forEach((seatId)=>{
                changeStatus(seatId,status);
        })
            res.json({
                message:"Status changed"
            })
        }catch (e) {
            console.log(e)
            res.json({
                message: "Failed parsing seats param."
            })

        }
    }else{
        res.json({
            message: "Wrong Input for status."
        })
    }

});

let server = app.listen(8080, function() {
    console.log('Server is listening on port 8080')
});
