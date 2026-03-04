import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ArticleForm() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        fetch('/api/articles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content })
        })
            .then(res => res.json())
            .then(article => {
                navigate(`/article/${article.id}`);
            })
            .catch(err => {
                console.error(err);
                setSubmitting(false);
            });
    };

    return (
        <div>
            <h1>Create New Article</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        maxLength="255"
                    />
                </div>
                <div>
                    <label>Content:</label><br />
                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        rows="10"
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Creating...' : 'Create Article'}
                </button>
            </form>
        </div>
    );
}

export default ArticleForm;