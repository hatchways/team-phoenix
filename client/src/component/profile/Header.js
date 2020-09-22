import React from "react";
import {
    Typography,
    Grid,
} from "@material-ui/core/";

import ProgressBar from "./ProgressBar"

const ProfileHeader = (props) => {
    return (
        <Grid container alignItems="center" justify="space-evenly" spacing={4}>
            <Grid item xs>
                <Typography align="left" variant="h6">
                    {props.heading}
                </Typography>
            </Grid>
            <Grid item xs>
                <ProgressBar value={props.percent} />
            </Grid>
        </Grid>
    );   
}

export default ProfileHeader;