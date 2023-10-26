import React, { useContext, useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { ITaskCardProps } from '../types/ITask'
import { Checkbox, Grid, IconButton, Typography } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Context } from '@/contextAPI/Context';
import { green, orange, red } from '@mui/material/colors';


const TaskCard = ({ task, handleEdit }: ITaskCardProps) => {
  const { userInfo, tasks, setTasks, setTasksDefault } = useContext(Context);
  const [checked, setChecked] = useState(task.isDone);
  const { errorMessage, setErrorMessage } = useContext(Context);

  useEffect(() => {
    setChecked(task.isDone);
  }, [task.isDone]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const isDone = e.target.checked;
    setChecked(e.target.checked);

    fetch(`http://localhost:8000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: userInfo.token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ isDone })
    }).then((response) => response.json())
      .then(((data: any) => {
        if (data.message) {
          setErrorMessage(data.message);
          return;
        }
        const updatedTasks = tasks.map((t) => (t._id === id ? { ...t, isDone: isDone } : t));
        setTasks(updatedTasks);
        setTasksDefault(updatedTasks);
      }));
  };

  const handleDelete = async (id: number) => {
    console.log(id, userInfo.token)
    fetch('http://localhost:8000/tasks/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: userInfo.token,
      },
    }).then((response) => response.json())
      .then(((data: any) => {
        if (data.message) {
          setErrorMessage(data.message);
          return;
        }
        const newTasks = tasks.filter((task) => task._id != id);
        setTasks(newTasks);
        setTasksDefault(newTasks);
      }));
  }


  return (
    <Grid item borderLeft={6} borderRight={6} borderColor={green[500]}>
      <Card elevation={20}>
        <CardHeader
          action={
            <Checkbox
              checked={task.isDone}
              onChange={(e) => handleChange(e, task._id)}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          }
          title={
            <Typography variant='h5' sx={{ textDecoration: `${checked ? 'line-through' : 'none'}` }}>
              {task.title}
            </Typography>
          }
        />
        <CardContent>
          <Grid item flexGrow={1}>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textDecoration: `${checked ? 'line-through' : 'none'}` }}
            >
              {task.details}
            </Typography>
          </Grid>
          <Grid item display={'flex'} justifyContent={'end'} marginTop={2}>
            <IconButton onClick={() => handleDelete(task._id)}>
              <DeleteOutlined fontSize='medium' sx={{ color: red[500] }} />
            </IconButton>
            <IconButton onClick={() => handleEdit(task)}>
              <DriveFileRenameOutlineIcon fontSize='medium' sx={{ color: orange[500] }} />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TaskCard