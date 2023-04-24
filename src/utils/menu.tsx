import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import { IManagementMenu } from 'src/models/menu';

export const ManagementList: IManagementMenu[] = [
  {
    id: 1,
    content: 'Movie List',
    link: '/management/transactions',
    icon: <TableChartTwoToneIcon />
  }
];
