import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Navigation from '../navigation/Navigation';
import ContextsService from '../../services/ContextsService';
import { useDispatch, useSelector } from 'react-redux';
import ContextForm from '../context/ContextForm';
import ContextsList from '../context/ContextsList';
import EndpointList from '../endpoints/EndpointList';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1 },
    title: {
        padding: 16,
        textAlign: 'left',
        background: 'white',
        color: 'darkblue',
        fontSize: 24
    },
    subtitle: {
        padding: 8,
        textAlign: 'left',
        background: 'white',
        color: 'darkblue',
        fontSize: 22
    }
}));

export default function Dashboard() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const contextsData = useSelector((state) => state.contextsData);
    const accessToken = useSelector((state) => state.authData.accessToken);

    const errorContainer = () => {
        return <Alert severity="warning">Error Contacting API</Alert>;
    }

    useEffect(() => {
        ContextsService.loadContexts(dispatch, accessToken);
    }, [dispatch, accessToken])

    const currentContextElement = (contextsData.currentContext === null) ?
        <Typography variant="h4">Please select a Context from the list</Typography> :
        <ContextForm className={classes.title} context={contextsData.currentContext} />

    const endpointsListElement = (contextsData.currentContext === null) ? '' :
        <EndpointList
            endpoints={contextsData.currentContext.endpoints}
            contextId={contextsData.currentContext.id} />

    const renderData = (contextsData) => {
        return contextsData.error ? errorContainer() :
            <Grid container className={classes.root} spacing={10}>
                <Grid item xs={5}>
                    <Grid item xs={12}>
                        <Navigation />
                    </Grid>
                    <Grid item xs={12}>
                        <ContextsList />
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid className={classes.subtitle} item xs={12}>
                        {currentContextElement}
                    </Grid>
                    <Grid item xs={12}>
                        {endpointsListElement}
                    </Grid>
                </Grid>
            </Grid>
    }

    return (
        contextsData.loading ? '' : renderData(contextsData)
    )
}
