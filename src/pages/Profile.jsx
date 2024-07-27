import { useEffect, useState } from "react";
import { auth, db } from "../firebase.config";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  where,
  orderBy,
  deleteDoc,
  query,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import ListingItem from "../components/ListingItem";
import { toast } from "react-toastify";
import { BsArrowRight } from "react-icons/bs";
import { BiHome } from "react-icons/bi";

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const [listings, setListings] = useState(null);

  const [changeDetails, setChangeDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { name, email } = formData;

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");

      const q = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);

      const listings = [];

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
  }, [auth.currentUser.uid]);

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          name,
        });
      }
    } catch (error) {
      toast.error("Could not update profile details");
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Successfully deleted listing");
    }
  };

  const onEdit = async (listingId) => navigate(`/edit-listing/${listingId}`);

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState);
            }}
          >
            {changeDetails ? "done" : "change"}
          </p>
        </div>

        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? "profileName" : "profileNameActive"}
              disabled={!changeDetails}
              value={name}
              onChange={handleChange}
            />
            <input
              type="text"
              id="email"
              className={
                !changeDetails ? "profileEmail" : "profileEmailActive "
              }
              disabled={!changeDetails}
              value={email}
              onChange={handleChange}
            />
          </form>
        </div>

        <Link to="/create-listing" className="createListing">
          <BiHome />
          <p>Sell or rent your home</p>
          <BsArrowRight />
        </Link>

        {!isLoading && listings?.length > 0 && (
          <>
            <p className="listingsText">Your Listings</p>
            <ul>
              {listings.map((item) => (
                <ListingItem
                  key={item.id}
                  listing={item.data}
                  id={item.id}
                  onDelete={() => onDelete(item.id)}
                  onEdit={() => onEdit(item.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
};

export default Profile;
