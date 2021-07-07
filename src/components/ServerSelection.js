


const ServerSelection = ({ selectGameServer }) => {

    const selectServer = (whichServer) => {
        console.log("Joining Server: ", whichServer);
        selectGameServer(whichServer);
    }

    const serverNames = [
        'Beginner',
        'Easy',
        'Normal',
        'Hard',
        'Advanced',
        'Pro'
    ];

    const serverDescriptions = [
        '(10k Safemoon)',
        '(25k Safemoon)',
        '(100k Safemoon)',
        '(250k Safemoon)',
        '(1M Safemoon)',
        '(10M Safemoon)',
    ]

    const styles = {
        container: {
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
        serverOptionsContainer:{
            alignSelf:'center',
            height:'34vh',
            display:'grid',
            gridTemplateColumns:'28vw 28vw 28vw',
            gridTemplateRows: '16vw 16vw 16vw'
        },
        serverOptionButton:{
            width:'26vw',
            height:'15vh',
            backgroundColor:'var(--highlightedBGColor)',
            color:'white',
            textDecoration:'none',
            alignSelf:'center',
            fontSize:'1rem',
            fontFamily:'monospace',
            cursor:'pointer',
            border: '1px solid gray',
            textAlign:'center'
        }
      }
    
    return(
        <div style={styles.container}>
            <h4 style={styles.headerText}>Select Your Server</h4>
            <div style={styles.serverOptionsContainer}>

                {serverNames.map((name, i) => (
                    <div style={styles.serverOptionButton} 
                        onClick={() => selectServer(i)}
                        key={i}>
                        <code>
                            {name}<br />
                            {serverDescriptions[i]}
                        </code>
                    </div>
                ))}
            </div>
        </div>
    )


}; export default ServerSelection