import React from "react";
import { Link, useParams, useLocation,useNavigate } from "react-router-dom";
import { getVan, rentVan } from "../../api";
import { useAuth } from "../../context/AuthContext"

export default function VanDetail() {
  const [van, setVan] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVan(id);
        setVan(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    loadVans();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>There was an error: {error.message}</h1>;
  }

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  async function handleVanRental() {
    if (!user) {
      navigate("/login", {
        state: { message: "You must log in first", from: location.pathname },
        replace: true,
      });
    } else {
      try {
        await rentVan(van.id, user.uid);
        alert("Van is succesfully rented by you!")
      } catch (error) {
        console.error("Failed to rent van:", error.message);
      }
    }
  }

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr; <span>Back to {type} vans</span>
      </Link>

      {van && (
        <div className="van-detail">
          <img src={van.imageUrl} />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button onClick={handleVanRental} className="link-button">Rent this van</button>
        </div>
      )}
    </div>
  );
}
