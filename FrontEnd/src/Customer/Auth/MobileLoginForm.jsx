
import { Grid, TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser, login } from '../../State/Auth/Action';

const MobileLoginForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const location = useLocation()
  // console.log(location.pathname, 'pathname');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);



    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(login(userData))


  }

  const user = useSelector(state => state.auth.user)


  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }


  }, [user])

  // useEffect(() => {
  //   console.log(location.pathname, 'pathname');
  // }, [location])



  // useEffect(() => {
  //   if (jwt) {
  //     dispatch(getUser(jwt))
  //   }
  // }, [jwt, auth.jwt])
  return (
    <div className=' flex justify-center mt-4'>
      <form className=' w-[95%]' onSubmit={handleSubmit}>
        <Grid container spacing={3} >

          <Grid item xs={12}>
            <TextField
              required
              id='email'
              name='email'
              label='Email'
              fullWidth
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12} >
            <TextField
              required
              id='password'
              name='password'
              label='Password'
              fullWidth
              autoComplete='password'
            />
          </Grid>

          <Grid item xs={12}>
            <Button className=' w-full' type='submit' varient='contained' size='large' sx={{ padding: '.8rem 0rem', bgcolor: '#4f46e5', color: 'white', ":hover": { bgcolor: 'RGB(115 107 255)' } }} >
              Login
            </Button>
          </Grid>
        </Grid>
        <p className=' mt-4'>Create new account <a className=' ml-1 text-blue-700 underline ' onClick={() => navigate('/registerr')} >Register</a></p>
      </form>
    </div>
  )
}

export default MobileLoginForm