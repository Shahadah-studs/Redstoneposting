const db = require('./shared');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405 };

    try {
        const { postId, type } = JSON.parse(event.body);
        const post = db.posts.find(p => p.id === parseInt(postId));
        
        if (post) {
            post[type] = (post[type] || 0) + 1;
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

