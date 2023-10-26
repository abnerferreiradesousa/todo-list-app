import React from 'react';
import { Grid, Pagination, Stack } from '@mui/material';
import { IPaginationWrapperProps } from '../types/Props';

const PaginationWrapper: React.FC<IPaginationWrapperProps> = ({
  totalTasks,
  postsPerPage,
  setCurrentPage,
}) => {
  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '4rem' }}>
      <Stack direction="row" spacing={2}>
        <Pagination
          count={Math.ceil(totalTasks / postsPerPage)}
          page={1}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Grid>
  );
};

export default PaginationWrapper;
