import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import React from "react";

// DATA
import { footerData, contacts, socialLinks } from '../../assets/data/data'
// ICONS
import { FaArrowRightLong, AiFillInstagram, IoLogoWhatsapp, FaXTwitter, FaFacebook,FaPhone, IoMdMail } from "../../assets/icons/icons";

export default function Footer(){
    return(
        <footer className={styles.footer_container}>
          <MerchIo />
          <div className={styles.footer_content_wrapper}>
            <ul className={styles.footer_content}>
              <FooterLinks />
              <li> <Contacts /> </li>
            </ul>
            <SocialLinks />
          </div>
        </footer>        
    )
}

function FooterLinks(){
    return(
        <>
          {footerData.map((item) => {
            return(
              <li key={item.id} className={styles.links_title}>
                  <h4>{item.name}</h4>
                  <ul className={styles.links_container}>
                      {item.links.map((link) => {
                          return (
                            <li key={link.id}>
                              <Link to={link.target} className={styles.link}> {link.name} </Link>
                            </li>
                          )
                      })}
                  </ul>
              </li>
            )
          })}
        </>
    )
}

function Contacts(){
    const icons = [FaPhone, IoMdMail];

    return (
        <ul className={styles.contacts_container}>
            <h4>CONTACTS</h4>
            {contacts.map((contact, iconIndex) => {
                return(
                  //TODO: handle the functionality on button click - and the respective states, e.g:
                  //  - opening the right app
                  //  - Copying to clipboard
                  //  - both
                  //  - Prompt User on a modal
                  <button key={contact.id} className={styles.contact}>   
                    {React.createElement(icons[iconIndex])}                                     
                    {contact.contact}
                  </button>
                )
            })}
        </ul>    
    )
}

function SocialLinks() {
    const icons = [FaFacebook, FaXTwitter, AiFillInstagram, IoLogoWhatsapp];

    return (
        <ul className={styles.social_links_container}>
            <li className={styles.separator} />
            <li className={styles.links}>
                {socialLinks.map((link, iconIndex) => {
                    return(
                        <a key={link.id} href={link.target} aria-label={link.name}> 
                          {/* This avoids pre-instantiating JSX elements with fixed keys, and makes mapping clearer.*/}
                          {React.createElement(icons[iconIndex])}
                        </a>
                    )
                })}
            </li>
            <li> <small> &copy; MERCH IO 2025, all rights reserved </small> </li>
        </ul>
    )
}

function MerchIo(){
    return (
        <div className={styles.merch_io}>
            <svg
              viewBox="0 0 1250 220"
              preserveAspectRatio="xMidYMid slice"
              className="bg-word"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
              >
                MERCH IO
              </text>
            </svg>
        </div>
    )
}