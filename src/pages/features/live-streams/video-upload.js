// ** React Imports
import { useState, useRef } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

const VideoUploader = ({setFile}) => {
  // ** State
  
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'video/*': ['.mp4']
    },
    onDrop: acceptedFiles => {
        const _files = acceptedFiles.map(file => Object.assign(file));
        setFile(_files[0])
    }
  })

  return (
    <Box {...getRootProps({ className: 'dropzone' })} sx={{ height: 600 }}>
        <input {...getInputProps()} />
        <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Box
                sx={{
                mb: 8.75,
                width: 48,
                height: 48,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                }}
            >
                <Icon icon='tabler:upload' fontSize='1.75rem' />
            </Box>
            <Typography variant='h4' sx={{ mb: 2.5 }}>
                Drop files here or click to upload.
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
                (This is just a demo drop zone. Selected files are not actually uploaded.)
            </Typography>
        </Box>
    </Box>
  )
}

export default VideoUploader
