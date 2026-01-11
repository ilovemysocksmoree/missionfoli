import {formatDistanceToNow, formatDistanceToNowStrict} from "date-fns"
import packageJson from "../../../package.json"
import themes from "../../../themes.json"

const shader = `
precision highp float;
uniform sampler2D src;
uniform vec2 offset;
uniform vec2 resolution;
uniform float time;
out vec4 outColor;

vec4 readTex(vec2 uv) {  
  vec4 c = texture(src, uv);  
  c.a *= smoothstep(.5, .499, abs(uv.x - .5)) * smoothstep(.5, .499, abs(uv.y - .5));  // smooth edge
  return c;
}

vec2 zoom(vec2 uv, float t) {
  return (uv - .5) * 1. + .5;
}
float wave(float y) {
  return sin(y * 1190. + time * 3.) * sin(y * 1001. + time * 7.) * sin(y * 1479. + time * .5) * 0.001;
}
float rand(vec3 p) {
  return fract(sin(dot(p, vec3(829., 4839., 432.))) * 39428.);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - offset) / resolution;       
  
  vec2 p = uv * 2. - 1.;
  p.x *= resolution.x / resolution.y;
  float l = length(1.); 
   
  // distort
  float dist = pow(l, 2.) * .3;
  dist = smoothstep(0., 1., dist);
  uv = zoom(uv, 0.5 + 0.);  
    
  // blur
  vec2 du = (uv - .1);
  float a = atan(p.y, p.x);
  float rd = rand(vec3(a, time, 0));
  uv = (uv - .5) * (1.0 + rd * pow(l * 0.7, 3.) * 0.3) + .5;
    
  vec2 uvr = uv;
  vec2 uvg = uv;
  vec2 uvb = uv;
    
  // aberration
  float d = (1. + sin(uv.y * 20. + time * 3.) * 0.1) * 0.05;
  uvr.x += 0.0005;
  uvb.x -= 0.0005;
  uvr = zoom(uvr, 1. + d * l * l);
  uvb = zoom(uvb, 1. - d * l * l);    
    
  vec4 cr = readTex(uvr);
  vec4 cg = readTex(uvg);
  vec4 cb = readTex(uvb);  
  
  outColor = vec4(cr.r, cg.g, cb.b, cg.a); 
  
  vec4 deco;

  // scanline
  float res = resolution.y;
  deco += (
    sin(uv.y * res * .7 + time * 100.) *
    sin(uv.y * res * .3 - time * 130.)
  ) * 0.05;

  // grid
  deco += smoothstep(.01, .0, min(fract(uv.x * 20.), fract(uv.y * 20.))) * 0.1;

  outColor += deco * smoothstep(2., 0., l);
  
  // vignette
  outColor *= 1.8 - l * l;  


  // dither
  outColor += rand(vec3(p, time)) * 0.3;     
}
`

const macos = `
                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    
 XMMMMMMMMMMMMMMMMMMMMMMMX.      
;MMMMMMMMMMMMMMMMMMMMMMMM:       
:MMMMMMMMMMMMMMMMMMMMMMMM:       
.MMMMMMMMMMMMMMMMMMMMMMMMX.      
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   
    kMMMMMMMMMMMMMMMMMMMMMMd     
     ;KMMMMMMMWXXWMMMMMMMk.      
       .cooc,.    .,coo:.        
`

const theLyraHaruto = `
DIYA KARMACHARYA`

