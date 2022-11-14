const NewBlog = props => {
    const {newBlog, setNewBlog, handleNewBlogSubmit} = props
    return (
        <form onSubmit={handleNewBlogSubmit}>
            <h3>Create new blog</h3>
            <div>
                title: <input type="text" name="title" value={newBlog.title} onChange={({target}) => setNewBlog({...newBlog, title: target.value})} />
            </div>
            <div>
                author: <input type="text" name="author" value={newBlog.author} onChange={({target}) => setNewBlog({...newBlog, author: target.value})} />
            </div>
            <div>
                url: <input type="text" name="url" value={newBlog.url} onChange={({target}) => setNewBlog({...newBlog, url: target.value})} />
            </div>
            <button type="submit">create</button>
        </form>
    )
}

export default NewBlog