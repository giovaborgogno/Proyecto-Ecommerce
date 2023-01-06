import { connect } from 'react-redux'
import Layout from '../../hocs/layout'
import { list_orders, get_order_detail } from '../../redux/actions/orders'
import {
    get_items,
    get_total,
    get_item_total,
} from '../../redux/actions/cart'
import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
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


const DashboardPaymentsDetail = ({

    order,
    isAuthenticated,
    user,
    get_order_detail
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const params = useParams()
    const transaction_id = params.transaction_id
    useEffect(() => {
        get_order_detail(transaction_id)
    }, [transaction_id])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

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

                                    {order !== undefined && order !== null && order ?

                                        <div className="bg-white">
                                            <div className="max-w-7xl mx-auto px-4  sm:px-6  lg:px-8">
                                                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Order Details</h1>

                                                <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:gap-3">
                                                    <dl className="flex">
                                                        <dt className="text-gray-500">Order number&nbsp;</dt>
                                                        <dd className="font-medium text-gray-900">{transaction_id}</dd>
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
                                                    <dl className="flex">
                                                        
                                                        <dt className="text-gray-500">Status&nbsp;</dt>
                                                        {order.status === 'processed' ?
                                                            <>
                                                                <dd className="font-medium text-gray-900">Processed</dd>
                                                            </>
                                                            : order.status === 'shipped' ?
                                                                <>
                                                                    <dd className="font-medium text-gray-900">Shipped</dd>
                                                                </>
                                                                : order.status === 'delivered' ?
                                                                    <>
                                                                        <dd className="font-medium text-gray-900">Delivered</dd>
                                                                    </>
                                                                    : order.status === 'cancelled' ?

                                                                        <>
                                                                            <dd className="font-medium text-gray-900">Cancelled</dd>
                                                                        </>
                                                                        :

                                                                        <>
                                                                            <dd className="font-medium text-gray-900">Order Placed</dd>
                                                                        </>
                                                        }
                                                        <dt className="ml-3 text-gray-500">Total Amount&nbsp;</dt>
                                                        <dd className="font-medium text-gray-900">${order.amount}</dd>
                                                    </dl>


                                                </div>

                                                <div className="mt-8">
                                                    <h2 className="sr-only">Products purchased</h2>

                                                    <div className="space-y-10">
                                                        {order.order_items.map((product) => (
                                                            <div
                                                                key={product.id}
                                                                className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                                                            >
                                                                <div className="sm:col-span-4 md:col-span-2 md:row-end-2 md:row-span-2">
                                                                    <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden w-20 h-20">
                                                                        <Link to={`/product/${product.id}`}>
                                                                        <img src={product.photo} alt="" className="object-center object-cover w-20 h-20 " />
                                                                        </Link>
                                                                    </div>
                                                                </div>

                                                                <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                                                                    <h3 className="text-lg font-medium text-gray-900">
                                                                        <Link to={`/product/${product.id}`}>{product.name}</Link>
                                                                    </h3>
                                                                    <p className="font-medium text-gray-900 mt-1">Price: ${product.price}</p>
                                                                    <p className="text-gray-500 mt-3">Count: {product.count}</p>
                                                                </div>

                                                            </div>
                                                        ))}

                                                    </div>
                                                    <div className="sm:col-span-12 md:col-span-7">
                                                        <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                                                            <div>
                                                                <dt className="font-medium text-gray-900">Delivery address</dt>
                                                                <dd className="mt-3 text-gray-500">
                                                                    <span className="block">{order.address_line_1}</span>
                                                                    <span className="block">{order.address_line_2}</span>
                                                                    <span className="block">{order.city}</span>
                                                                    <span className="block">{order.state_province_region}</span>
                                                                    <span className="block">{order.postal_zip_code}</span>
                                                                    <span className="block">{order.country_region}</span>
                                                                </dd>
                                                            </div>
                                                            <div>
                                                                <dt className="font-medium text-gray-900">Shipping updates</dt>
                                                                <dd className="mt-3 text-gray-500 space-y-3">
                                                                    {/* <p>{product.email}</p> */}
                                                                    <p>{order.telephone_number}</p>
                                                                    <p>{order.shipping_name} {order.shipping_time}: ${order.shipping_price}</p>

                                                                </dd>
                                                            </div>
                                                        </dl>

                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                        :
                                        <>loading...</>
                                    }

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
    order: state.Orders.order,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
})

export default connect(mapStateToProps, {
    get_order_detail
})(DashboardPaymentsDetail)