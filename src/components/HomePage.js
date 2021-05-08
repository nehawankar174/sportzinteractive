import React, {useState, useEffect} from "react";
import './HomePage.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FaSearchPlus } from "react-icons/fa";
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

let list = [];
const useStyles = makeStyles((theme) => ({
      root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
        marginTop:'5%',
      },
      image: {
        width: 128,
        height: 128,
      },
      img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      searchWrap:{
          marginBottom: '2%'
      }
}));

function HomePage() {
    const classes = useStyles();
    const [playerDetails, setPlayerDetails] = useState([])

    useEffect(() => {
        _fetchData()
    }, [])

    const _fetchData = async () => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then(res => res.json())
      .then(
        (result) => {
         result.playerList.forEach(data => {
            let image_path = "";
            try {  
                image_path = require("../assets/images/"+ data.Id +".jpg").default; 
            } catch(err){  
                image_path = require("../assets/images/imageNotFound.png").default;
            } 
            data.image_path = image_path
            list.push(data)
            setPlayerDetails([...list])
        });
        setPlayerDetails(list.reverse())
        },
        (error) => {
          console.log("Error :", error);
        }
      )
    }

    const onChange = (e) => {
        const items = list.filter((data)=>{
            if(e.target.value === "")
                return data
            else if(data.PFName.toLowerCase().includes(e.target.value.toLowerCase()) || data.TName.toLowerCase().includes(e.target.value.toLowerCase())){
                return data
            }
          })
          setPlayerDetails(items)
    }
      

  return ( 
    <div className={classes.root}>
             <header className="App-header">
                <p>FIFA</p>
            </header>
            <div className={classes.searchWrap}>
                <TextField
                    label="Search Player/Team"
                    name="player"
                    // className={styles.textField}
                    margin="dense"
                    variant="outlined"
                    style={{width:'70%', marginLeft:'15%'}}
                    onChange={onChange}
                    underlinecolor="#49b2cc"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                            <FaSearchPlus />
                            </InputAdornment>
                        ),
                        }}
                />
            </div>
        <Grid container spacing={2} alignItems="flex-end" style={{backgroundColor:"lightgray" }}>
            {playerDetails.map((player, i) => (
                <Grid item key={i} xs={12} md={6} >
                    <Grid item>
                        <div className="App-grid">
                            <div style={{width:"30%"}}>
                                <div className={classes.image}>
                                    <img className={classes.img} alt="player" src={player.image_path} /> 
                                </div>
                            </div>
                            <div style={{width:"70%"}}>
                                <Grid item xs={12} sm container>
                                    
                                    <Grid item xs container direction="column" spacing={2}>
                                        <Grid item xs>
                                            <Typography gutterBottom variant="subtitle1">
                                               <b> {player.PFName} </b>
                                            </Typography>
                                            <Typography variant="body2" gutterBottom>
                                                {player.SkillDesc}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Upcoming Match : {player.UpComingMatchesList[0].CCode !== "" ? player.UpComingMatchesList[0].CCode + " vs. " + player.UpComingMatchesList[0].VsCCode : "-"}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Match Time : {player.UpComingMatchesList[0].MDate !== "" ? new Date(player.UpComingMatchesList[0].MDate+" GMT").toLocaleString() : "-"}
                                            </Typography>
                                            
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle1">${player.Value}</Typography>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Grid>
                    
                </Grid> 
            ))}
        </Grid>
    </div>
  );
}

export default HomePage;
