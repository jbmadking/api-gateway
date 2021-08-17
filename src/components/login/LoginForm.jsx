import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AuthService from '../../services/AuthService';
import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(4)
	},
	TextField: {
		flexBasis: 280,
		width: '50%',
		margin: theme.spacing(2)
	},
	buttonLogin: {
		backgroundColor: '#2E76CF',
		color: 'white',
		width: '50%',
		'&:hover': {
			backgroundColor: '#173b67'
		}
	},
	div: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		paddingRight: 100,
		paddingLeft: 100,
		paddingTop: 30
	},
	mainDiv: {
		position: 'relative'
	}
}));

export default function LoginForm() {
	const classes = useStyles();

	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const grantType = 'password';

	const handleUsernameChange = (e) => {
		setUserName(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};

	const handleLogin = () => {
		AuthService.login(dispatch, username, password, grantType);
	};

	return (
		<div className={classes.mainDiv}>
			<div className={classes.div}>
				<Grid container className={classes.root}>
					<Grid item xs={12}>
						<h2>Please enter your login details</h2>
					</Grid>
					<Grid item xs={12}>
						<form noValidate autoComplete="off">
							<TextField
								id="username-text-field"
								label="User Email"
								value={username}
								fullWidth
								onChange={handleUsernameChange}
								className={classes.TextField}
								variant="outlined"
							/>
							<TextField
								id="password-password-field"
								label="User Password"
								type="password"
								value={password}
								onChange={handlePasswordChange}
								className={classes.TextField}
								fullWidth
								variant="outlined"
							/>
							<TextField
								id="target-text-field"
								label="Grant Type"
								value={grantType}
								disabled={true}
								className={classes.TextField}
								fullWidth
								variant="outlined"
							/>
						</form>
					</Grid>
					<Grid item xs={12}>
						<Button className={classes.buttonLogin} onClick={handleLogin} variant="outlined">
							Login
						</Button>
					</Grid>
				</Grid>
			</div>
		</div>
	);
}
