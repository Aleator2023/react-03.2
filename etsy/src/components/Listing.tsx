import React from 'react';

interface MainImage {
  url_570xN?: string;
}

interface Item {
  listing_id?: number;
  url?: string;
  MainImage?: MainImage;
  title?: string;
  currency_code?: string;
  price?: string;
  quantity?: number;
}

interface ListingProps {
  items: Item[];
}

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  const itemList = items.map((item) => {
    const { listing_id, url, MainImage, title, currency_code, price, quantity } = item;
    const truncatedTitle = title && title.length > 50 ? `${title.substring(0, 50)}…` : title || "No Title";
    let formattedPrice = "Not Available";

    switch (currency_code) {
      case 'USD':
        formattedPrice = `$${price}`;
        break;
      case 'EUR':
        formattedPrice = `€${price}`;
        break;
      default:
        if (price && currency_code) {
          formattedPrice = `${price} ${currency_code}`;
        }
    }

    let quantityClass = 'level-high';
    if (quantity && quantity <= 10) {
      quantityClass = 'level-low';
    } else if (quantity && quantity <= 20) {
      quantityClass = 'level-medium';
    }

    return {
      listing_id: listing_id || "unknown-id",
      url: url || "#",
      imgUrl: MainImage?.url_570xN || "placeholder-image-url",
      title: truncatedTitle,
      price: formattedPrice,
      quantityClass: quantityClass,
      quantityText: quantity ? `${quantity} left` : "Not Available"
    };
  });

  return (
    <div className="item-list">
      {itemList.map(({ listing_id, url, imgUrl, title, price, quantityClass, quantityText }) => (
        <div className="item" key={listing_id}>
          <div className="item-image">
            <a href={url}>
              <img src={imgUrl} alt={title} />
            </a>
          </div>
          <div className="item-details">
            <p className="item-title">{title}</p>
            <p className="item-price">{price}</p>
            <p className={`item-quantity ${quantityClass}`}>{quantityText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;
