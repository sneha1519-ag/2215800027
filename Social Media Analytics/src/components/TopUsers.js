import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Avatar, 
  Box, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Paper,
  CircularProgress
} from '@mui/material';
import { fetchTopUsers } from '../services/api';

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTopUsers = async () => {
      try {
        const data = await fetchTopUsers();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching top users:', error);
        setLoading(false);
      }
    };

    loadTopUsers();
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
        Top Users
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom align="center">
        Users with the highest number of posts
      </Typography>
      
      <Paper elevation={3} sx={{ mx: 'auto', mt: 4, maxWidth: 600 }}>
        <List sx={{ width: '100%' }}>
          {users.map((user, index) => (
            <ListItem key={user.id} divider={index < users.length - 1}>
              <ListItemAvatar>
                <Avatar 
                  src={user.avatarUrl} 
                  alt={user.name}
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6">
                    {index + 1}. {user.name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {user.postCount} posts
                  </Typography>
                }
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h6" color="primary.main">
                  {user.postCount}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default TopUsers; 