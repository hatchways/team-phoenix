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
    FormControlLabel,
    Checkbox,
    GridList,
    GridListTile,
    GridListTileBar,
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
          width: '25ch',
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

const timeOptions = [
    '00:00', '00:30',
    '01:00', '01:30',
    '02:00', '02:30',
    '03:00', '03:30',
    '04:00', '04:30',
    '05:00', '05:30',
    '06:00', '06:30',
    '07:00', '07:30',
    '08:00', '08:30',
    '09:00', '09:30',
    '10:00', '10:30',
    '11:00', '11:30',
    '12:00', '12:30',
    '13:00', '13:30',
    '14:00', '14:30',
    '15:00', '15:30',
    '16:00', '16:30',
    '17:00', '17:30',
    '18:00', '18:30',
    '19:00', '19:30',
    '20:00', '20:30',
    '21:00', '21:30',
    '22:00', '22:30',
    '23:00', '23:30',
];

const AvailabilityWidget = (props) => {
    const classes = useStyles();
    const [startTime, setStartTime] = React.useState(["09:00"]);
    const [endTime, setEndTime] = React.useState(["17:00"]);
    const [daysSelected, setDays] = React.useState([
        {day:'Sundays', value:false}, 
        {day:'Mondays', value:true}, 
        {day:'Tuesdays', value:true}, 
        {day:'Wednesdays', value:true}, 
        {day:'Thursdays', value:true}, 
        {day:'Fridays', value:true}, 
        {day:'Saturdays', value:false}
    ]);
  const handleChangeStart = (event) => {
    setStartTime(event.target.value);
  };
  const handleChangeEnd = (event) => {
    setEndTime(event.target.value);
  };
  const handleDayToggle = (event) => {
    // TODO: Do something here to toggle the days
    
  };
    return (
        <Box className={classes.forOuterBox}>
            <img alt="logo" src={logo}></img>
            <Paper className={classes.forPaper}  elevation={3}>
                <Box m={3}>
                    <ProfileHeader percent={75} heading={props.heading} />
                </Box>
                <Divider/>
                <Box m={3}>
                    <Grid container alignItems="flex-start" direction="column">
                        <Grid item>
                            <Typography alight="left" variant="subtitle2">
                                Available hours:
                            </Typography>
                        </Grid>
                        <Grid container alignItems="center">
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Select
                                        labelId="start-time-label"
                                        id="start-time"
                                        value={startTime}
                                        onChange={handleChangeStart}
                                        >
                                    {timeOptions.map((timeOptions) => (
                                        <MenuItem key={timeOptions} value={timeOptions}>
                                        {timeOptions}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                                <Typography alight="left" variant="h4">
                                    -
                                </Typography>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="end-time"></InputLabel>
                                    <Select
                                        labelId="end-time-label"
                                        id="end-time"
                                        value={endTime}
                                        onChange={handleChangeEnd}
                                        >
                                    {timeOptions.map((timeOptions) => (
                                        <MenuItem key={timeOptions} value={timeOptions}>
                                        {timeOptions}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container alignItems="flex-start" direction="column">
                        <Grid item sm>
                            <Typography alight="left" variant="subtitle2">
                                Available days:
                            </Typography>
                        </Grid>
                        <GridList cols={7} rows={1}>
                            {daysSelected.map((dayData) => (   
                            <GridListTile key={dayData.day}>
                                <FormControlLabel
                                    value={dayData.day}
                                    control={<Checkbox color="primary" />}
                                    label={dayData.day}
                                    labelPlacement="bottom"
                                    checked={dayData.value}
                                    />
                            </GridListTile>
                            ))}
                        </GridList>
                    </Grid>
                    <Grid container>          
                    <ProfileFooter type="B"/>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    );
};

export default AvailabilityWidget;
