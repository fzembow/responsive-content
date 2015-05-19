var app = document.getElementById("app");
var compressBtn = document.getElementById("compress");
var inputTextarea = document.getElementById("input");
var outputText = document.getElementById("output");
var factorSlider = document.getElementById("factorSlider");
var percentLengthIndicator = document.getElementById("percentOriginalLength");

var LETTER_FREQUENCIES = {
  'a':0.08167,
  'b':0.01492,
  'c':0.02782,
  'd':0.04253,
  'e':0.12702,
  'f':0.02228,
  'g':0.02015,
  'h':0.06094,
  'i':0.06966,
  'j':0.00153,
  'k':0.00772,
  'l':0.04025,
  'm':0.02406,
  'n':0.06749,
  'o':0.07507,
  'p':0.01929,
  'q':0.00095,
  'r':0.05987,
  's':0.06327,
  't':0.09056,
  'u':0.02758,
  'v':0.00978,
  'w':0.02361,
  'x':0.00150,
  'y':0.01974,
  'z':0.00074
};

var LETTER_ORDERING = Object.keys(LETTER_FREQUENCIES)
  .sort(function(a, b){
    return LETTER_FREQUENCIES[a] - LETTER_FREQUENCIES[b];
  });

var inputString = '';

function setText(){
  inputString = inputTextarea.value;
  var html = '';
  var letterRegexp = new RegExp('[a-z]', 'i');
  for (var i = 0; i < inputString.length; i++) {
    var c = inputString[i];
    if (c.match(letterRegexp)) {
      html += '<span class=' + c.toLowerCase() + '>' + c + '</span>';
    } else {
      html += c;
    }
  }
  outputText.innerHTML = html;
  app.classList.remove('input');
}


function filterLetters(e){
  var fraction = parseFloat(factorSlider.value);
  var numLettersToShow = Math.floor(LETTER_ORDERING.length * fraction);

  // Figure out which letters we want to show.
  var lettersToHide = {};
  for (var i = numLettersToShow; i < LETTER_ORDERING.length; i++) {
    lettersToHide[LETTER_ORDERING[i]] = true;
  }

  var spans = outputText.children;
  var hiddenCharacters = 0;
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    if (lettersToHide[span.className]) {
      span.style.display = 'none';
      hiddenCharacters++;
    } else {
      span.style.display = 'inline';
    }
  }

  percentLengthIndicator.textContent = (((inputString.length - hiddenCharacters) / inputString.length) * 100.0).toFixed(2) + '%';
}


compressBtn.addEventListener('click', setText);
factorSlider.addEventListener('change', filterLetters);
