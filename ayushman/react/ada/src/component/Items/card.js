import Aos from "aos";
import Modal from "../UI/modal";
import { Fragment, useEffect, useState } from "react";

const Card = ({ data }) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const [modal, setModal] = useState(false);
  const [counter, setCounter] = useState(0);

  const IncreaseCounter = () => {
    setCounter(counter + 1);
  };
  const DecreaseCounter = () => {
    if (counter === 0) {
      return;
    }
    setCounter(counter - 1);
  };

  const HandleModal = () => {
    setModal(!modal);
  };

  // Render stars dynamically: filled and empty stars (up to 5)
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

        {counter < 1 ? (
          <button className={"cart-add"} onClick={IncreaseCounter}>
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
            <button onClick={DecreaseCounter}>
              <span>-</span>
            </button>
            <span>{counter}</span>
            <button onClick={IncreaseCounter}>
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
              {counter < 1 ? (
                <button
                  className={"cart-add card-add__modal"}
                  onClick={IncreaseCounter}
                >
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="cart-addon card-addon__modal" id="modal_card">
                  <button onClick={DecreaseCounter}>
                    <span>-</span>
                  </button>
                  <span>{counter}</span>
                  <button onClick={IncreaseCounter}>
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
};

export default Card;
