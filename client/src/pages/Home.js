import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../authentication/useAuth"
import "../css/Home.css";

function Home () {

    const auth = useAuth();
    let navigate = useNavigate();
    const [allImages, setAllImages] = useState();

    const imageClick = (id) => {
        navigate('/item/'+id);
    }

    useEffect(() => {
        getImages();
        
    }, [])

    const getImages = async () => {
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/items/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                console.log(res);
                setAllImages(res);
            })
        } catch (err){

        }
    }

    return (
        <div className = "homepage">
            <div className = "welcome_message">
                <h1>Welcome to Project Nicholas!</h1>
                { Object.keys(auth.auth).length === 0 ? (
                    <h1>You are currently not logged in.</h1>
                ) : (
                    <h1>You are logged in using the email {auth.auth.email}.</h1>
                )}
            </div>
            <div className="marketplace_header">
                <h1>Marketplace</h1>
            </div>
            <div className = "items">
                {allImages && allImages.map(data => {
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
    );
};

export default Home;