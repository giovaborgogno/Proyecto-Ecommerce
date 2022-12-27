import { SearchIcon } from '@heroicons/react/solid'
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { get_categories } from '../../redux/actions/categories';


const SearchBox = ({ 
    categories,
    search,
    onChange,
    onSubmit,
 }) => {
    return (
        <form onSubmit={e => onSubmit(e)}>

            <div className="mt-1 flex rounded-md shadow-sm border border-gray-200">
                <div className="relative flex items-stretch flex-grow focus-within:z-10">

                    <div className="mt-1 mx-1 px-2 py-1">
                        <select
                            onChange={e => onChange(e)}
                            name='category_id'
                            className='bg-inherit'
                        >
                            <option value={0}>All</option>
                            {
                                categories &&
                                categories !== null &&
                                categories !== undefined &&
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }

                        </select>
                    </div>

                    <input
                        type="search"
                        name="search"
                        onChange={e => onChange(e)}
                        value={search}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-2 sm:text-sm border-gray-300"
                        placeholder="Que buscas hoy?"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
            </div>
        </form >
    )
}

export default SearchBox;