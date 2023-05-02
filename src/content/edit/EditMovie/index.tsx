import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { EditMovieForm } from './EditMovieForm';

function EditMoviePage() {
  return (
    <>
      <Helmet>
        <title>Movie - Applications</title>
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
            <EditMovieForm />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default EditMoviePage;
