import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface PostListItem {
	title: string
	url: string
}

export interface StateType {
	list: Array<PostListItem>
	fetchingInfo: {
		status: 'pending' | 'fulfilled' | 'rejected'
		error: string | undefined
	}
	currentPageNumber: number
	countItemsOnPage: number
}

interface ServerError {
	message: string
}

const initialState: StateType = {
	list: [],
	fetchingInfo: {
		status: 'pending',
		error: undefined,
	},
	currentPageNumber: 1,
	countItemsOnPage: 1,
}

export const fetchPosts = createAsyncThunk<
	any,
	number,
	{
		rejectValue: ServerError
	}
>('posts/fetchPosts', async (page = 1, { rejectWithValue }) => {
	try {
		const response = await fetch(
			`http://jsonplaceholder.typicode.com/photos?_start=` +
				(4978 + page * 6) +
				`&_limit=6`
		)
		if (!response.ok) {
			throw new Error('Server error!')
		}
		let data: { list: Array<PostListItem> } = {
			list: await response.json(),
		}
		return data
	} catch (error) {
		return rejectWithValue(error)
	}
})

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.fetchingInfo.status = 'pending'
			state.list = []
		})
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.fetchingInfo.status = 'fulfilled'
			state.list = action.payload.list
		})
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.fetchingInfo.status = 'rejected'
			state.fetchingInfo.error = action.payload?.message
		})
	},
})

export default postsSlice.reducer
