'use client'
import {
  TextField,
  Typography,
  Container,
  Button,
  Grid,
} from "@mui/material";
import React, { FormEvent, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Layout from "../components/Layout";
import { Context } from "@/contextAPI/Context";

const classes = {
  field: {
    marginBottom: '20px',
  }
};

const CreateTask = () => {
  const { userInfo } = useContext(Context);
  const { taskToEdit, tasks } = useContext(Context);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if(taskToEdit.isEditing) {  
      setTitle(taskToEdit.title);
      setDetails(taskToEdit.details);
    }
  }, [])
  

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setTitleError(false);
    setDetailsError(false);

    const isValidTitle = title == '' || title.length < 10;
    const isValidDetails = details == '' || details.length < 20;

    if (isValidTitle) {
      setTitleError(true);
    }

    if (isValidDetails) {
      setDetailsError(true);
    }

    if (!isValidTitle && !isValidDetails) {
      fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: { 
          Authorization: userInfo.token,
          'Content-type': 'application/json' 
        },
        body: JSON.stringify({ title, details, isDone: false })
      }).then((res) => res.json())
      .then((data) => router.push('/TaskList'));
    } 
  }

  const handleEdit = (e: FormEvent) => {
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

    fetch('http://localhost:8000/tasks/' + editedTask._id, {
      method: 'PUT',
      headers: { 
        Authorization: userInfo.token,
        'Content-type': 'application/json' 
      },
      body: JSON.stringify({ title, details })
    }).then((res) => res.json())
    .then((_data) => router.push('/TaskList'));
    
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
              helperText={ titleError && "Título deve conter no mínimo 10 caracteres." }
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
              helperText={ detailsError && "Detalhes deve conter no mínimo 20 caracteres." }
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
