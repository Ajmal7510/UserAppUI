import React, { useEffect, useState } from 'react';
import { TextField, Card, CardContent, CardActions, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axiosInstance from '../../axios/axios';
import { useAuth } from '../../Security/AuthContext';
import { Modal, Box } from '@mui/material';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const authContext = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = authContext.token;
        const authorizationHeader = `Bearer ${token}`;
        const response = await axiosInstance.get('/admin/userlist', {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id) => {
    const deleteUser = async () => {
      try {
        const token = authContext.token;
        const authorizationHeader = `Bearer ${token}`;
        const response = await axiosInstance.delete(`/admin/user/${id}`, {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        if (response.status === 200) {
          setUsers(users.filter(user => user.userId !== id));
        } else {
          console.log("Delete not working");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };
    deleteUser();
  };

  const handleBlock = (id) => {
    const blockUser = async () => {
      try {
        const token = authContext.token;
        const authorizationHeader = `Bearer ${token}`;
        const response = await axiosInstance.put(`/admin/user/block/${id}`, {}, {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        if (response.status === 200) {
          setUsers(users.map(user =>
            user.userId === id ? { ...user, enabled: false } : user
          ));
        } else {
          console.log("Block not working");
        }
      } catch (error) {
        console.error("Error blocking user:", error);
      }
    };
    blockUser();
  };

  const handleUnlock = (id) => {
    const unlockUser = async () => {
      try {
        const token = authContext.token;
        const authorizationHeader = `Bearer ${token}`;
        const response = await axiosInstance.put(`/admin/user/unlock/${id}`, {}, {
          headers: {
            Authorization: authorizationHeader,
          },
        });
        if (response.status === 200) {
          setUsers(users.map(user =>
            user.userId === id ? { ...user, enabled: true } : user
          ));
        } else {
          console.log("Unlock not working");
        }
      } catch (error) {
        console.error("Error unlocking user:", error);
      }
    };
    unlockUser();
  };

  const handleEdit = (userId) => {
    console.log("handle edit"+userId);
    const user = users.find(user => user.userId === userId);
    console.log(user);
    setEditUser(user);
    setPassword('');
    setPasswordError(false);
    setEditModalOpen(true);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setEditUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password && password.length < 6) {
      setPasswordError(true);
      return;
    }

    const formData = new FormData();
    formData.append('firstName', editUser.firstName);
    formData.append('lastName', editUser.lastName);
    formData.append('email', editUser.email);
    if (password) {
      formData.append('password', password);
    }

    console.log(formData.email);

    try {
      const response = await axiosInstance.put(`/admin/user/${editUser.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${authContext.token}`
       
        },
      });
      if (response.status === 200) {
        setUsers(users.map(user => (user.userId === editUser.userId ? { ...editUser, password: password ? password : user.password } : user)));
        setEditModalOpen(false);
      } else {
        console.log("Edit user failed");
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  };


  //   const updatedUser = { ...editUser };
  //   if (password) {
  //     updatedUser.password = password;
  //   }

  //   try {
  //     const response = await axiosInstance.put(`/admin/user/${editUser.userId}`, updatedUser, {
  //       headers: {
  //         Authorization: `Bearer ${authContext.token}`,
  //       },
  //     });
  //     if (response.status === 200) {
  //       setUsers(users.map(user => (user.userId === editUser.userId ? updatedUser : user)));
  //       setEditModalOpen(false);
  //     } else {
  //       console.log("Edit user failed");
  //     }
  //   } catch (error) {
  //     console.error("Error editing user:", error);
  //   }
  // };

  const filteredUsers = users.filter(user => (
    user &&
    (user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearch}
      />
      {users.length === 0 ? (
        <Typography>Loading users...</Typography>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {filteredUsers.map(user => (
            <Card key={user.user_id} style={{ width: '300px', margin: '10px' }}>
              <CardContent>
                <Typography variant="h5">{user.firstName + " " + user.lastName}</Typography>
                <Typography color="textSecondary">{user.email}</Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(user.userId)}>
                  <EditIcon />
                </IconButton>
                {user.enabled ? (
                  <IconButton onClick={() => handleBlock(user.userId)}>
                    <BlockIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => handleUnlock(user.userId)}>
                    <LockOpenIcon />
                  </IconButton>
                )}
                <IconButton onClick={() => handleDelete(user.userId)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={editModalOpen}
        onClose={handleEditModalClose}
        aria-labelledby="edit-user-modal-title"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="edit-user-modal-title" variant="h6" component="h2" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={editUser?.firstName || ''}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={editUser?.lastName || ''}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              name="email"
              value={editUser?.email || ''}
              fullWidth
              margin="normal"
              onChange={handleInputChange}
            />
            <TextField
              label="Password"
              value={password}
              fullWidth
              margin="normal"
              type="password"
              onChange={handlePasswordChange}
              error={passwordError}
              helperText={passwordError ? "Password must be at least 6 characters" : ""}
            />
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={handleEditModalClose} variant="contained" color="secondary">
              Cancel
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default AdminHome;
