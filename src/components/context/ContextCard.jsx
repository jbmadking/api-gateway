import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, CardActionArea, CardActions } from '@material-ui/core';
import ContextsService from '../../services/ContextsService';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
    root: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#5c6bc0',
        boxSizing: 'border-box',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    selected: {
        height: 'auto',
        width: '100%',
        backgroundColor: '#ec407a',
        boxSizing: 'border-box',
        '&:hover': {
            transform: 'scale(1.05)'
        }
    },
    title: {
        fontSize: 18,
    },
    description: {
        fontSize: 14,
        backgroundColor: '#aa00ff',
        color: '#ffffff',
    },
    cardContent: {
        color: '#ffffff',
    }
});

export default function ContextCard(props) {
    const classes = useStyles();

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.authData.accessToken);

    const handleOpenContext = (id) => {
        ContextsService.loadCurrentContext(dispatch, id, accessToken);
    }

    const cardClass = (props.selectedContext) ? classes.selected : classes.root

    return (
        <Card className={cardClass}>
            <CardActionArea onClick={() => { handleOpenContext(props.contextId) }}>
                <CardContent className={classes.cardContent}>
                    <Typography className={classes.title}>
                        {props.contextName}
                    </Typography>
                </CardContent>
                <CardActions className={classes.description}>
                    <Typography align="left">
                        {props.description}
                    </Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    );
}
