import React, { useContext } from 'react'

import { Loader } from './Loader';
import { Econtext } from '../context/Econtext';
import ProductCard from './ProductCard';


export const Productos = () => {
    const { allProducts, carga } = useContext(Econtext)
    const { onClickLoadMore } = useContext(Econtext);
    return (
        <>

            {
                carga ? (
                    <center>
                        <Loader />
                    </center>

                )
                    : (
                        <div className='container'>
                            <>
                                {
                                    allProducts.map(product => (

                                        <ProductCard product={product} key={product.id} />
                                    ))
                                }
                            </>
                            <div className='container-btn-load-more'>
                                <button className='btn-load-more'
                                    onClick={onClickLoadMore}
                                >
                                    Cargar mas
                                </button>
                            </div>
                        </div>
                    )
            }

        </>

    )
}
