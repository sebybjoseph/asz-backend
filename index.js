const express = require("express");
const app = express();
const seats = require("./seats");

const updateStatus = (seatIds, newStatus) => {
  seatIds.forEach(seatId => {
    for (let row in seats) {
      for (let seat in seats[row]) {
        if (seats[row][seat].id == seatId) {
          seats[row][seat].status = newStatus;
        }
      }
    }
  });
};

app.get("/", (req, res) => {
  res.send(seats);
});

app.post("/api/allocate/:numOfSeats", (req, res) => {
  let requiredSeats = req.params.numOfSeats;
  let allocatedSeats = [];
  let successfullyAllocated = false;
  let count = 0;

  for (let row in seats) {
    for (let seat in seats[row]) {
      if (seats[row][seat].status == "A") {
        allocatedSeats.push(seats[row][seat].id);
        // seats[row][seat].status = "R"
        count += 1;

        if (count == requiredSeats) {
          successfullyAllocated = true;
        }
      } else {
        count = 0;
        allocatedSeats = [];
      }
      if (successfullyAllocated) {
        break;
      }
    }
    if (successfullyAllocated) {
      break;
    }
  }
  // When less number of seats are available than required
  if (allocatedSeats.length != requiredSeats) {
    successfullyAllocated = false;
    allocatedSeats = [];
  }
  // When seats are allocated as required
  if (successfullyAllocated) {
    console.log(
      "Successfully allocated the requested contiguous block of seats"
    );
    // Updating the status of each seat from "A" to "R"
    updateStatus(allocatedSeats, "R");
  } else {
    console.log(
      "Unfortunately, at the moment we are not able to service your request, as a contiguous block of required seats is not available"
    );
  }
  // Returning the IDs of seats allocated to the user
  res.send(allocatedSeats);
});

//Route to update status of seats to "S"
app.post("/api/seats/sold/:seatIds", (req, res) => {
  let seatIds = req.params.seatIds.split(",");
  updateStatus(seatIds, "S");
  res.send(seats);
});

//Route to update status of seats to "A"
app.post("/api/seats/available/:seatIds", (req, res) => {
  let seatIds = req.params.seatIds.split(",");
  updateStatus(seatIds, "A");
  res.send(seats);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
