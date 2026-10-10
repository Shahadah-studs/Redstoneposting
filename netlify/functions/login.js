const { getHubData } = require('./shared');

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") return { statusCode: 405 };
    const { email, password } = JSON.parse(event.body);

    const { store, users } = await getHubData();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    
    if (!user) {
        const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (exists) return { statusCode: 401, body: JSON.stringify({ error: "Incorrect password selection!" }) };
        
        const newUser = { email: email.toLowerCase(), password, pfpLetter: email.charAt(0).toUpperCase() };
        users.push(newUser);
        await store.setJSON('users', users);
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

