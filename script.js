function caesarCipher(str, shift, action) {
    let output = '';
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (c.match(/[a-z]/i)) {
            let code = str.charCodeAt(i);
            if (action === 'encrypt') {
                if ((code >= 65) && (code <= 90)) c = String.fromCharCode(((code - 65 + shift) % 26) + 65);
                else if ((code >= 97) && (code <= 122)) c = String.fromCharCode(((code - 97 + shift) % 26) + 97);
            } else if (action === 'decrypt') {
                if ((code >= 65) && (code <= 90)) c = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
                else if ((code >= 97) && (code <= 122)) c = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            }
        }
        output += c;
    }
    return output;
}

document.getElementById('encryptBtn').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    document.getElementById('outputText').value = caesarCipher(inputText, shift, 'encrypt');
});

document.getElementById('decryptBtn').addEventListener('click', () => {
    const inputText = document.getElementById('inputText').value;
    const shift = parseInt(document.getElementById('shift').value);
    document.getElementById('outputText').value = caesarCipher(inputText, shift, 'decrypt');
});

document.getElementById('clearBtn').addEventListener('click', () => {
    // Clear the input and output text areas
    document.getElementById('inputText').value = '';
    document.getElementById('outputText').value = '';

    // Reset the slider to its default value
    const defaultSliderValue = 0;  // Assuming the default value is 0
    const slider = document.getElementById('shift');
    slider.value = defaultSliderValue;

    // Update the display of the slider value
    document.getElementById('shiftValue').textContent = defaultSliderValue;
});

document.getElementById('exportBtn').addEventListener('click', () => {
    const outputText = document.getElementById('outputText').value;
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'encrypted_text.txt';
    link.href = url;
    link.click();
    window.URL.revokeObjectURL(url);
});

document.getElementById('shift').addEventListener('input', function () {
    document.getElementById('shiftValue').textContent = this.value;
});

document.getElementById('toggleInstructionsBtn').addEventListener('click', function() {
    var instructions = document.getElementById('howToUse');
    var toggleIcon = document.getElementById('toggleIcon');
    
    if (instructions.style.display === 'none') {
        instructions.style.display = 'block';
        this.innerHTML = '<span class="fas fa-chevron-up"></span> Hide Instructions';
    } else {
        instructions.style.display = 'none';
        this.innerHTML = '<span class="fas fa-chevron-down"></span> Show Instructions';
    }
});
