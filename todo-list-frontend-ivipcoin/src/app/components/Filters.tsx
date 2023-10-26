import { Context } from "@/contextAPI/Context";
import { FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { useContext } from "react";
import { ITask } from "../types/ITask";


const Filters = ({  }: any) => {
  const { setTasks, tasksDefault } = useContext(Context);

  const handleFilterDefaultList = () => setTasks(tasksDefault);

  const handleChangeRadio = (IsDone: boolean) => {
    const filteredTasks = tasksDefault.filter((task: ITask) => task.isDone === IsDone);
    setTasks(filteredTasks);
  }

  return (
    <Grid container display={'flex'} alignItems={'center'} gap={2} marginBottom={2}>
      <Typography>Filtros: </Typography>
      <RadioGroup row>
        <FormControlLabel
          value='todas'
          onChange={handleFilterDefaultList}
          control={<Radio color='primary' />}
          label="Todas"
        />
        <FormControlLabel
          value='finalizadas'
          onChange={() => handleChangeRadio(true)}
          control={<Radio color='primary' />}
          label="Finalizadas"
        />
        <FormControlLabel
          value='não finalizadas'
          onChange={() => handleChangeRadio(false)}
          control={<Radio color='primary' />}
          label="Não Finalizadas"
        />
      </RadioGroup>
    </Grid>
  )
}

export default Filters;