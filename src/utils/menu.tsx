import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { IManagementMenu } from 'src/models/menu';

export const ManagementList: IManagementMenu[] = [
  {
    id: 1,
    content: 'Movie List',
    link: '/management/movie',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 2,
    content: 'Category List',
    link: '/management/category',
    icon: <TableChartTwoToneIcon />
  },
  {
    id: 3,
    content: 'Actor List',
    link: '/management/actor',
    icon: <TableChartTwoToneIcon />
  }
];
