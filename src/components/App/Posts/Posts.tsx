import React from 'react'
import { Post } from './Post'
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { useEffect } from 'react'
import { fetchPosts } from '../../../store/postsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

// CSS styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		layout: {
			marginTop: theme.spacing(2),
			marginLeft: 'auto',
			marginRight: 'auto',
			gap: theme.spacing(2),
		},
		paginatorWrapper: {
			display: 'flex',
			marginTop: theme.spacing(5),
			justifyContent: 'center',
			marginBottom: theme.spacing(5),
		},
	})
)

export const Posts = () => {
	const classes = useStyles()

	const posts = useSelector((state: RootState) => state.posts)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts(1))
	}, [dispatch])

	const paginationHandler = (
		event: React.ChangeEvent<unknown>,
		page: number
	) => {
		dispatch(fetchPosts(page))
	}
	return (
		<div>
			<div className={classes.paginatorWrapper}>
				<Pagination onChange={paginationHandler} count={3} color='primary' />
			</div>
			<Grid
				container
				justifyContent='center'
				spacing={2}
				className={classes.layout}
			>
				{posts.list.map((item) => (
					<Post image={item.url} title={item.title} />
				))}
			</Grid>
		</div>
	)
}
