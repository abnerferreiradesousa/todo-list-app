'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '@/contextAPI/Context';
import { Grid, Typography } from '@mui/material';
import TaskCard from '../components/TaskCard';
import Layout from '../components/Layout';
import PaginationWrapper from '../components/PaginationWrapper';
import { useRouter } from 'next/navigation';
import { ITask } from '../types/ITask';


const TaskList = () => {
  const { userInfo } = useContext(Context);
  const router = useRouter();
  const { tasks, setTasks, setTasksDefault, setTaskToEdit } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, _setTasksPerPage] = useState(2);

  useEffect(() => {
    fetch('http://localhost:8000/tasks', {
      method: 'GET',
      headers: { Authorization: userInfo.token }
    })
      .then(response => response.json())
      .then(data => {
        setTasks(data);
        setTasksDefault(data);
      });
  }, []);


  const lastTaskIndex = currentPage * tasksPerPage;
  const firstTaskIndex = lastTaskIndex - tasksPerPage;
  const currentTasks = Array.isArray(tasks) ? tasks.slice(firstTaskIndex, lastTaskIndex) : [];

  const handleEdit = async (task: ITask) => {
    const editedTask: ITask & { isEditing: boolean } = {
      _id: task._id,
      title: task.title,
      details: task.details,
      isDone: task.isDone,
      isEditing: true
    };
    setTaskToEdit(editedTask);
    router.push('/CreateTask');
  }

  const NoTasks = () => {
    return (
      <Grid
        container
        height={'60vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Typography variant='h5'>Nenhuma tarefa!</Typography>
      </Grid>
    )
  }

  return (
    <Layout>
      {currentTasks.length == 0
        ? <NoTasks />
        : (
          <>
            <Grid container gap={'1rem'} display={'flex'} justifyContent={'center'}>
              {currentTasks.map((task: ITask) => (
                <Grid item key={task._id} xs={12} lg={9}>
                  <TaskCard task={task} handleEdit={handleEdit} />
                </Grid>
              ))}
            </Grid>
            <PaginationWrapper
              totalTasks={tasks.length}
              postsPerPage={tasksPerPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
    </Layout>
  )
}

export default TaskList;