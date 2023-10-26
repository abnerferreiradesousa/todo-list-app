import { Dispatch, SetStateAction } from "react";

export interface IPaginationWrapperProps {
  totalTasks: number;
  postsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}