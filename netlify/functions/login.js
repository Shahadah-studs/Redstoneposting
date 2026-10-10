const db = require('./shared');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405 };
    const { email, password } = JSON.parse(event.body);

    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
        const exists = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return { statusCode: 401, body: JSON.stringify({ error: "Incorrect password selection!" }) };
        
        // Auto-register feature if account doesn't exist yet
        const newUser = { email: email.toLowerCase(), password, pfpLetter: email.charAt(0).toUpperCase() };
        db.users.push(newUser);
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: { email: newUser.email, pfpLetter: newUser.pfpLetter } })
        };
    }

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email: user.email, pfpLetter: user.pfpLetter } })
    };
};
