const { getStore } = require('@netlify/blobs');

async function getHubData() {
    const store = getStore('redstoneposting_store');
    
    let users = await store.get('users', { type: 'json' }) || [];
    let posts = await store.get('posts', { type: 'json' });

    if (!posts) {
        posts = [
            { id: 1, email: "alex@minecraft.net", pfpLetter: "A", content: "My automated redstone sorting machine is finally working!", fire: 12, heart: 4 },
            { id: 2, email: "steve@minecraft.net", pfpLetter: "S", content: "Warning! A creeper is tracking right outside the spawn area in midbay.", fire: 24, heart: 1 }
        ];
        await store.setJSON('posts', posts);
    }
    
    return { store, users, posts };
}

module.exports = { getHubData };

