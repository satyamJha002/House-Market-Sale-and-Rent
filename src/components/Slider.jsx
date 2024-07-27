import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { db } from "../firebase.config";
import Spinner from "./Spinner";

const Slider = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setIsLoading(false);
    };
    fetchListings();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended</p>

        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map((item) => (
            <SwiperSlide
              key={item.id}
              onClick={() => navigate(`/category/${item.data.type}/${item.id}`)}
            >
              <div
                style={{
                  background: `url(${item.data.imgUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                  width: "100%",
                  height: "300px",
                }}
                className="swiperSlideDiv"
              >
                <p className="swiperSlideText">{item.data.name}</p>
                <p className="swiperSlidePrice">
                  ${item.data.discountedPrice ?? item.data.regualarPrice}{" "}
                  {item.data.type === "rent" && "/ month"}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
