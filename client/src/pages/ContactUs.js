import "../css/ContactUs.css"
import  {useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

function ContactUs(){

    const navigate = useNavigate();

    const submit = () => {
        toast.success("Thank you for your suggestions/concerns. We will contact you through the email shortly.")
        navigate("/");
    }

    return(
        <div className="contactus_div">
            <h1>
                Contact Us
            </h1>
            <form className="contact_form">
                <div className="contact_item">
                    <input
                        type="email"
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="contact_item">
                    <textarea
                        placeholder="Suggestions/Concerns"
                    />
                </div>
                <input
                    type="submit"
                    onClick={submit}
                />
            </form>
        </div>
        
    )
}

export default ContactUs;