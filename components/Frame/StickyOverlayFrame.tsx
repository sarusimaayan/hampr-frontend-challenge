import React from 'react'
import { Box, Paper } from '@mui/material'
import Image from 'next/image'
import logo from '../../img/Mortal-Kombat-Logo.png'

const StickyOverlayFrame: React.FC = () => {
  return (
    <Box mb={10}>
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          zIndex: 1000,
          border: '70px solid',
          boxSizing: 'border-box',
          pointerEvents: 'none',
        }}
      />
      <Image
        src={logo}
        height={120}
        className="logo"
        alt="logo"
        style={{ position: 'fixed', top: 10, left: '43%', zIndex: 1001 }}
      />
    </Box>
  )
}

export default StickyOverlayFrame
