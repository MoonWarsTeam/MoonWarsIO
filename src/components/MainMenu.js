import GameState from './App'

const MainMenu = ({ selectServer }) => {

    const goToServerSelect = () => {
        // User should be signed up to advance this far
        // Otherwise, they should be directed to the Free Server automatically
        selectServer();
    }

    const styles = {
        MainMenuContainer: {
            minHeight:'100%',
            width:'100vw',
            textAlign:'center',
            display:'flex',
            flexDirection:'column'
        },
        headerText:{
            fontSize:'calc(1rem + 1.5vw)',
            fontFamily:'monospace'
        },
        selectServerButton:{
            width:'25%',
            height:'calc(25px + 2vh)',
            backgroundColor:'var(--highlightedBGColor)',
            color:'white',
            textDecoration:'none',
            cursor:'pointer',
            alignSelf:'center',
            fontSize:'1rem',
            fontFamily:'monospace'
        }
      }

    return(
        <div style={styles.MainMenuContainer}>
            <h4 style={styles.headerText}>Welcome To Moon Wars</h4>
            <button style={styles.selectServerButton} onClick={() => goToServerSelect()}>
                Play
            </button>
        </div>
    )

};
export default MainMenu