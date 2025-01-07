// Array to store all conversation profiles (date, time, and student details)
const convoProfiles = [
  // Scheduled meetings with the current user
  {
    convoId: "1",
    studentId: ["11"], // Confirmed student
    confirmed: "yes",
    confirmedStudent: "1", // Current user
    date: "2025-01-05",
    time: "10:00 am",
  },
  {
    convoId: "2",
    studentId: ["12"], // Confirmed student
    confirmed: "yes",
    confirmedStudent: "1", // Current user
    date: "2025-01-07",
    time: "11:30 am",
  },
  {
    convoId: "3",
    studentId: ["13"], // Confirmed student
    confirmed: "yes",
    confirmedStudent: "1", // Current user
    date: "2025-01-09",
    time: "9:00 am",
  },
  {
    convoId: "4",
    studentId: ["14"], // Confirmed student
    confirmed: "yes",
    confirmedStudent: "1", // Current user
    date: "2025-01-10",
    time: "3:00 pm",
  },
  {
    convoId: "5",
    studentId: ["15"], // Confirmed student
    confirmed: "yes",
    confirmedStudent: "1", // Current user
    date: "2025-01-15",
    time: "1:30 pm",
  },

  // Past conversations with the current user
  {
    convoId: "6",
    studentId: ["16"], // Single student ID
    confirmed: "yes",
    confirmedStudent: "1",
    date: "2024-12-20",
    time: "2:30 pm",
  },
  {
    convoId: "7",
    studentId: ["17"], // Single student ID
    confirmed: "yes",
    confirmedStudent: "1",
    date: "2024-12-25",
    time: "10:00 am",
  },
  {
    convoId: "8",
    studentId: ["18"], // Single student ID
    confirmed: "yes",
    confirmedStudent: "1",
    date: "2024-12-28",
    time: "4:00 pm",
  },
  {
    convoId: "9",
    studentId: ["19"], // Single student ID
    confirmed: "yes",
    confirmedStudent: "1",
    date: "2024-12-30",
    time: "12:00 pm",
  },
  {
    convoId: "10",
    studentId: ["20"], // Single student ID
    confirmed: "yes",
    confirmedStudent: "1",
    date: "2024-12-31",
    time: "6:00 pm",
  },

  // Openly scheduled conversations by other users
  {
    convoId: "11",
    studentId: ["2"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-20",
    time: "2:00 pm",
  },
  {
    convoId: "12",
    studentId: ["4"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-22",
    time: "4:30 pm",
  },
  {
    convoId: "13",
    studentId: ["6"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-25",
    time: "11:00 am",
  },
  {
    convoId: "14",
    studentId: ["8"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-27",
    time: "1:00 pm",
  },
  {
    convoId: "15",
    studentId: ["10"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-29",
    time: "5:00 pm",
  },
  {
    convoId: "16",
    studentId: ["12"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-12",
    time: "10:30 am",
  },
  {
    convoId: "17",
    studentId: ["14"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-14",
    time: "3:30 pm",
  },
  {
    convoId: "18",
    studentId: ["16"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-18",
    time: "4:00 pm",
  },
  {
    convoId: "19",
    studentId: ["18"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-23",
    time: "9:00 am",
  },
  {
    convoId: "20",
    studentId: ["20"],
    confirmed: "no",
    confirmedStudent: null,
    date: "2025-01-30",
    time: "6:00 pm",
  },
];

export default convoProfiles;
