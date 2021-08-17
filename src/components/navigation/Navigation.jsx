import { Button } from "@material-ui/core";
import { alpha, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import ContextsService from "../../services/ContextsService";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import ContextAddPopup from "../context/ContextAddPopup";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#3f51b5",
        color: "#fff",
        margin: theme.spacing(2)
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '80ch',
        },
    },

}));

export default function Navigation() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const searchKey = useSelector((state) => state.contextsData.searchKey);

    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState(searchKey);

    const searchEntry = (value) => {
        setSearchText(value)
        ContextsService.setContextSearchText(dispatch, value);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={8}>
                <InputBase
                    type='search'
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    fullWidth
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchText}
                    onChange={(e) => {
                        searchEntry(e.target.value)
                    }}
                />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" color="secondary" size="large" onClick={handleClickOpen}>Add</Button>
            </Grid>

            <ContextAddPopup open={open} handleClose={handleClose} />
        </Grid>
    )
}