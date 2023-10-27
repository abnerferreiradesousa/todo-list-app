import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import { DeleteOutlined, DriveFileRenameOutline } from '@mui/icons-material';
import { Context } from '@/contextAPI/Context';
import { green, orange, red } from '@mui/material/colors';
import { ITaskCardProps } from '../types/IProps';


const TaskCard = ({ task, handleEdit }: ITaskCardProps) => {
  const { userInfo, tasks, setTasks, setTasksDefault, setErrorMessage } = useContext(Context);
  const [checked, setChecked] = useState(task.isDone);

  useEffect(() => {
    setChecked(task.isDone);
  }, [task.isDone]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isDone = e.target.checked;
    setChecked(e.target.checked);

    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: userInfo.token,
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ isDone }),
      });

      const data = await response.json();
      if (data.message) {
        setErrorMessage(data.message);
        return;
      }

      const updatedTasks = tasks.map((t) => (t._id === id ? { ...t, isDone: isDone } : t));
      setTasks(updatedTasks);
      setTasksDefault(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: userInfo.token,
        },
      });

      const data = await response.json();
      if (data.message) {
        setErrorMessage(data.message);
        return;
      }

      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
      setTasksDefault(newTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Grid item borderLeft={6} borderRight={6} borderColor={green[500]}>
      <Card elevation={20}>
        <CardHeader
          action={
            <Checkbox
              checked={checked}
              onChange={(e) => handleChange(e, task._id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          title={
            <Typography variant='h5' sx={{ textDecoration: checked ? 'line-through' : 'none' }}>
              {task.title}
            </Typography>
          }
        />
        <CardContent>
          <Grid item flexGrow={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textDecoration: checked ? 'line-through' : 'none' }}
            >
              {task.details}
            </Typography>
          </Grid>
          <Grid item display='flex' justifyContent='end' marginTop={2}>
            <IconButton onClick={() => handleDelete(task._id)}>
              <DeleteOutlined fontSize='medium' sx={{ color: red[500] }} />
            </IconButton>
            <IconButton onClick={() => handleEdit(task)}>
              <DriveFileRenameOutline fontSize='medium' sx={{ color: orange[500] }} />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default TaskCard;
