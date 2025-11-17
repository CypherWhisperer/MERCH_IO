import styles from './Nav.module.scss';

import { Link } from "react-router-dom";
import { useState, useRef } from 'react';

// DATA
import { dropDowns } from "../../assets/data/mainNavLinks";
// ICONS
import { AiFillHome, FaSearch, FaCartShopping, FaBell, FaUser, FaGear, RiArrowDownSLine,HiMenu, IoClose } from "../../assets/icons/icons";
// HOOKS
import { useIsMobile, useScrollDirection } from "../../assets/hooks/hooks.js"

export default function Nav(){
    const [hoveredDropDown, setHoveredDropDown] = useState(null);
    const [headerHovered, setHeaderHovered] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);    
    const hoverTimout = useRef(null);
    const isMobile = useIsMobile(1080);

    return(
        <header 
          className={`${styles.nav}`}          
          onMouseLeave={() => {
            hoverTimout.current = setTimeout(() => {
              setHeaderHovered(false);
              setHoveredDropDown(null);  //resetting the drop down when mouse leaves header entirely
            }, 285); // small delay
          }}
          onMouseEnter={() => {
            clearTimeout(hoverTimout.current);
            setHeaderHovered(true);
          }}
        >
            <nav className={styles.main_navigation}>
              <h1 className={styles.logo} >M</h1>
              {isMobile
                ? (
                    <>
                      <MobileMenuIcon 
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                      />
  
                      <MobileNavigation />
                    </>
                )
                : (
                  <>
                    <DropDowns 
                      // Each dropdown (li) needs a way to tell the parent which one is being hovered, 
                      // so that the parent can show its content and toggle the arrow.                
                      hoveredDropDown={hoveredDropDown}
                      setHoveredDropDown={setHoveredDropDown}
                    />

                    <DesktopNavigation />
                  </>
                )
              }
            </nav>          

            <div className={`${styles.drop_down_wrapper} ${hoveredDropDown ? styles.expanded : ''}`}>
              {/*
                 * This wrapper will help handle the transition animation - since we are using flex: 1 for the header
                 * Animating height directly from auto → 0 or vice versa is tricky.
                 * We’ll use a max-height trick and CSS transitions for smoothness.
              */}

              {isMobile
                ? (
                      <MobileDropDownMenu menuOpen={menuOpen}/> 
                  )
                
                : (headerHovered && hoveredDropDown && 
                    // * Dropdown content shows only if header is hovered and some dropdown is active 
                    // * For Desktop and probably some Tablet, this will display the drop down links
                    // * For Mobile screens, this portion will be occupied by the drop down menu
                    <> 
                       {/* 
                         * Dynamically checking which of the drop downs is currently hovered 
                         * This ensures the dropdown content shows only when a specific dropdown is hovered, and hides when none is. 
                         * the `|| []` ensures that `.map()` never breaks */}
                      <DropDownContent 
                        links={dropDowns.find((object) => object.name === hoveredDropDown)?.dropDownLinks || []} 
                        hoveredDropDown={hoveredDropDown} />
                    </>
                  )
              }
            </div>
            <div className={styles.svgs_container}>
              <BorderRadiusSvg isTopRight={true}  svgClassName={styles.border_radius_svg}/>
              <BorderRadiusSvg isTopRight={false} svgClassName={styles.border_radius_svg}/> 
            </div>
        </header>        
    )
}

function BorderRadiusSvg({isTopRight, dimension, svgClassName}){
  return(
    <svg
      viewBox="0 0 26.458 26.458"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClassName}
    >
      <path        
        width={dimension}
        height={dimension}
        // strokeWidth={0.07}
        d={isTopRight 
          ? "M0 0 L0 26.4583 C0 11.8458 11.8458 0 26.4583 0 L0 0 Z" 
          : "M 26.458333,0 H 0 c 14.612534,0 26.458333,11.845799 26.458333,26.458333 z" 
        }
      />        
    </svg>
  )
}

function DropDowns({hoveredDropDown, setHoveredDropDown}) {
    return(
        <ul className={styles.drop_downs}>
            {dropDowns.map((dropDown) => {
                return(
                    <DropDown 
                      key={dropDown.id}
                      target={dropDown.target}
                      name={dropDown.name}
                      hoveredDropDown={hoveredDropDown}
                      setHoveredDropDown={setHoveredDropDown}
                      hasDropDown={dropDown.hasDropDown}
                    />
                )
            })}
        </ul>
    )
}

