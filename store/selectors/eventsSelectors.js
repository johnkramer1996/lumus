const eventsSelectors = {
   getData: ({ events }) => events.data,
   getEvents: ({ events }) => events.events,
   getEvent: ({ events }) => events.event,
}

export default eventsSelectors
