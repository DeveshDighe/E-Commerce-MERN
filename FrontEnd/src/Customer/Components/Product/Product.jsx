
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import { mens_kurta } from '../../../../Data/Men/men_kurta'
import ProductCard from './ProductCard'
import style from './ProductCard.module.css'
import { filters, singleFilter } from './FilterData'
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import SortIcon from '@mui/icons-material/Sort';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProducts } from '../../../State/Product/Action'
import FadeLoader from 'react-spinners/FadeLoader'
import NoFilterProduct from './NoFilterProduct'

const sortOptions = [
  { name: 'Low To High', value: 'price_low_to_high', href: '#', section: 'sort', current: false },
  { name: 'High To Low', value: 'price_high_to_low', href: '#', section: 'sort', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Product() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [loader, setloader] = useState(true)

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams()
  const product = useSelector(store => store.product)

  useEffect(() => {
    setTimeout(() => {
          setloader(false);       
    }, 4000);
  }, [loader])




  const decodedQuaryString = decodeURIComponent(location.search);


  const searchParams = new URLSearchParams(decodedQuaryString)
  const colorValue = searchParams.get('color');
  const sizeValue = searchParams.get('size');
  const priceValue = searchParams.get('price');
  const discount = searchParams.get('discount');
  const sortValue = searchParams.get('sort');
  const pageNumber = searchParams.get('page') || 1;
  const stock = searchParams.get('stock');

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search)





    let filterValue = searchParams.getAll(sectionId)

    if (sectionId === 'sort') {

      if (filterValue.length > 0 && filterValue[0] !== value) {
        // searchParams.delete(sectionId)
        filterValue = [];
      }
    }



    if (filterValue.length > 0 && filterValue[0].includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value)



      if (filterValue.length === 0) {
        searchParams.delete(sectionId)
      }
    }
    else {
      filterValue.push(value)
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(','))


    }
    const query = searchParams.toString()
    // console.log(query, 'query');
    navigate({ search: `?${query}` })

  }

  // useEffect(() => {
  //   console.log(currentPage , 'cuurururururururruururruruurururur');
  // }, [currentPage])



  useEffect(() => {


    const [minPrice, maxPrice] = priceValue === null ? [0, 10000] : priceValue.split('-').map(Number);


    const data = {
      category: param.lavelThree,
      color: colorValue || [],
      sizes: sizeValue || [],
      minPrice: minPrice,
      maxPrice: maxPrice,
      minDiscount: discount || 0,
      sort: sortValue,
      pageNumber: pageNumber,
      pageSize: 12,
      stock: stock
    };


    // if (product.products.length < 1) {
    //   console.log('Dispatching findProducts action...');
    dispatch(findProducts(data));
    // }
  }, [param.lavelThree, colorValue, sizeValue, priceValue, discount, sortValue, pageNumber, stock]);



  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', value)
    const query = searchParams.toString();
    navigate({ search: `?${query}` })

  }

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = searchParams.get('page');
    if (page) {
      setCurrentPage(parseInt(page));
    }
  }, [location.search]);


  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);



    if (e.target.value === '0') {
      searchParams.delete(sectionId);
    } else {
      searchParams.set(sectionId, e.target.value);
    }


    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };


  return (
    <div className="bg-white ">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full  max-w-xs flex-col mt-24 overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t  border-gray-200 pb-40">


                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      onChange={() => handleFilter(option.value, section.id)}
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {singleFilter.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 px-4">
                                {/* <span className="font-medium "></span> */}
                                <FormLabel sx={{ color: 'black' }} className='text-gray-900' id='demo-radio-button-group-label' >{section.name}</FormLabel>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4 px-4">
                                <FormControl>
                                  <RadioGroup
                                    defaultValue="female"
                                    name="controlled-radio-buttons-group"
                                    // value={value}
                                    // onChange={handleChange}
                                    // sx={{ my: 1 }}
                                    aria-labelledby='demo-radio-button-group-label'
                                  >
                                    {section.options.map((option, optionIdx) => (


                                      <>
                                        <FormControlLabel onChange={(e) => handleRadioFilterChange(e, section.id)} value={option.value} control={<Radio />} label={option.label}></FormControlLabel>

                                      </>

                                    ))}
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-28">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold max-sm:text-[1.4rem] tracking-tight text-gray-900">New Arrivals</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              onClick={() => handleFilter(option.value, 'sort')}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className=" pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-5">

              <>
                <form className={`${style.filter} hidden lg:block`}>
                  <div className=' flex justify-between'>
                    <h1 className=' text-lg opacity-50 font-ubuntu mb-6'>Filters</h1>
                    <SortIcon />
                  </div>



                  {filters.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex items-center">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                  {singleFilter.map((section) => (
                    <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6 ">
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              {/* <span className="font-medium "></span> */}
                              <FormLabel sx={{ color: 'black' }} className='text-gray-900' id='demo-radio-button-group-label' >{section.name}</FormLabel>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                ) : (
                                  <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              <FormControl>
                                <RadioGroup
                                  defaultValue="female"
                                  name="controlled-radio-buttons-group"
                                  key={section.name}
                                  // value={value}
                                  // onChange={handleChange}
                                  // sx={{ my: 1 }}
                                  aria-labelledby='demo-radio-button-group-label'
                                >
                                  {section.options.map((option, optionIdx) => (


                                    <>
                                      <FormControlLabel key={option.value} onChange={(e) => handleRadioFilterChange(e, section.id)} value={option.value} control={<Radio />} label={option.label}></FormControlLabel>

                                    </>

                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </>



              {/* Product grid */}
              <div className={`${style.margin} lg:col-span-4 w-full`}>

                <div className='flex flex-wrap justify-center bg-white py-5 gap-2 ml-5 max-sm:-ml-0'>
                  {product.products && product.products.content && product.products.content.length > 0 ? (
                    // Render product cards if content is not empty
                    product.products.content.map((item) => <ProductCard key={item._id} Product={item} />)
                  ) : (
                    // Render loading spinner if content is empty or not yet available
                    <div className=' h-[600px] flex justify-center items-center'>
                      {loader ?
                        <FadeLoader
                          color="RGB(150 146 238)"
                          loading={true}
                          speedMultiplier={2}
                          // cssOverride={override}
                          size={15}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                        :
                        <NoFilterProduct />
                      }
                    </div>
                  )}
                </div>



                <section className=' mt-32 w-full max-sm:px-0 px-[3.6rem]'>
                  <div className=' justify-center flex'>
                    <Pagination page={currentPage} count={product.products?.totalPages} color="primary" sx={{
                      '& .MuiPaginationItem-root.Mui-selected': {
                        backgroundColor: 'rgb(79,70,229)', // Change the background color of the selected page number
                      }
                    }} onChange={handlePaginationChange} />
                  </div>
                </section>

              </div>

            </div>


          </section>

        </main>
      </div>
    </div>
  )
}
