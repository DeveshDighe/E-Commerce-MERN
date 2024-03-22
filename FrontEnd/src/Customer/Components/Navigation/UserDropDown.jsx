import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../State/Auth/Action'
import toast from 'react-hot-toast'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function UserDropDown({ handleOpen, setopenAuthModel, openAuthModel }) {

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const auth = useSelector(store => store.auth);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);


    if (openAuthModel == false && (location.pathname == '/login' || location.pathname == '/register')) {
        navigate('/')
    }
    const UserProfileRedr = () => {
        if (auth.user == null) {
            toast.error('Login First')
        }
        else {
            navigate('/userProfile')
        }

    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex w-8 h-8 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 items-center">
                    {auth.user ? auth.user.firstName.slice(0, 1).toUpperCase() : 'U'}
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
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
                <Menu.Items className="absolute left-1/2 transform -translate-x-1/2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a
                                    onClick={UserProfileRedr}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm cursor-pointer'
                                    )}
                                >
                                    Profile
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button onClick={() => navigate(`account/order`)} className={classNames(active ? 'bg-gray-100 text-gray-900 w-full flex' : 'text-gray-700', 'block px-4 py-2 text-sm w-full flex')}>
                                    <span className=' items-start'>My Orders</span>
                                </button>
                            )}
                        </Menu.Item>
                        {auth.user != null && auth.user.role == 'ADMIN' &&
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={() => navigate(`addProduct`)} className={classNames(active ? 'bg-gray-100 text-gray-900 w-full flex' : 'text-gray-700', 'block px-4 py-2 text-sm w-full flex')}>
                                        <span className=' items-start'>Add Product</span>
                                    </button>
                                )}
                            </Menu.Item>
                        }
                        <Menu.Item>
                            {({ active }) => (
                                auth.user ?
                                    <button onClick={() => dispatch(logout())}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}
                                    >
                                        Logout
                                    </button>
                                    :
                                    (windowWidth > 550 ?
                                        <button onClick={() => { handleOpen, setopenAuthModel(true); navigate('/login') }}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                'block w-full px-4 py-2 text-left text-sm'
                                            )}
                                        >
                                            Login
                                        </button>
                                        :
                                        <button onClick={() => navigate('/loginn')} className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block w-full px-4 py-2 text-left text-sm'
                                        )}>
                                            Login
                                        </button>
                                    )
                            )}

                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
