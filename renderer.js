document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector("#tblBingo")
    const letter = document.querySelectorAll(".letters-bingo")
    const banner = document.getElementById('banner');
    const winSound = document.getElementById('win-sound');
    const header = document.getElementById('header');

    const winningPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1 ,4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    let arr = Array.apply(null, { length: 32 }).map(Number.call, Number);

    arr.shift()
    shuffle(arr);

    function shuffle(arr) {
        let currentIndex = arr.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
        }

        return arr;
    }

    function showPlayAgainDialog() {        
        const options = {
        type: 'question',
        buttons: [$yesBtn, $noBtn],
        defaultId: 0,
        title: $btnTitle,
        message: $btnText,
        };
    
        const response = electron.openDialog('showMessageBoxSync', options)
        console.log(response);
        response.then((value) => {
            if (value === 0) {
                // Yes button clicked
                location.reload();
            } else {
                electron.quitApp();
            }
          }).catch((error) => {
            console.error('Error:', error);
          });
        
    }

    window.electron.onLanguageChanged((event, language) => {
        updateLanguage(language);
    });

    $yesBtn = "Ja"
    $noBtn = "Nein"
    $btnTitle = "Spiel nochmal"
    $btnText = "Willst du noch einmal spielen?"
    $message01 = "\"Ich glaube du bist stumm\""
    $message02 = "Gastauftritt einer Katze"
    $message03 = "\"Kannst du mich/uns hören\""
    $message04 = "Jemand vergisst das die Kamera an ist"
    $message05 = "1:1 Chat an die falsche Person"
    $message06 = "\"Ich möchte meinen Bildschirm teilen\""
    $message07 = "Keine Hose tragen"
    $message08 = "Technische Probleme"
    $message09 = "Seltsame Geräusche im Hintergrund"
    $message10 = "Fragwürdige Browser Tabs offen ;)"
    $message11 = "Jemand kommt zu spät"
    $message12 = "Lustige Hintergründe"
    $message13 = "Kinder stören"
    $message14 = "Nicht alle haben die Kamera an"
    $message15 = "Jeder kann den \"Lästerchat\" beim Bildschirm teilen lesen"
    $message16 = "Falsches Mikrofon ausgewählt"
    $message17 = "Jemand geht einfach"
    $message18 = "Jemand läuft ins Bild"
    $message19 = "Keine Reaktion obwohl er/sie angesprochen wird"
    $message20 = "Schlechte Sprachqualität"
    $message21 = "Jemand lästert und vergisst die Stummschaltung"
    $message22 = "Keiner hat die Kamera an"
    $message23 = "Gruppenchat statt 1:1 Chat"
    $message24 = "Internet ist weg"
    $message25 = "\"Könnt ihr meinen Bildschirm sehen?\""
    $message26 = "Jemand isst"
    $message27 = "Jemand trinkt"
    $message28 = "Jemand spricht obwohl sie/er auf Mute ist"
    $message29 = "Augenrollen"
    $message30 = "Meeting wird überzogen"
    $message31 = "Jemand nimmt aus dem Auto teil"

    // Function to update the UI language
    function updateLanguage(language) {
        if (language === 'en') {
            $yesBtn = "Yes"
            $noBtn = "No"
            $btnTitle = "Play again"
            $btnText = "Do you want to play again?"
            header.innerHTML = "Videoconference<br>Bingo"
            if(document.getElementById('message01') !== null) {
                document.getElementById('message01').innerHTML = "\"I think, you are mute\""
            }
            if(document.getElementById('message02') !== null) {
                document.getElementById('message02').innerHTML = "Appearance of a cat"
            }
            if(document.getElementById('message03') !== null) {
                document.getElementById('message03').innerHTML = "\"Can you here me/us\""
            }
            if(document.getElementById('message04') !== null) {
                document.getElementById('message04').innerHTML = "Someone forgets that the camera is on"
            }
            if(document.getElementById('message05') !== null) {
                document.getElementById('message05').innerHTML = "1:1 Chat with the wrong person"
            }
            if(document.getElementById('message06') !== null) {
                document.getElementById('message06').innerHTML = "\"I want to share my screen\""
            }
            if(document.getElementById('message07') !== null) {
                document.getElementById('message07').innerHTML = "No pants on"
            }
            if(document.getElementById('message08') !== null) {
                document.getElementById('message08').innerHTML = "Technical Problems"
            }
            if(document.getElementById('message09') !== null) {
                document.getElementById('message09').innerHTML = "Strange sounds in the background"
            }
            if(document.getElementById('message10') !== null) {
                document.getElementById('message10').innerHTML = "Questionable browser tabs open ;)"
            }
            if(document.getElementById('message11') !== null) {
                document.getElementById('message11').innerHTML = "Someone is late"
            }
            if(document.getElementById('message12') !== null) {
                document.getElementById('message12').innerHTML = "Funny Backgrounds"
            }
            if(document.getElementById('message13') !== null) {
                document.getElementById('message13').innerHTML = "Children disturb"
            }
            if(document.getElementById('message14') !== null) {
                document.getElementById('message14').innerHTML = "Not everyone has the camera on"
            }
            if(document.getElementById('message15') !== null) {
                document.getElementById('message15').innerHTML = "Anyone can read the blasphemy chat when sharing the screen"
            }
            if(document.getElementById('message16') !== null) {
                document.getElementById('message16').innerHTML = "Wrong microphone choosen"
            }
            if(document.getElementById('message17') !== null) {
                document.getElementById('message17').innerHTML = "Someone just leaves"
            }
            if(document.getElementById('message18') !== null) {
                document.getElementById('message18').innerHTML = "Someone walks into the video"
            }
            if(document.getElementById('message19') !== null) {
                document.getElementById('message19').innerHTML = "No reaction although he/she is addressed"
            }
            if(document.getElementById('message20') !== null) {
                document.getElementById('message20').innerHTML = "Poor voice quality"
            }
            if(document.getElementById('message21') !== null) {
                document.getElementById('message21').innerHTML = "Someone blasphemes and forgets to mute"
            }
            if(document.getElementById('message22') !== null) {
                document.getElementById('message22').innerHTML = "No one has the camera on"
            }
            if(document.getElementById('message23') !== null) {
                document.getElementById('message23').innerHTML = "Groupchat instead of 1:1 chat"
            }
            if(document.getElementById('message24') !== null) {
                document.getElementById('message24').innerHTML = "Internet connection is lost"
            }
            if(document.getElementById('message25') !== null) {
                document.getElementById('message25').innerHTML = "\"Can you see my screen?\""
            }
            if(document.getElementById('message26') !== null) {
                document.getElementById('message26').innerHTML = "Someone eats"
            }
            if(document.getElementById('message27') !== null) {
                document.getElementById('message27').innerHTML = "Someone drinks"
            }
            if(document.getElementById('message28') !== null) {
                document.getElementById('message28').innerHTML = "Someone speaks although she/he is on mute"
            }
            if(document.getElementById('message29') !== null) {
                document.getElementById('message29').innerHTML = "Rolling Eyes"
            }
            if(document.getElementById('message30') !== null) {
                document.getElementById('message30').innerHTML = "Meeting is overrun"
            }
            if(document.getElementById('message31') !== null) {
                document.getElementById('message31').innerHTML = "Someone takes part from the car"
            }
            
        } else if (language === 'de') {
            $yesBtn = "Ja"
            $noBtn = "Nein"
            $btnTitle = "Spiel nochmal"
            $btnText = "Willst du noch einmal spielen?"
            header.innerHTML = "VideoKonferenz<br>Bingo"
            if(document.getElementById('message01') !== null) {
                document.getElementById('message01').innerHTML = "\"Ich glaube du bist stumm\""
            }
            if(document.getElementById('message02') !== null) {
                document.getElementById('message02').innerHTML = "Gastauftritt einer Katze"
            }
            if(document.getElementById('message03') !== null) {
                document.getElementById('message03').innerHTML = "\"Kannst du mich/uns hören\""
            }
            if(document.getElementById('message04') !== null) {
                document.getElementById('message04').innerHTML = "Jemand vergisst das die Kamera an ist"
            }
            if(document.getElementById('message05') !== null) {
                document.getElementById('message05').innerHTML = "1:1 Chat an die falsche Person"
            }
            if(document.getElementById('message06') !== null) {
                document.getElementById('message06').innerHTML = "\"Ich möchte meinen Bildschirm teilen\""
            }
            if(document.getElementById('message07') !== null) {
                document.getElementById('message07').innerHTML = "Keine Hose tragen"
            }
            if(document.getElementById('message08') !== null) {
                document.getElementById('message08').innerHTML = "Technische Probleme"
            }
            if(document.getElementById('message09') !== null) {
                document.getElementById('message09').innerHTML = "Seltsame Geräusche im Hintergrund"
            }
            if(document.getElementById('message10') !== null) {
                document.getElementById('message10').innerHTML = "Fragwürdige Browser Tabs offen ;)"
            }
            if(document.getElementById('message11') !== null) {
                document.getElementById('message11').innerHTML = "Jemand kommt zu spät"
            }
            if(document.getElementById('message12') !== null) {
                document.getElementById('message12').innerHTML = "Lustige Hintergründe"
            }
            if(document.getElementById('message13') !== null) {
                document.getElementById('message13').innerHTML = "Kinder stören"
            }
            if(document.getElementById('message14') !== null) {
                document.getElementById('message14').innerHTML = "Nicht alle haben die Kamera an"
            }
            if(document.getElementById('message15') !== null) {
                document.getElementById('message15').innerHTML = "Jeder kann den \"Lästerchat\" beim Bildschirm teilen lesen"
            }
            if(document.getElementById('message16') !== null) {
                document.getElementById('message16').innerHTML = "Falsches Mikrofon ausgewählt"
            }
            if(document.getElementById('message17') !== null) {
                document.getElementById('message17').innerHTML = "Jemand geht einfach"
            }
            if(document.getElementById('message18') !== null) {
                document.getElementById('message18').innerHTML = "Jemand läuft ins Bild"
            }
            if(document.getElementById('message19') !== null) {
                document.getElementById('message19').innerHTML = "Keine Reaktion obwohl er/sie angesprochen wird"
            }
            if(document.getElementById('message20') !== null) {
                document.getElementById('message20').innerHTML = "Schlechte Sprachqualität"
            }
            if(document.getElementById('message21') !== null) {
                document.getElementById('message21').innerHTML = "Jemand lästert und vergisst die Stummschaltung"
            }
            if(document.getElementById('message22') !== null) {
                document.getElementById('message22').innerHTML = "Keiner hat die Kamera an"
            }
            if(document.getElementById('message23') !== null) {
                document.getElementById('message23').innerHTML = "Gruppenchat statt 1:1 Chat"
            }
            if(document.getElementById('message24') !== null) {
                document.getElementById('message24').innerHTML = "Internet ist weg"
            }
            if(document.getElementById('message25') !== null) {
                document.getElementById('message25').innerHTML = "\"Könnt ihr meinen Bildschirm sehen?\""
            }
            if(document.getElementById('message26') !== null) {
                document.getElementById('message26').innerHTML = "Jemand isst"
            }
            if(document.getElementById('message27') !== null) {
                document.getElementById('message27').innerHTML = "Jemand trinkt"
            }
            if(document.getElementById('message28') !== null) {
                document.getElementById('message28').innerHTML = "Jemand spricht obwohl sie/er auf Mute ist"
            }
            if(document.getElementById('message29') !== null) {
                document.getElementById('message29').innerHTML = "Augenrollen"
            }
            if(document.getElementById('message30') !== null) {
                document.getElementById('message30').innerHTML = "Meeting wird überzogen"
            }
            if(document.getElementById('message31') !== null) {
                document.getElementById('message31').innerHTML = "Jemand nimmt aus dem Auto teil"
            }
        }
        // Add more languages as needed
    }

    function showBanner() {
        banner.classList.add('show');
        winSound.play(); // Play the sound
    }

    function hideBanner() {
        setTimeout(() => {
            banner.classList.remove('show');
            setTimeout(() => {
                showPlayAgainDialog();
            }, 500);
        }, 3000);
        
    }

    function createTheMessages() {

    let iterator = 0;

    for (i = 0; i < 3; i++) {
        let tr = document.createElement("tr")
        table.appendChild(tr)

        for (j = 0; j < 3; j++) {
            let td = document.createElement("td")
            td.id = arr[iterator].toString()
            td.style.height = "20%"
            td.style.width = "20%"
            td.classList.add("main-table-cell")

            let div = document.createElement("div")
            div.classList.add("cell-format")
            
        if(arr[iterator].toString() == "1") {
                div.setAttribute('id', 'message01');
                div.textContent = $message01
            }
        if(arr[iterator].toString() == "2") {
                div.setAttribute('id', 'message02');
                div.textContent = $message02
            }
        if(arr[iterator].toString() == "3") {
            div.setAttribute('id', 'message03');
                div.textContent = $message03
            }
        if(arr[iterator].toString() == "4") {
            div.setAttribute('id', 'message04');
                div.textContent = $message04
            }
        if(arr[iterator].toString() == "5") {
            div.setAttribute('id', 'message05');
                div.textContent = $message05
            }
        if(arr[iterator].toString() == "6") {
            div.setAttribute('id', 'message06');
                div.textContent = $message06
            }
        if(arr[iterator].toString() == "7") {
            div.setAttribute('id', 'message07');
                div.textContent = $message07
            }
        if(arr[iterator].toString() == "8") {
            div.setAttribute('id', 'message08');
                div.textContent = $message08
            }
        if(arr[iterator].toString() == "9") {
            div.setAttribute('id', 'message09');
                div.textContent = $message09
            }
        if(arr[iterator].toString() == "10") {
            div.setAttribute('id', 'message10');
                div.textContent = $message10
            }
        if(arr[iterator].toString() == "11") {
            div.setAttribute('id', 'message11');
                div.textContent = $message11
            }
        if(arr[iterator].toString() == "12") {
            div.setAttribute('id', 'message12');
                div.textContent = $message12
            }
        if(arr[iterator].toString() == "13") {
            div.setAttribute('id', 'message13');
                div.textContent = $message13
            }
        if(arr[iterator].toString() == "14") {
            div.setAttribute('id', 'message14');
                div.textContent = $message14
            }
        if(arr[iterator].toString() == "15") {
            div.setAttribute('id', 'message15');
                div.textContent = $message15
            }
        if(arr[iterator].toString() == "16") {
            div.setAttribute('id', 'message16');
                div.textContent = $message16
            }
        if(arr[iterator].toString() == "17") {
            div.setAttribute('id', 'message17');
                div.textContent = $message17
            }
        if(arr[iterator].toString() == "18") {
            div.setAttribute('id', 'message18');
                div.textContent = $message18
            }
        if(arr[iterator].toString() == "19") {
            div.setAttribute('id', 'message19');
                div.textContent = $message19
            }
        if(arr[iterator].toString() == "20") {
            div.setAttribute('id', 'message20');
                div.textContent = $message20
            }
        if(arr[iterator].toString() == "21") {
            div.setAttribute('id', 'message21');
                div.textContent = $message21
            }
        if(arr[iterator].toString() == "22") {
            div.setAttribute('id', 'message22');
                div.textContent = $message22
            }
        if(arr[iterator].toString() == "23") {
            div.setAttribute('id', 'message23');
                div.textContent = $message23
            }
        if(arr[iterator].toString() == "24") {
            div.setAttribute('id', 'message24');
                div.textContent = $message24
            }
        if(arr[iterator].toString() == "25") {
            div.setAttribute('id', 'message25');
                div.textContent = $message25
        }
        if(arr[iterator].toString() == "26") {
            div.setAttribute('id', 'message26');
                div.textContent = $message26
        }
        if(arr[iterator].toString() == "27") {
            div.setAttribute('id', 'message27');
                div.textContent = $message27
        }
        if(arr[iterator].toString() == "28") {
            div.setAttribute('id', 'message28');
                div.textContent = $message28
        }
        if(arr[iterator].toString() == "29") {
            div.setAttribute('id', 'message29');
                div.textContent = $message29
        }
        if(arr[iterator].toString() == "30") {
            div.setAttribute('id', 'message30');
                div.textContent = $message30
        }
        if(arr[iterator].toString() == "31") {
            div.setAttribute('id', 'message31');
                div.textContent = $message31
        }
            td.appendChild(div)
            tr.appendChild(td)
            iterator++;
        }
    }
    }

    createTheMessages();

    const cell = document.querySelectorAll(".main-table-cell");
    let winningIterator = 0
    cell.forEach(e => {
        e.addEventListener("click", () => {
            e.classList.add("strickout");

            if(matchWin()) {
                //letter[winningIterator].classList.add("show-bingo");

                winningIterator++;
                if(winningIterator === 1) {
                    // Show the banner and then hide it after 3 seconds
                    showBanner();
                    hideBanner();
                    //location.reload();
                }
            }
        })
    })

    function matchWin() {
        const cell = document.querySelectorAll(".main-table-cell");

        return winningPositions.some(combination => {
            let ite = 0;
            combination.forEach(index => {
                if(cell[index].classList.contains("strickout")) ite++;
            })

            if(ite === 5) {
                let indexWin = winningPositions.indexOf(combination);
                winningPositions.splice(indexWin, 1)
            }

            return combination.every(index => {
                return cell[index].classList.contains("strickout")
            })
        })
    }
});