const lyra = `           
                                             :--==++#=-.:                              
                                      -+===+*%@%%%%@%%%%#+:.                           
                                   -=*#%%%%%%%%@%###%%@@@@@*-:::::                     
                                .-*%@@%%%%%%%%%#%@@@@@@@@%@@%%%%%%+:.:::               
                               -%@%%#%%%%%%%%%%@@@@%%%%%%%@@@@%##%@@@%*+-.::           
                             -*@@%%%%@%%%%%%%%@@%@%%%######%%%@@%%%##%%%%##+-:         
                            -*%%%#%%%%%%%%%%%@%%#*#**********##%%@%%%%%%%####+:        
                           +%%%%%%%%%%%%%%%%%%###**************##%%%%%%%##%%#%+.       
                          =#%%#%%%%%%%%%@%%@%%##***+++++**********#%%%%%%%%**##+:      
                         :#%%##%@##%%%%%%%##*+++++****+++++++*******%%%%%#%%+*#*.      
                         +%%##%@%%%%%%%##**+++++++++++++++++++++++**#%#%%##%#+++       
                        -%%#%%@##%#%%%#**++++++++++++++++++++++++****%######%+*        
                       :+#%#%@%#%#%%####*+=:-==++++++++++=++++++*****#####*##*+:       
                     :-*#%%%@####%@@@@@@@@@@@@*=--=======++++++++*++**###****++=       
                  ::-+##%#%####%@@*-:........-*@@@+===+@+======+++****##*++*++==       
                :+****%@%%%#%@@@%=-:::::-====-:::+*+===.--==-----==+++****+**+=+       
              .-+**##%##*#*+@..::--========++++=--========**%@@@@@@@@#***#***++*.      
            .:****#%#*#%#++@@@*.=@#++:-::----++++=-::-======--::::::*%%#***+++=*:      
          -=#%#**+++*+-+*#@@#*=*#::=*%@@@@@@@@+++=:..---=++==--=======+##****+=+=.     
         .=++*+*%%*--+@##%@%*=:==-:::::.::-**%%*+=**+%**#*+=++=-:-==+++@@#****==*.     
         .****##::=@@#%@%@%+=:.=:::::-===--::--=++-=@@@@+:*@@%@@@%+=-++-+%@%**-=+.     
         .###++=+@@##@%%@@%::::*:::::--=====-----+=%.::##***+==*%%@@#%@##=.##%***.     
          *++*+*##%##%#%#+@..::-=:::::-====+=-:-#:*..-:+%:-==+==-::++@@+*@...-+=+.     
          +***##%*######%%*.:--:=-:--==-==++=--+-%::-==*@=-+=======-:%@**@.@@%#++.     
         .*##+*-%#%#%%##@@@..----=%*+==++*#+-+++=::-:=++@=*+======--:%@*@=.@#**-:.     
          ..++%:#+%*%%##%#@-.:----:-=+*%@%%#+-:..:...:::%#%#+======::%@@..@####%*.     
           .=**=+*#*%#*%*#@-.:::---:::::...:-....:::.:-==+#*+=====-:@@@..@@#*.#%#.     
            .-**-#*#+#+#**@@..::-::::::..::::-==+#+=+@@==@%*****++*@:..@@@#%#+#%*.     
             :=**++*%==-#**@..:::::::-=.........:-::::-==-:-----+=::@@@@%#%%#####.     
            ..:#+*++#++*+*%@@..::::::+@@@%@%#**++-..::....:-===+=:*@@%#######+***.     
              +=++**%#.@+*##@@..::::::..:+*+*%%*@@@@@@@@@@@+--=:.=@@#%%###%%+*##+.     
              -=+=**%%.%%#*#%@#..:::::::::-=+-*%#+*#**#@@+-:-=:.@@@%%%%##*#**@@#*:     
              =*+%+*@+.*##+##@@@..:::::::::.:-:-+++++++=--==-::@@@@%#**###%%%%+::      
             .+*#*##@::+%#%##%@@@:..:::::::::::-==-==----==:.@@@%%*:+#%%%###*+-        
           ..:**#*#@:+=%@#%###%@%-=:::::::::::..:::::----::#@@%%%%##%%%###%*-.         
         ..+**#@#*@+.*##%%%##%#%@=:---:::.:.::::::-=---::*@@@#%##+##%**##@@%+          
         .++*=:+=#@.=*=##%#%#%%@@+:-::=-:::::-==:::::::-@@@%%%%%#%#=*#@%%@+..          
        .-#*=#*%%%--%+##%##%#%%#%#.:::::==---::....:=+@@@@###%%%###%#*@*-#@*#-..       
       .#@*%=@@#*-=*=-##%##*%%#@@@%..:::::-==+*##%@@@%@%@%*#%#%@%%#%%@%+*=-%@*@@:.     
      .%@*...+@+*=#+:##+#*@*%##@*#%#:..:.::::::-*#+--#*@%*##@+%#*#@@@@@**+:-.=@@#:     
     .-=@...-@*-*:+=.%+#*#%%%%%+@%***:::::::::-+#+-::#@@*@*@%=@###*+@%%*=*##**..-.     
     ..*@=%**+==-+*-=%+#**=%@*%**###@+:::--==++++=::=@@#*%+==##%%%%.=#%**+=*@#*+..     
     .*.@*=:=+*+%%#*%#@-@#%##*%@*%##*%+::::::-=====-%@#%+*%-*#+#%+@@#*%@*%@+#+@@@.     
     .@%:@+:==**#%##%%=%#:@##%#@%*%#+%=-----=+*+-:+*=+@##*-%*#*+@+#%#*####%###**=.     
     .:#**#-++%+%%#%@=+%+#@#=#+%#*#*+@%+-+=:--:::+%:-%##*@-@+##+%#*#%#@+=#%@%##+*:     
     .+===:+##%%#%@%*%-#%@+++-=%+=%###@=*##-::..-*=:%--%=%#%#*++%%#=*#*+#####%%%#:     
     ..::-*#+**#@@%-=*#%%%#-%=+%*+##+=@#.+%=:..:::-=-+-*#*@#%*+**#@*#%%=+#%#*#%@#.     
     .#==+*++%%@@*-=+*=#@%+++=+%#*@%+=@#=.#*:::::.-=.-*+*=%*#@+=++%+*+**+*@%***%@.     
     .=+*++*+*@%---%#++*@%++#=**#+@*++#%+:--==....+*:==.=:%#+%@===*@*%@#%**@@#*#%.     
     .+*+*++#@*=+*##%--%%@+++-#**+@-=**#%=::.:=:::-+::+-::-#*=#%%+:=%#@@+%%#%@@@@.     
     .+**+*%@*+-:=+##-*@##+%+=#@=**@:=**@%=::.:-:--+---=+:.*#@+#@%+=+**##*#%@%##*.     
     .*+=*@**:=:#-#+*+@#@+=@+=+@-**##-*-@###=..::..:*-=:-::#=-%:-@##+%%%@%%@@#**%.     
     .+=#@-:=--++*#=+%@+*@.%-*+#==+%%%#==#=--=..::..=-:=-:.*%+##-#@@%%*%#@@-.%*%%:     
     .+%%::==-*#+*+-#@*@+@:#=%#%*=%**-@#+*%@@%=......:.-::.*:@%%+#@@@@@=*##:%#+@%.     
     .#*.-++=**+*=-=@%%@*#-*=*#**++##=*@##=:*%@@@@@@=:.....*.*-=##@@%@+.#@%+@%%**.     
     .+.:##+++**+-+@@#%#***+=*@=+*+*@-:@%%+#*+=*#**#%%@@@@@.=@%%@@@#%@.*@#%=#*+*#.     
     ..-#**=**==:=%@%%*+#:-#=*#=++#=@*-+%@==**+=*#+*+**-=##-#-#*##%@@#+%-:%#**+*+. 

 `
