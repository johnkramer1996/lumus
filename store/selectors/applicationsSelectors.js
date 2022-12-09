const applicationsSelectors = {
   getData: ({ applications }) => applications.data,
   getApplications: ({ applications }) => applications.applications,
   getPage: ({ applications }) => applications.application,
}

export default applicationsSelectors
