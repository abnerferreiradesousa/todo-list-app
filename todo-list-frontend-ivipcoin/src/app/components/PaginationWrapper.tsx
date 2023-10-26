import { Grid, Pagination, Stack } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import React from "react";

const PaginationWrapper = ({ totalTasks, postsPerPage, setCurrentPage }: { totalTasks: number, postsPerPage: number, setCurrentPage: Dispatch<SetStateAction<number>> }) => {
  
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  };

  return (
    <Grid container display={'flex'} justifyContent={'center'} marginTop={4}>
      <Stack spacing={2}>
        <Pagination
          count={Math.ceil(totalTasks / postsPerPage)}
          onChange={handleChange} 
          variant="outlined" shape="rounded"
        />
      </Stack>
    </Grid>
  )
}

export default PaginationWrapper;