const windows = `
                                ..,
                    ....,,:;+ccllll
      ...,,+:;  cllllllllllllllllll
,cclllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
                                      
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
llllllllllllll  lllllllllllllllllll
\`'ccllllllllll  lllllllllllllllllll
       \`' \*::  :ccllllllllllllllll
                       \`\`\`\`''*::cll
`

const linux = `
            .-/+oossssoo+/-.               
        \`:+ssssssssssssssssss+:\`           
      -+ssssssssssssssssssyyssss+-         
    .ossssssssssssssssssdMMMNysssso.       
   /ssssssssssshdmmNNmmyNMMMMhssssss/      
  +ssssssssshmydMMMMMMMNddddyssssssss+     
 /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   
 /sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    
  +sssssssssdmydMMMMMMMMddddyssssssss+     
   /ssssssssssshdmNNNNmyNMMMMhssssss/      
    .ossssssssssssssssssdMMMNysssso.
      -+sssssssssssssssssyyyssss+-
        \`:+ssssssssssssssssss+:\`
            .-/+oossssoo+/-.
`

const getPlatform = (): "Unknown" | "Windows" | "MacOS" | "Linux" => {
  let os: "Unknown" | "Windows" | "MacOS" | "Linux" = "Unknown"

  if (navigator.userAgent.indexOf("Win") != -1) {
    os = "Windows"
  }

  if (navigator.userAgent.indexOf("Mac") != -1) {
    os = "MacOS"
  }

  if (navigator.userAgent.indexOf("Linux") != -1) {
    os = "Linux"
  }

  return os
}

