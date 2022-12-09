const postsSelectors = {
   getData: ({ posts }) => posts.data,
   getCategory: ({ posts }) => posts.category,
   getPosts: ({ posts }) => posts.posts,
   getPopularData: ({ posts }) => posts.popular.data,
   getPopularPosts: ({ posts }) => posts.popular.posts,
   getRecentData: ({ posts }) => posts.recent.data,
   getRecentPosts: ({ posts }) => posts.recent.posts,
   getPost: ({ posts }) => posts.post,
   getInterested: ({ posts }) => posts.interested,
}

export default postsSelectors
