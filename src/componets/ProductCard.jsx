import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ProductCard = ({product}) => {
  return (
    <div className='product'>
           <Card  className='product'>
                <Card.Img className='img-Product' 
                variant="top" 
                src={product.image} 
                alt={`Producto ${product.title}`}

                />

                <Card.Body >
                    <Card.Subtitle className='title'>{product.title}</Card.Subtitle>
                    <Card.Text >
                        Costo: {product.price}
                    </Card.Text>
                    <Card.Text>
                        Categoría: {product.category}
                    </Card.Text>
                   
                </Card.Body>
                <Card.Footer style={{ background:'white', display:'flex'}}> <Button variant="primary" className='btnComprar'>Me interesa</Button>
                 </Card.Footer>
            </Card> 
        </div>
  )
}

export default ProductCard