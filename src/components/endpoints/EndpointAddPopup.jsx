import TextField from '@material-ui/core/TextField';
import { Button, FormLabel, MenuItem, Select } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from "react";
import { useDispatch } from 'react-redux';
import EndpointsService from '../../services/EndpointsService';
import AuthService from "../../services/AuthService";

export default function EndpointAddPopup(props) {

    const [description, setDescription] = useState('');
    const [endpoint, setEndpoint] = useState('');
    const [method, setMethod] = useState('');
    const [roles, setRoles] = useState('');
    const dispatch = useDispatch();

    const handleSaveContext = () => {

        const username = AuthService.getUsername();

        EndpointsService.saveEndpoint(dispatch,
            {
                endpoint: endpoint,
                description: description,
                type: method,
                role: roles,
                createdBy: username,
                updatedBy: username
            },
            props.contextId,
            props.token
        )

        props.handleClose();
    };

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

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Endpoint</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointDescription"
                    value={description}
                    onChange={handleDescriptionChange}
                    label="Endpoint Description"
                    fullWidth
                />

                <FormLabel>Method</FormLabel>
                <Select
                    labelId="method-select-label"
                    id="method-select"
                    value={method}
                    onChange={handleMethodChange}
                    displayEmpty
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
                    onChange={handleEndpointChange}
                    value={endpoint}
                    label="Endpoint"
                    fullWidth
                />

                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointRoles"
                    onChange={handleRoleChange}
                    value={roles}
                    label="Roles"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSaveContext} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}