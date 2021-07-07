import snakeLogo from "../assets/snakeio.png";
import tanks from "../assets/tanks.png";

const GameSelection = ({ selectGame }) => {

    const selectTheGame = (wGame) => {
        console.log("Selecting Game: ", wGame);
        selectGame(wGame);
    }

    const styles = {
        container: {
            minHeight:'100vh',
            width:'100vw',
            textAlign:'center',
            display:'flex',
            flexDirection:'column',
        },
        headerText:{
            fontSize:'calc(1rem + 0.75vw + 0.75vh)',
            fontFamily:'monospace',
        },
        gameSelectContainer: {
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            marginTop:'5vh'
        },
        gameOption: {
            width:'33vw',
            objectFit:'contain',
            border:'1px solid gray',
            cursor:'pointer'
        }
    };

    return(
        <div style={styles.container}>
        <h4 style={styles.headerText}>Select Game To Play</h4>
        <div style={styles.gameSelectContainer}>
            <img style={styles.gameOption} src={snakeLogo} alt='snake' onClick={() => selectTheGame('Snake')}/>
            <img style={styles.gameOption} src={tanks} alt='tanks' onClick={() => selectTheGame('Tanks')}/>
        </div>
        </div>
    )



}; export default GameSelection