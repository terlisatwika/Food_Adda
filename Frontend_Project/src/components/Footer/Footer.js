import React from "react";

const Footer = () => {
    return(
    <>
    <footer className="bg-dark text-light py-3 main-footer">
        <div className=" footer-data container-fluid row text-center my-3 ">
            <div className="established col my-2">
                <h2>Established</h2>
                <p>2024, India</p>
            </div>
            <div className="services col my-2">
                <h2>Services</h2>
                <p>All types foods delivery like:</p>
                <ul className="text-middle list-unstyled">
                    <li> Veg</li>
                    <li> Non-Veg</li>
                    <li> Fast-food</li>
                    <li> Sweets</li>
                </ul>
            </div>
            <div className="contact col my-2">
                <h2>Contact Us</h2>
                <p>foodadda@gmail.com</p>
            </div>
        </div>
        <p className="text-center py-2">Copy Right @ Food Adda</p>
    </footer>
    </>
    )
}
export default Footer;
