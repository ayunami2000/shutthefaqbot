const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

var recents = [];

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({status: 'dnd'});
  client.user.setActivity({
    type: 'WATCHING',
    name: 'users of eaglercraft'
  });
});

client.on('messageCreate', msg => {
  if(recents.includes(msg.author.id))return;
  if(msg.author===client.user)return;
  var matched = true;
  if(msg.channel.id==936480157802307664){
    sendHelp(msg, 4, true);
    matched = false;
  }else if(msg.content.match(/stop ask(ing)?/gi)){
    matched = false;
  }else if (msg.content.match(/ho(w|e) +(do(e?s)?( +(i|you|u))?|to( +(i|you|u))?) +(cre?ae?te? +(an? +|(my +)?own +)?ser?vr?er?|make +(an? +|(my +)?own +)?ser?vr?er?|host( +(an? +|(my +)?own +)?ser?vr?er?|(th|d)is)?)/gi)) {
    sendHelp(msg, 0);
  }else if(msg.content.match(/(why|i) +can'?t +(i +)?join +(the +)?(creative(\/| +(or|and) +)survival +|creative +|survival +|demo +)?ser?vr?er/gi)){
    sendHelp(msg, 1);
  }else if(msg.content.match(/((why|i) +can'?t +(i +)?use +|why +do(es)?n'?t +)[a-z0-9 ']+ +work/gi)){
    sendHelp(msg, 2);
  }else if(msg.content.match(/can('?t)? +(you +(guys +)?|y'?all +)update +(it|the +ser?vr?er|the +game|the +client|minecraft|mine +craft)?/gi)){
    sendHelp(msg, 3);
  }else{
    matched = false;
  }
  if(matched){
    recents.push(msg.author.id);
    setTimeout(()=>{
      recents.splice(recents.indexOf(msg.author.id), 1);
    }, 3*60*1000);
  }
});

const topics =  [
                  [
                    "How do I create a server?",
                    [
                      "Notice: you need Java 8 or above to host your own server.",
                      "Download the [stable-download.zip](https://github.com/LAX1DUDE/eaglercraft/raw/main/stable-download/stable-download.zip) file from the GitHub repository.",
                      "Extract it to its own folder.",
                      "Run the **.bat** files inside the `java/bungee_command/` directory and in the `java/bukkit_command/` directory.",
                      "(Easy/quick method) Go to the `web` folder and open the **standalone .HTML file**.",
                      "(Better/slow method) Host an HTTP server at the `web` directory (refer to the README on the GitHub repository for HTTP servers) and open __localhost:port__ in your browser (replacing `port` with the port that the HTTP server is running on)."
                    ]
                  ],
                  [
                    "Why can't I join the creative/survival server?",
                    [
                      "The servers are currently overloaded, or you have been banned. If neither of these are the case, contact <@237080395747819520> or <@214118574485143553> to report them as down."
                    ]
                  ],
                  [
                    "Why doesn't [x] work?",
                    [
                      "**Referring to slowness/unresponsiveness?** The servers are likely currently overloaded, or you are expecting too much out of your browser.\n**Referring to a feature that is missing?** This version of Minecraft is very old; version 1.5.2; so it does not support all of the newer features of modern Minecraft."
                    ]
                  ],
                  [
                    "Can you make it for a newer version?",
                    [
                      "We are currently working on creating a 1.8.8 version, but it will take a while."
                    ]
                  ],
                  [
                    "how to maek ser ver  ? !",
                    [
                      "[https://github.com/LAX1DUDE/eaglercraft#installing](https://github.com/LAX1DUDE/eaglercraft#installing)"
                    ]
                  ]
                ];

function sendHelp(msg, topic, fardmode){
	if(fardmode==null)fardmode=false;
    const embed = new MessageEmbed()
                  .setTitle(topics[topic][0])
                  .setColor("RANDOM");
    if(topics[topic][1].length==1){
      embed.addField("Solution", topics[topic][1][0], false);
    }else{
      for(var i=0;i<topics[topic][1].length;i++)embed.addField("Step "+(i+1), topics[topic][1][i], false);
    }
    if(!fardmode)embed.setFooter({ text: msg.author.username+" requested this, 3 minutes until next question will be answered.", iconURL: msg.author.avatarURL() });
    msg.reply(fardmode?({ embeds: [embed] }):({ embeds: [embed], "allowedMentions": { "users" : []}}));
}

client.login(require('fs').readFileSync('../tok.txt', {encoding: 'utf8', flag: 'r'}));