
import { Grid, TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { getUser, login } from '../../State/Auth/Action';

const LoginForm = () => {

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

  // useEffect(() => {
  //   console.log(location.pathname, 'pathname');
  // }, [location])




  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <Grid item xs={12}>
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
        <p className=' mt-4'>Create new account <a className=' ml-1 text-blue-700 underline ' onClick={() => navigate('/register')} >Register</a></p>
      </form>
    </div>
  )
}

export default LoginForm