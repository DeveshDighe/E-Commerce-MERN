import React, { useEffect } from 'react';
import MainCarousel from '../../Components/HomeCarousel/MainCarouel';
import HomeSectionCaraousel from '../../Components/HomeSectionCarousel/HomeSectionCaraousel';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../../config/apiConfig';
import { GET_HOME_PRODUCT } from '../../../State/Product/ActionType';
import { mens_kurta } from '../../../../Data/Men/men_kurta';
import HomeCardNothingToShow from '../../Components/NothingToShow/HomeCardNothingToShow';
import { getUser } from '../../../State/Auth/Action';

const HomePage = () => {
  const dispatch = useDispatch();
  const product = useSelector(store => store.product);



  const getAllData = async () => {
    try {
      const response = await api.get('/api/products/p');
      dispatch({ type: GET_HOME_PRODUCT, payload: response.data });
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // if (product.products.length < 1) {   
    getAllData();
    // }
  }, []);


  

  return (
    <div>
  <MainCarousel />
  <div id='Prod' className='space-y-10 py-10 flex flex-col justify-center px-5 lg:px-10'>
    {/* Women's Dresses Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('dress'))}
          sectionName={`Women's Dresses`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}

    {/* Men's Kurtas Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('kurta'))}
          sectionName={`Men's Kurtas`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}

    {/* Women's Tops Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('top'))}
          sectionName={`Women's Tops`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}

    {/* Men's Shirts Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('shirt'))}
          sectionName={`Men's Shirts`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}

    {/* Women's Jeans Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('women_jeans'))}
          sectionName={`Women's Jeans`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}

    {/* Men's Jeans Section */}
    {product.products.length ? (
      Array.isArray(product.products) && (
        <HomeSectionCaraousel
          ProdsData={product.products.filter(item => item.category?.name.includes('men_jeans'))}
          sectionName={`Men's Jeans`}
        />
      )
    ) : (
      <HomeCardNothingToShow /> 
    )}
  </div>
</div>


  );
};

export default HomePage;
