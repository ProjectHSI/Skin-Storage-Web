var Progress = require("progress")
var ProgressBar = new Progress('We are loading the Skin Storage Web Appilcation. Please Wait. [:bar] Elapsed Time: :elapsed Percentage Complete: :percent', {
    total: 7, width: 20, callback: () => {
        console.log("The program loaded sucessfuly!")
    }
})
var HTTP = require("http")
ProgressBar.tick()
ProgressBar.interrupt("Loaded HTTP Library.")
var FS = require("fs")
ProgressBar.tick()
ProgressBar.interrupt("Loaded FS Library.")
var OS = require("os")
ProgressBar.tick()
ProgressBar.interrupt("Loaded OS Library.")
process.on('uncaughtException', (err) => {
    FS.appendFileSync("./ErrorLog", `${err} ${err.message} ${err.stack}`)
})
ProgressBar.tick()
if (FS.existsSync("./IsAccepted") == false) {
    const server = HTTP.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Hello World! You are getting this message because you have sucessfuly connected to skin storage');
        FS.writeFileSync("./IsAccepted", "true")
        ProgressBar.tick()
        ProgressBar.interrupt("You are connected. Please Restart the program. [Ctrl+C.]")
    })
    server.listen(1337, () => {
        ProgressBar.interrupt("To make sure you can connect to this page. Connect to 127.0.0.1:1337.")
    })
} else {
    if (FS.readFileSync("./IsAccepted") == "true") {
        ProgressBar.tick()
        ProgressBar.interrupt("Authentication Passed. The program will now load.")
        const server = HTTP.createServer((req, res) => {
            var NewVistor = new Progress(`We are loading the Image to the user. Please Wait. [:bar] Elapsed Time: :elapsed Percentage Complete: :percent Loading image: ${req.url}.png`, {
                total: 3, width: 20
            })
            console.log(req.url)
            if (req.url == "/") {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Hello. You have forgot to actually type something to pass through.\nYou should enter http://127.0.0.1/Skin-Here But you didn\'t. Please enter a skin name!');
                NewVistor.interrupt("Error / The user has forgot to type any thing in. Shutting down Progress bar.")
                NewVistor.tick()
                NewVistor.tick()
                NewVistor.tick()
            } else {
                NewVistor.tick()
                NewVistor.interrupt("Info / Request OK.")
                res.statusCode = 202;
                if (FS.existsSync(`./${req.url}.png`) == true) {
                    NewVistor.tick()
                    NewVistor.interrupt("Info / File OK.")
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'image/png');
                    res.end(FS.readFileSync(`./${req.url}.png`));
                    NewVistor.interrupt("Success! / The reqest was completed sucessfully!")
                    NewVistor.tick()
                } else {
                    if (req.url == "/debug-info") {
                        NewVistor.interrupt("Info / Loading Debug Info.")
                        NewVistor.tick()
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/xml');
                        res.end(`<DebugInfo>\n  <SystemInfo>\n  <OSArch>${OS.arch}</OSArch>\n  <OSendianness>${OS.endianness}</OSendianness>\n</SystemInfo>\n</DebugInfo>`);
                        NewVistor.interrupt("Success! / The reqest was completed sucessfully!")
                        NewVistor.tick()
                    }
                    if (req.url == "/favicon.ico") {
                        NewVistor.tick()
                        NewVistor.interrupt("Info / File OK.")
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'image/png');
                        res.end(FS.readFileSync(`./favicon.png`));
                        NewVistor.interrupt("Success! / The reqest was completed sucessfully!")
                        NewVistor.tick()
                    } else {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Invaild Skin - File Does not exist - 404');
                        NewVistor.interrupt("Error / The user has typed in an invaild image.. Shutting down Progress bar.")
                        NewVistor.tick()
                        NewVistor.tick()
                        NewVistor.tick()
                    }
                }
            }
        })
        server.listen(80, () => {
            ProgressBar.interrupt("Connected on http://127.0.0.1")
            ProgressBar.tick()
            ProgressBar.tick()
        })
    }
}