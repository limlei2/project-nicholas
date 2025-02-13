import { useState } from "react";
import useAuth from '../authentication/useAuth';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../css/Sell.css";

export default function Sell() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [size, setSize] = useState(0);
    const [image, setImage] = useState({ myFile : ""});

    const navigate = useNavigate();

    const auth = useAuth();

    const handleFileSubmit = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setImage( {...image, myFile : base64} );
    }

    async function submit(e){
        e.preventDefault();
        const userID = auth.auth._id;
        console.log(name, price, size, image, userID);
        try{
            await fetch(`${process.env.REACT_APP_PUBLIC_BACKEND}/api/items/`, {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    price: price,
                    size: size,
                    file: image.myFile,
                    ownerId: userID
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
            .then((res) => {
                console.log(res);
                if(res._id == null){
                    setName("");
                    setPrice("");
                    setSize("");
                    toast.error("Item failed to submit. Please try again")
                } else {
                    toast.success("Successfully submitted item into the marketplace!");
                    setName("");
                    setPrice("");
                    setSize("");
                    navigate('/');
                }
            })
            
        } catch (err) {

        }
    }

    return (
        <div className = "sell">
            <h1>
                Put an Item up for Sale
            </h1>
            <form>
                <div className="txt_field">
                    <input 
                        type="text" 
                        onChange={(e)=>{setName(e.target.value)}} 
                        placeholder="Name of Product" 
                        required 
                        className="userinputs"
                    />
                </div>
                <div className="txt_field">
                    <input 
                        type="text" 
                        onChange={(e)=>{setPrice(e.target.value)}} 
                        placeholder="Price of Product" 
                        required 
                        className="userinputs"
                    />
                </div>
                <div className="txt_field">
                    <input 
                        type="text"
                        onChange={(e)=>{setSize(e.target.value)}} 
                        placeholder="Size of Product" 
                        required 
                        className="userinputs"
                    />
                </div>
                <input
                    type="file"
                    name="myImage"
                    onChange={(event) => {
                        handleFileSubmit(event);
                    }}
                />
                <input type="submit" onClick={submit} />
            </form>
        </div>
        
    )
}

function convertToBase64(file){
    return new Promise((resolve, reject) => {
        const filereader = new FileReader();
        filereader.readAsDataURL(file);
        filereader.onload = () => {
            resolve(filereader.result)
        };
        filereader.onerror = (err) => {
            reject(err);
        }
    })
}