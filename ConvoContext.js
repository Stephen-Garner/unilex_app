import React, { createContext, useState } from "react";

export const ConversationContext = createContext();

export const ConversationProvider = ({ children }) => {
  const [upcomingConversations, setUpcomingConversations] = useState([]);

  // Add a conversation to the upcoming conversations list
  const addConversation = (conversation) => {
    setUpcomingConversations((prev) => [...prev, conversation]);
  };

  // Remove a conversation by convoId
  const removeConversation = (convoId) => {
    setUpcomingConversations((prev) =>
      prev.filter((conversation) => conversation.convoId !== convoId)
    );
  };

  // Update a conversation (e.g., confirm it)
  const updateConversation = (updatedConvo) => {
    setUpcomingConversations((prev) =>
      prev.map((conversation) =>
        conversation.convoId === updatedConvo.convoId ? updatedConvo : conversation
      )
    );
  };

  return (
    <ConversationContext.Provider
      value={{
        upcomingConversations,
        addConversation,
        removeConversation,
        updateConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
};
