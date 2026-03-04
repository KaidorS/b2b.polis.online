import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState('');
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetch(`/api/articles/${id}`)
            .then(res => res.json())
            .then(data => {
                setArticle(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch(`/api/articles/${id}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ author_name: author, content: comment })
        })
            .then(res => res.json())
            .then(newComment => {
                // Добавляем комментарий в локальный стейт без повторной загрузки статьи
                setArticle(prev => ({
                    ...prev,
                    comments: [...prev.comments, newComment]
                }));
                setAuthor('');
                setComment('');
                setSubmitting(false);
            })
            .catch(err => {
                console.error(err);
                setSubmitting(false);
            });
    };

    if (loading) return <div>Loading...</div>;
    if (!article) return <div>Article not found</div>;

    return (
        <div>
            <button onClick={() => navigate('/')}>Back to list</button>
            <h1>{article.title}</h1>
            <p><em>Published: {new Date(article.created_at).toLocaleString()}</em></p>
            <div>{article.content}</div>

            <h2>Comments</h2>
            {article.comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                article.comments.map(comm => (
                    <div key={comm.id} style={{ borderBottom: '1px solid #eee', marginBottom: '1rem' }}>
                        <strong>{comm.author_name}</strong> <em>{new Date(comm.created_at).toLocaleString()}</em>
                        <p>{comm.content}</p>
                    </div>
                ))
            )}

            <h3>Add a comment</h3>
            <form onSubmit={handleCommentSubmit}>
                <div>
                    <label>Your name:</label><br />
                    <input
                        type="text"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label><br />
                    <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        rows="3"
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default ArticleDetail;