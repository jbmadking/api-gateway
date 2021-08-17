import React, { useState } from 'react';
import * as actionTypes from '../../store/actions/actionTypes';
import { DataGrid } from '@material-ui/data-grid';
import { IconButton, Button } from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import EndpointsService from '../../services/EndpointsService';
import { useDispatch, useSelector } from 'react-redux';
import EndpointEditPopup from './EndpointEditPopup';

export default function EndpointList(props) {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const currentEndpoint = useSelector((state) => state.endpointsData.currentEndpoint);

    const handleDialogueOpen = (row) => {
        setOpen(true)
        EndpointsService.getEndpoint(dispatch, row)
    };

    const handleDialogueClose = () => {
        setOpen(false)

        dispatch({
            type: actionTypes.GET_ENDPOINT_EDIT_END,
            payload: null
        })
    };

    if (props.endpoints === undefined) {
        return '';
    }

    const columns = [
        {
            field: 'edit',
            width: 10,
            sortable: false,

            renderCell: (params) => {

                const onClickEdit = async () => { handleDialogueOpen(params.row) };

                return (
                    <IconButton color="secondary" onClick={onClickEdit}>
                        <Edit color='primary' />
                    </IconButton>
                );
            },
        },
        {
            field: 'id',
            headerName: 'Id',
            width: 40
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 210,
        },
        {
            field: 'requestMethod',
            headerName: 'Method',
            width: 130,
            renderCell: (params) => {

                let btnVariant = 'contained';
                let btnColor = 'inherit';

                switch (params.row.requestMethod) {
                    case 'GET':
                        break;
                    case 'POST':
                        btnColor = 'primary';
                        break;
                    case 'PUT':
                        btnVariant = 'outlined';
                        btnColor = 'primary';
                        break;
                    case 'PATCH':
                        btnVariant = 'outlined';
                        btnColor = 'secondary';
                        break;
                    case 'DELETE':
                        btnColor = 'secondary';
                        break;
                    default:
                }

                return (
                    <Button variant={btnVariant} color={btnColor}>
                        {params.row.requestMethod}
                    </Button>
                );
            },
        },
        {
            field: 'endpoint',
            headerName: 'Endpoint',
            width: 250,
        },
        {
            field: 'roles',
            headerName: 'Roles',
            width: 250,
        },
    ];

    const rows = props.endpoints.map(row => {
        return {
            id: row.id,
            requestMethod: row.type,
            endpoint: row.endpoint,
            description: row.description,
            roles: row.role
        };
    })

    const data = {
        dataSet: 'Endpoints',
        rowLength: rows.length,
    };

    const endpointPopup = (currentEndpoint) ?
        <EndpointEditPopup
            open={open}
            contextId={props.contextId}
            handleClose={handleDialogueClose} /> : '';

    return (
        <div style={{ height: 500, width: '98%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                pagination {...data}
                rowsPerPageOptions={[5, 10, 20]}
            />

            {endpointPopup}
        </div>
    )
}