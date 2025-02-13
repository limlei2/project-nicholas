import { useState, useEffect } from 'react';
import useAuth from "../authentication/useAuth";
import { useNavigate } from "react-router-dom";
import "../css/Profile.css"

export default function Profile() {

    const [boughtItems, setBoughtItems] = useState();
    const [soldItems, setSoldItems] = useState();
    const [sellItems, setSellItems] = useState();
    const [earnings, setEarnings] = useState();

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {

        const getSoldItems = async () => {
            try{
                await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/boughtitems/user/sold/${auth.auth._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(res => res.json())
                .then((res) => {
                    setSoldItems(res);
                    let earning = 0;
                    res.map(data => {
                        earning += data.price;
                    })
                    setEarnings(earning)
                })
            } catch (err) {
    
            }
        }
    
        const getBoughtItems = async () => {
            try{
                await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/boughtitems/user/${auth.auth._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(boughtitemsres1 => boughtitemsres1.json())
                .then((boughtitemsres) => {
                    setBoughtItems(boughtitemsres);
                })
            } catch (err) {
    
            }
        };
    
        const getItems = async () => {
            try{
                await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/items/user/${auth.auth._id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(itemsres1 => itemsres1.json())
                .then((itemsres) => {
                    setSellItems(itemsres);
                })
            } catch (err) {
    
            }
        }

        getBoughtItems();
        getItems();
        getSoldItems();
    }, []);

    const imageClick = async (id) => {
        
    }

    const purchasedImageClick = async (id) => {
        navigate("/receipt/"+id);
    }

    return (
        <div className="profilediv">
            <div className="profiledivheader">
                <h1>Your Profile</h1>
                <h2>Total All Time Earnings: CA${earnings}</h2>
            </div>
            <div className="solditemsdiv">
                <h1>Sold Items</h1>
                <div className="solditems">
                    {soldItems && soldItems.map(data => {
                        return(
                            <div className = "item">
                                <img src={data.file} onClick={(e)=> imageClick(data._id)}/>
                                <div className = "item_information">
                                    <h4>{data.itemname}</h4>
                                    <h3>CA${data.price}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="currentlylisteddiv">
                <h1>Currently Listed Items</h1>
                <div className="currentlylisted">
                    {sellItems && sellItems.map(data => {
                        return(
                            <div className = "item">
                                <img src={data.file} onClick={(e)=> imageClick(data._id)}/>
                                <div className = "item_information">
                                    <h4>{data.name}</h4>
                                    <h3>CA${data.price}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className="pastpurchasesdiv">
                <h1>Past Purchases</h1>
                <div className="pastpurchases">
                    {boughtItems && boughtItems.map(data => {
                        return(
                            <div className = "item">
                                <img src={data.file} onClick={(e)=> purchasedImageClick(data._id)}/>
                                <div className = "item_information">
                                    <h4>{data.itemname}</h4>
                                    <h3>CA${data.price}</h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
        </div>
        
    )
}