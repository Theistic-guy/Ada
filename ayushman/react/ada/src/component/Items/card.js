import Aos from "aos";
import Modal from "../UI/modal";
import { Fragment, useEffect, useState,useContext } from "react";
import { CartContext } from "../Pages/CartContext";
import { memo ,useMemo } from "react";

const Card = memo(({ data }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const [modal, setModal] = useState(false);
  const { cartItems, addToCart, removeFromCart,decreaseQuantity } = useContext(CartContext);


  const HandleModal = () => {
    setModal(!modal);
  };

  const quantity = useMemo(() => {
    const item = cartItems.find((item) => item.ASIN === data.ASIN);
    return item ? item.quantity : 0;
  }, [cartItems, data.ASIN]);

  const  handleAdd = () => {
    addToCart(data);
  };

  const handleRemove = () => {
    decreaseQuantity(data.ASIN);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={"full" + i} className="star">
            &#9733;
          </span>
        ))}
        {halfStar && (
          <span key="half" className="star">
            &#9733;
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={"empty" + i} className="star empty">
            &#9733;
          </span>
        ))}
      </>
    );
  };

  return (
    <Fragment>
      <div className={"item-card"} data-aos="fade-up">
        <div className="product-image-wrapper">
          <img
            className={"product-image img-fluid"}
            src={`${data.Images[0]}`}
            alt={data.title}
            onClick={HandleModal}
          />
        </div>

        <div className={"item-card__information"}>
          <div className={"pricing"}>
            <span>₹{data.salePrice}</span>
            <small>
              <strike>₹{data.listPrice}</strike>
            </small>
          </div>
          <div className={"title"}>
            <h3>{data.title}</h3>
          </div>
        </div>

        {quantity < 1 ? (
          <button className={"cart-add"} onClick={handleAdd}>
            <span>Add to Cart</span>
            <img
              src="shopping-cart.png"
              width={20}
              height={20}
              alt="Cart Icon"
            />
          </button>
        ) : (
          <div className="cart-addon">
            <button onClick={handleRemove}>
              <span>-</span>
            </button>
            <span>{quantity}</span>
            <button onClick={handleAdd}>
              <span>+</span>
            </button>
          </div>
        )}

        {modal && (
          <Modal onClose={HandleModal}>
            <div className="modal-content">
            <div className="item-card__modal">
              <div className="img-wrap">
                <img
                  className={"img-fluid"}
                  src={`${data.Images[0]}`}
                  alt={data.title}
                />
              </div>

              <div className="meta">
                <h3>{data.title}</h3>
                <div className={"pricing"}>
                  <span>₹{data.salePrice}</span>
                  <small>
                    <strike>₹{data.listPrice}</strike>
                  </small>
                </div>

                <p className="product-description">
                {data.bookDescription ? data.bookDescription : "No description available"}
                </p>

                <div className="star-rating">
                  {renderStars(data.stars || 0)}
                  <span className="rating-count">
                    {data.ratings ? `${data.ratings} ratings` : "No ratings"}
                  </span>
                </div>

                <div className="features-overview-wrapper">
                  {data.featureBullets?.length > 0 && (
                    <div className="features">
                        <h4>Features</h4>
                        <ul>
                        {data.featureBullets.map((bullet, index) => (
                            <li key={index}>{bullet}</li>
                        ))}
                        </ul>
                    </div>
                    )}

                  {data.productOverview && Object.keys(data.productOverview).length > 0 && (
                    <div className="product-overview">
                        <h4>Product Overview</h4>
                        <ul>
                        {Object.entries(data.productOverview).map(([key, value], index) => (
                            <li key={index}>
                            <strong>{key}:</strong> {value}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
              </div>
            </div>

            <div className="AddModal">
              {quantity < 1 ? (
                <button
                  className={"cart-add card-add__modal"}
                  onClick={handleAdd}
                >
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="cart-addon card-addon__modal" id="modal_card">
                  <button onClick={handleRemove}>
                    <span>-</span>
                  </button>
                  <span>{quantity}</span>
                  <button onClick={handleAdd}>
                    <span>+</span>
                  </button>
                </div>
              )}
            </div>
            </div>
          </Modal>
        )}
      </div>
    </Fragment>
  );
});

export default Card;
