import { Button, TextField, Select, MenuItem, Typography, FormLabel } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import AuthService from "../../services/AuthService";
import ContextsService from '../../services/ContextsService';

export default function ContextAddPopup(props) {

    const nameRef = useRef('')
    const descriptionRef = useRef('')
    const contextRef = useRef('')
    const targetRef = useRef('')
    const endpointDescriptionRef = useRef('')
    const endpointURLRef = useRef('')
    const endpointRolesRef = useRef('')
    const [endpointMethod, setEndpointMethod] = useState('')

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.authData.accessToken);

    const handleSaveContext = () => {

        const username = AuthService.getUsername();

        ContextsService.saveContext(dispatch, {
            name: nameRef.current.value,
            context: contextRef.current.value,
            description: descriptionRef.current.value,
            targetContext: targetRef.current.value,
            createdBy: username,
            updatedBy: username,
            endpoints: [
                {
                    description: endpointDescriptionRef.current.value,
                    type: endpointMethod,
                    endpoint: endpointURLRef.current.value,
                    role: endpointRolesRef.current.value,
                }
            ],
        }, accessToken)

        props.handleClose();
    };

    const handleChange = (event) => {
        setEndpointMethod(event.target.value);
    };


    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Context</DialogTitle>
            <DialogContent>
                <Typography variant="h5" component="h6" gutterBottom>Context Information</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    inputRef={nameRef}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="Description"
                    inputRef={descriptionRef}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    inputRef={contextRef}
                    id="context"
                    label="Context"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="targetContext"
                    inputRef={targetRef}
                    label="Target Context"
                    type="text"
                    fullWidth
                />
                <Typography variant="h5" component="h6" gutterBottom>Endpoint Information</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointDescription"
                    inputRef={endpointDescriptionRef}
                    label="Endpoint Description"
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="endpointURL"
                    inputRef={endpointURLRef}
                    label="Endpoint"
                    type="text"
                    fullWidth
                />
                <FormLabel>Method</FormLabel>
                <Select
                    labelId="method-select-label"
                    id="method-select"
                    value={endpointMethod}
                    onChange={handleChange}
                    displayEmpty
                    fullWidth
                >
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
                    id="endpointRoles"
                    inputRef={endpointRolesRef}
                    label="Roles"
                    type="text"
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