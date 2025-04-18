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
  Paper
} from '@mui/material';
import { Comment as CommentIcon } from '@mui/icons-material';
import { fetchTrendingPosts } from '../services/api';

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      try {
        const data = await fetchTrendingPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
        setLoading(false);
      }
    };

    loadTrendingPosts();
  }, []);

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
        Trending Posts
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
        Posts with the highest number of comments
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={post.imageUrl}
                alt={`Post by ${post.username}`}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={`https://picsum.photos/seed/user${post.userId}/100`} 
                    alt={post.username}
                    sx={{ width: 40, height: 40, mr: 1 }}
                  />
                  <Typography variant="subtitle1">
                    {post.username}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {post.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(post.timestamp).toLocaleString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Chip 
                  icon={<CommentIcon />} 
                  label={`${post.commentCount} comments`}
                  color="primary"
                  variant="outlined"
                />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TrendingPosts; 