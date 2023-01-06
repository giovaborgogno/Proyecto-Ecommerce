import { connect } from 'react-redux'
import Layout from '../../hocs/layout'
import { list_orders } from '../../redux/actions/orders'
import {
    get_items,
    get_total,
    get_item_total,
} from '../../redux/actions/cart'
import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
    BellIcon,
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuAlt2Icon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { PaperClipIcon } from '@heroicons/react/solid'
import DashboardLinks from '../../components/dashboard/DashboardLinks'


const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon, current: true },
    // { name: 'Team', href: '#', icon: UsersIcon, current: false },
    // { name: 'Projects', href: '#', icon: FolderIcon, current: false },
    // { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
    // { name: 'Documents', href: '#', icon: InboxIcon, current: false },
    // { name: 'Reports', href: '#', icon: ChartBarIcon, current: false },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Dashboard = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
    }, [])

    if (isAuthenticated !== null && isAuthenticated !== undefined && !isAuthenticated)
        return <Navigate to='/login' />


    return (
        <Layout>
        <div className='max-w-2xl sm:mx-auto py-5 px-0 sm:px-6 lg:max-w-7xl lg:px-8'>
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
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
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
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-shrink-0 flex items-center px-4">
                                <Link to="/">
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                                        alt="Workflow"
                                    />
                                </Link>
                            </div>
                            <div className="mt-5 flex-1 h-0 overflow-y-auto">
                                <nav className="px-2 space-y-1">
                                    <DashboardLinks classNames={classNames}/>
                                </nav>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14" aria-hidden="true">
                        {/* Dummy element to force sidebar to shrink to fit close icon */}
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className='flex'>
            <div className="hidden md:flex md:w-64 md:flex-col ">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex flex-col flex-grow border-r border-gray-200  bg-white overflow-y-auto">
                    
                    <div className=" mt-3 flex-grow flex flex-col">
                        <nav className="flex-1 px-2 pb-4 space-y-1">
                            <DashboardLinks classNames={classNames} />
                        </nav>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col flex-1">
                

                <main className="flex-1">
                    <div className="py-6">
                        
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            {/* Replace with your content */}
                            <div className="max-w-7xl mx-auto px-4  sm:px-6  lg:px-8">
                            <div>
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Applicant Information</h3>
                                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
                            </div>
                            <div className="mt-5 border-t border-gray-200">
                                <dl className="divide-y divide-gray-200">
                                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user && user !== null && user !== undefined && 
                                        <>
                                            <span className="flex-grow">{user.get_full_name}</span>
                                        </>}
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Update
                                                </button>
                                            </span>
                                        </dd>
                                    </div>
                                    
                                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user && user !== null && user !== undefined && 
                                        <>
                                            <span className="flex-grow">{user.email}</span>
                                        </>}
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Update
                                                </button>
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <span className="flex-grow"> $120,000</span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Update
                                                </button>
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">About</dt>
                                        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <span className="flex-grow">
                                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                                                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Update
                                                </button>
                                            </span>
                                        </dd>
                                    </div>
                                    <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
                                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                            <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span className="ml-2 flex-1 w-0 truncate">resume_back_end_developer.pdf</span>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                                                        <button
                                                            type="button"
                                                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Update
                                                        </button>
                                                        <span className="text-gray-300" aria-hidden="true">
                                                            |
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                                <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                                    <div className="w-0 flex-1 flex items-center">
                                                        <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        <span className="ml-2 flex-1 w-0 truncate">coverletter_back_end_developer.pdf</span>
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0 flex space-x-4">
                                                        <button
                                                            type="button"
                                                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Update
                                                        </button>
                                                        <span className="text-gray-300" aria-hidden="true">
                                                            |
                                                        </span>
                                                        <button
                                                            type="button"
                                                            className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                            </div>
                            {/* /End replace */}
                        </div>
                    </div>
                </main>
            </div>
            </div>
        </div>
        </Layout>
    )
}

const mapStateToProps = state => ({
    orders: state.Orders.orders,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total,
})(Dashboard)