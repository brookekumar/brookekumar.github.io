
var generatePass = document.querySelector(".button1");
var clipboard = document.querySelector(".button2");
var copy = document.getElementById("secure");
var symbols = ["?", "!", "(", "%"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var lowercase = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var uppercase = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var passwordCharSet = [];
// var lowercase = 'abcdefghijklmnopqrstuvwxyz';
// var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// var numbers = '0123456789';
// var symbols = '!@#$%^&*=-_';


generatePass.addEventListener("click", function () {
    var userPassword = [];

    var passwordCount = prompt("How many characters would you like your password to contain?");
    if (passwordCount < 120 && passwordCount > 8) {
    }
    else {
        alert("You can only use between 8 and 120 characters, click OK to start again.")
        return
    };
    var passwordSpecial = confirm("Click ok to confirm using special characters.");
    var passwordNumber = confirm("Click ok to confirm using numeric characters.");
    var passwordLower = confirm("Click ok to confirm using lowercase characters.");
    var passwordUpper = confirm("Click ok to confirm using uppercase characters.");

        if (passwordCount) {
            passwordCharSet;
        
        if (passwordLower === true) {
            passwordCharSet = passwordCharSet.concat(lowercase);
        }
        if (passwordUpper === true) {
            passwordCharSet = passwordCharSet.concat(uppercase);
        }
        if (passwordSpecial === true) {
            passwordCharSet = passwordCharSet.concat(symbols);
        }
        if (passwordNumber === true) {
            passwordCharSet = passwordCharSet.concat(numbers);
        }
        for (var i = 0; i < passwordCount.length; i++) { 
            userPassword = passwordCount[Math.floor(Math.random() * passwordCharSet.length + 1)];
        }
    }
    
    console.log(passwordCharSet);
    console.log(userPassword);
    document.getElementById("secure").innerHTML = userPassword;
});

  