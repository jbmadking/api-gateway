import { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ContextCard from './ContextCard';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { Typography } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2)
    },
    pager: {
        alignItems: 'center',
    }
}));

export default function ContextsList() {

    const classes = useStyles();
    const [page, setPage] = useState(1);

    const searchKey = useSelector((state) => state.contextsData.searchKey);
    const contextsList = useSelector((state) => state.contextsData.contextsList);
    const currentContext = useSelector((state) => state.contextsData.currentContext);

    let filteredContexts;

    if (contextsList) {
        filteredContexts = contextsList.filter((item) => {
            return item.name.toLowerCase().includes(searchKey.toLowerCase());
        });
    }

    filteredContexts.sort((a, b) => {
        return (a.name > b.name) ? 1 : -1
    });

    const totalContexts = filteredContexts.length;
    const pageSize = 7;
    const totalNumberOfPages = Math.ceil(totalContexts / pageSize);
    const pageCount = totalNumberOfPages - 1;
    const pageStart = (page === 1) ? 1 : pageSize * page;
    const pageEnd = pageStart + pageSize;
    const pagedContexts = [];

    for (let index in filteredContexts) {
        if (index >= (pageStart - 1) && index <= pageEnd) {
            pagedContexts.push(filteredContexts[index]);
        }
    }

    const handleChange = (e, val) => {
        setPage(val);
    }

    if (pagedContexts.length < (pageSize - 5) && page > 1) {
        setPage(1);
    }

    return (
        <Grid container justifyContent="flex-start" spacing={3} className={classes.root}>
            <Grid container item xs={12} className={classes.pager} alignItems="center">
                <Pagination
                    count={pageCount}
                    color="primary"
                    page={page}
                    onChange={handleChange}
                />
                <Typography variant="h5">Page: {page}</Typography>
            </Grid>

            {pagedContexts && pagedContexts.map((context) => {

                let isSelected = false;

                if (currentContext && context) {
                    if (context.id === currentContext.id) {
                        isSelected = true;
                    }
                }

                return (
                    <Grid key={context.id} item xs={4} >
                        <ContextCard
                            contextName={context.name}
                            description={context.description}
                            contextId={context.id}
                            selectedContext={isSelected}
                        />
                    </Grid>
                )
            })}
            <Grid container item xs={12} className={classes.pager} alignItems="center">
                <Pagination
                    count={pageCount}
                    color="primary"
                    page={page}
                    onChange={handleChange}
                />
                <Typography variant="h5">Page: {page}</Typography>
            </Grid>
        </Grid>
    )
}