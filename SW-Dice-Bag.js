// macro to display buttons for rolling common SW dice
// Usage: !SW-Dice --trait --d6 -7  (roll d6! and no wild 7 times)
// Usage: !SW-Dice --trait --d6w -7  (roll d6! and d6! wild 7 times)
// Usage: !SW-Dice --damage --2d6 -7  (roll 2d6! and d6! raise 7 times)
//
//
// send api call to parser below
//
// -----------------------------------  START ----------------------------
//
// Trick from Aaron to fix "Syntax Error: Unexpected Identifier" - put a ";" at top of script
// The API Server concatenates all the scripts together, which can lead to code that isn't
// correct when a programmer relies on automatic semicolon insertion.
;

on('ready', () => {
    const version = '1.1.0'; // script version
    log('-=> SW-Dice v' + version + ' <=-');

    // catch the invocation command (!SW-Dice )
    on('chat:message', function (msg) {

        // Only run when message is an api type and contains "!SW-Dice"
        if (msg.type === 'api' && msg.content.indexOf('!SW-Dice') !== -1) {

            var args = [];

            args = msg.content
                .replace(/<br\/>\n/g, ' ')
                .replace(/(\{\{(.*?)\}\})/g, " $2 ")
                .split(/\s+--/);

            // bail out if api call is not to SW-Dice
            if (args.shift() !== "!SW-Dice") {
                // log('-=> SW Dice: Not calling [!SW-Dice] exiting... <=- ');
                return;
            }

            if (!(args[0] && args[1] && args[2])) { // args [0]   [1]  [2]
                sendChat("SW-Dice", "\nUsage: !SW-Dice --trait --d6w --6  (roll type (trait|damage), roll string(d6|d6w), # rolls)");
                return;
            }

            var numRolls = parseInt(args[2]) + 1; // loop counts from 1

            // parse dice
            var skillDie = args[1];
            if (args[1] === "d4w") {
                skillDie = "d4";
            }
            if (args[1] === "d6w") {
                skillDie = "d6";
            }
            if (args[1] === "d8w") {
                skillDie = "d8";
            }
            if (args[1] === "d10w") {
                skillDie = "d10";
            }
            if (args[1] === "d12w") {
                skillDie = "d12";
            }

            // build up the table for output
            var print_table = "&{template:default}  {{name=**" + args[0].toUpperCase() + "** Roll: " + args[1] + "}}";


            var i;
            for (i = 1; i < numRolls; i += 1) {
                if (args[0].includes('trait')) {
                    if (args[1].includes('w')) {
                        print_table = print_table + "{{ " + i.toString() + ":=Trait: [[" + skillDie + "!]], Wild:[[d6!]] }}";
                    }
                    else {
                        print_table = print_table + "{{ " + i.toString() + ":=Trait: [[" + skillDie + "!]]  }}";
                    }
                }
                else {
                    print_table = print_table + "{{ " + i.toString() + ":=Damage: [[" + skillDie + "!]], Raise:[[d6!]] }}";
                }
            }
            // print result
            sendChat("SW-Dice", "\n"+print_table);

        } // end if msg SW Dice

    }); // end on chat message
}); // end on ready
