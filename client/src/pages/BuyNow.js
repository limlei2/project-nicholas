import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from "../authentication/useAuth";
import { toast } from "react-toastify"; 
import "../css/BuyNow.css";

function BuyNow() {

    const [item, setItem] = useState({});
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");
    const [postal, setPostal] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState();
    const [cardMonth, setCardMonth] = useState();
    const [cardYear, setCardYear] = useState();
    const [cardCVV, setCardCVV] = useState();

    let navigate = useNavigate();
    const { id } = useParams();
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
            })
        } catch (err){

        }
    }

    const validateInput = () => {
        if(!firstName || !lastName || !address || !postal || !country || !city || !email ){
            return false;
        }
        if(!cardName || !cardNumber || !cardCVV || !cardMonth || !cardYear){
            return false;
        }
        return true;
    }

    async function deleteItem(id) {
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/items/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then(res => {
                if(res._id){
                    return true;
                }
                return false;
            })
        } catch (err) {

        }
    }

    async function submit(e) {
        e.preventDefault();
        if(!validateInput()){
            toast.error("Please fill in all the required information!")
            return;
        }
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/boughtitems/`, {
                method: "POST",
                body: JSON.stringify({
                    itemname: item.name,
                    price: item.price,
                    tax: item.price * 0.13,
                    paid: item.price * 1.13 + 5,
                    size: item.size,
                    buyerId: auth.auth._id,
                    sellerId: item.ownerId,
                    file: item.file,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    postal: postal,
                    country: country,
                    city: city,
                    email: email,
                    cardName: cardName,
                    cardNumber: cardNumber,
                    cardCVV: cardCVV,
                    cardMonth: cardMonth,
                    cardYear: cardYear
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                if(res._id == null){
                    setFirstName("");
                    setLastName("");
                    setAddress("");
                    setCountry("");
                    setPostal("");
                    setCity("");
                    setEmail("");
                    setCardName("");
                    setCardNumber();
                    setCardCVV();
                    setCardMonth();
                    setCardYear();
                    document.getElementById("form_buynow").reset();
                    toast.error("An unexpected error has occured, please try again");
                } else {
                    setFirstName("");
                    setLastName("");
                    setAddress("");
                    setCountry("");
                    setPostal("");
                    setCity("");
                    setEmail("");
                    setCardName("");
                    setCardNumber();
                    setCardCVV();
                    setCardMonth();
                    setCardYear();
                    toast.success("Purchase Successful!");
                    deleteItem(item._id);
                    navigate('/receipt/'+ res._id);
                }
            })
        } catch (err){
            setFirstName("");
            setLastName("");
            setAddress("");
            setCountry("");
            setPostal("");
            setCity("");
            setEmail("");
            setCardName("");
            setCardNumber();
            setCardCVV();
            setCardMonth();
            setCardYear();
            document.getElementById("form_buynow").reset();
            toast.error("An unexpected error has occured, please try again");
        }
    }

    return (
        <div>
            <h1 className="checkouttext">Checkout Page</h1>
            <div className="buynow">
                <div className="buynowform">
                    <form id="form_buynow">
                        <h1>Contact Information</h1>
                        <input 
                            type="email" 
                            required 
                            placeholder="Email"
                            onChange={(e)=>{setEmail(e.target.value)}}/>
                        <h1>Shipping Address</h1>
                        <div className="name">
                            <input 
                                type="text" 
                                required 
                                placeholder="First Name"
                                onChange={(e)=>{setFirstName(e.target.value)}}/>
                            <input 
                                type="text" 
                                required 
                                placeholder="Last Name"
                                onChange={(e)=>{setLastName(e.target.value)}}/>
                        </div>
                        <input 
                            type="text" 
                            required 
                            placeholder="Address"
                            onChange={(e)=>{setAddress(e.target.value)}}/>
                        <input 
                            type="text" 
                            required 
                            placeholder="City"
                            onChange={(e)=>{setCity(e.target.value)}}/>
                        <input 
                            type="text" 
                            required 
                            placeholder="Postal Code"
                            onChange={(e)=>{setPostal(e.target.value)}}/>
                        <input 
                            type="text" 
                            required 
                            placeholder="Country"
                            onChange={(e)=>{setCountry(e.target.value)}}/>
                        <h1>Card Details</h1>
                        <div>
                            <input 
                                type="text" 
                                required 
                                placeholder="Name on Card"
                                onChange={(e)=>{setCardName(e.target.value)}}/>
                            <input 
                                type="text" 
                                required 
                                placeholder="Card Number"
                                onChange={(e)=>{setCardNumber(e.target.value)}}/>
                            <div className="CVVExpiry">
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="CVV"
                                    onChange={(e)=>{setCardCVV(e.target.value)}}/>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="MM"
                                    onChange={(e)=>{setCardMonth(e.target.value)}}/>
                                <input 
                                    type="text" 
                                    required 
                                    placeholder="YY"
                                    onChange={(e)=>{setCardYear(e.target.value)}}/>
                            </div>
                            
                        </div>
                        <input type="submit" onClick={submit} />
                    </form>
                </div>
                <div className="itemdisplay">
                    <h1>In Your Bag</h1>
                    <div className="pricesdisplay">
                        <div className="itemdisplay_price">
                            <h3>Subtotal</h3>
                            <h3>CA${(Math.round(item.price * 100) / 100).toFixed(2)}</h3>
                        </div>
                        <div className="itemdisplay_price">
                            <h3>Estimated Shipping</h3>
                            <h3>CA$5.00</h3>
                        </div>
                        <div className="itemdisplay_price">
                            <h3>Estimated Tax</h3>
                            <h3>CA${(Math.round(item.price * 0.13 * 100) / 100).toFixed(2)}</h3>
                        </div>
                        <div className="itemdisplay_totalprice">
                            <h2>TOTAL</h2>
                            <h2>CA${(Math.round((item.price * 1.13 + 5) * 100) / 100).toFixed(2)}</h2>
                        </div>
                    </div>
                    <div className="itemdisplay_item">
                        <img src={item.file}/>
                        <div className="itemdisplay_iteminfo">
                            <h3>{item.name}</h3>
                            <h4>Size: {item.size}</h4>
                            <h4>Qty: 1 @CA${(Math.round(item.price * 100) / 100).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default BuyNow;