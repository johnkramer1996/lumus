const subscribesSelectors = {
   getData: ({ subscribes }) => subscribes.data,
   getSubscribes: ({ subscribes }) => subscribes.subscribes,
   getPage: ({ subscribes }) => subscribes.subscribe,
}

export default subscribesSelectors
