const systemSelectors = {
   getCategories: ({ system }) => system.categories,
   getSocUrl: ({ system }) => system.socUrls,
   getUserSettings: ({ system }) => system.userSettings,
   getContacts: ({ system }) => system.contacts,
}

export default systemSelectors
