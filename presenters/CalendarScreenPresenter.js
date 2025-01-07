import CalendarService from "../service/CalendarService";

export class CalendarScreenPresenter {
  constructor(view, currentUser, addConversation) {
    this.view = view;
    this.currentUser = currentUser;
    this.addConversation = addConversation;
    this.service = new CalendarService();
    this.events = [];
  }

  async initialize() {
    try {
      const events = await this.service.getEvents();
      this.events = events;
      this.updateView();
    } catch (error) {
      console.error("Error fetching events:", error);
      this.view.showError("Failed to load events. Please try again later.");
    }
  }

  updateView() {
    this.view.setEvents(this.events);
  }

//   getMarkedDates() {
//     return this.events.reduce((acc, event) => {
//       const isUserEvent = event.studentId.includes(this.currentUser.studentId);

//       if (!acc[event.date]) {
//         acc[event.date] = { dots: [] };
//       }

//       if (isUserEvent && !acc[event.date].dots.some((dot) => dot.color === "#00BEFF")) {
//         acc[event.date].dots.push({ color: "#00BEFF", key: `user-${event.date}` });
//       }

//       if (!isUserEvent && !acc[event.date].dots.some((dot) => dot.color === "#ff820c")) {
//         acc[event.date].dots.push({ color: "#ff820c", key: `other-${event.date}` });
//       }

//       return acc;
//     }, {});
//   }

  addAvailability(selectedDate, newAvailability) {
    const formattedTime = newAvailability.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newEvent = {
      date: selectedDate,
      time: formattedTime,
      studentId: [this.currentUser.studentId],
      confirmed: "no",
    };

    this.service
      .addEvent(newEvent)
      .then((createdEvent) => {
        this.events.push(createdEvent);
        this.updateView();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        this.view.showError("Failed to add event. Please try again later.");
      });
  }

  confirmConversation(conversation) {
    const participantNames = conversation.participants
      .map((p) => `${p.firstName} ${p.lastName}`)
      .join(", ");

    this.view.showConfirmation(
      `Do you want to schedule a conversation with ${participantNames}?`,
      () => {
        conversation.confirmed = "yes";
        conversation.confirmedStudent = this.currentUser.studentId;

        this.addConversation(conversation);
        this.updateView();
        this.view.showSuccess(`Your conversation with ${participantNames} is confirmed.`);
      }
    );
  }
}
