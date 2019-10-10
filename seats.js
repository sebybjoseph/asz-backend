const seats = {
  a: [
    { id: "a1", left: null, right: "a2", status: "A", rank: 1 },
    { id: "a2", left: "a1", right: "a3", status: "A", rank: 2 },
    { id: "a3", left: "a2", right: "a4", status: "A", rank: 3 },
    { id: "a4", left: "a3", right: "a5", status: "A", rank: 4 },
    { id: "a5", left: "a4", right: null, status: "A", rank: 5 }
  ],
  b: [
    { id: "b1", left: null, right: "b2", status: "A", rank: 1 },
    { id: "b2", left: "b1", right: "b3", status: "A", rank: 2 },
    { id: "b3", left: "b2", right: "b4", status: "A", rank: 3 },
    { id: "b4", left: "b3", right: "b5", status: "A", rank: 4 },
    { id: "b5", left: "b4", right: null, status: "A", rank: 5 }
  ]
};

module.exports = seats;
