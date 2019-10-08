const Discord = require('discord.js'); //ZyTon#555
const client = new Discord.Client();
const prefix = '%';
const Jimp = require('jimp');
const diff = require('color-diff');
const twemoji = require('twemoji');
 
client.on("message", async message => {
var args = message.content.split(" ");
 

var emojiRgb = [
  {R: 255, G: 255, B: 255, E: ":full_moon:‎"},    // white
  {R: 0, G: 0, B: 0, E: ":black_large_square:‎"},          // black
  {R: 255, G: 0, B: 0, E: ":red_circle:‎"},                // red
  {R: 0, G: 255, B: 0, E: ":green_heart:‎"},               // green
  {R: 0, G: 0, B: 255, E: ":blue_heart:‎"},                // blue
  {R: 253, G: 203, B: 85, E: ":fork_knife_plate:‎"},           // yellow
  {R: 154, G: 78, B: 28, E: ":briefcase:‎"},               // brown
  {R: 102, G: 117, B: 127, E: ":new_moon:‎"},              // gray
  {R: 146, G: 102, B: 204, E: ":purple_heart:‎"},         // purple
  {R: 89, G: 142, B: 60, E: ":green_apple:‎"},             // pepe green
  {R: 92, G: 172, B: 235, E: ":large_blue_circle:‎"},   // joy emoji tears blue
  {R: 0, G: 0, B: 0, E: "⬛️‎"},
    {R: 0, G: 0, B: 85, E: "🌑‎"},
    {R: 0, G: 52, B: 0, E: "🥦‍"},
    {R: 0, G: 52, B: 255, E: ":information_source:‎"},
    {R: 0, G: 255, B: 0, E: "📗‎"},
    {R: 0, G: 255, B: 255, E: ":green_apple:‍"},
    {R: 255, G: 255, B: 255, E: "🦋‎"},
    {R: 85, G: 0, B: 0, E: "👞️‎"},
  {R: 85, G: 0, B: 255, E: "👖‎"},
    {R: 85, G: 85, B: 0, E: ":boot: ‎"},
    {R: 85, G: 85, B: 85, E: ":koala:‎"},
    {R: 85, G: 85, B: 0, E: "🍀‎"},
    {R: 85, G: 255, B: 85, E: "🔫‎"},
    {R: 85, G: 255, B: 255, E: "🐬‎"},
    {R: 255, G: 0, B: 0, E: "🅰️️‎"},
    {R: 255, G: 0, B: 85, E: ":rotating_light:‎"},
    {R: 255, G: 0, B: 255, E: ":hibiscus:‎"},
    {R: 255, G: 85, B: 0, E: ":large_orange_diamond:‎"},
    {R: 255, G: 85, B: 85, E: "🦐‎"},
    {R: 255, G: 255, B: 0, E: "🌕‎"},
    {R: 255, G: 255, B: 255, E: "📒‎"},                    
//  {R: 255, G: 255, B: 255, E: "‎"}
//  {R: 255, G: 255, B: 255, E: "‎"}
//  {R: 255, G: 255, B: 255, E: "‎"}
];
if(message.content.startsWith(prefix + "emoji")) { //
    if(args.length < 2) return message.channel.send("**:warning: تحذير هذا الكود يعمل بي واسطه  الاموجي او رابط الصوره.**");
   
   
 
   
    var emojiName = args[1].split(":")[1];
    var emoji = client.emojis.find(e => e.name == emojiName);
 
    var url = "";
 
    if(!emoji){
     
        if(args[1].endsWith(".png") || args[1].endsWith(".jpg") || args[1].endsWith(".gif")){
            url = args[1];
        }else{
           
            var text = twemoji.parse(args[1]);
            if(!text.startsWith("<img")){
                message.channel.send("**Error. يعمل فقط علي الايموجهات التي موجوده في السيرفر ويقبل ايضا  png / gif / jpg **");
                return;
            }
            var pos = text.indexOf("src");
            text = text.substring(pos + 5);
            text = text.substring(0, text.length - 3);
            url = text;
        }
    }
 
 
    if(url == ""){
        url = emoji.url;
        message.channel.send(url);
    }else{
        message.channel.send("-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-Toxic Codes Is Back-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-=-=-=-=-=-=-");
    }
 
    var palette = [];
    for(var i = 0; i < emojiRgb.length; i++){
        var obj = {
            R: emojiRgb[i].R,
            G: emojiRgb[i].G,
            B: emojiRgb[i].B,
        }
        palette.push(obj);
    }
    var transColors = [];
 
    var imgName = "images/emoji.png";
 
    Jimp.read(url, (err, img) => {
        if(err){
            message.channel.send("Error. Could not read image.");
            return;
        }
        img
            .resize(30, 30)
            .write(imgName, () => {
               
                Jimp.read(imgName, (err, img) => {
                    if(err) throw err;
                    for(var i = 0; i < 30; i++){
                        for(var j = 0; j < 30; j++){
                            var hex = img.getPixelColor(j, i);
                            var rgb = Jimp.intToRGBA(hex);
                            var color = {
                                R: rgb.r,
                                G: rgb.g,
                                B: rgb.b
                            };
                            transColors.push(diff.closest(color, palette));
                        }
                    }
 
                   
                    var results = [];
                    for(var i = 0; i < transColors.length; i++){
                        var e2 = Object.values(transColors[i]);
 
                        for(var j = 0; j < emojiRgb.length; j++){
                            var e1 = Object.values(emojiRgb[j]).slice(0, -1);
                            var e3 = false;
                            if(e1[0] == e2[0] && e1[1] == e2[1] && e1[2] == e2[2]) e3 = true;
 
                            if(e3){
                                results.push(emojiRgb[j].E);
                                break;
                            }
                        }
                    }
 
                   
                    for(var mul = 0; mul < 10; mul++){
                        var string1 = "";
                        var string2 = "";
                        var string3 = "";
                        var base = 90 * mul;
 
                        for(var i = 0; i < 30; i++){
                            string1 += results[i + base];
                            string2 += results[i + 30 + base];
                            string3 += results[i + 60 + base];
                        }
 
                        message.channel.send(string1 + "\n" + string2 + "\n" + string3);
                    }
 
                });
            });
    });
  };
});





client.login(process.env.BOT_TOKEN);
