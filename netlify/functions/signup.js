const db = require('./shared');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) return { statusCode: 400, body: JSON.stringify({ error: "Missing fields!" }) };

    const exists = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return { statusCode: 400, body: JSON.stringify({ error: "This player username is already registered!" }) };

    const newUser = {
        email: email.toLowerCase(),
        password, 
        pfpLetter: email.charAt(0).toUpperCase()
    };
    db.users.push(newUser);

    return {
        statusCode: 201,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: { email: newUser.email, pfpLetter: newUser.pfpLetter } })
    };
};
