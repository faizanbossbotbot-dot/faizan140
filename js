// Search functionality
(function() {
    const searchData = [
        { title: 'How AI is Revolutionizing Business', url: '/articles/ai-revolutionizing-business.html', keywords: 'ai, artificial intelligence, business, machine learning' },
        { title: 'Cryptocurrency Investment Guide', url: '/articles/crypto-investment-guide.html', keywords: 'crypto, bitcoin, investment, blockchain, ethereum' },
        { title: 'SEO Strategies 2024', url: '/articles/seo-strategies-2024.html', keywords: 'seo, search engine, optimization, google, ranking' },
        { title: 'Web Development Trends', url: '/articles/web-development-trends.html', keywords: 'web, development, programming, javascript, frontend' },
        { title: 'Cloud Computing Guide', url: '/articles/cloud-computing-guide.html', keywords: 'cloud, computing, infrastructure, aws, azure' },
        { title: 'Python Programming Guide', url: '/articles/python-programming-guide.html', keywords: 'python, programming, coding, developer, tutorial' },
        { title: 'Machine Learning Basics', url: '/articles/machine-learning-basics.html', keywords: 'machine learning, ai, data science, algorithm' },
        { title: 'Startup Guide for Entrepreneurs', url: '/articles/startup-guide.html', keywords: 'startup, business, entrepreneur, funding, investment' },
        { title: 'Digital Marketing Trends', url: '/articles/digital-marketing-trends.html', keywords: 'marketing, digital, social media, seo, content' },
        { title: 'Cybersecurity Best Practices', url: '/articles/cybersecurity-practices.html', keywords: 'security, cyber, password, encryption, hacking' },
    ];

    window.performSearch = function(query) {
        const results = searchData.filter(item => {
            const searchTerm = query.toLowerCase();
            return item.title.toLowerCase().includes(searchTerm) ||
                   item.keywords.toLowerCase().includes(searchTerm);
        });
        return results;
    };

    // Handle search query from URL
    function handleSearchQuery() {
        const params = new URLSearchParams(window.location.search);
        const query = params.get('q');
        
        if (query && document.getElementById('search-results')) {
            const results = performSearch(query);
            displaySearchResults(results, query);
        }
    }

    function displaySearchResults(results, query) {
        const container = document.getElementById('search-results');
        if (!container) return;

        let html = `<h2>Search Results for "${query}"</h2>`;
        
        if (results.length === 0) {
            html += '<p>No results found. Try different keywords.</p>';
        } else {
            html += `<p>Found ${results.length} result(s)</p>`;
            html += '<div class="search-results-list">';
            results.forEach(result => {
                html += `
                    <div class="search-result-item">
                        <h3><a href="${result.url}">${result.title}</a></h3>
                        <p class="result-url">${result.url}</p>
                    </div>
                `;
            });
            html += '</div>';
        }
        
        container.innerHTML = html;
    }

    // Auto-run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleSearchQuery);
    } else {
        handleSearchQuery();
    }
})();
