import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { DetailCategory } from './DetailCategory';

function DetailCategoryPage() {
  return (
    <>
      <Helmet>
        <title>Category Details - Management</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <DetailCategory />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DetailCategoryPage;
