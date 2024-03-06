import { useState, useRef } from "react";

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
import CustomTextField from 'src/@core/components/mui/text-field'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Link from "next/link";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import DatePicker from 'react-datepicker'
import toast from 'react-hot-toast'
import axios from "axios";
import {Tab, TabList, TabPanel, TabContext} from '@mui/material' 
import CustomInput from "src/views/forms/form-elements/pickers/PickersCustomInput";

import { styled } from '@mui/material/styles'
import VideoUploader from "./video-upload";
import DropzoneWrapper from "src/@core/styles/libs/react-dropzone";

const LinkStyled = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main
}))


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

    const hostingUrl = process.env.NEXT_PUBLIC_BACKEND

    const videoRef = useRef(null);

    const [viewGrid, setViewGrid] = useState(true)
    const [open, setOpen] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)

    const [step, setStep] = useState(0);

    const [stream_name, setStreamName] = useState();
    const [stream_url, setStreamUrl] = useState();
    const [description, setDescription] = useState();
    const [city, setCity] = useState();

    const [file, setFile] = useState(null)
    const [start, setStartTime] = useState(0.0)
    const [end, setEndTime] = useState(0.0)

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const handleStart = () => {
        
        if (!isPlaying) {
            toast.error("Please play video and pick start time");
            return;
        }
        
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            setStartTime(currentTime)
        }
    }

    const handleEnd = () => {
        
        if (!isPlaying) {
            toast.error("Please play video and pick end time");
            return;
        }

        if (!start) {
            toast.error("Please pick start time");
            return;
        }

        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;
            setEndTime(currentTime);
        }
    }
    
    const [tab, setTab] = useState('rtmp')

    const handleTabChange = (event, newValue) => {
        setTab(newValue)
    }

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

    const handleUpload = () => {
        const param = {
            stream_name,
            description,
            start,
            end
        }

        axios.post(`${hostingUrl}/upload-video`, {param})
            .then(res => {
                const data = res.data
            })
    }

    const createLiveStream = () => {
        if (!stream_name || stream_name.length == 0) {
            toast.error("Stream Name can not be null");
            return;
        }

        if (!description || description.length == 0) {
            toast.error("Please input description");
            return;
        }

        // if (!stream_url || stream_url.length == 0) {
        //     toast.error("Please input stream url");
        //     return;
        // }

        // if (!started || new Date(started).getTime() < new Date().getTime()) {
        //     toast.error("Please select correct started time");
        //     return;
        // }

        // if (!ended || new Date(ended).getTime() <= new Date(started).getTime()) {
        //     toast.error("Please select correct ended time");
        //     return;
        // }
        
        setTimeout(() => {
            setStep(1)
            setOpen(false)
        }, 300)


    }

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
                {
                    step == 0 && 
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
                }
                {
                    step == 1 && 
                    <Grid container spacing={6} sx={{mt: 5}}>
                        <Grid item xl={4} md={4} xs={12}>
                            <Card onClick={() => setStep(2)}>
                                <CardMedia sx={{ height: '14.5625rem' }} image='/images/cards/video-placeholder.png' />
                                <CardContent>
                                    <Typography variant='h5' sx={{ mb: 2 }}>
                                        {stream_name}
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                }
                {
                    step == 2 && 
                    <>
                        <Box display="flex" justifyContent="space-between" sx={{mt: 4}}>
                            <Typography variant="h3" sx={{mt: 4}}>Stream Name: {stream_name}</Typography>
                            <Button variant='contained' onClick={handleUpload} sx={{width: 150}}>
                                Upload Video
                            </Button>
                        </Box>
                        <Typography variant="h5" sx={{mt: 4}}>Description: {description}</Typography>
                        {file != null ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <video
                                    controls 
                                    preload="auto"
                                    ref={videoRef}
                                    onPlay={handlePlay}
                                    onPause={handlePause}
                                    style={{width: '640px', height: '480px'}} 
                                    src={URL.createObjectURL(file)}>
                                    Your browser does not support the video tag.
                                </video>
                            
                                <Box sx={{ display: 'flex', alignItems: 'center',  mt: 6 }}>
                                    <Button variant='contained' onClick={handleStart} sx={{mr: 4, width: 120}}>
                                        Pick Start
                                    </Button>
                                    {start.toFixed(2)}
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center',  mt: 6 }}>
                                    <Button variant='contained' onClick={handleEnd} sx={{mr: 4, width: 120}}>
                                        Pick End
                                    </Button> 
                                    {end.toFixed(2)}
                                </Box>
                            </Box>
                            ) :
                            <DropzoneWrapper sx={{mt: 4}}>
                                <VideoUploader setFile={setFile} />
                            </DropzoneWrapper>
                        }
                    </>
                }
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
                    }}>

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
                        }}>
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
                <Box 
                    sx={{
                        p: theme => theme.spacing(3.5, 5),
                    }}>
    
                    <Typography variant='h6' sx={{mt: 6}}>
                        Stream Name*
                    </Typography>
                    <CustomTextField  sx={{mt: 2, width: '100%'}} value={stream_name} placeholder='Stream Name' onChange={e => setStreamName(e.target.value)} />

                    <Typography variant='h6' sx={{mt: 6}}>
                        Description*
                    </Typography>
                    <CustomTextField  sx={{mt: 2, width: '100%'}} value={description} placeholder='Description' onChange={e => setDescription(e.target.value)} />

                    {/* <Typography variant='h6' sx={{mt: 6}}>
                        Stream URL*
                    </Typography>
                    <CustomTextField  sx={{mt: 2, width: '100%'}} value={stream_url} placeholder='Stream URL' onChange={e => setStreamUrl(e.target.value)} />

                    <DatePickerWrapper sx={{mt: 4}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <DatePicker
                                showTimeSelect
                                selected={started}
                                id='started'
                                dateFormat='MM/dd/yyyy hh:mm aa'
                                popperPlacement='bottom-start'
                                onChange={date => setStarted(date)}
                                customInput={<CustomInput label='Started at' />}
                                />

                            <Box sx={{mt: 4}} />

                            <DatePicker
                                showTimeSelect
                                selected={ended}
                                id='ended'
                                dateFormat='MM/dd/yyyy hh:mm aa'
                                popperPlacement='bottom-start'
                                onChange={date => setEnded(date)}
                                customInput={<CustomInput label='Ended at' />}                                
                                />
                        </Box>
                    </DatePickerWrapper> */}

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 6 }}>
                        <Button variant='contained' onClick={createLiveStream} sx={{mt: 4, width: 240}}>
                            Create Live Stream
                        </Button>
                        <Button 
                            variant='outlined' 
                            onClick={() => setOpen(false)} 
                            color='secondary' 
                            sx={{mt: 4, width: 240}}>
                            Cancel
                        </Button>
                    </Box>

                </Box>

                {/* <Box 
                    sx={{
                        p: theme => theme.spacing(3.5, 5),
                    }}>

                    <Typography variant='h4'>
                        Stream Source Setup
                    </Typography>
                    <FormControl sx={{width: '100%'}}>
                        <InputLabel id='city-label'>
                            City
                        </InputLabel>
                        <Select
                            label='city'
                            defaultValue='oldest'
                            id='city-select'
                            labelId='city-label'
                            size='small'>
                            <MenuItem value='Chicago'>Chicago</MenuItem>
                            <MenuItem value='NewYork'>New York</MenuItem>
                            <MenuItem value='Miami'>Miami</MenuItem>
                            <MenuItem value='Seattle'>Seattle</MenuItem>
                            <MenuItem value='LosAngeles'>Los Angeles</MenuItem>
                            <MenuItem value='Dallas'>Dalls</MenuItem>
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup sx={{width: '100%'}} exclusive value={viewGrid} onChange={handleViewStyle}>
                        <ToggleButton value='true'>
                            Publish
                        </ToggleButton>
                        <ToggleButton value='false'>
                            Pull
                        </ToggleButton>
                        <ToggleButton value='false'>
                            Webcam
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <TabContext value={tab}>
                        <TabList variant='fullWidth' onChange={handleTabChange} aria-label='tabs in orders card'>
                            <Tab value='rtmp' label='RTMP' />
                            <Tab value='srt' label='SRT' />
                            <Tab value='whip' label='WHIP' />
                        </TabList>
                        <TabPanel value={tab}>
                            {
                                tab == 'rtmp' && 
                                <>
                                    <CustomTextField value={value} placeholder='RTSP URL' onChange={e => setValue(e.target.value)} />
                                    <Typography variant="h6" sx={{mt: 2}}>Streaming Key</Typography>
                                    <CustomTextField type="password" value={value} placeholder='KEY' onChange={e => setValue(e.target.value)} />
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get RTMP Pull
                                    </Button>
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get SRT Pull
                                    </Button>
                                </>
                            }
                            {
                                tab == 'srt' && 
                                <>
                                    <CustomTextField value={value} placeholder='SRT URL' onChange={e => setValue(e.target.value)} />
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get RTMP Pull
                                    </Button>
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get SRT Pull
                                    </Button>
                                </>
                            }
                            {
                                tab == 'whip' && 
                                <>
                                    <CustomTextField value={value} placeholder='WHIP URL' onChange={e => setValue(e.target.value)} />
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get RTMP Pull
                                    </Button>
                                    <Button variant='contained' sx={{mt: 4, width: 240}}>
                                        Get SRT Pull
                                    </Button>
                                </>
                            }
                        </TabPanel>
                    </TabContext>
                    
                    

                </Box> */}
            </Drawer>
        </Grid>
    );

}

export default LiveStreams;