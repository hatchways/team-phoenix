import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProgressBar from "./ProgressBar"
import logo from "../assets/logo.png";
import {
    Paper,
    Box,
    Typography,
    Button,
    Divider,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Grid,
} from "@material-ui/core/";

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
    forContinueButton: {
        fontWeight: "bold",
        textTransform: "none",
        fontFamily: "Verdana, Arial, Helvetica, sans-serif",
        color: "#fffbfb",
        backgroundImage: "linear-gradient(to right, #fe6b00, #fe8b00);"
    },
    forSetupLater: {
        textTransform: "none",
        color: "#a8b1c7"
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
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
                    <Grid container alignItems="center" justify="space-evenly" spacing={4}>
                        <Grid item xs>
                            <Typography align="left" variant="h6">
                                {props.heading}
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <ProgressBar value={20} />
                        </Grid>
                    </Grid>
                </Box>
                <Divider/>
                <Box m={3}>
                    <Grid container alignItems="center">
                        <Grid item sm>
                            <Typography alight="left" variant="body1">
                                {props.url_prompt}
                            </Typography>
                        </Grid>
                        <Grid item sm>
                            <Typography alight="left" variant="body1">
                                PlaceHolder
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center">
                        <Grid item sm>
                            <Typography alight="left" variant="body1">
                                {props.timezone_prompt}
                            </Typography>
                        </Grid>
                        <Grid item sm>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="tz"></InputLabel>
                                <Select
                                    labelId="timezone-label"
                                    id="tz"
                                    value={timezone}
                                    onChange={handleChange}
                                    label="Time Zone">
                                <MenuItem value={0}>
                                    <em>UTC Time</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center">
                        <Grid item sm>
                        <Button className={classes.forContinueButton}
                            variant="contained"
                            color="primary"
                            size="large"
                            type="submit">
                            {props.btn_txt}
                        </Button>
                        </Grid>
                        <Grid item sm>
                        <Button className={classes.forSetupLater}
                            variant="text"
                            size="large"
                            type="submit">
                            {props.btn2_txt}
                        </Button>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Paper>
        </Box>
    );
};

export default ProfileWidget;
