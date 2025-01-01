// ConvoProfile.js

// Array to store all conversation profiles (date, time, and student details)
const convoProfiles = [
  {
    convoId: "1",
    studentId: ["1"], // Links to the students in StudentProfiles.js
    confirmed: "no", // Whether the meeting is confirmed
    confirmedStudent: null, // Second studentId or null if not confirmed
    date: "2025-01-07",
    time: "10:00 am",
  },
  {
    convoId: "2",
    studentId: ["2"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-07",
    time: "11:30 am",
  },
  {
    convoId: "3",
    studentId: ["3"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-07",
    time: "2:00 pm",
  },
  {
    convoId: "4",
    studentId: ["4"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-10",
    time: "9:00 am",
  },
  {
    convoId: "5",
    studentId: ["5"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-15",
    time: "1:30 pm",
  },
  {
    convoId: "6",
    studentId: ["6"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-20",
    time: "3:00 pm",
  },
  {
    convoId: "7",
    studentId: ["7"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-25",
    time: "10:00 am",
  },
  {
    convoId: "8",
    studentId: ["8"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-27",
    time: "4:30 pm",
  },
  {
    convoId: "9",
    studentId: ["9"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-29",
    time: "11:00 am",
  },
  {
    convoId: "10",
    studentId: ["10"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-30",
    time: "2:00 pm",
  },
];

export default convoProfiles;
