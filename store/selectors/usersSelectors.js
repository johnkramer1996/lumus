const usersSelectors = {
   getData: ({ users }) => users.data,
   getUsers: ({ users }) => users.users,
   getUser: ({ users }) => users.user,
}

export default usersSelectors
