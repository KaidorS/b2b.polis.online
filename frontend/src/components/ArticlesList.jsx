import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ArticlesList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Articles</h1>
            {articles.map(article => (
                <div key={article.id} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '1rem' }}>
                    <h2>
                        <Link to={`/article/${article.id}`}>{article.title}</Link>
                    </h2>
                    <p><em>{new Date(article.created_at).toLocaleDateString()}</em></p>
                    <p>{article.content.substring(0, 200)}...</p>
                </div>
            ))}
        </div>
    );
}

export default ArticlesList;