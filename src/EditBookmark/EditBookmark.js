import React, { Component } from 'react';
import config from '../config';
import BookmarksContext from '../BookmarksContext'
import './EditBookmark.css'

class EditBookmark extends Component {

    state = {
        error: null,
        id: '',
        title: '',
        url: '',
        description: '',
        rating: 1,
    };

    static contextType = BookmarksContext;

    componentDidMount() {
        const { bookmarkId } = this.props.match.params
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${config.API_KEY}`
            }
        })
        .then(res => {
            if (!res.ok) 
                return res.json().then(error => Promise.reject(error))

                return res.json()
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                title: responseData.title, 
                url: responseData.url,
                description: responseData.description,
                rating: responseData.rating,
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleChangeTitle = e => {
        this.setState({ title: e.target.value })
    };

    handleChangeUrl = e => {
        this.setState({ url: e.target.value })
    };

    handleChangeDescription = e => {
        this.setState({ description: e.target.value })
    };

    handleChangeRating = e => {
        this.setState({ rating: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { bookmarkId } = this.props.match.params
        const { id, title, url, description, rating } = this.state
        const newBookmark = { id, title, url, description, rating }
        fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
            method: 'PATCH',
            body: JSON.stringify(newBookmark),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`
            },
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.resetFields(newBookmark)
            this.context.updateBookmark(newBookmark)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || ' ',
            title: newFields.title || ' ',
            url: newFields.url || ' ',
            description: newFields.description || ' ',
            rating: newFields.rating || ' ',
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error, title, url, description, rating } = this.state 
        return(
            <section className='EditBookmark'>
                <h2>Edit Bookmark</h2>
                <form
                className='EditBookmark__form'
                onSubmit={this.handleSubmit}
                >
                    <div className='EditBookmark__error' role='alert'>
                        { error && <p>{error.message}</p>}
                    </div>
                    <input 
                        type='hidden'
                        name='id'
                    />
                    <div>
                        <label htmlFor='title'>
                            Title
                            {' '}
                        </label>
                        <input 
                        id='title'
                        type='text'
                        name='title'
                        placeholder="Google"
                        required
                        value={title}
                        onChange={this.handleChangeTitle}
                        />
                    </div>

                    <div>
                        <label htmlFor='url'>
                            url
                        </label>
                        <input 
                        id='url'
                        type='text'
                        name='url'
                        placeholder="https://www.google.com"
                        required
                        value={url}
                        onChange={this.handleChangeUrl}
                        />
                    </div>

                    <div>
                        <label htmlFor='description'>
                            Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            value={description}
                            onChange={this.handleChangeDescription} 
                        />
                    </div>

                    <div>
                        <label htmlFor='rating'>
                            Rating
                        </label>
                        <input 
                        type='number'
                        name='rating'
                        id='rating'
                        min='1'
                        max='5'
                        required
                        value={rating}
                        onChange={this.handleChangeRating}
                        />
                    </div>
                    <div className='EditBookmark__buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditBookmark; 