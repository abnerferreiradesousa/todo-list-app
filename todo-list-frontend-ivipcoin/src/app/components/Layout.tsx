'use client'
import * as React from 'react';
import {
  alpha, styled, useTheme, Box, Drawer, CssBaseline, Toolbar, List, Typography, Divider,
  IconButton, ListItem, ListItemText, Grid, InputBase, ListItemButton, Link,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import { Context } from '@/contextAPI/Context';
import { ITask } from '../types/ITask';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { usePathname, useRouter } from 'next/navigation';
import Filters from './Filters';
import NotAuth from './NotAuth';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({ children }: React.PropsWithChildren) {
  const { setTasks, tasksDefault, userInfo, setTaskToEdit } = React.useContext(Context);
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value;
    const filteredTasks = tasksDefault.filter(
      (task: ITask) => task.title.toLowerCase().includes(searchValue));
    setTasks(filteredTasks);
  }

  React.useEffect(() => {
    const userAuth = localStorage.getItem('userInfo');
    setIsAuth(userAuth !== null);
  }, []);

  const menuItems = [
    {
      text: 'Minhas Tarefas',
      icon: <SubjectOutlined color='primary' />,
      path: '/TaskList'
    },
    {
      text: 'Criar Tarefa',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/CreateTask',
      onClick: (path: string) => {
        setTaskToEdit({
          _id: 0,
          title: '',
          details: '',
          isEditing: false,
          isDone: false
        });
        router.push(path);
      }
    },
    {
      text: 'Sair',
      icon: <LogoutSharpIcon color='primary' />,
      path: '/',
      onClick: (path: string) => {
        localStorage.removeItem('userInfo');
        router.push(path);
      }
    },
  ]

  if (!isAuth) return <NotAuth />
  return (
    <Box sx={{ display: 'flex' }} height={'100vh'}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid item display={'flex'} alignItems={'center'} gap={2}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                onChange={handleChange}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Grid>
          <Typography>
            {userInfo.user && userInfo.user.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h5' sx={{ paddingLeft: '20px', paddingTop: '20px' }}>
          Todo List
        </Typography>
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} onClick={
              () => item.onClick
                ? item.onClick(item.path)
                : router.push(item.path)}
              disablePadding>
              <ListItemButton>
                <ListItemIcon color={'secondary'}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {
          pathname == '/CreateTask'
          || (<Filters />)
        }
        {children}
      </Main>
    </Box>
  );
}