function DropDown({hoveredDropDown, setHoveredDropDown, target, name, hasDropDown}) {
    const isHovered = hoveredDropDown == name; // returns a boolean

    // When you hover a dropdown, it tells the parent “Hey, I’m hovered”.
    // When you leave, it resets.
    // Each dropdown checks isHovered to decide which arrow to show.
    return(
      <li 
        className={styles.drop_down}
        onMouseEnter={() => setHoveredDropDown(name)}
        // onMouseLeave={() => setHoveredDropDown(null)}
      >
        <Link to={target}> {name} </Link>
        {/* {hasDropDown && */}
          <span className={styles.arrow_wrapper}>
              {hasDropDown &&
                <RiArrowDownSLine className={`${styles.arrow} ${isHovered ? styles.rotated : ''}`}/> 
              }
          </span>
        {/* } */}
      </li>
    )
}

function DropDownContent({links, hoveredDropDown}){
    return(
      <div className={` ${styles.drop_down_content} ${hoveredDropDown ? styles.visible  : ''}`}>
        <ul className={styles.drop_down_links}>
            {links.map((link) => {
                return(
                    <li key={link.id} className={styles.drop_down_link}>
                        <Link to={link.target}>{link.name}</Link>
                    </li>
                )
            })}
        </ul>
      </div> 
    )
}

function DesktopNavigation(){
  return(
    // NOTE: =========== DESKTOP LAYOUT ===============
      <ul className={styles.navigation_desktop}>
        <li>
          <div className={`${styles.search_bar}`}>
            <input type="text" name="search" id="search" placeholder="Search for a product" />
            <button>
                <FaSearch /> 
            </button>
          </div>
        </li>
        <li><button> <FaCartShopping /> </button></li>
        <li><button> <FaBell /> </button></li>
        <li><button> <FaUser /> </button></li>
      </ul>
  )
}

function MobileNavigation(){
  //TODO: Integration with React Router for route-aware highlighting on the mobile version
  //      Typically involves replacing the activeIndex state with logic checking current pathname:
  //         import { useLocation } from "react-router-dom";
  //         const location = useLocation();
  //         const currentRoute = location.pathname;
  
  // STATE MANAGEMENT
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (index) => {
    setActiveIndex(index);
  };
  const icons = [
    <AiFillHome key="home"/> ,
    <FaCartShopping key="cart" />,
    <FaSearch key="search" />,
    <FaBell key="notifications" />,
    <FaUser key="account" />
  ];
  
  const scrollDir = useScrollDirection();
  return(
    // NOTE: =========== MOBILE LAYOUT ==============
    // the scrollDir check will toggle a class whenever the user scrolls down or up.
    <div className={`${styles.navigation_mobile_wrapper} ${scrollDir === "down" ? styles.hidden : ""}`}>
      <ul className={styles.navigation_mobile}>
        {icons.map((icon, index) => {
          return(
            <li
              key={index}
              className={activeIndex === index ? styles.active : ""}
            >
              <button 
                className={styles.navigation_mobile_button} 
                onClick={() =>  handleClick(index)}
                // Setting aria-current or aria-pressed for accessibility and adding visible focus:
                aria-current={activeIndex === index ? "page" : undefined}
                aria-label={["Home","Cart","Search","Notifications","Account"][index]}
              > {icon} </button>
            </li>
          )
          })}
      </ul>
    </div>
  )
}

function MobileMenuIcon({menuOpen, setMenuOpen}){
  return(
    <>
      <button className={`${styles.mobile_menu_icon} ${menuOpen ? styles.menu_open : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <HiMenu className={styles.humburger} />
        <IoClose className={styles.close} />        
      </button>
    </>
  )
}

function MobileDropDownMenu({menuOpen}){
  
  // Functional Components
  function DropDownLinksContainer({name, target, dropDownLinks}){
    return(
      <div className={styles.mobile_drop_down_menu_links_container}>
        <Link to={target} className={styles.title_link}> {name} </Link>
        <DropDownLinks links={dropDownLinks} />
      </div>
    )
  }

  function DropDownLinks({links}){
    return(
      <ul className={styles.mobile_drop_down_menu_links}>
        {links.map((link) => {
          return(
            <li key={link.id} className={`${styles.mobile_drop_down_menu_link}`}>
              <Link to={link.target}> {link.name} </Link>
            </li>
          )
        })}
      </ul>
    )
  }

  return(
    <div className={`${styles.mobile_drop_down_menu} ${menuOpen ? styles.open : ""}`}>
      {dropDowns.map((dropdown) => {
        return(
          <DropDownLinksContainer key={dropdown.id} name={dropdown.name} target={dropdown.target} dropDownLinks={dropdown.dropDownLinks} />
        )
      })}      
    </div>
  )
}
