import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our menu</h1>
            <p className='explore-menu-text'>Choose from our delicious menus, crafted with fresh ingredients and bursting with flavor to satisfy every craving, any time of day.</p>
            <div className='explore-menu-list'>
                {menu_list.map((item, index) => {
                    return (
                        <div className='explore-menu-list-item' key={index} onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}>
                            <img className={category === item.menu_name ? 'active' : ''} src={item.menu_image} alt="food-image" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreMenu
