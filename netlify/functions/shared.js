global.hubUsers = global.hubUsers || [];
global.hubPosts = global.hubPosts || [
    { id: 1, email: "alex@minecraft.net", pfpLetter: "A", content: "My automated redstone sorting machine is finally working!", redstone: 12, tnt: 0 },
    { id: 2, email: "steve@minecraft.net", pfpLetter: "S", content: "Warning! A creeper is tracking right outside the spawn area.", redstone: 2, tnt: 24 }
];
module.exports = { users: global.hubUsers, posts: global.hubPosts };
