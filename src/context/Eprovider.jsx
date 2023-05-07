import React from 'react'
import { useState, useEffect } from "react";
import { Econtext } from './Econtext';

export const Eprovider = ({ children }) => {
    const [allProducts, setProducts] = useState([]);
    const [globalP, setGlobalP] = useState([]);
    const [offset, setOffset] = useState(0);
    const [carga, setCarga] = useState(true);

        //Lamar 50 productoS A LA API

        const getAllProducts = async (limit = 30) => {
            const urlP = 'https://fakestoreapi.com/';
            const res = await fetch(`${urlP}products?limit=${limit}&offset=${offset}`);
            const data = await res.json();
            
            const promise = data.map(async (producto) => {
                const res = await fetch(`${urlP}products/${producto.id}`);
                const data = await res.json();
                return data;
            });
    
            //Almacenamos el llamadamo
    
            const result = await Promise.all(promise);
    
            //Guardamos el resultado que nos devuelve todo
    
            setProducts([...allProducts, ...result]);
    
            setCarga(false);

        }
        //============================================================================
        const deleteProduct = async (id) => {
            const baseURL = 'https://fakestoreapi.com/';
          
            const res = await fetch(`${baseURL}products/${id}`, {
              method: 'DELETE'
            });
            const data = await res.json();
            setProducts(allProducts.filter((producto) => producto.id !== id));
            return data;
          };
//================================================================
          const insertProduct = async (product) => {
          setCarga(true);
            const res = await fetch('https://fakestoreapi.com/products', {
                method:"POST",
                body:JSON.stringify(
                    {
                        title: product.title,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        category: product.category
                    }
                )
            });
            const data = await res.json();
            
            setProducts(
              allProducts.map(p => {
                if (p.id === data.id) {
                  return data;
                } else {
                  return p;
                }
              })
            );
            setCarga(false);
          };
          //================================================================

        const getGlobalProducts = async () => {
            const urlP = 'https://fakestoreapi.com/';
            const res = await fetch(`${urlP}products?limit=30&offset=0`);
            const data = await res.json();
            
            const promise = data.results.map(async (producto) => {
                const res = await fetch(producto.url);
                const data = await res.json();
                return data;
            });
    
            //Almacenamos el llamadamo
    
            const result = await Promise.all(promise);
    
            //Guardamos el resultado que nos devuelve todo
    
            setGlobalP(result);
    
            setCarga(false);
        }

        const onClickLoadMore = () => {
            setOffset(offset + 50);
    
        }

        useEffect(() => {
            getAllProducts()
            // eslint-disable-next-line
        }, [offset]);
    
        useEffect(() => {
            getGlobalProducts();
        }, []);
    
        
  return (
   <Econtext.Provider 
   value={{
    setCarga,
    carga,
    getAllProducts,
    getGlobalProducts,
    onClickLoadMore,
    globalP,
    allProducts,
    deleteProduct,
    insertProduct,
   }}
   >
    {children}
   </Econtext.Provider>
  )
}
