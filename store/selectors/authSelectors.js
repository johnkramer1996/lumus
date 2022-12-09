const authSelectors = {
   getUser: ({ auth }) => auth.user,
   getDocs: ({ auth }) => auth.docs,
   getIsAuth: ({ auth }) => auth.isAuth,
   getToken: ({ auth }) => auth.token,
   getRoleIds: ({ auth }) => auth.roleIds,
   getRole: ({ auth }) => auth.role,
   getStep: ({ auth }) => auth.step,
}

export default authSelectors
