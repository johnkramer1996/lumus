const modalsSelectors = {
   getIsShow: ({ modals }) => modals.isShow,
   getContent: ({ modals }) => modals.content,
   getBack: ({ modals }) => modals.back,
   getType: ({ modals }) => modals.type,
}

export default modalsSelectors
