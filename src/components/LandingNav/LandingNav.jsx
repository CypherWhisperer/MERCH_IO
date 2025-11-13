import styles from "./Nav.module.scss"
import React, { useState,useEffect, useRef } from "react";
import { MotionConfig, motion } from "framer-motion";
import { Link } from "react-router-dom"

// DATA
import { landingPageSections, socialLinks} from "../../assets/data/data";
// ICONS
import { FaArrowRightLong, AiFillInstagram, IoLogoWhatsapp, FaXTwitter, FaFacebook } from "../../assets/icons/icons";

export default function Nav(){
    // STATE MANAGEMENT
    const [menuOpen, setMenuOpen] = useState(false);
    
    return(
        <header className={`${styles.nav_container} ${menuOpen ? styles.open : ""}`}>
            <Logo menuOpen={menuOpen}/>
            <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </header>
    )
}

// LOGO
function Logo({menuOpen}){
  return(
    <h1 className={`${styles.logo} ${menuOpen ? styles.open : ""}`}> M </h1>
  )
}

function LogoSocialsContainer({menuOpen}){
  
  // SOCIAL LINKS LOGOS
  function Logos({menuOpen}){    
      const icons = [FaFacebook, FaXTwitter, AiFillInstagram, IoLogoWhatsapp];
  
      const LandingSocialLogo = ({target, name, iconIndex }) => {
          return (
            <li className={`${styles.logo_container}`}>
              <a href={target} aria-label={name}>
                {/* This avoids pre-instantiating JSX elements with fixed keys, and makes mapping clearer.*/}
                {React.createElement(icons[iconIndex])}
              </a>
            </li>
          )
      }
  
      return(
          <div className={`${styles.social_links_container} ${menuOpen ? styles.open : ""}`} >
              <ul className={`${styles.social_links} ${menuOpen ? styles.open : ""}`}>
                  {socialLinks.map((link, index) => {
                      return(
                        <LandingSocialLogo key={link.id} name={link.name} target={link.target} iconIndex={index}/>
                      )
                  })}
              </ul>            
          </div>
      )    
  }

  return(
    <div className={`${styles.logo_socials_container} ${menuOpen ? styles.open : ""}`}>
      <Logos menuOpen={menuOpen}/>
    </div>
  )
}

function Logos({menuOpen}){    
    const icons = [FaFacebook, FaXTwitter, AiFillInstagram, IoLogoWhatsapp];

    const LandingSocialLogo = ({target, name, iconIndex }) => {
        return (
          <li className={`${styles.logo_container}`}>
            <a href={target} aria-label={name}>
              {/* This avoids pre-instantiating JSX elements with fixed keys, and makes mapping clearer.*/}
              {React.createElement(icons[iconIndex])}
            </a>
          </li>
        )
    }

    return(
        <div className={`${styles.navigation_logos} ${menuOpen ? styles.open : ""}`} >
            <ul className={styles.social_links}>
                {socialLinks.map((link, index) => {
                    return(
                      <LandingSocialLogo key={link.id} name={link.name} target={link.target} iconIndex={index}/>
                    )
                })}
            </ul>            
        </div>
    )    
}

function Navigation({menuOpen, setMenuOpen}){

  // ANIMATED HUMBURGER MENU
  function AnimatedHamburgerButton({setMenuOpen, menuOpen}){
    // VARIANTS
    const VARIANTS = {
      
      top: {
        open: {
          rotate: ["0deg", "0deg", "45deg"],
          top: ["20%", "50%", "50%"],
        },
        closed: {
          rotate: ["45deg", "0deg", "0deg"],
          top: ["50%", "50%", "20%"],
        },
      },
      
      middle: {
        open: {
          rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
          rotate: ["-45deg", "0deg", "0deg"],
        },
      },
      
      bottom: {
        open: {
          rotate: ["0deg", "0deg", "45deg"],
          bottom: ["20%", "50%", "50%"],
          left: "50%",
        },
        closed: {
          rotate: ["45deg", "0deg", "0deg"],
          bottom: ["50%", "50%", "20%"],
          left: "calc(50% + 10px)",
        },
      },
    };
    
    return (
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.button
          initial={false}
          animate={menuOpen ? "open" : "closed"}
          onClick={() => setMenuOpen((pv) => !pv)}
          className={`${styles.nav_button} ${menuOpen ? styles.open : ""}`}
        >
          <motion.span
            variants={VARIANTS.top}
            className={`${styles.stroke_1}`}
            style={{ y: "-50%", left: "50%", x: "-50%", top: "20%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className={`${styles.stroke_2}`}
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className={`${styles.stroke_3}`}
            style={{ x: "-50%", y: "50%", bottom: "20%", left: "calc(50% + 10px)", }}
          />
        </motion.button>
      </MotionConfig>
    );
  };

  // SECTION LINKS MENU
  function Menu({menuOpen}){    
      function LandingLink({target, name}){
          // Logic to tie the font size to the height of the parent
          // CSS/SCSS cannot compute containerHeight / childCount at runtime by itself.
          // Solution: Compute height with JS (or React) and set a CSS variable the 
          // children can use. Use clamp() to keep font within sensible bounds.
  
          //WARN: though this proved useless since setting that amount of height meant a big
          // font-size that is unusable on mobile
          const ref = useRef(null);
      
          useEffect(() => {
            const el = ref.current;
            if (!el) return;
            const update = () => {
              const h = el.clientHeight;
              const n = el.children.length || 1;
              const childH = Math.max(0, Math.floor(h / n));
              el.style.setProperty('--landing-nav-menu-link-height', `${childH}px`);
              el.style.setProperty('--landing-nav-menu-link-count', `${n}`);
            };
      
            update();
            const ro = new ResizeObserver(update);
            ro.observe(el);
            window.addEventListener('resize', update);
            return () => {
              ro.disconnect();
              window.removeEventListener('resize', update);
            };
          }, []);
  
          return(
              <li 
              //   ref={ref} 
                className={styles.link_container}
              >
                  <Link className={styles.link} to={target}> {name} </Link>
              </li>
          )
      }
      
      return(
          <div className={`${styles.navigation_container} ${menuOpen ? styles.open : ""}`} >
            <LogoSocialsContainer menuOpen={menuOpen}/> 
            
            <div className={`${styles.navigation_menu} ${menuOpen ? styles.open : ""}`} >  
              <ul className={styles.sections_links}>
                {landingPageSections.map((link) => {
                    return(
                        <LandingLink key={link.id} name={link.name} target={link.target} />
                    )
                })}
              </ul>
              <button className={`${styles.sign_up_cta} ${menuOpen ? styles.open : ""}`}> REGISTER NOW <FaArrowRightLong className={styles.arrow} /> </button>
            </div>
          </div>
      )
  }


  return (
    <nav className={`${styles.navigation} ${menuOpen ? styles.open : ""}`}>
      <div className={`${styles.secondary_nav} ${menuOpen ? styles.open : ""}`}>
        <Logo menuOpen={menuOpen}/>
        <AnimatedHamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <Menu menuOpen={menuOpen}/>
    </nav>
  );
};

