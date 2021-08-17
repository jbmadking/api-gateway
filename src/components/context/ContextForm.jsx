import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import loader from '../../assets/loader.gif';
import { Button, Grid } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import EndpointAddPopup from '../endpoints/EndpointAddPopup';
import ContextsService from '../../services/ContextsService';
import AuthService from "../../services/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(4),
        marginTop: -30
    },
    TextField: {
        margin: theme.spacing(1),
    },
    buttonSave: {
        backgroundColor: '#2E76CF',
        margin: 8,
        color: 'white',
        '&:hover': {
            backgroundColor: '#173b67'
        }
    },
    buttonAdd: {
        backgroundColor: '#2E76CF',
        marginTop: 8,
        color: 'white',
        '&:hover': {
            backgroundColor: '#173b67'
        }
    }
}));

const errorContainer = () => {
    return <div>ERROR IN API</div>;
}

const showLoader = () => {
    return <div><img src={loader} alt="loading ..." title="loading ..." /></div>;
}

export default function ContextForm() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [formChanged, setFormChanged] = useState(false);
    const currentContext = useSelector((state) => state.contextsData.currentContext);
    const authData = useSelector((state) => state.authData);

    const [contextName, setContextName] = useState(currentContext.name)
    const [description, setDescription] = useState(currentContext.description)
    const [context, setContext] = useState(currentContext.context)
    const [targetContext, setTargetContext] = useState(currentContext.targetContext)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleNameChange = (e) => {
        setFormChanged(true)
        setContextName(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setFormChanged(true)
        setDescription(e.target.value)
    }

    const handleTargetContextChange = (e) => {
        setFormChanged(true)
        setTargetContext(e.target.value)
    }

    const handleContextChange = (e) => {
        setFormChanged(true)
        setContext(e.target.value)
    }

    const handleFormSubmit = () => {

        const username = AuthService.getUsername();

        ContextsService.updateContext(
            dispatch,
            currentContext.id,
            {
                context: context,
                targetContext: targetContext,
                createdBy: username,
                updatedBy: username,
                name: contextName,
                description: description
            }, authData.accessToken
        )
    }

    const renderData = () => {

        const formTitle = (!currentContext.name) ? '' : currentContext.name

        return currentContext === undefined ? errorContainer() :
            <Grid container className={classes.root}>
                <Grid item xs={12}>
                    <h2>{formTitle}</h2>
                </Grid>
                <Grid item xs={10}>
                    <form noValidate autoComplete="off">
                        <TextField id="name"
                            label="Name"
                            size="small"
                            fullWidth
                            value={contextName}
                            onChange={handleNameChange}
                            className={classes.TextField}
                            variant="outlined" />
                        <TextField id="description"
                            label="Description"
                            size="small"
                            fullWidth
                            value={description}
                            onChange={handleDescriptionChange}
                            className={classes.TextField}
                            variant="outlined" />
                        <TextField id="context"
                            label="Context"
                            size="small"
                            value={context}
                            className={classes.TextField}
                            onChange={handleContextChange}
                            fullWidth
                            variant="outlined" />
                        <TextField
                            id="targetContext"
                            label="TargetContext"
                            size="small"
                            value={targetContext}
                            className={classes.TextField}
                            onChange={handleTargetContextChange}
                            fullWidth
                            variant="outlined" />
                    </form>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className={classes.buttonSave}
                        variant="contained"
                        disabled={!formChanged}
                        onClick={handleFormSubmit}
                    >Save Context</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        className={classes.buttonAdd}
                        variant="contained"
                        onClick={handleClickOpen}
                    >Add Endpoint</Button>
                </Grid>

                <EndpointAddPopup
                    open={open}
                    handleClose={handleClose}
                    contextId={currentContext.id}
                    token={authData.accessToken} />
            </Grid>
    }

    return (
        currentContext === undefined ? showLoader() : renderData()
    )
}