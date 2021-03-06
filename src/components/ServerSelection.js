import sfmLogo from "../assets/safemoon-logo.png";
import dogeLogo from "../assets/dogecoin-logo.png";
import { useState } from 'react';

const ServerSelection = ({ selectGameServer, currentGame }) => {

    const coins = [
        'Safemoon',
        'Dogecoin'
    ];
    
    const [activeCoin, setActiveCoin] = useState(coins[0]);

    const selectServer = (whichServer) => {
        console.log("Joining Server: ", whichServer);
        selectGameServer(whichServer);
    }

    const getLogoStyle = (which) => {
        if (which === activeCoin) return styles.logoStyleActive;
        else return styles.logoStyle;
    }

    const updateActiveCoin = (whichCoin) => {
        if (activeCoin !== whichCoin) {
            setActiveCoin(whichCoin);
        }
    }

    const serverNames = [
        'Beginner',
        'Easy',
        'Normal',
        'Hard',
        'Advanced',
        'Expert'
    ];

    const serverBuyInsSFM = [
        '10k',
        '100k',
        '500k',
        '1M',
        '10M',
        '25M'
    ]

    const serverBuyInsDOGE = [
        '0.25',
        '1',
        '2.5',
        '10',
        '50',
        '100'
    ]

    const styles = {
        container: {
            minHeight:'100vh',
            width:'100vw',
            textAlign:'center',
            display:'flex',
            flexDirection:'column',
            marginTop:'5vh'
        },
        headerText:{
            fontSize:'calc(1rem + 0.75vw + 0.75vh)',
            fontFamily:'monospace'
        },
        serverOptionsContainer:{
            alignSelf:'center',
            display:'flex',
            flexDirection:'column',
            marginBottom:'2vh'
        },
        serverOptionButton:{
            width:'50vw',
            height:'8.5vh',
            backgroundColor:'var(--highlightedBGColor)',
            color:'white',
            textDecoration:'none',
            alignSelf:'center',
            fontSize:'1rem',
            fontFamily:'monospace',
            cursor:'pointer',
            border: '1px solid gray',
            textAlign:'left',
            marginBottom:'2vh',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between'
        },
        freeAndMoonWarOptionButton:{
            width:'85vw',
            height:'10vh',
            backgroundColor:'var(--highlightedBGColor)',
            color:'white',
            textDecoration:'none',
            alignSelf:'center',
            fontSize:'1rem',
            fontFamily:'monospace',
            cursor:'pointer',
            border: '1px solid gray',
            textAlign:'center',
            marginBottom:'1.5vh'
        },
        freeAndMoonWarText:{
            fontSize:'calc(1rem + 1vw + 1vh)',
            fontFamily:'monospace',
        },
        freeAndMoonWarDescription:{
            fontSize:'calc(0.4rem + 0.5vw)',
            fontFamily:'monospace',
            fontStyle:'italic'
        },
        bottomServerOptions: {
            height:'30vh',
            display:'flex',
            flexDirection:'column',
        },
        serverDescription:{
            fontSize:'calc(0.4rem + 1vw)',
            fontFamily:'monospace',
            fontStyle:'italic',
            alignSelf:'center',
            marginRight:'1vw'
        },
        serverName:{
            fontSize:'calc(1rem + 1vw)',
            fontFamily:'monospace',
            alignSelf:'center',
            marginLeft:'1vw'
        },
        coinselectContainer:{
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-around',
            width:'60%',
            marginLeft:'20%',
            marginBottom:'2.5rem'
        },
        logoStyle:{
            width:'8vw',
            height:'8vh',
            objectFit:'contain',
            cursor:'pointer'
        },
        logoStyleActive:{
            width:'8vw',
            height:'8vh',
            objectFit:'contain',
            border:'2px solid blue',
            borderRadius:'25%',
            cursor:'pointer'
        }
      }
    
    return(
        <div style={styles.container}>
            <h4 style={styles.headerText}>Select {currentGame} Server</h4>
            <div style={styles.coinselectContainer}>
                <img src={sfmLogo} alt='logo' style={getLogoStyle(coins[0])} onClick={() => updateActiveCoin(coins[0])}/>
                <img src={dogeLogo} alt='logo' style={getLogoStyle(coins[1])} onClick={() => updateActiveCoin(coins[1])}/>
            </div>
            <div style={styles.serverOptionsContainer}>

                {serverNames.map((name, i) => (
                    <div 
                    style={styles.serverOptionButton} 
                    onClick={() => selectServer(i)}
                    key={i}
                    >
                        <code style={styles.serverName}>
                            {name}
                        </code><br />
                        {activeCoin === coins[0] ? 
                        <code style={styles.serverDescription}>{serverBuyInsSFM[i]} {activeCoin}</code>
                        :
                        <code style={styles.serverDescription}>{serverBuyInsDOGE[i]} {activeCoin}</code>
                        }
                    </div>                    
                ))}
            </div>
            <div style={styles.bottomServerOptions}>
                <div style={styles.freeAndMoonWarOptionButton}>
                    <code style={styles.freeAndMoonWarText}>
                        Practice
                    </code><br />
                    <code style={styles.freeAndMoonWarDescription}>
                        Hone your Skills in the Free Arena
                    </code>
                </div>
            </div>
        </div>
    )


}; export default ServerSelection