import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../css/Receipt.css"

function Receipt(){

    const id = useParams();
    
    const [boughtItem, setBoughtItem] = useState({});

    useEffect(() => {
        getBoughtItem(id);
    }, [])

    const getBoughtItem = async (id) => {
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/boughtitems/${id.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                if(res[0]){
                    setBoughtItem(res[0]);
                }
            })
        } catch (err){

        }
    }
    return(
        <div className="receipt">
            <h1 className="thankyouorder">Thank You for Your Order!</h1>
            <div className="receipt_components">
                <div className="leftside">
                    <div>
                        <h2>Your order is confirmed</h2>
                        <h3>You'll receive an email with your order number shortly</h3>
                        <h3>Purchase Date: {new Date(boughtItem.createdAt).toDateString()}</h3>
                    </div>
                    <div className="receipt_customerinfo">
                        <h2 className="custinfo">Customer information</h2>
                        <div className="shippinginfo">
                            <div className="contactinfo_div">
                                <h3>Contact information</h3>
                                <h4>{boughtItem.email}</h4>
                            </div>
                            <div className="shippingdetails_div">
                                <h3>Shipping address</h3>
                                <h4>{boughtItem.address}</h4>
                                <h4>{boughtItem.city}</h4>
                                <h4>{boughtItem.country}</h4>
                                <h4>{boughtItem.postal}</h4>
                            </div>
                        </div>
                        <div className="paymentinfo">
                            <h3>Payment method</h3>
                            <h4>Ending with {new String(boughtItem.cardNumber).slice(-4)} 
                                - CA${(Math.round(boughtItem.paid * 100) / 100).toFixed(2)}</h4>
                        </div>
                    </div>
                </div>
                <div className="rightside">
                    <div className="receipt_itemdisplay">
                        <img src={boughtItem.file}/>
                        <div className="receipt_itemname">
                            <h3>{boughtItem.itemname}</h3>
                            <h4>Size {boughtItem.size}</h4>
                            <h3>CA${(Math.round(boughtItem.price * 100) / 100).toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="receiptprices_div">
                        <div className="receipt_prices">
                            <h3>Subtotal</h3>
                            <h3>CA${(Math.round(boughtItem.price * 100) / 100).toFixed(2)}</h3>
                        </div>
                        <div className="receipt_prices">
                            <h3>Shipping</h3>
                            <h3>CA$5.00</h3>
                        </div>
                        <div className="receipt_prices">
                            <h3>Taxes</h3>
                            <h3>CA${(Math.round(boughtItem.tax * 100) / 100).toFixed(2)}</h3>
                        </div>
                    </div>
                    <div className="receipt_totalprice">
                        <h2>Total</h2>
                        <h2>CA${(Math.round(boughtItem.paid * 100) / 100).toFixed(2)}</h2>
                    </div>
                </div>
            </div>
            
            
        </div>
    )
}

export default Receipt;