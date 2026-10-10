global.hubUsers = global.hubUsers || [];
global.hubPosts = global.hubPosts || [
    { id: 1, email: "alex@minecraft.net", pfpLetter: "A", content: "My automated redstone sorting machine is finally working!", fire: 12, heart: 4 },
    { id: 2, email: "steve@minecraft.net", pfpLetter: "S", content: "Warning! A creeper is tracking right outside the spawn area.", fire: 24, heart: 1 }
];
module.exports = { users: global.hubUsers, posts: global.hubPosts };

