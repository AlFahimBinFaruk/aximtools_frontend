const ProductDetails = ({ name, price, thumbURL, minQty, availQty, shortDesc }) => {
  return (
    <div className="product-details d-flex justify-content-evenly align-items-center flex-wrap">
      {/* img */}
      <div className="product-image ">
        <img src={thumbURL} className='object-contain' width={250} height={250} alt="" />
      </div>
      {/* details */}
      <div className="details col-lg-6">
        <h6 className="text-dark">{name}</h6>
        <h6 className="text-muted"><small>{shortDesc}</small></h6>
        <h6>
          <small className="text-dark">Per unit price:
            <span className="text-danger">${price}</span>
          </small>
        </h6>
        <h6>
          <small className="text-dark">Minimum order quantity:
            <span className="text-danger">{minQty}</span>
          </small>
        </h6>
        <h6>
          <small className="text-dark">Available order quantity:
            <span className="text-danger">{availQty}</span>
          </small>
        </h6>
      </div>
    </div>
  )
}

export default ProductDetails