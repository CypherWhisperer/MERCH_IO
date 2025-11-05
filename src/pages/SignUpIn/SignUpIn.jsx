import styles from "./SignUpIn.module.scss";
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";

// Icons
import { FaRegEye, FaRegEyeSlash, FaGoogle, FaApple, FaFacebook, FaArrowLeft } from "../../assets/icons/icons";

// Images
import { image1 } from "../../assets/images/images";

// data
const accounts = [
  {name: "Google", logo: <FaGoogle /> },
  {name: "Apple", logo: <FaApple /> },
  {name: "Facebook", logo: <FaFacebook /> },
];

const support_links = [
  {name: "Privacy Policy", link: "#"},
  {name: "Support", link: "#"},
];

// DEFAULT FUNCTIONAL COMPONENT
export default function SignUpIn() {
  const [hasAccount, setHasAccount] = useState(false);

  const handleSwitch = () => {
    setHasAccount(!hasAccount);
  }

  const navigate = useNavigate();
  
  return (
    <article className={`flex items-center ${styles.sign_container}`}>
      <div className={styles.left_content}>
        <div className={styles.graphic}>
          <img src={image1} alt="demonstrative graphic" />
        </div>
        
        <div className={styles.text_content}>
          <Logo />
          
          <button 
            onClick={() => navigate("/")}
          >
            <FaArrowLeft /> <span>Back to website</span>
          </button>
        </div>
      </div>

      <div className={styles.right_content}>
        {hasAccount ?        
          <SignIn  handleSwitch={handleSwitch}/>
          : <SignUP  handleSwitch={handleSwitch}/>
        }
      </div>      
    </article>
  );
}

// Functional Components
function SignUP({ handleSwitch}) {
  
  return (
    <form action="" method="GET" className={styles.form}>
      <TextContent   
        heading={"Sign Up Account"}
        text={"Input your personal data to create your account"}
      />
      
      <div className={styles.names}>
        <Input  inputClass={styles.name} label={"firstName"} name={"First Name"} type={"text"} id={"firstName"} placeHolder={"e.g Cypher"} isRequired={true} />        
        <Input  inputClass={styles.name} label={"lastName"} name={"Last Name"} type={"text"} id={"lastName"} placeHolder={"e.g Whisperer"} isRequired={true} />
      </div>
      <Input  label={"email"} name={"Email"} type={"email"} id={"signUpEmail"} placeHolder={"e.g cypherwhisperer@gmail.com"} isRequired={true} />
      <Input  label={"username"} name={"User Name"} type={"text"} id={"signUpUserName"} placeHolder={"e.g Cypher Whisperer"} isRequired={true} />
      <Input  label={"password"} name={"Password"} type={"password"} id={"signUpPassword"} placeHolder={"Input a strong Password"} isRequired={true} hasTextBelow={true} textBelow={"Must be at least 8 characters"} textBelowClass={styles.password_info}/>      
      <Input  label={"password2"} name={"Confirm Password"} type={"password"} id={"signUpPassword2"} placeHolder={"Input the same password"} isRequired={true} />
      
      <CtaButton name={"Sign Up"}/>
      
      <SwitchForms 
        question={"Already have an account ?"}
        action={"Log in"}
        handleSwitch={handleSwitch}
      />

      <FormFooter />
    </form>
  );
}

function SignIn({ handleSwitch}) {
  return(
    <form action="" method="GET" className={styles.form}>
      
      <div className={styles.to_sign_up}>
        <h1>M</h1>
        {/* <Logo /> */}
        <SwitchForms 
          question={"Don't have an account ?"}
          action={"Sign Up"}
          handleSwitch={handleSwitch}
        />
      </div>

      <TextContent 
        heading={"Welcome Back"}
        text={"Please Input your details to sign in your account"}
      />
      
      <Input  label={"email"} name={"Email"} type={"email"} id={"signInEmail"} placeHolder={"Input your registered Email Address"} isRequired={true} />      
      <Input  label={"password"} name={"Password"} type={"password"} id={"signInPassword"} placeHolder={"Input your Password"} isRequired={true} />
      
      <CtaButton name={"Sign In"}/>
      
      <p className={styles.link}>
        <button className={styles.forgot}>
          Forgot password ?
        </button>
      </p>

      <FormFooter />
    </form>
  );
}

function Logo(){
  return(
    <div className={styles.logo}> 
      <h1 className={styles.main_char}>M</h1>
      <p className={styles.subset_text}>MERCH IO</p>
    </div>          
  )
}

function TextContent({heading, text}) {
  return(
    <div className={styles.text_content}>
        <h2>{heading}</h2>
        <p className={styles.instruction}>{text}</p>
        <div className={styles.accounts_container}>          
          {accounts.map((account) => {
            return(
              <AccountButton 
                key={account.name}
                accountName={account.name}
                accountLogo={account.logo}
              />
            )
          })}
        </div>
        
        <div className={styles.or_container}>
          <div className={styles.line} />
          <p>OR</p>
          <div className={styles.line} />
        </div>        
      </div>
  )
}

function AccountButton({ accountLogo, accountName}){
  return(
    <button
     className={styles.account}
    >
      {accountLogo}
      <span>{accountName}</span>
    </button>
  )
}

function Input({ inputClass, label, name, type, id, placeHolder, isRequired, hasTextBelow,  textBelow, textBelowClass }){
  return(
    <div className={inputClass} >
      <div className={styles.label_container}>
        <label htmlFor={label}> {name} </label> 
        {isRequired &&
          <span className={styles.asterisk}> * </span>
        }
      </div>
      
      <input type={type} name={label} id={id} placeholder={placeHolder} required={isRequired} />
      {hasTextBelow &&
        <p className={textBelowClass}> {textBelow} </p>
      }
    </div>
  )
}

function SwitchForms({question, action, handleSwitch}){
  return(
    <p className={styles.link}>
        {question}
        <button className={styles.colorless_btn} onClick={() => handleSwitch()}>
          {action}
        </button>        
      </p>
  )
}

function CtaButton({name}) {
  return(
    <div className={styles.cta_btn}>
      <button
        type="submit"
      >
        {name}
      </button> 
    </div>
  )
}

function FormFooter(){
  return(
    <div className={styles.form_footer}>
      <small>&copy; 2025 MerchIo</small>
      <div className={styles.support_links}>
        {support_links.map((link) => {
          return(
            <Link 
              to={link.link} 
              key={link.name}
            > 
              {link.name}
            </Link>
          )
        })}
      </div>
    </div>
  )
}