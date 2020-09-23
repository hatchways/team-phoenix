import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../assets/logo.png";
import {
    Paper,
    Box,
    Typography,
    Divider,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
    TextField,
    InputAdornment,
} from "@material-ui/core/";

import ProfileHeader from "./profile/Header"
import ProfileFooter from "./profile/Footer"

const useStyles = makeStyles((theme) => ({
    forPaper: {
      margin: theme.spacing(2),
      width: theme.spacing(75),
      height: theme.spacing(55),
    },
    forOuterBox: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    url_input: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    url_prefix: {
        color: "#a8b1c7",
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

const ProfileWidget = (props) => {
    const classes = useStyles();
    const [timezone, setTimezone] = React.useState(0, '');
    const handleChange = (event) => {
        setTimezone(event.target.value);
    };
    return (
        <Box className={classes.forOuterBox}>
            <img alt="logo" src={logo}></img>
            <Paper className={classes.forPaper}  elevation={3}>
                <Box m={3}>
                    <ProfileHeader percent={25} heading={props.heading} />
                </Box>
                <Divider/>
                <Box m={3}>
                    <Grid container alignItems="center">
                        <Grid item sm>
                            <Typography alight="left" variant="subtitle2">
                                {props.url_prompt}
                            </Typography>
                        </Grid>
                        <Grid item sm={8}>
                            {/* 
                                TODO: This will need validation once the back-end has the API set up for it.
                                See https://material-ui.com/components/text-fields/ for more details
                            */}  
                            <Box mr={3}>
                            <FormControl className={classes.url_input} noValidate autoComplete="off" fullWidth="true">
                                <TextField 
                                    id="outlined-basic" 
                                    variant="outlined"
                                    fullWidth="true"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start" className={classes.url_prefix}>calendapp.com/ <Divider className={classes.divider} orientation="vertical" /> </InputAdornment>,
                                        defaultValue: "john-doe"
                                    }}
                                />
                            </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item sm>
                            <Typography alight="left" variant="subtitle2">
                                {props.timezone_prompt}
                            </Typography>
                        </Grid>
                        <Grid item sm={8}>
                            <Box mr={3}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="tz"></InputLabel>
                                <Select
                                    labelId="timezone-label"
                                    id="tz"
                                    value={timezone}
                                    onChange={handleChange}>
                                <MenuItem value={0}>
                                    <em>UTC Time (11:31)</em>
                                </MenuItem>
                                <MenuItem value={+1}>Other</MenuItem>
                                <MenuItem value={+2}>Other</MenuItem>
                                <MenuItem value={+3}>Other</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                        </Grid>
                    </Grid>

                    <ProfileFooter type="A"/>
                    
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfileWidget;
