import {Client} from 'guilded.js';
import {Client as DClient} from 'discord.js';
import { DTOKEN, TOKEN } from './token';
const client = new Client({token: TOKEN});
const dclient = new DClient({
    intents: ["Guilds", "GuildMessages", "MessageContent"]
})

client.on("ready", () => {
    console.log("Bot logged in!");
});

client.on("messageCreated", (message) => {
    if(message.author?.type == 0) return;
    if(message.channelId != "f5b11ae7-5b69-4a7b-94be-e26a538c395f") return;
    const c = dclient.channels.cache.get("1057375829442703441")
    if(!c || c.type !== 0) return;

    c.send(message.content);
});

dclient.on("messageCreate", (message) => {
    if(message.channelId !== "1057375829442703441") return;
    if(message.author.bot) return;
    client.channels.fetch("f5b11ae7-5b69-4a7b-94be-e26a538c395f").then(channel => {
        console.log(channel.name);
        channel.send(message.content);
    }).catch(e => console.log(e));
})

client.login();
dclient.login(DTOKEN);
