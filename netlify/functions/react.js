const { getHubData } = require('./shared');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405 };

    try {
        const { postId, type } = JSON.parse(event.body);
        const { store, posts } = await getHubData();
        
        const post = posts.find(p => p.id === parseInt(postId));
        
        if (post) {
            if (post.fire === undefined) post.fire = 0;
            if (post.heart === undefined) post.heart = 0;

            post[type] = (post[type] || 0) + 1;
            
            await store.setJSON('posts', posts); 

            return {
                statusCode: 200,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ success: true })
            };
        }
        return { statusCode: 404, body: "Block data not located!" };
    } catch (err) {
        return { statusCode: 500, body: err.toString() };
    }
};

