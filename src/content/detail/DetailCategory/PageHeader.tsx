import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import { useNavigate } from 'react-router';

function PageHeader() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/management/category');
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          View Detail Category Page
        </Typography>
        <Typography variant="subtitle2"></Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<ArrowBackTwoToneIcon fontSize="small" />}
          onClick={handleReturn}
        >
          View Category List
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
