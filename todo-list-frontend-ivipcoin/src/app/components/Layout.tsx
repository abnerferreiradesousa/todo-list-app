'use client'
import * as React from 'react';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FormControlLabel, Grid, InputBase, ListItemButton, Radio, RadioGroup } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Context } from '@/contextAPI/Context';
import { ITask } from '../types/ITask';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { usePathname, useRouter } from 'next/navigation';
import { red } from '@mui/material/colors';

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
    // vertical padding + font size from searchIcon
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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Layout({ children }: React.PropsWithChildren) {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(true);
  const { setTasks, tasksDefault, userInfo } = React.useContext(Context);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value;
    const filteredTasks = tasksDefault.filter(
      (task: ITask) => task.title.toLowerCase().includes(searchValue));
    setTasks(filteredTasks);
  }

  const handleFilterDefaultList = () => {
    setTasks(tasksDefault);
  }

  const handleChangeRadio = (IsDone: boolean) => {
    const filteredTasks = tasksDefault.filter((task: ITask) => task.isDone === IsDone);
    setTasks(filteredTasks);
  }

  const menuItems = [
    {
      text: 'Minhas Tarefas',
      icon: <SubjectOutlined color='primary' />,
      path: '/TaskList'
    },
    {
      text: 'Criar Tarefa',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/CreateTask'
    },
    {
      text: 'Sair',
      icon: <LogoutSharpIcon color='primary' />,
      path: '/'
    },
  ]

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
            <ListItem key={item.text} onClick={() => router.push(item.path)} disablePadding>
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
          || (
            <Grid container display={'flex'} alignItems={'center'} gap={2} marginBottom={2} bgcolor={'white'}>
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
        {children}
      </Main>
    </Box>
  );
}