import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ArticlesList from './components/ArticlesList';
import ArticleDetail from './components/ArticleDetail';
import ArticleForm from './components/ArticleForm';

function App() {
    return (
        <BrowserRouter>
            <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
                <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
                <Link to="/new">New Article</Link>
            </nav>
            <div style={{ padding: '1rem' }}>
                <Routes>
                    <Route path="/" element={<ArticlesList />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="/new" element={<ArticleForm />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;