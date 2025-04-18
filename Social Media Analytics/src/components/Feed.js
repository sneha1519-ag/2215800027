import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Box,
  Chip, 
  Avatar, 
  CircularProgress,
  Divider,
  Paper,
  Badge
} from '@mui/material';
import { Comment as CommentIcon, Autorenew as AutorenewIcon } from '@mui/icons-material';
import { fetchFeed, subscribeToFeed } from '../services/api';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPostCount, setNewPostCount] = useState(0);

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = subscribeToFeed((newPosts) => {
      if (posts.length > 0 && newPosts.length > posts.length) {
        // Calculate new posts
        setNewPostCount(newPosts.length - posts.length);
      }
      setPosts(newPosts);
      setLoading(false);
    });

    // Cleanup function
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [posts.length]);

  const handleRefresh = () => {
    setNewPostCount(0);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Latest Posts Feed
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
        Real-time feed with latest posts
      </Typography>
      
      {newPostCount > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Chip
            icon={<AutorenewIcon />}
            label={`${newPostCount} new posts`}
            color="primary"
            onClick={handleRefresh}
            sx={{ cursor: 'pointer' }}
          />
        </Box>
      )}
      
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id}>
            <Paper elevation={2} sx={{ p: 0 }}>
              <Card>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: { xs: '100%', md: 300 }, 
                      height: { xs: 200, md: '100%' } 
                    }}
                    image={post.imageUrl}
                    alt={`Post by ${post.username}`}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          src={`https://picsum.photos/seed/user${post.userId}/100`} 
                          alt={post.username}
                          sx={{ width: 50, height: 50, mr: 2 }}
                        />
                        <Box>
                          <Typography variant="h6">
                            {post.username}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(post.timestamp).toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body1" paragraph>
                        {post.content}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                      <Chip 
                        icon={<CommentIcon />} 
                        label={`${post.commentCount} comments`} 
                        variant="outlined"
                        color="primary"
                      />
                    </CardActions>
                  </Box>
                </Box>
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Feed; 