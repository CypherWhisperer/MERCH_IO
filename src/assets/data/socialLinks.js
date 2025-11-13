// This is a file for managing all things to do with the social links 

// IMPORTING ASSETS
// import {AiFillInstagram, IoLogoWhatsapp, FaXTwitter, FaFacebook} from "../../assets/icons/icons"

// since we don’t need to instantiate the icons immediately (e.g., want more control or lazy rendering)
// we'll store the component reference instead of the JSX element as below
// React’s JSX transpiler (Babel) automatically handles this. The key rule is that the variable name must be capitalized

export const socialLinks = [
    {id: 0, name: "facebook",  target: "#"},
    {id: 1, name: "x",         target: "#"},
    {id: 2, name: "instagram", target: "#"},
    {id: 3, name: "whatsApp",  target: "#"},
]
