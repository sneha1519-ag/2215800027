import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline } from '@mui/material';
import TopUsers from './components/TopUsers';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import './App.css';

function App() {
  return (
    <Router>
      <CssBaseline />
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Social Media Analytics
            </Typography>
            <Button color="inherit" component={Link} to="/">Feed</Button>
            <Button color="inherit" component={Link} to="/top-users">Top Users</Button>
            <Button color="inherit" component={Link} to="/trending-posts">Trending Posts</Button>
          </Toolbar>
        </AppBar>
        <Container sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ width: '100%' }}>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/top-users" element={<TopUsers />} />
              <Route path="/trending-posts" element={<TrendingPosts />} />
            </Routes>
          </Box>
        </Container>
      </div>
    </Router>
  );
}

export default App;
