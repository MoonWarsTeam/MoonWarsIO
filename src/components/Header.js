import { AiOutlineUser } from 'react-icons/ai'

const Header = () => {

    const connectWallet = () => {
        // show prompt for wallet connect options
        // directly via Metamask or Wallet Connect
        console.log("User attempting to connect wallet");
    }

    const goToUserProfile = () => {
        // go to user profile, can change nickname / color
        // check match history
        console.log("User attempting to navigate to User Profile");
    }


    const styles={
        container:{
            position:'absolute',
            top:0,
            height:'9vh',
            width:'100%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
        },
        innerContainer:{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            marginRight:'2rem'
        },
        headerText:{
            fontSize:'calc(0.5rem + 1vh + 1vw)',
            fontFamily:'monospace',
            marginLeft:'1rem'
        },
        connectButton:{
            height:'4vh',
            width:'90px',
            borderRadius:'15%',
            border:'1px solid white',
            backgroundColor:'var(--highlightedBGColor)',
            cusor:'pointer',
            alignItems:'center',
            cursor:'pointer',
            color:'white',
            marginRight:'0.8rem'
        },
        loginText: {
            fontSize:'calc(9px + 1vh)',
            fontFamily:'monospace',
        }
    }

    return(
        <div style={styles.container}>
            <code style={styles.headerText}>Moon Wars</code>
            <div style={styles.innerContainer}>
                <button style={styles.connectButton} onClick={() => connectWallet()}>
                    <code style={styles.loginText}>
                        Connect
                    </code>
                </button>
                <AiOutlineUser size='calc(1.3rem + 0.5vw)' cursor='pointer' onClick={() => goToUserProfile()}/>
            </div>
            
        </div>
    )


}; export default Header