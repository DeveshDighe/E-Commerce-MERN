/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Menu, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, ChevronDownIcon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { navigation } from './navigation'
import UserDropDown from './UserDropDown'
import { useLocation, useNavigate } from 'react-router-dom'
import AuthModel from '../../Auth/AuthModel'
import { Button, IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '../../../State/store'
import { getUser, logout } from '../../../State/Auth/Action'
import { getCart } from '../../../State/Cart/Action'
import BoltIcon from '@mui/icons-material/Bolt';
import { Bolt } from '@mui/icons-material'



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navigation() {
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()

  const [openAuthModel, setopenAuthModel] = useState(false)
  const [anchorEl, setanchorEl] = useState(false)
  const openUserMenu = Boolean(anchorEl);
  const jwt = localStorage.getItem('JwT')
  const dispatch = useDispatch()
  const auth = useSelector(store => store.auth)
  const cart = useSelector(store => store.cart)
  const location = useLocation()


  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (cart?.cartItems?.length) {
      setCartQuantity(cart.cartItems.length);
    } else {
      setCartQuantity(0);
      getCart()
    }
  }, [cart, auth.user]);

  useEffect(() => {
    if (!auth?.user?.length) {
      setCartQuantity(0);
    }
  }, [auth.user]);

  const handleSmoothScroll = (id) => {
    setOpen(false)
    if (id === '/') {
      return navigate('/')
    }
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      handleClose(); // Close any menus or overlays if needed
    }
  };


  const handleUserClick = (event) => {
    setanchorEl(event.currentTarget)
  }
  const handleCloseUserMenu = (event) => {
    setanchorEl(null)
  }
  const handleOpen = () => {
    setopenAuthModel(true)
  }
  const handleClose = () => {
    setopenAuthModel(false)
  }

  const handleCategoryClick = (category, section, item, close) => {

    const newPath = `/${category.id}/${section.id}/${item.id}`;

    if (location.pathname === newPath) {
      navigate('/')
    }
    else {
      navigate(newPath)
    }


    close();

  }


  useEffect(() => {
    // if (jwt) {
      dispatch(getUser(jwt))
      dispatch(getCart())
    // }
  }, [jwt])

  useEffect(() => {
    if (auth.user) {
      handleClose()
    }
    if (location.pathname === '/login' || location.pathname === '/register') {
      navigate('/')
    }
  }, [auth.user])


  return (
    <div className="bg-white z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className=" mt-9 h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flex cursor-pointer ">
                                  <p onClick={() => handleCategoryClick(category, section, item, close)} className="hover:text-gray-800">
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                      key={page.name}
                      // href={page.href} // Use the provided href
                      className="-m-2 block p-2 font-medium text-gray-900"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleSmoothScroll(page.id); // Smooth scroll to the target section
                      }}
                    >
                      {page.name}
                    </a>
                    </div>
                  ))}
                </div>

                
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {auth.user ?

                    <div className="flow-root">
                      <Button onClick={() => dispatch(logout())} sx={{ color: 'black', fontWeight: "500" }} className="-m-2 block p-2 font-medium text-red-900">
                        Logout
                      </Button>
                    </div>
                    :

                    <div className="flow-root">
                      <Button onClick={() => navigate('/loginn')} sx={{ color: 'black', fontWeight: "500" }} className="-m-2 block p-2 font-medium text-gray-900">
                        login
                      </Button>
                    </div>

                  }
                </div>


              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-50">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-[1.1rem] text-white sm:px-6 lg:px-8">
          Welcome To My Website
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <span className="sr-only">Your Company</span>
                  <IconButton style={{ color: 'rgb(79, 70, 229)' }}>
                    <Bolt fontSize="large" />
                  </IconButton>
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch z-10">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium cursor-default text-gray-900">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex cursor-pointer">
                                                <p onClick={() => handleCategoryClick(category, section, item, close)} className="hover:text-gray-800">
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      // href={page.href} // Use the provided href
                      className="flex cursor-pointer items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                      onClick={(e) => {
                        e.preventDefault(); // Prevent default link behavior
                        handleSmoothScroll(page.id); // Smooth scroll to the target section
                      }}
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>


              <div className="ml-auto flex items-center">

                <div className=" lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <UserDropDown openAuthModel={openAuthModel} setopenAuthModel={setopenAuthModel} handleOpen={handleOpen} />
                  <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                </div>



                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div> */}

                {/* Cart */}
                <div onClick={() => navigate('/cart')} className="ml-4 flow-root ">
                  <Button className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartQuantity}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>


      <AuthModel handleClose={handleClose} open={openAuthModel} />
    </div>
  )
}
