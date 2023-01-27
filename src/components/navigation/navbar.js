import { Fragment, useState } from 'react'
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import { Link, Navigate, NavLink } from 'react-router-dom'
import Alert from '../../components/alert'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products } from '../../redux/actions/products';
import { makePayment, etherPrice } from '../../redux/actions/web3';
import SearchBox from './SearchBox';

import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuAlt2Icon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon, ShoppingCartIcon } from '@heroicons/react/solid'
import { useEffect } from 'react'
import DashboardLinks from '../dashboard/DashboardLinks'

const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'View All Products', href: '#', icon: CheckCircleIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const company = [
  { name: 'About', href: '#', icon: InformationCircleIcon },
  { name: 'Customers', href: '#', icon: OfficeBuildingIcon },
  { name: 'Press', href: '#', icon: NewspaperIcon },
  { name: 'Careers', href: '#', icon: BriefcaseIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
]
const resources = [
  { name: 'Community', href: '#', icon: UserGroupIcon },
  { name: 'Partners', href: '#', icon: GlobeAltIcon },
  { name: 'Guides', href: '#', icon: BookmarkAltIcon },
  { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
]
const blogPosts = [
  {
    id: 1,
    name: 'Boost your conversion rate',
    href: '#',
    preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
  },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
    preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({
  isAuthenticated,
  user,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items,
  account,
  ethereum_balance,
  network,
  makePayment,
  etherPrice,
  eth_price
}) {

  const [effectLogin, setEffectLogin] = useState(false);
  useEffect(() => async () => {
    get_categories();
    etherPrice();
  }, [])

  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [redirect, setRedirect] = useState(false);

  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: ''
  });
  const { category_id, search } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    get_search_products(search, category_id);
    setRender(!render);
  }



  if (render && window.location.pathname !== '/search')
    return <Navigate to="/search" />;


  if (redirect)
    return <Navigate to="/login" />;

  const logoutHandler = () => {
    logout();
    setRedirect(true);

  }
  const authLinks = (

    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          <span className="inline-block sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden bg-gray-100">
            <svg className="sm:h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Support
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  License
                </a>
              )}
            </Menu.Item>
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>





  )

  const guestLinks = (
    <Fragment>

      <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900">
        Sign in
      </Link>
      <Link
        to="/signup"
        className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Sign up
      </Link>
    </Fragment>

  )

  function popoverTransition() {
    return (
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-50 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 2xl:max-w-md">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">

            <div className="bg-gray-50 dark:bg-dark-second p-4">
              <div
                onClick={() => {
                  localStorage.removeItem("account");
                  setTimeout(
                    (window.location.href = "/"),
                    500
                  );
                }}
                className="cursor-pointer w-full flow-root rounded-md px-4 py-2 transition duration-150 ease-in-out dark:hover:bg-dark-main hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-50"
              >
                <span className="flex items-center">
                  <span className="text-sm font-gilroy-medium dark:text-dark-txt text-gray-900">
                    Desconectar
                  </span>
                </span>
                <span className="block text-sm text-gray-500">
                  Logout
                </span>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    );
  }

  const walletConnected = (
    <Fragment>

      <Popover
        as="div"
        className="inline-flex relative rounded-xl ml-2 py-0.5 pl-4 bg-gray-50 dark:bg-black border dark:border-dark-third
      lg:hidden"
      >
        {ethereum_balance && (
          <p className="cursor-default inline-flex mt-1.5 mr-2 text-md font-gilroy-semibold text-gray-700 dark:text-white">
            {ethereum_balance.length > 8
              ? ethereum_balance.slice(0, 7)
              : ethereum_balance}{" "}
            ETH
          </p>
        )}
        {network === 1 ? (
          <>
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    onMouseDown={() =>
                      setEffectLogin(true)
                    }
                    onMouseUp={() =>
                      setEffectLogin(false)
                    }
                    className={`
                      
                          pr-4
                          ${open ? "" : "text-opacity-90"}
                          group inline-flex items-center ${effectLogin && "animate-click"
                      } rounded-xl mx-1 py-1 pl-4 inline-flex items-center px- border border-transparent text-sm leading-4 font-gilroy-semibold text-black dark:text-dark-txt dark:bg-dark-third bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
                  >
                    {account ? (
                      <>
                        {account.slice(0, 3)}...
                        {account.slice(-3)}
                      </>
                    ) : (
                      <></>
                    )}

                  </Popover.Button>
                  {popoverTransition()}
                </>
              )}
            </Popover>
          </>
        )
          :
          (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                                              ${open ? "" : "text-opacity-90"}
                                              group inline-flex items-center rounded-xl mr-0.5 bg-rose-200 hover:bg-rose-300 px-3 py-2 text-sm font-gilroy-semibold text-rose-700 hover:text-rose-800 hover:text-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span>Error</span>
                    <ChevronDownIcon
                      className={`${open ? "" : "text-opacity-70"
                        }
                                                  ml-2 h-5 w-5 text-rose-400 hover:text-rose-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 dark:bg-dark-third bg-white p-7">
                          You need to change network:
                          <button
                            onClick={async () => {
                              await window.ethereum.request(
                                {
                                  method: "wallet_switchEthereumChain",
                                  params: [
                                    {
                                      chainId:
                                        "0x1",
                                    },
                                  ], // chainId must be in hexadecimal numbers
                                }
                              );
                            }}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out dark:bg-dark-third bg-gray-50 dark:hover:bg-dark-main hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 sm:h-12 sm:w-12">
                              <img
                                className="h-8 w-8 inline-flex mr-1"
                                src="https://bafybeibwzivmmcrtqb3ofqzagnal2xp7efe5uwqxvxtphf2fr4u7xbtecy.ipfs.dweb.link/ethereum.png"
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-gilroy-medium dark:text-white text-gray-900">
                                Ethereum
                              </p>
                              <p className="text-sm text-gray-500">
                                mainnet
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )}
      </Popover>

      <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
        <Popover
          as="div"
          className="lg:inline-flex relative hidden rounded-xl ml-2 py-0.5 pl-4 bg-gray-50 dark:bg-black border dark:border-dark-third"
        >
          {ethereum_balance && (
            <p className="cursor-default inline-flex mt-1.5 mr-2 text-md font-gilroy-semibold text-gray-700 dark:text-white">
              {ethereum_balance.length > 8
                ? ethereum_balance.slice(0, 7)
                : ethereum_balance}{" "}
              ETH
            </p>
          )}

          {network === 1 ? (
            <>
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button
                      onMouseDown={() =>
                        setEffectLogin(true)
                      }
                      onMouseUp={() =>
                        setEffectLogin(false)
                      }
                      className={`
                          pr-4
                          ${open ? "" : "text-opacity-90"}
                          group inline-flex items-center ${effectLogin && "animate-click"
                        } rounded-xl mx-1 py-1 pl-4 inline-flex items-center px- border border-transparent text-sm leading-4 font-gilroy-semibold text-black dark:text-dark-txt dark:bg-dark-third bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
                    >
                      {account ? (
                        <>
                          {account.slice(0, 6)}...
                          {account.slice(-4)}
                        </>
                      ) : (
                        <></>
                      )}

                    </Popover.Button>
                    {popoverTransition()}
                  </>
                )}
              </Popover>
            </>
          ) : (
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button
                    className={`
                                        ${open ? "" : "text-opacity-90"}
                                        group inline-flex items-center rounded-xl mr-0.5 bg-rose-200 hover:bg-rose-300 px-3 py-2 text-sm font-gilroy-semibold text-rose-700 hover:text-rose-800 hover:text-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span>Change Network</span>
                    <ChevronDownIcon
                      className={`${open ? "" : "text-opacity-70"
                        }
                                            ml-2 h-5 w-5 text-rose-400 hover:text-rose-500 transition duration-150 ease-in-out group-hover:text-opacity-80`}
                      aria-hidden="true"
                    />
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute left-2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0">
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-8 dark:bg-dark-third bg-white p-7">
                          <button
                            onClick={async () => {
                              await window.ethereum.request(
                                {
                                  method: "wallet_switchEthereumChain",
                                  params: [
                                    {
                                      chainId:
                                        "0x1",
                                    },
                                  ], // chainId must be in hexadecimal numbers
                                }
                              );
                            }}
                            className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out dark:bg-dark-third bg-gray-50 dark:hover:bg-dark-main hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-rose-500 focus-visible:ring-opacity-50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center text-gray-300 sm:h-12 sm:w-12">
                              <img
                                className="h-8 w-8 inline-flex mr-1"
                                src="https://bafybeibwzivmmcrtqb3ofqzagnal2xp7efe5uwqxvxtphf2fr4u7xbtecy.ipfs.dweb.link/ethereum.png"
                              />
                            </div>
                            <div className="ml-4">
                              <p className="text-sm font-gilroy-medium dark:text-white text-gray-900">
                                Ethereum
                              </p>
                              <p className="text-sm text-gray-500">
                                mainnet
                              </p>
                            </div>
                          </button>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          )}
        </Popover>
      </div>
    </Fragment>
  )

  const connectWallet = (
    <Fragment>
      <NavLink
        to="/connect"

      >
        <button className="ml-6 inline-flex items-center px-4 py-2  text-sm font-gilroy-medium rounded-md shadow-button  text-black bg-white hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow shadow-gray-200">
          Connect MetaMask

        </button>
      </NavLink>
    </Fragment>
  )

  const dashboardLinks = () => {
    return (
      <>
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"

            >
              <span className="inline-block sm:h-10 sm:w-10 h-8 w-8 rounded-full overflow-hidden bg-gray-100">
                <svg className="sm:h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                {/* <img src="%PUBLIC_URL%/g-logo.svg"/> */}

              </span>
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
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => setSidebarOpen(true)}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Dashboard
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/shop"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Shop
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      License
                    </a>
                  )}
                </Menu.Item>
                <form method="POST" action="#">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logoutHandler}
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full text-left px-4 py-2 text-sm'
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>



        </Menu>
        
      

        {/* <div className="bg-white shadow">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
          <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
          </button>

        </div> */}
      </>
    )
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-20"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-20"
            leaveTo="translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -m-12 pt-2">

                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                <button
                  type="button"
                  className=" flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <DashboardLinks classNames={classNames} />
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      <Popover className="relative bg-white">
        <div className="absolute inset-0 shadow z-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 md:justify-start md:space-x-10">

            <div>
              <Link to="/" className="flex">
                <span className="sr-only">Giovanni Ecommerce</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  // src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  src="/g-logo.svg"
                  alt=""
                />
              </Link>

            </div>

            <div className="-mr-2 -my-2 md:hidden flex">
            {isAuthenticated ?
                <div className="flex items-center justify-end xl:col-span-4 ">

                {account ? walletConnected : connectWallet}
              </div>
              : <></>
                }
              <Link to='/cart' className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <ShoppingCartIcon className="h-6 w-6 hover:text-gray-900" aria-hidden="true" />
              </Link>

              {/* <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button> */}
              <div>

                {
                  isAuthenticated ? dashboardLinks() : guestLinks
                }
              </div>


            </div>

            <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
              <Popover.Group as="nav" className="flex space-x-10">

                <Link to="/shop" className=" mt-2 text-base font-medium text-gray-500 hover:text-gray-900':'mt-2 text-base font-medium text-gray-500 hover:text-gray-900">
                  Shop
                </Link>
                {/* <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
                  Store
                </a> */}

                <SearchBox
                  search={search}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  categories={categories}
                />


              </Popover.Group>
              <div className="flex items-center md:ml-12">
                {isAuthenticated ?
                <div className="flex items-center justify-end xl:col-span-4 mr-4">

                {account ? walletConnected : connectWallet}
              </div>
              : <></>
                }
                <Link to="/cart" >
                  <ShoppingCartIcon className="h-8 w-8 mr-3 text-gray-300 hover:text-gray-900" />
                  <span className="text-xs absolute top-1 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">{total_items}</span>
                </Link>
                {
                  isAuthenticated ? authLinks : guestLinks
                }
                

              </div>

            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5 sm:pb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      // src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      src="/g-logo.svg"
                      alt="Giovanni Ecommerce"
                    />

                  </div>

                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="mt-6 sm:mt-8">
                  <nav>
                    <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white sm:h-12 sm:w-12">
                            <item.icon className="h-6 w-6" aria-hidden="true" />
                          </div>
                          <div className="ml-4 text-base font-medium text-gray-900">{item.name}</div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-8 text-base">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        {' '}
                        View all products <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="py-6 px-5">
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Pricing
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Docs
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Company
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Resources
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Blog
                  </a>

                  <a href="#" className="rounded-md text-base font-medium text-gray-900 hover:text-gray-700">
                    Contact Sales
                  </a>
                </div>
                <div className="mt-6">
                  {isAuthenticated !== null && isAuthenticated !== undefined && isAuthenticated ?
                    <>
                      <button

                        onClick={logoutHandler}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign Out
                      </button>
                    </>
                    :
                    <>
                      <Link
                        to="/signup"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </Link>
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}
                        <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
                          Sign in
                        </Link>
                      </p>
                    </>
                  }

                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
      <div className='md:hidden'>
        <SearchBox
          search={search}
          onChange={onChange}
          onSubmit={onSubmit}
          categories={categories}
        />

      </div>
      <Alert />

    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items,
  account: state.web3.account,
  ethereum_balance: state.web3.ethereum_balance,
  network: state.web3.network,
  eth_price: state.web3.eth_price,

})

export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products,
  makePayment,
  etherPrice

})(Navbar)