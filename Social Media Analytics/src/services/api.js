// In a real application, these would be API calls to your backend

const users = [
  { id: 1, name: 'User 1', postCount: 25, avatarUrl: `https://picsum.photos/seed/user1/100` },
  { id: 2, name: 'User 2', postCount: 18, avatarUrl: `https://picsum.photos/seed/user2/100` },
  { id: 3, name: 'User 3', postCount: 32, avatarUrl: `https://picsum.photos/seed/user3/100` },
  { id: 4, name: 'User 4', postCount: 15, avatarUrl: `https://picsum.photos/seed/user4/100` },
  { id: 5, name: 'User 5', postCount: 27, avatarUrl: `https://picsum.photos/seed/user5/100` },
  { id: 6, name: 'User 6', postCount: 12, avatarUrl: `https://picsum.photos/seed/user6/100` },
  { id: 7, name: 'User 7', postCount: 22, avatarUrl: `https://picsum.photos/seed/user7/100` }
];

const posts = [
  { 
    id: 1, 
    userId: 1, 
    username: 'User 1',
    content: 'This is a trending post with many comments', 
    commentCount: 42,
    timestamp: new Date('2023-05-15T10:30:00').toISOString(),
    imageUrl: `https://picsum.photos/seed/post1/300/200`
  },
  { 
    id: 2, 
    userId: 3, 
    username: 'User 3',
    content: 'Another popular post with lots of engagement', 
    commentCount: 38,
    timestamp: new Date('2023-05-16T08:45:00').toISOString(),
    imageUrl: `https://picsum.photos/seed/post2/300/200`
  },
  { 
    id: 3, 
    userId: 2, 
    username: 'User 2',
    content: 'The most commented post so far', 
    commentCount: 45,
    timestamp: new Date('2023-05-14T14:20:00').toISOString(),
    imageUrl: `https://picsum.photos/seed/post3/300/200`
  },
  { 
    id: 4, 
    userId: 5, 
    username: 'User 5',
    content: 'A regular post with fewer comments', 
    commentCount: 12,
    timestamp: new Date('2023-05-17T16:10:00').toISOString(),
    imageUrl: `https://picsum.photos/seed/post4/300/200`
  },
  { 
    id: 5, 
    userId: 4, 
    username: 'User 4',
    content: 'A new post that just came in', 
    commentCount: 3,
    timestamp: new Date('2023-05-18T09:05:00').toISOString(),
    imageUrl: `https://picsum.photos/seed/post5/300/200`
  }
];

export const fetchTopUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by post count in descending order and take top 5
      const topUsers = [...users].sort((a, b) => b.postCount - a.postCount).slice(0, 5);
      resolve(topUsers);
    }, 500); // Simulate network delay
  });
};

export const fetchTrendingPosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by comment count in descending order
      const trendingPosts = [...posts].sort((a, b) => b.commentCount - a.commentCount);
      resolve(trendingPosts);
    }, 500);
  });
};

export const fetchFeed = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Sort by timestamp (newest first)
      const feed = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      resolve(feed);
    }, 500);
  });
};

// Simulated real-time feed update
export const subscribeToFeed = (callback) => {
  // Initial feed load
  fetchFeed().then(callback);
  
  // Simulate new posts being added
  const interval = setInterval(() => {
    const newPost = {
      id: Math.floor(Math.random() * 1000) + 100,
      userId: Math.floor(Math.random() * 7) + 1,
      username: `User ${Math.floor(Math.random() * 7) + 1}`,
      content: `New real-time post created at ${new Date().toLocaleTimeString()}`,
      commentCount: Math.floor(Math.random() * 10),
      timestamp: new Date().toISOString(),
      imageUrl: `https://picsum.photos/seed/post${Math.floor(Math.random() * 1000)}/300/200`
    };
    
    posts.unshift(newPost);
    fetchFeed().then(callback);
  }, 15000); // Add new post every 15 seconds
  
  // Return a function to unsubscribe
  return () => clearInterval(interval);
}; 