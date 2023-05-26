import React, { useEffect, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface ShoppingListItem {
  id?: number;
  title: string;
  description: string;
  kcal: number;
}

export function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [newItem, setNewItem] = useState<ShoppingListItem>({
    title: "",
    description: "",
    kcal: 0,
  });
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5165/api/ShoppingList/GetAll")
      .then(response => response.json())
      .then(data => setShoppingList(data));
  }, [newItem]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditItemId(null); // Reset the editItemId when closing the modal
  };

  const addItem = (event: React.FormEvent) => {
    event.preventDefault();
    fetch("http://localhost:5165/api/ShoppingList/AddProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => {
        // Check if the product was successfully added
        if (data.success) {
          // Update the state to include the new product
          setShoppingList(prevList => [...prevList, newItem]);
        }
        setNewItem({
          title: "",
          description: "",
          kcal: 0,
        });
        setIsModalOpen(false);
      })
      .catch(error => {
        console.error("Error adding product:", error);
      });
    closeModal();
  };

  const deleteItem = (id: number) => {
    fetch(`http://localhost:5165/api/ShoppingList/Delete/${id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // If the deletion was not successful, revert the local state change
          setShoppingList([...shoppingList]);
        }
        setNewItem({
          title: "",
          description: "",
          kcal: 0,
        });
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  const updateItem = (id: number) => {
    const itemToUpdate = shoppingList.find(item => item.id === id);
    if (itemToUpdate) {
      setNewItem(itemToUpdate);
      setEditItemId(id);
      setIsModalOpen(true);
    }
  };
  const editItem = (event: React.FormEvent) => {
    event.preventDefault();
    fetch(`http://localhost:5165/api/ShoppingList/Edit/${editItemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // If the update was not successful, revert the local state change
          setShoppingList([...shoppingList]);
        }
        setNewItem({
          title: "",
          description: "",
          kcal: 0,
        });
        setIsModalOpen(false);
        setEditItemId(null);
      })
      .catch(error => {
        console.error("Error updating item:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h1>Shopping List</h1>
      <List>
        {shoppingList.map(item => (
          <ListItem
            key={item.id}
            sx={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          >
            <ListItemText primary={item.title} secondary={item.description} />
            <ListItemText
              primary={`${item.kcal} kcal`}
              sx={{ textAlign: "left", flex: "8" }}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteItem(item.id!)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => updateItem(item.id!)}
              >
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button
        className="mt-2"
        variant="contained"
        color="primary"
        onClick={openModal}
      >
        Add Item
      </Button>
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            padding: "24px",
          }}
        >
          <Card sx={{ maxWidth: "470px", width: "100%" }}>
            <Box className="p-5">
              <h2>{editItemId ? "Edit Item" : "Add Item"}</h2>
              <form onSubmit={editItemId ? editItem : addItem}>
                <TextField
                  label="Item Name"
                  variant="outlined"
                  name="title"
                  value={newItem.title}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                />
                <TextField
                  label="Kcal"
                  variant="outlined"
                  name="kcal"
                  type="number"
                  value={newItem.kcal}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ marginBottom: "16px" }}
                />
                <div>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    {editItemId ? "Update" : "Add"}
                  </Button>
                  <Button
                    className="mt-2"
                    variant="outlined"
                    fullWidth
                    onClick={closeModal}
                  >
                    Exit
                  </Button>
                </div>
              </form>
            </Box>
          </Card>
        </Box>
      </Modal>
    </div>
  );
}
