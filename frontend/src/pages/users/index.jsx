import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ role: "", empid: "" });
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleRoleChange = (event) => {
    setSelectedUser({ ...selectedUser, role: event.target.value });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:3001/api/users/${selectedUser.mgm_user_id}`,
        { role: selectedUser.role }
      );
      fetchUsers();
      handleCloseEditModal();
    } catch (error) {
      console.error("There was an error updating the user role!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:3001/api/users", newUser);
      fetchUsers();
      setNewUser({ role: "", empid: "" });
      setOpenAddModal(false);
    } catch (error) {
      console.error("There was an error adding the user!", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex justify-center items-center flex-col mx-4">
        <h1 className="text-2xl font-semibold mb-4">Tax Users</h1>
        <TableContainer component={Paper} className="w-full mb-4 max-w-md">
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpenAddModal(true)}
            sx={{ marginRight: "auto", marginBottom: "1rem" }}
            startIcon={<AddIcon />}
          >
            Add Users
          </Button>

          <Table>
            <TableHead
              className="bg-primary text-white !important"
              sx={{ color: "white" }}
            >
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Role
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  EMPID
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.mg_name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {user.mgm_user_id}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton
                      color="primary"
                      aria-label="edit role"
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete user"
                      onClick={() => handleDelete(user.mgm_user_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Add User Modal */}
        <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
          <DialogTitle className="bg-primary text-white">
            Tambah Pengguna
          </DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.id}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
                required
              >
                <MenuItem value="1">Staff</MenuItem>
                <MenuItem value="2">Manager</MenuItem>
                <MenuItem value="3">Super Admin</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="EMPID"
              value={newUser.empid}
              onChange={(e) =>
                setNewUser({ ...newUser, empid: e.target.value })
              }
              fullWidth
              sx={{ mb: 2 }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddModal(false)} color="primary">
              Batal
            </Button>
            <Button onClick={handleAddUser} color="primary">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Modal */}
        <Dialog open={openEditModal} onClose={handleCloseEditModal}>
          <DialogTitle className="bg-primary text-white">Edit Role</DialogTitle>
          <DialogContent>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="edit-role-label">Role</InputLabel>
                <Select
                  labelId="edit-role-label"
                  id="edit-role"
                  value={selectedUser?.role || ""}
                  label="Role"
                  onChange={handleRoleChange}
                >
                  <MenuItem value="1">Staff</MenuItem>
                  <MenuItem value="2">Manager</MenuItem>
                  <MenuItem value="3">Super Admin</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="EMPID"
                value={selectedUser?.mgm_user_id || ""}
                fullWidth
                disabled // Membuat TextField tidak dapat diubah
                sx={{ mt: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Batal
            </Button>
            <Button onClick={handleSaveEdit} color="primary">
              Simpan
            </Button>
          </DialogActions>
        </Dialog>

        {/* test push git */}
      </div>
    </div>
  );
};

export default Users;
