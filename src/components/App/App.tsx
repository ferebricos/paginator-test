import React from 'react'
import { useDispatch } from 'react-redux'
import { Posts } from './Posts/Posts'
import {
	AppBar,
	createStyles,
	makeStyles,
	Toolbar,
	Typography,
	Theme,
} from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
)

const App: React.FC = () => {
	const classes = useStyles()

	return (
		<div>
			<AppBar position='sticky'>
				<Toolbar variant='dense'>
					<Typography variant='h6' className={classes.title}>
						Paginator
					</Typography>
				</Toolbar>
			</AppBar>
			<Posts />
		</div>
	)
}

export default App
