import { Card, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useState } from 'react'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		card: {
			maxWidth: 280,
			width: 280,
		},
		media: {
			width: '100%',
			maxHeight: 140,
		},
		title: {
			margin: theme.spacing(2),
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
		},
		description: {
			margin: theme.spacing(2),
		},
		skeleton: {
			width: '100%',
			height: 140,
		},
	})
)

interface PostProps {
	title: string
	image: string
}

export const Post = ({ title, image }: PostProps) => {
	const classes = useStyles()
	const [imageLoadedStatus, setImageLoadedStatus] = useState(false)

	return (
		<Card variant='outlined' className={classes.card}>
			{imageLoadedStatus ? (
				<div>
					<div className={classes.title}>{title}</div>
					<img alt={''} className={classes.media} src={image} />
					<div className={classes.description}>Some description</div>
				</div>
			) : (
				<div>
					<div className={classes.title}>
						<Skeleton variant='text' />
					</div>
					<Skeleton variant='rect' className={classes.skeleton}></Skeleton>
					<img
						alt={''}
						hidden
						src={image}
						onLoad={() => setImageLoadedStatus(true)}
					/>
					<div className={classes.description}>
						<Skeleton variant='text' />
					</div>
				</div>
			)}
		</Card>
	)
}
