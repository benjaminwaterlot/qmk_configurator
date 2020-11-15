import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchKeyboard, fetchKeyboardList } from 'store/keyboards'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchKeyboardList())
  }, [dispatch])

  return (
    <Box>
      <Heading>Home</Heading>
      <Button onClick={() => dispatch(fetchKeyboard('preonic/rev3'))}>Try store</Button>
    </Box>
  )
}

export default Home
