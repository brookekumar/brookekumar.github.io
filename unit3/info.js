
//prompt1 
//this is not upon opening - they need to click "generate password"
//var passwordCount = prompt("How many characters would you like your password to contain?");

//prompt2
//this should come up automatically after prompt1
//var passwordSpecial = confirm("Click ok to confirm using special characters.");

//prompt3 
//this should come up automatically after prompt2 
//var passwordNumber = confirm("Click ok to confirm using numeric characters.");

//prompt4
//this should come up automatically after prompt3
///var passwordLower = confirm("Click ok to confirm using lowercase characters.");

//prompt5
//this should come up automatically after prompt4
//var passwordUpper = confirm("Click ok to confirm using uppercase characters.");


function generate( length = 12 ){
    var uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lowercase = 'abcdefghijklmnopqrstuvwxyz';
    var numbers = '0123456789';
    var symbols = '!"#$%&\'()*+,-./:;<=>?@^[\\]^_`{|}~';
    var all = uppercase + lowercase + numbers + symbols;
    var password = '';
    for (var index = 0; index < length; index++) {
        var character = Math.floor(Math.random() * all.length);
        password += all.substring(character, character + 1);
    }
    return password;
}