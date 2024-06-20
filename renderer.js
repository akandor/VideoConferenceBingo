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

    window.electron.onSoundChanged((event, soundBool) => {
        $soundOnOff = soundBool
    });

    const translations = {
        en: {
          languageMenu: 'Language',
          english: 'English',
          german: 'German',
          title: 'Videoconference<br>Bingo',
          playAgainTitle: 'Play again',
          playAgain: 'Do you want to play again?',
          yes: 'Yes',
          no: 'No',
          message01: '\"I think, you are mute\"',
          message02: 'Appearance of a cat',
          message03: '\"Can you here me/us\"',
          message04: 'Someone forgets that the camera is on',
          message05: '1:1 Chat with the wrong person',
          message06: '\"I want to share my screen\"',
          message07: 'No pants on',
          message08: 'Technical Problems',
          message09: 'Strange sounds in the background',
          message10: 'Questionable browser tabs open ;)',
          message11: 'Someone is late',
          message12: 'Funny Backgrounds',
          message13: 'Children disturb',
          message14: 'Not everyone has the camera on',
          message15: 'Anyone can read the blasphemy chat when sharing the screen',
          message16: 'Wrong microphone choosen',
          message17: 'Someone just leaves',
          message18: 'Someone walks into the video',
          message19: 'No reaction although he/she is addressed',
          message20: 'Poor voice quality',
          message21: 'Someone blasphemes and forgets to mute',
          message22: 'No one has the camera on',
          message23: 'Groupchat instead of 1:1 chat',
          message24: 'Internet connection is lost',
          message25: '\"Can you see my screen?\"',
          message26: 'Someone eats',
          message27: 'Someone drinks',
          message28: 'Someone speaks although she/he is on mute',
          message29: 'Rolling Eyes',
          message30: 'Meeting is overrun',
          message31: 'Someone takes part from the car'
        },
        de: {
          languageMenu: 'Sprache',
          english: 'Englisch',
          german: 'Deutsch',
          title: 'Videokonferenz<br>Bingo',
          playAgainTitle: 'Spiel nochmal',
          playAgain: 'Willst du noch einmal spielen?',
          yes: 'Ja',
          no: 'Nein',
          message01: '\"Ich glaube du bist stumm\"',
          message02: 'Gastauftritt einer Katze',
          message03: '\"Kannst du mich/uns hören\"',
          message04: 'Jemand vergisst das die Kamera an ist',
          message05: '1:1 Chat an die falsche Person',
          message06: '\"Ich möchte meinen Bildschirm teilen\"',
          message07: 'Keine Hose tragen',
          message08: 'Technische Probleme',
          message09: 'Seltsame Geräusche im Hintergrund',
          message10: 'Fragwürdige Browser Tabs offen ;)',
          message11: 'Jemand kommt zu spät',
          message12: 'Lustige Hintergründe',
          message13: 'Kinder stören',
          message14: 'Nicht alle haben die Kamera an',
          message15: 'Jeder kann den \"Lästerchat\" beim Bildschirm teilen lesen',
          message16: 'Falsches Mikrofon ausgewählt',
          message17: 'Jemand geht einfach',
          message18: 'Jemand läuft ins Bild',
          message19: 'Keine Reaktion obwohl er/sie angesprochen wird',
          message20: 'Schlechte Sprachqualität',
          message21: 'Jemand lästert und vergisst die Stummschaltung',
          message22: 'Keiner hat die Kamera an',
          message23: 'Gruppenchat statt 1:1 Chat',
          message24: 'Internet ist weg',
          message25: '\"Könnt ihr meinen Bildschirm sehen?\"',
          message26: 'Jemand isst',
          message27: 'Jemand trinkt',
          message28: 'Jemand spricht obwohl sie/er auf Mute ist',
          message29: 'Augenrollen',
          message30: 'Meeting wird überzogen',
          message31: 'Jemand nimmt aus dem Auto teil'
        },
    };

    // Function to update the UI language
    function updateLanguage(language) {
            $yesBtn = translations[language].yes
            $noBtn = translations[language].no
            $btnTitle = translations[language].playAgainTitle
            $btnText = translations[language].playAgain
            header.innerHTML = translations[language].title
            if(document.getElementById('message1') !== null) {
                document.getElementById('message1').innerHTML = translations[language].message01
            }
            if(document.getElementById('message2') !== null) {
                document.getElementById('message2').innerHTML = translations[language].message02
            }
            if(document.getElementById('message3') !== null) {
                document.getElementById('message3').innerHTML = translations[language].message03
            }
            if(document.getElementById('message4') !== null) {
                document.getElementById('message4').innerHTML = translations[language].message04
            }
            if(document.getElementById('message5') !== null) {
                document.getElementById('message5').innerHTML = translations[language].message05
            }
            if(document.getElementById('message6') !== null) {
                document.getElementById('message6').innerHTML = translations[language].message06
            }
            if(document.getElementById('message7') !== null) {
                document.getElementById('message7').innerHTML = translations[language].message07
            }
            if(document.getElementById('message8') !== null) {
                document.getElementById('message8').innerHTML = translations[language].message08
            }
            if(document.getElementById('message9') !== null) {
                document.getElementById('message9').innerHTML = translations[language].message09
            }
            if(document.getElementById('message10') !== null) {
                document.getElementById('message10').innerHTML = translations[language].message10
            }
            if(document.getElementById('message11') !== null) {
                document.getElementById('message11').innerHTML = translations[language].message11
            }
            if(document.getElementById('message12') !== null) {
                document.getElementById('message12').innerHTML = translations[language].message12
            }
            if(document.getElementById('message13') !== null) {
                document.getElementById('message13').innerHTML = translations[language].message13
            }
            if(document.getElementById('message14') !== null) {
                document.getElementById('message14').innerHTML = translations[language].message14
            }
            if(document.getElementById('message15') !== null) {
                document.getElementById('message15').innerHTML = translations[language].message15
            }
            if(document.getElementById('message16') !== null) {
                document.getElementById('message16').innerHTML = translations[language].message16
            }
            if(document.getElementById('message17') !== null) {
                document.getElementById('message17').innerHTML = translations[language].message17
            }
            if(document.getElementById('message18') !== null) {
                document.getElementById('message18').innerHTML = translations[language].message18
            }
            if(document.getElementById('message19') !== null) {
                document.getElementById('message19').innerHTML = translations[language].message19
            }
            if(document.getElementById('message20') !== null) {
                document.getElementById('message20').innerHTML = translations[language].message20
            }
            if(document.getElementById('message21') !== null) {
                document.getElementById('message21').innerHTML = translations[language].message21
            }
            if(document.getElementById('message22') !== null) {
                document.getElementById('message22').innerHTML = translations[language].message22
            }
            if(document.getElementById('message23') !== null) {
                document.getElementById('message23').innerHTML = translations[language].message23
            }
            if(document.getElementById('message24') !== null) {
                document.getElementById('message24').innerHTML = translations[language].message24
            }
            if(document.getElementById('message25') !== null) {
                document.getElementById('message25').innerHTML = translations[language].message25
            }
            if(document.getElementById('message26') !== null) {
                document.getElementById('message26').innerHTML = translations[language].message26
            }
            if(document.getElementById('message27') !== null) {
                document.getElementById('message27').innerHTML = translations[language].message27
            }
            if(document.getElementById('message28') !== null) {
                document.getElementById('message28').innerHTML = translations[language].message28
            }
            if(document.getElementById('message29') !== null) {
                document.getElementById('message29').innerHTML = translations[language].message29
            }
            if(document.getElementById('message30') !== null) {
                document.getElementById('message30').innerHTML = translations[language].message30
            }
            if(document.getElementById('message31') !== null) {
                document.getElementById('message31').innerHTML = translations[language].message31
            }
            
        
        // Add more languages as needed
    }

    function showBanner() {
        banner.classList.add('show');
        if($soundOnOff == 'on') {
            winSound.play(); // Play the sound
        }
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

            $fieldNumber = arr[iterator].toString();
            $divid = "message" + $fieldNumber;

            div.setAttribute('id', $divid);

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