const frontStaticSelectors = {
   getFaqData: ({ frontStatic }) => frontStatic.faqData,
   getFaq: ({ frontStatic }) => frontStatic.faq,
   getPagesData: ({ frontStatic }) => frontStatic.pagesData,
   getPages: ({ frontStatic }) => frontStatic.pages,
   getPage: ({ frontStatic }) => frontStatic.page,
   getUser: ({ frontStatic }) => frontStatic.user,
   getSubscribes: ({ frontStatic }) => frontStatic.subscribes,
   getContacts: ({ frontStatic }) => frontStatic.contacts,
}

export default frontStaticSelectors
