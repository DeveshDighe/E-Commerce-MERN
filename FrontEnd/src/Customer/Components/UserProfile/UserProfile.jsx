import React, { useEffect, useState } from 'react';
import { api } from '../../../config/apiConfig';
import FadeLoader from 'react-spinners/FadeLoader';

const UserProfile = () => {
  const [userProfileData, setuserProfileData] = useState({});
  const [loader, setloader] = useState(true)

  useEffect(() => {
    if (userProfileData?.data) {
      setloader(false)
    }
  }, [userProfileData])



  const UserData = async () => {
    try {
      const data = await api.get('/api/users/profile');
      setuserProfileData(data);
    } catch (error) {
      // Handle error
      // console.error('Error fetching user profile data:', error);
    }
  };

  useEffect(() => {
    UserData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className=' w-full p-12 flex justify-center'>
      {!loader ?
        <div className=' w-1/3 border rounded-2xl p-8  shadowcss cursor-pointer'>
          <h1 className=' text-center text-4xl mb-16 font-ubuntu '>User Profile</h1>
          <div className=' grid grid-cols-2 mb-9'>
            <div>
              <span className=' text-2xl font-semibold text-gray-600'>First Name :</span>
            </div>
            <div>
              <p className=' text-lg font-semibold'> {userProfileData?.data?.firstName}</p>
            </div>
          </div>
          <div className=' grid grid-cols-2 mb-9'>
            <div><span className=' text-2xl font-semibold text-gray-600'>Last Name :</span> </div>
            <div><p className=' text-lg font-semibold'>{userProfileData?.data?.lastName}</p></div>
          </div>
          <div className=' grid grid-cols-2 mb-9'>
            <div>        <span className=' text-2xl font-semibold text-gray-600'>Email :</span></div>
            <div>
              <p className=' text-lg font-semibold'> {userProfileData?.data?.email}</p></div>

          </div>
          <div className=' grid grid-cols-2 mb-9'>
            <div>        <span className=' text-2xl font-semibold text-gray-600' >Role :</span></div>
            <div>         <p className=' text-lg font-semibold'> {userProfileData?.data?.role}</p></div>


          </div>
          <div className=' grid grid-cols-2 mb-9'>
            <div><span className=' text-2xl font-semibold text-gray-600' >Created On :</span></div>
            <div className=' text-start' >        <p className=' text-lg font-semibold'> {formatDate(userProfileData?.data?.createdAt)}</p></div>


          </div>





        </div>

        :
        <FadeLoader
          color="RGB(150 146 238)"
          loading={true}
          speedMultiplier={2}
          // cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    </div>
  );
};

export default UserProfile;
