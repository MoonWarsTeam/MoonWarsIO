import snakes from "../assets/snakeio.png";
import tanks from "../assets/tanks.png";
import agario from "../assets/agariologo.png";

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
            flexDirection:'column',
            justifyContent:'space-around',
            marginTop:'3.5vh',
        },
        gameSelectTopContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around'
        },
        gameOption: {
            width:'33vw',
            objectFit:'contain',
            border:'1px solid gray',
            borderRadius:'22.5%',
            cursor:'pointer',
            marginBottom:'5vh'
        },
        gameTitle:{
            fontSize:'calc(1rem + 0.75vw + 0.5vh)',
            fontFamily:'monospace',
            fontWeight:'550'
        }
    };

    return(
        <div style={styles.container}>
            <h4 style={styles.headerText}>Select Game To Play</h4>
            <div style={styles.gameSelectContainer}>
                <div style={styles.gameSelectTopContainer}>
                    <div>
                        <code style={styles.gameTitle}>Snake</code><br />
                        <img style={styles.gameOption} src={snakes} alt='snake' onClick={() => selectTheGame('Snake')}/>
                    </div>
                    <div>
                        <code style={styles.gameTitle}>Agario</code><br />
                        <img style={styles.gameOption} src={agario} alt='agario' onClick={() => selectTheGame('Agario')}/>
                    </div>
                    
                </div>
                <div>
                    <code style={styles.gameTitle}>Moon War</code><br />
                    <img style={styles.gameOption} src={tanks} alt='tanks' onClick={() => selectTheGame('Tanks')}/>
                </div>
            </div>
        </div>
    )



}; export default GameSelection