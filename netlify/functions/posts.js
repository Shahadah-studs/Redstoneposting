const db = require('./shared');

exports.handler = async (event) => {
    const method = event.httpMethod;

    if (method === "GET") {
        const queryParams = event.queryStringParameters;
        let result = db.posts;
        
        // If profile filtering is called
        if (queryParams && queryParams.email) {
            result = db.posts.filter(p => p.email.toLowerCase() === queryParams.email.toLowerCase());
        }

        return {
            statusCode: 200,
            headers: { 
                "Content-Type": "application/json",
                "Cache-Control": "no-cache, no-store, must-revalidate"
            },
            body: JSON.stringify(result)
        };
    }

    if (method === "POST") {
        const data = JSON.parse(event.body);
        const newPost = {
            id: Date.now(),
            email: data.email,
            pfpLetter: data.pfpLetter || data.email.charAt(0).toUpperCase(),
            content: data.content,
            redstone: 0,
            tnt: 0
        };
        db.posts.unshift(newPost);

        return {
            statusCode: 201,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPost)
        };
    }

    return { statusCode: 405 };
};

