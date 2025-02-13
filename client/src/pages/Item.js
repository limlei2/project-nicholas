import "../css/Item.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import useAuth from "../authentication/useAuth";

function Item(){

    const [item, setItem] = useState({});
    const [ownerName, setOwnerName] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        getItem(id);
    }, []);

    const getItem = async (id) => {
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/items/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                setItem(res[0]);
                getSellerName(res[0].ownerId);
            })
        } catch (err){

        }
    }

    const getSellerName = async (ownerid) => {
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/users/${ownerid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                setOwnerName(res[0].email);
            })
        } catch (err){

        }
    }

    function buynowclick() {
        if(Object.keys(auth.auth).length === 0){
            toast.error("You are currently not logged in. Please login first.");
            navigate("/login");
        } else {
            navigate("/buynow/"+id);
        }
    }

    return(
        <div className="item_display">
            <div className="item_image">
                <h1>{item.name}</h1>
                <h2>Size US{item.size}</h2>
                <img src={item.file}/>
            </div>
            
            <div className="item_description">
                <h3>Sold by Seller: {ownerName}</h3>
                <h3>Price: CA${item.price}</h3>
                <button onClick={() => buynowclick()}>
                    Buy Now
                </button>
            </div>
        </div>
    )
}

export default Item;