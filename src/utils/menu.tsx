import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import CreateNewFolderTwoToneIcon from '@mui/icons-material/CreateNewFolderTwoTone';
import PersonOutlineTwoToneIcon from '@mui/icons-material/PersonOutlineTwoTone';
import MovieTwoToneIcon from '@mui/icons-material/MovieTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import {
  IManagementMenu,
  ICreateMenu,
  IEditMenu,
  IDetailMenu
} from 'src/models/menu';

export const ManagementList: IManagementMenu[] = [
  {
    id: 1,
    content: 'Actor List',
    link: '/management/actor',
    icon: <PersonOutlineTwoToneIcon />
  },
  {
    id: 2,
    content: 'Category List',
    link: '/management/category',
    icon: <ContentCopyTwoToneIcon />
  },
  {
    id: 3,
    content: 'Movie List',
    link: '/management/movie',
    icon: <MovieTwoToneIcon />
  }
];

export const CreatePage: ICreateMenu[] = [
  {
    id: 1,
    content: 'Create Actor Infor',
    link: '/create/actor',
    icon: <CreateNewFolderTwoToneIcon />
  },
  {
    id: 2,
    content: 'Create Category Infor',
    link: '/create/category',
    icon: <CreateNewFolderTwoToneIcon />
  },
  {
    id: 3,
    content: 'Create Movie Infor',
    link: '/create/movie',
    icon: <CreateNewFolderTwoToneIcon />
  }
];

export const DetailPage: IDetailMenu[] = [
  {
    id: 1,
    content: 'View Actor Infor',
    link: '/detail/actor',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 2,
    content: 'View Category Infor',
    link: '/detail/category',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 3,
    content: 'View Movie Infor',
    link: '/detail/movie',
    icon: <TableChartTwoToneIcon />
  }
];

export const EditPage: IEditMenu[] = [
  {
    id: 1,
    content: 'Edit Actor Infor',
    link: '/edit/actor',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 2,
    content: 'Edit Category Infor',
    link: '/edit/category',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 3,
    content: 'Edit Movie Infor',
    link: '/edit/movie',
    icon: <TableChartTwoToneIcon />
  }
];
