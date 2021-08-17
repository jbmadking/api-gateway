import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, FormLabel, MenuItem, Select } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import AuthService from '../../services/AuthService';
import EndpointsService from '../../services/EndpointsService';

export default function EndpointEditPopup(props) {

    const currentEndpoint = useSelector((state) => state.endpointsData.currentEndpoint);
    const accessToken = useSelector((state) => state.authData.accessToken);

    const [description, setDescription] = useState(currentEndpoint.description)
    const [endpoint, setEndpoint] = useState(currentEndpoint.endpoint)
    const [method, setMethod] = useState(currentEndpoint.requestMethod)
    const [roles, setRoles] = useState(currentEndpoint.roles)

    const dispatch = useDispatch();

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleEndpointChange = (e) => {
        setEndpoint(e.target.value)
    }
    const handleMethodChange = (e) => {
        setMethod(e.target.value)
    }
    const handleRoleChange = (e) => {
        setRoles(e.target.value)
    }


    const handleUpdateEndpoint = () => {

        const username = AuthService.getUsername();

        EndpointsService.updateEndpoint(dispatch,
            {
                endpoint: endpoint,
                description: description,
                type: method,
                role: roles,
                createdBy: username,
                updatedBy: username
            },
            currentEndpoint.id,
            props.contextId,
            accessToken
        )
        props.handleClose();
    };

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Endpoint</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointDescription"
                    value={description}
                    onChange={handleDescriptionChange}
                    label="Endpoint Description"
                    type="text"
                    fullWidth
                />

                <FormLabel>Method</FormLabel>

                <Select
                    labelId="method-select-label"
                    id="method-select"
                    value={method}
                    onChange={handleMethodChange}
                    fullWidth >
                    <MenuItem value="">Please Select</MenuItem>
                    <MenuItem value="GET">GET</MenuItem>
                    <MenuItem value="POST">POST</MenuItem>
                    <MenuItem value="PUT">PUT</MenuItem>
                    <MenuItem value="PATCH">PATCH</MenuItem>
                    <MenuItem value="DELETE">DELETE</MenuItem>
                </Select>

                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointURL"
                    label="Endpoint"
                    value={endpoint}
                    onChange={handleEndpointChange}
                    fullWidth
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointRoles"
                    label="Roles"
                    value={roles}
                    onChange={handleRoleChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleUpdateEndpoint} color="primary">
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    )
}