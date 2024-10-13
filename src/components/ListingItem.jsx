import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { BiSolidEditAlt } from "react-icons/bi";
import { BiBed } from "react-icons/bi";
import { GiBathtub } from "react-icons/gi";
import { Link } from "react-router-dom";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  console.log(listing);
  return (
    <li className="categoryListing">
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        {listing?.imgUrls?.[0] ? (
          <img
            src={listing.imgUrls[0]}
            alt={listing.name}
            className="categoryListingImg"
          />
        ) : (
          <div>No image is available</div>
        )}

        <div className="categoryListingDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>

          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>

          <div className="categoryListingInfoDiv">
            <div className="icon-text">
              <BiBed />
              <p className="catgoryListingInfoText">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : `1 Bedroom`}
              </p>
            </div>
            <div className="icon-text">
              <GiBathtub />
              <p className="catgoryListingInfoText">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : `1 Bathroom`}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {onDelete && (
        <MdDeleteForever
          className="removeIcon"
          fill="rgb(231,76, 60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && (
        <BiSolidEditAlt className="editIcon" onClick={() => onEdit(id)} />
      )}
    </li>
  );
};

export default ListingItem;
