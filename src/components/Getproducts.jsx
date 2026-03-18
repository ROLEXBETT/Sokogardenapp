import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Getproducts = () => {

  //1. initialize hooks to help you manage the state of your application
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState("");

  //declare the navigate hook
  const navigate = useNavigate()

  //  Below we specify the image base url
  const img_url = "https://rolexbett.alwaysdata.net/static/images/"

   //3. create a function tohelp you fetch the products from your API
   const fetchProducts = async() => {
      try{
        //4. update the loading hook
        setLoading(true)

          //5. Interact with your endpoint for  fetching the products
          const response = await axios.get("https://rolexbett.alwaysdata.net/api/get_products")

          //6. update the ptoducts hook with the response given from the API
          setProducts(response.data)

          //7. Set the loading hook back to default
          setLoading(false)

      }
      catch(error){
        //8.update the message on catch error
        // if there is an error 
        //set the loading back to default
        setLoading(false)

        //update the error hook with a message
        setEror(error.message)

      }
    }

    // we shall use the useEffect hook . This hook enables us to automatically re-render new features incase of any changes
    useEffect(() => {
      fetchProducts()
    }, [])

    // console.log(products)

    return (
      <div className='row'>
        <h3 className="text-primary">Available Products</h3>  

        {loading && <Loader/>}
        <h4 className="text-danger">{error}</h4>

        {/* map the products fetched from the API to the user interface */}

        {products.map((product)  => ( 
           <div className="col-md-3 justify-content-center mb-3">
          <div className="card shadow">
            <img 
            src={img_url + product.product_photo}
            alt="product name"
            className='product-img mt-3' />

            <div className="card-body">
              <h5 className="text-primary">{product.product_name}</h5>

              <p className="text-dark">{product.product_description.slice(0, 100)}...</p>

              <h4 className="text-warning">Kes {product.product_cost}</h4>
              <button className="btm btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})}>Purchase Now</button>
            </div>
          </div>
        </div>
        ))}

       
        
      </div>
    )
}

export default Getproducts;
 