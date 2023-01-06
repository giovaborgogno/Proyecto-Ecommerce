import { connect } from 'react-redux'
import Layout from '../../hocs/layout'
import { list_orders, get_order_detail } from '../../redux/actions/orders'
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
import moment from 'moment'


const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const products = [
    {
        id: 1,
        name: 'Distant Mountains Artwork Tee',
        price: '$36.00',
        description: 'You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?',
        address: ['Floyd Miles', '7363 Cynthia Pass', 'Toronto, ON N3Y 4H8'],
        email: 'f•••@example.com',
        phone: '1•••••••••40',
        href: '#',
        status: 'Processing',
        step: 1,
        date: 'March 24, 2021',
        datetime: '2021-03-24',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg',
        imageAlt: 'Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade.',
    },
    // More products...
]


const DashboardPayments = ({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    order_items,
    isAuthenticated,
    user,
    get_order_detail
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        window.scrollTo(0,0)
        get_items()
        get_total()
        get_item_total()
        list_orders()
    }, [])

    if (isAuthenticated !== null && isAuthenticated !== undefined && !isAuthenticated)
        return <Navigate to='/login' />

    const show_state = (order) => {
        let state_step = 0;
        if (order.status === 'processed') state_step = 1
        else if (order.status === 'shipped') state_step = 2
        else if (order.status === 'delivered') state_step = 4
        else state_step = 0

        return (
            order.status === 'cancelled' ?
                <>
                    <div className="mt-6">
                        <div className="bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-2 bg-red-600 rounded-full"
                                style={{ width: `calc((4 * 2 + 1) / 8 * 100%)` }}
                            />
                        </div>
                        <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                            <div className="text-red-600">Order Cancelled</div>

                        </div>
                    </div>
                </>
                :
                <>
                    <div className="mt-6">
                        <div className="bg-gray-200 rounded-full overflow-hidden">
                            {order.status === 'delivered' ?
                                <div
                                className="h-2 bg-green-600 rounded-full"
                                style={{ width: `calc((${state_step} * 2 + 1) / 8 * 100%)` }}
                            />
                                :
                                <div
                                className="h-2 bg-indigo-600 rounded-full"
                                style={{ width: `calc((${state_step} * 2 + 1) / 8 * 100%)` }}
                            />
                            }
                            
                        </div>
                        <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                            <div className="text-indigo-600">Order placed</div>
                            <div className={classNames(state_step > 0 ? 'text-indigo-600' : '', 'text-center')}>
                                Processed
                            </div>
                            <div className={classNames(state_step > 1 ? 'text-indigo-600' : '', 'text-center')}>
                                Shipped
                            </div>
                            <div className={classNames(state_step > 2 ? 'text-indigo-600' : '', 'text-right')}>
                                Delivered
                            </div>
                        </div>
                    </div>
                </>
        )


    }

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
                            <div className="py-6">

                                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                                    {/* Replace with your content */}

                                    <div className="bg-white">
                                        <div className="max-w-7xl mx-auto px-4  sm:px-6  lg:px-8">
                                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Payment History</h1>
                                            {orders !== null && orders !== undefined && orders && user && orders.map((order) => (
                                                <>

                                                    <h3 className="mt-10 text-1xl font-extrabold tracking-tight text-gray-900">Order Detail:</h3>
                                                    <div className="text-sm border-t border-gray-200 pt-5 sm:flex sm:justify-between">
                                                        <dl className="flex">
                                                            <dt className="text-gray-500">Order number&nbsp;</dt>
                                                            <dd className="font-medium text-gray-900">{order.transaction_id}</dd>
                                                            <dt>
                                                                <span className="sr-only">Date</span>
                                                                <span className="text-gray-400 mx-2" aria-hidden="true">
                                                                    &middot;
                                                                </span>
                                                            </dt>
                                                            <dd className="font-medium text-gray-900">
                                                                <time dateTime="2021-03-22">{moment(order.date_issued).fromNow()}</time>
                                                            </dd>
                                                        </dl>
                                                        <div className="mt-4 sm:mt-0">
                                                            <Link to={`/dashboard/payments/${order.transaction_id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                View details<span aria-hidden="true"> &rarr;</span>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className="mt-5 pb-5 border-b border-gray-200">
                                                        <h2 className="sr-only">Products purchased</h2>

                                                        <div className="space-y-24">

                                                            <div
                                                                // key={order.id}
                                                                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                                            >

                                                                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                                                    <h3 className="text-lg font-medium text-gray-900">
                                                                        {/* <a href={product.href}>{product.name}</a> */}
                                                                    </h3>
                                                                    <p className="text-gray-500 mt-3">Shipping cost ${order.shipping_price}</p>
                                                                    <p className="font-medium text-gray-900 mt-1">Total amount ${order.amount}</p>
                                                                </div>
                                                                <div className="sm:col-span-12 md:col-span-7">
                                     
                                                                    <p className="font-medium text-gray-900 mt-6 md:mt-10">
                                                                        Status: {order.status}
                                                                    </p>
                                                                    {show_state(order)}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </>
                                            ))}

                                            {/* Billing */}
                                            {/* <div className="mt-24">
                                                <h2 className="sr-only">Billing Summary</h2>

                                                <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                                                    <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Billing address</dt>
                                                            <dd className="mt-3 text-gray-500">
                                                                <span className="block">Floyd Miles</span>
                                                                <span className="block">7363 Cynthia Pass</span>
                                                                <span className="block">Toronto, ON N3Y 4H8</span>
                                                            </dd>
                                                        </div>
                                                        <div>
                                                            <dt className="font-medium text-gray-900">Payment information</dt>
                                                            <dd className="mt-3 flex">
                                                                <div>
                                                                    <svg
                                                                        aria-hidden="true"
                                                                        width={36}
                                                                        height={24}
                                                                        viewBox="0 0 36 24"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-6 w-auto"
                                                                    >
                                                                        <rect width={36} height={24} rx={4} fill="#224DBA" />
                                                                        <path
                                                                            d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z"
                                                                            fill="#fff"
                                                                        />
                                                                    </svg>
                                                                    <p className="sr-only">Visa</p>
                                                                </div>
                                                                <div className="ml-4">
                                                                    <p className="text-gray-900">Ending with 4242</p>
                                                                    <p className="text-gray-600">Expires 02 / 24</p>
                                                                </div>
                                                            </dd>
                                                        </div>
                                                    </dl>

                                                    <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
                                                        <div className="pb-4 flex items-center justify-between">
                                                            <dt className="text-gray-600">Subtotal</dt>
                                                            <dd className="font-medium text-gray-900">$72</dd>
                                                        </div>
                                                        <div className="py-4 flex items-center justify-between">
                                                            <dt className="text-gray-600">Shipping</dt>
                                                            <dd className="font-medium text-gray-900">$5</dd>
                                                        </div>
                                                        <div className="py-4 flex items-center justify-between">
                                                            <dt className="text-gray-600">Tax</dt>
                                                            <dd className="font-medium text-gray-900">$6.16</dd>
                                                        </div>
                                                        <div className="pt-4 flex items-center justify-between">
                                                            <dt className="font-medium text-gray-900">Order total</dt>
                                                            <dd className="font-medium text-indigo-600">$83.16</dd>
                                                        </div>
                                                    </dl>
                                                </div>
                                            </div> */}
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
    order_items: state.Orders.order,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    list_orders,
    get_items,
    get_total,
    get_item_total,
    get_order_detail
})(DashboardPayments)