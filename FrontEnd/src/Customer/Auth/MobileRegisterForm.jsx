
import { Grid, TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MobileRegisterForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const jwt = localStorage.getItem('JwT')
  const auth = useSelector(store => store.auth);

  
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('password') != data.get('confirmpassword')) {
      return toast.error('password and confirmPassword do not match');
    }

    const userData = {
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
    }
    dispatch(register(userData))
    navigate('/login')
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='firstName'
              name='firstName'
              label='First Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='lastName'
              name='lastName'
              label='Last Name'
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
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
            <TextField
              required
              id='confirmpassword'
              name='confirmpassword'
              label='Confirm Password'
              fullWidth
              autoComplete='confirmPassword'
            />
          </Grid>
          <Grid item xs={12}>
            <Button className=' w-full' type='submit' varient='contained' size='large' sx={{ padding: '.8rem 0rem', bgcolor: '#4f46e5', color: 'white', ":hover": { bgcolor: 'RGB(115 107 255)' } }} >
              Register
            </Button>
          </Grid>
        </Grid>
        <p className=' mt-4'>Already have an acoount <a className=' ml-1 text-blue-700 underline '  onClick={() => navigate('/loginn')} >Login</a></p>
      </form>
    </div>
  )
}

export default MobileRegisterForm