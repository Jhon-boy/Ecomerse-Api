
export const deleteProduct = async (id) => {
    const baseURL = 'https://fakestoreapi.com/';
  
    const res = await fetch(`${baseURL}products/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    return data;
  };
  