import React from 'react'
import { Productos } from '../componets/Productos'


export const Home = () => {

  return (
    <>
      <div className='home'>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 17 }}>
          <h3>Vista de Cliente</h3>
          <img height={78} src='https://cdn.icon-icons.com/icons2/3560/PNG/512/wishlist_product_list_order_cart_icon_225175.png' alt='usuarios' />
        </div>
        <Productos />

      </div>
    </>

  )
}
