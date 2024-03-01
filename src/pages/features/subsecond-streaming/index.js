import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import Icon from 'src/@core/components/icon'

const LiveStreams = () => {

    return (
        <Grid container spacing={6} sx={{mt: 5}}>
            <Grid item xl={12} md={12} xs={12}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Sub Second Streaming</Typography>
                    <Button variant='contained' startIcon={<Icon icon='tabler:video-plus' />}>
                        Create New
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );

}

export default LiveStreams;