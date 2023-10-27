'use client'
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import { Context } from "@/contextAPI/Context";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TODO_API_URI } from "../global";

const classes = {
  field: {
    marginBottom: '20px',
  }
};

const CreateTask = () => {
  const { userInfo, taskToEdit, tasks } = useContext(Context);
  const router = useRouter();

  const [title, setTitle] = useState<string>(taskToEdit.isEditing ? taskToEdit.title : "");
  const [details, setDetails] = useState<string>(taskToEdit.isEditing ? taskToEdit.details : "");
  const [titleError, setTitleError] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<boolean>(false);

  useEffect(() => {
    if (taskToEdit.isEditing) {
      setTitle(taskToEdit.title);
      setDetails(taskToEdit.details);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    const isValidTitle = title.length < 10;
    const isValidDetails = details.length < 20;

    if (isValidTitle) {
      setTitleError(true);
    }

    if (isValidDetails) {
      setDetailsError(true);
    }

    if (!isValidTitle && !isValidDetails) {
      try {
        const res = await fetch(`${TODO_API_URI}/tasks`, {
          method: 'POST',
          headers: {
            Authorization: userInfo.token,
            'Content-type': 'application/json'
          },
          body: JSON.stringify({ title, details, isDone: false })
        });

        if (res.ok) {
          router.push('/TaskList');
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  }

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();

    const { isEditing, ...taskDataToEdit } = taskToEdit;
    const editedTask = {
      ...taskDataToEdit,
      title,
      details,
    };

    const taskIndexToUpdate = tasks.findIndex((t) => t._id === editedTask._id);
    if (taskIndexToUpdate !== -1) {
      tasks[taskIndexToUpdate] = editedTask;
    }

    try {
      const res = await fetch(`${TODO_API_URI}/tasks/${editedTask._id}`, {
        method: 'PUT',
        headers: {
          Authorization: userInfo.token,
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ title, details })
      });

      if (res.ok) {
        router.push('/TaskList');
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error editing task:', error);
    }
  }

  return (
    <Layout>
      <Container>
        <Grid>
          <Typography variant="h5" sx={classes.field} component="h2">
            {taskToEdit.isEditing ? 'Editando Tarefa' : 'Nova Tarefa'}
          </Typography>

          <form onSubmit={taskToEdit.isEditing ? handleEdit : handleSubmit}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              sx={classes.field}
              label="Título"
              variant="outlined"
              color="primary"
              fullWidth
              helperText={titleError && "Título deve conter no mínimo 10 caracteres."}
              error={titleError}
              required
            />
            <TextField
              onChange={(e) => setDetails(e.target.value)}
              value={details}
              sx={classes.field}
              label="Detalhes"
              variant="outlined"
              color="primary"
              multiline
              rows={4}
              fullWidth
              helperText={detailsError && "Detalhes deve conter no mínimo 20 caracteres."}
              error={detailsError}
              required
            />
            <Button
              type="submit"
              variant="outlined"
            >
              {taskToEdit.isEditing ? 'Editar' : 'Criar'}
            </Button>
          </form>
        </Grid>
      </Container>
    </Layout>
  )
}

export default CreateTask;