var audioPath = ["/poem1.mp3", "/yahou.mp3", "/poem2.mp3", "/poem3.mp3"]
function getRandomElementFromArray(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

// Use the function to get a random value from the array
var randomAudio = getRandomElementFromArray(audioPath)

const getMainColor = () => {
  const platform = getPlatform()
  const themeName = localStorage.getItem("theme")
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName)

  if (!theme) {
    // Handle the case when the theme is not found
    return "defaultColor"
  }

  switch (platform) {
    case "MacOS":
      return theme.cyan ?? "defaultMacOSColor"
    case "Windows":
      return theme.blue ?? "defaultWindowsColor"
    case "Linux":
      return theme.red ?? "defaultLinuxColor"
    default:
      // Handle the case when the platform is not recognized
      return "defaultColor"
  }
}

const getArt = () => {
  const platform = getPlatform()
  const mainColor = getMainColor()
  const themeName = localStorage.getItem("theme")
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName)

  switch (platform) {
    case "MacOS":
      return `<p style="color: ${mainColor}" class="lyrart">${lyra}</p>`
    case "Windows":
      return `<p style="color: ${mainColor}" class="lyrart">${lyra}</p>`
    case "Linux":
      return `<p style="color: ${mainColor}">${lyra}</p>`
  }
}

const getInfo = () => {
  const os = getPlatform()
  const themeName = localStorage.getItem("theme")
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName)
  const visitedAt = new Date(
    localStorage.getItem("visitedAt") || new Date().toString(),
  )
  const hostname = window.location.hostname
  // const theme = localStorage.getItem("theme")
  const resolution = [
    "In the relentless pursuit of life",
    "Bending but never breaking",
    "Carving canyons of beauty in the landscape of my existence.",
    "Standing at the edge of the abyss.",
    "Contemplating depths of the inner world.",
  ]

  const packages = Object.keys(packageJson.dependencies)
  const devPackages = Object.keys(packageJson.devDependencies)
  const mainColor = getMainColor()

  let message = ""
  // You can adjust '32px' to be larger or smaller as you like
  message += `<span class="lyrartTitle" style="font-size: 50px; font-weight: bold; line-height: 1;">${theLyraHaruto}\n\n\n</span>`
  message += `<span style="color: ${theme.red}">Host</span>: <span class="play" onclick="var audio = new Audio('/curious.mp3');audio.play();">OpenAI\n</span>`
  message += `<span style="color: ${theme.red}">OS</span>: Hana 1.01\n`
  message += `<span style="color: ${theme.red}">Packages</span>: 42\n`
  message += `<span style="color: ${theme.red}">Resolution</span>: ${
    resolution[Math.min(Math.round(Math.random() * 10), 4)]
  }\n`
  message += `<span style="color: ${theme.red}">Shell</span>: rco36E4-web\n`
  message += `<span style="color: ${theme.red}">Theme</span>: ${themeName}\n`
  message += `<span style="color: ${theme.red}">License</span>: copyright daedalium\n`
  message += `<span style="color: ${theme.red}">Version</span>: ${packageJson.version}\n`
  message += `<span style="color: ${theme.red}">Github</span>: <a href="${packageJson.repository.url}" target="_blank">${packageJson.repository.url}</a>\n`
    const birthDate = new Date('2005-01-02');
    message += `<span style="color: ${theme.red}">Uptime</span>: <span id="light"> ${formatDistanceToNowStrict(
      birthDate,
      new Date(),
      { addSuffix: true }
    )}\n</span>`
  message += `<span style="color: ${theme.red}">Author</span>: ${packageJson.author.name}\n`
  message += `<span style="color: ${theme.red}">Instructions</span>: <span class="play" onclick="var audio = new Audio('/check-in.mp3');audio.play();">i'm alive\n</span>`

  return message
}

export const neofetch = async (args?: string[]): Promise<string> => {
  const info = getInfo()
  const themeName = localStorage.getItem("theme")
  const theme = themes.find((theme) => theme.name.toLowerCase() === themeName)

  return `
  <table>
    <tr>
      <td class="lyrart"style="color: ${theme.red}">${lyra}</td>
      <td class="system">${info}</td>
    <tr>
  </table>
  `
}
