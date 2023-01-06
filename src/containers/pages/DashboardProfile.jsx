import { connect } from 'react-redux'
import Layout from '../../hocs/layout'
import { list_orders } from '../../redux/actions/orders'
import { update_user_profile } from '../../redux/actions/profile'
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
import { Oval } from 'react-loader-spinner'
import { countries } from '../../helpers/fixedCountries'


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


const DashboardProfile = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
    update_user_profile,
    profile,
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        get_items()
        get_total()
        get_item_total()
        list_orders()
    }, [])

    const [formData, setFormData] = useState({
        address_line_1: '',
        address_line_2: '',
        city: '',
        state_province_region: '',
        zipcode: '',
        phone: '',
        country_region: 'Canada'
    });

    const {
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        zipcode,
        phone,
        country_region
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        setLoading(true)
        update_user_profile(
            address_line_1,
            address_line_2,
            city,
            state_province_region,
            zipcode,
            phone,
            country_region
        );
        setLoading(false)
        window.scrollTo(0, 0);
    };

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
                            <div className="max-w-7xl mx-auto px-4  sm:px-6  lg:px-8 py-6">

                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    {/* Replace with your content */}

                                    {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
                                    <form onSubmit={e => onSubmit(e)} className=" mx-auto ">


                                        <div className="bg-white pb-5 border-b border-gray-200 ">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Address Line 1:
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='address_line_1'
                                                        placeholder={`${profile.address_line_1}`}
                                                        onChange={e => onChange(e)}
                                                        value={address_line_1}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Address Line 2:
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='address_line_2'
                                                        placeholder={`${profile.address_line_2}`}
                                                        onChange={e => onChange(e)}
                                                        value={address_line_2}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                City
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='city'
                                                        placeholder={`${profile.city}`}
                                                        onChange={e => onChange(e)}
                                                        value={city}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                State/Province:
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='state_province_region'
                                                        placeholder={`${profile.state_province_region}`}
                                                        onChange={e => onChange(e)}
                                                        value={state_province_region}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Postal Code/Zipcode:
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='zipcode'
                                                        placeholder={`${profile.zipcode}`}
                                                        onChange={e => onChange(e)}
                                                        value={zipcode}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Phone:
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <div className="max-w-lg flex rounded-md shadow-sm">

                                                    <input
                                                        type="text"
                                                        name='phone'
                                                        placeholder={`${profile.phone}`}
                                                        onChange={e => onChange(e)}
                                                        value={phone}
                                                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                                Country
                                            </label>
                                            <div className="mt-1 sm:mt-0 sm:col-span-2">
                                                <select
                                                    id='country_region'
                                                    name='country_region'
                                                    onChange={e => onChange(e)}
                                                >
                                                    <option value={country_region}>{profile.country_region}</option>
                                                    {
                                                        countries && countries.map((country, index) => (
                                                            <option key={index} value={country.name}>{country.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>

                                        {loading ? <button
                                            className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            <Oval
                                                type="Oval"
                                                width={20}
                                                height={20}
                                                color="#fff"
                                            />
                                        </button> : <button
                                            type="submit"
                                            className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>}

                                    </form>

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
    profile: state.Profile.profile
})

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total,
    update_user_profile
})(DashboardProfile)