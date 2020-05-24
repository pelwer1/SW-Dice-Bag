// macro to display buttons for rolling common SW dice
// /em Choose Dice...   [**d4w**](!SW-Dice --d4w)[**d6w**](!SW-Dice --d6w)
// [**d8w**](!SW-Dice --d8w)[**d10w**](!SW-Dice --d10w)[**d12w**](!SW-Dice --d12w)
// [**2d4!**](!SW-Dice --2d4!)[2d6!](!SW-Dice --2d6!)[3d6!](!SW-Dice --3d6!)
// [2d8!](!SW-Dice --2d8!)[2d10!](!SW-Dice --2d10!)
// [2d12!](!SW-Dice --2d12!)[d100](!SW-Dice --d100)
//
// send api call to parser below
//
// -----------------------------------  START ----------------------------
// catch the invocation command (!SW-Dice )
on('chat:message', function(msg) {

   // Only run when message is an api type and contains "!SW-Dice"
   if (msg.type === 'api' && msg.content.indexOf('!SW-Dice') !== -1) {

    var args = [];
    
    args = msg.content
        .replace(/<br\/>\n/g, ' ')
        .replace(/(\{\{(.*?)\}\})/g," $2 ")
        .split(/\s+--/);
        
    // bail out if api call is not to SW-Dice
    if (args.shift() !== "!SW-Dice") {
        // log('-=> SW Dice: Not calling [!SW-Dice] exiting... <=- ');
		return;
	 }

    // HR
    sendChat("Rolling", "--- " + args[0] + " ---");  

    var numRolls = 1;
    if (args[1] && args[1] > 1) {   
       numRolls = args[1];
    }

    // parse dice

//     if (args[0] === "d4w") {       
//         sendChat("Skill", "[[d4!cf<1]] Wild:[[d6!cf<1]] Frenzy: [[d4!]] [[d4!]] ");
//         return;
// 	 }
//     if (args[0] === "d6w") {
//         sendChat("SW-Dice", "d6!:[[d6!]] W:[[d6!]]");
//         return;
// 	 }
//     if (args[0] === "d8w") {
//         sendChat("SW-Dice", "d8!:[[d8!]] W:[[d6!]]");
//         return;
// 	 }
//     if (args[0] === "d10w") {
//         sendChat("SW-Dice", "d10!:[[d10!]] W:[[d6!]]");
//         return;
// 	 }
//     if (args[0] === "d12w") {
//         sendChat("SW-Dice", "d12!:[[d12!]] W:[[d6!]]");
//         return;
// 	 }
	 

	 var skillDie = "";
    if (args[0] === "d4w") {
        skillDie = "d4";        
 	 }
    if (args[0] === "d6w") {
        skillDie = "d6";        
	 }
    if (args[0] === "d8w") {
        skillDie = "d8";        
	 }
    if (args[0] === "d10w") {
        skillDie = "d10";        
	 }
    if (args[0] === "d12w") {
        skillDie = "d12";        
	 }
	 
	 var i;
	 for (i = 0; i < numRolls; i++) {
   	 if (args[0].includes('w')) {
	        sendChat("", "**Skill:** [[" + skillDie + "!cf<1]] Wild:[[d6!cf<1]] Frenzy: " + "[[" + skillDie + "!cf<1]]" + "[[" + skillDie + "!cf<1]]" );
	    }
       else {
   	    // default to rolling whatever is passed
          sendChat("", "**Damage:** [[" + args[0] + "]] Raise: [[d6!cf<1]]");  
       }
    }
    return; 
  }
});
