import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { ITaskCardProps } from '../types/ITask'
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Context } from '@/contextAPI/Context';


const TaskCard = ({ task, handleEdit }: ITaskCardProps) => {
  const { userInfo, tasks, setTasks, setTasksDefault } = useContext(Context);
  const [checked, setChecked] = useState(task.isDone);

  useEffect(() => {
    setChecked(task.isDone);
  }, [task.isDone]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isDone = e.target.checked;
    setChecked(e.target.checked);
    
    await fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: userInfo.token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ isDone })
    });

    const updatedTasks = tasks.map((t) => (t._id === id ? { ...t, isDone: isDone } : t));
    setTasks(updatedTasks);
    setTasksDefault(updatedTasks);
  };

  const handleDelete = async (id: number) => {
    await fetch('http://localhost:8000/tasks/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: userInfo.token,
        'Content-type': 'application/json'
      },
    });

    const newTasks = tasks.filter((task) => task._id != id);
    setTasks(newTasks);
    setTasksDefault(newTasks);
  }

  return (
    <Grid item borderBottom={6} borderColor={'#DB4437'}>
      <Card elevation={5}>
        <CardHeader
          action={
            <Checkbox
              checked={task.isDone}
              onChange={(e) => handleChange(e, task._id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          title={
            <Typography variant='h4' sx={{ textDecoration: `${checked ? 'line-through' : 'none'}` }}>
              {task.title}
            </Typography>
          }
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textDecoration: `${checked ? 'line-through' : 'none'}` }}
          >
            {task.details}
          </Typography>
          <Grid item display={'flex'} justifyContent={'end'} marginTop={2}>
            <IconButton onClick={() => handleDelete(task._id)}>
              <DeleteOutlined color='primary' />
            </IconButton>
            <IconButton onClick={() => handleEdit(task)}>
              <DriveFileRenameOutlineIcon color='primary' />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TaskCard