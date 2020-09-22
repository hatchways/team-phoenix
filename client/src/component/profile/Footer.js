import React from "react";
import {
    Button,
    Grid,
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

const ProfileFooter = (props) => {
    const classes = useStyles();
    return (
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
                    Continue
                </Button>
            </Grid>
            <Grid item sm>
                <Button className={classes.forSetupLater}
                    variant="text"
                    size="large"
                    type="submit">
                    Set up later
                </Button>
            </Grid>
        </Grid>
    );   
}

export default ProfileFooter;


