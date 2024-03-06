import { useState } from "react";

import MuiDrawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Icon from 'src/@core/components/icon'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'

import { styled } from '@mui/material/styles'


const Drawer = styled(MuiDrawer)(({ theme }) => ({
    width: 400,
    zIndex: theme.zIndex.modal,
    '& .MuiFormControlLabel-root': {
      marginRight: '0.6875rem'
    },
    '& .MuiDrawer-paper': {
      border: 0,
      width: 400,
      zIndex: theme.zIndex.modal,
      boxShadow: theme.shadows[9]
    }
}))

const LiveStreams = () => {

    const [viewGrid, setViewGrid] = useState(true)
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const handleViewStyle = (event, isGrid) => {
        setViewGrid(isGrid)
    }

    const openDrawer = () => {
        setOpen(true);
    }

    const openDialog = () => {
        setDialogOpen(true)
    }

    const handleDialogClose = () => setDialogOpen(false)

    return (
        <Grid container spacing={6} sx={{mt: 5}}>
            <Grid item xl={12} md={12} xs={12}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="h4">Live Streams</Typography>
                    <Button variant='contained' startIcon={<Icon icon='tabler:video-plus' />}>
                        Create New
                    </Button>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{mt: 4}}>
                    <FormControl>
                        <InputLabel id='sort-label'>
                            Sort
                        </InputLabel>
                        <Select
                            label='sort'
                            defaultValue='oldest'
                            id='sort-select'
                            labelId='sort-label'
                            size='small'>
                            <MenuItem value='oldest'><Icon icon='tabler:sort-ascending' fontSize={20} /> Sort by Oldest</MenuItem>
                            <MenuItem value='newest'><Icon icon='tabler:sort-descending' fontSize={20} /> Sort by Newest</MenuItem>
                            <MenuItem value='atoz'><Icon icon='tabler:sort-ascending-letters' fontSize={20} /> A to Z</MenuItem>
                            <MenuItem value='ztoa'><Icon icon='tabler:sort-descending-letters' fontSize={20} /> Z to A</MenuItem>
                        </Select>
                    </FormControl>
                    
                    <ToggleButtonGroup exclusive value={viewGrid} onChange={handleViewStyle}>
                        <ToggleButton value='true'>
                            <Icon icon='tabler:layout-grid' />
                        </ToggleButton>
                        <ToggleButton value='false'>
                            <Icon icon='tabler:list' />
                        </ToggleButton>
                    </ToggleButtonGroup>
                
                </Box>
                <Box sx={{textAlign: 'center', mt: 12}}>
                    <img src="/images/icons/no-stream.svg" alt="no streams"/>
                    <Typography variant="h3" sx={{mt: 4}}>Get Started Now!</Typography>
                    <Typography variant="h5">Let’s create a stream and start publishing</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Button variant='outlined' onClick={openDialog} color='secondary' startIcon={<Icon icon='tabler:video' />} sx={{mt: 4, width: 240}}>
                            Livestreams Demo
                        </Button>
                        <Button variant='contained' onClick={openDrawer} startIcon={<Icon icon='tabler:video-plus' />} sx={{mt: 4, width: 240}}>
                            Create New
                        </Button>
                    </Box>
                </Box>
            </Grid>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby='scroll-dialog-title'
                aria-describedby='scroll-dialog-description'
            >
                <DialogTitle id='scroll-dialog-title'>
                    Livestream Demo
                </DialogTitle>
                <DialogContent>
                    <img style={{width: '100%'}} src="/images/banners/banner-9.jpg" />
                </DialogContent>
            </Dialog>
            <Drawer open={open} hideBackdrop anchor='right' variant='persistent'>
                <Box
                    className='customizer-header'
                    sx={{
                        position: 'relative',
                        p: theme => theme.spacing(8, 8),
                        borderBottom: theme => `1px solid ${theme.palette.divider}`
                    }}
                >
                        <Typography variant='h3' sx={{ fontWeight: 600}}>
                            Create New
                        </Typography>
                        <IconButton
                            onClick={() => setOpen(false)}
                            sx={{
                                right: 20,
                                top: '50%',
                                position: 'absolute',
                                color: 'text.secondary',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <Icon icon='tabler:x' fontSize={20} />
                        </IconButton>
                    
                </Box>
                <Box 
                    sx={{
                        p: theme => theme.spacing(3.5, 5),
                        background: theme => theme.palette.primary.main,
                        color: 'white'
                    }}>

                    <Typography variant='h5' sx={{color: 'white'}}>
                        <Icon icon='tabler:player-play-filled' sx={{ml: 4, color: 'white'}}/>
                        All in One Stream
                    </Typography>
                    
                    <Typography sx={{ml: 4, mt: 4, color: 'white'}}>
                        Livestream to websites with your player, stream to social media, and convert livestreams to on-demand videos — all in one place
                    </Typography>
                </Box>
            </Drawer>
        </Grid>
    );

}

export default LiveStreams;