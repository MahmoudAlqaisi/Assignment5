(function () {
    console.log('fancifymytext.js loaded');

   
    function applyFancy(isFancy) {
        const textArea = document.getElementById('text');
        if (!textArea) return;
        if (isFancy) {
            // Setting the states for the text
            textArea.style.fontWeight = 'bold';
            textArea.style.color = 'blue';
            textArea.style.textDecoration = 'underline';
        } else {
            // revert to defaults
            textArea.style.fontWeight = '';
            textArea.style.color = '';
            textArea.style.textDecoration = '';
        }
    }

    
    function setTextAreaSize(px) {
        const textArea = document.getElementById('text');
        if (!textArea) return;
        textArea.style.fontSize = px + 'px';
    }

    
    function buttonPressed() {
        alert('hello world');
        setTextAreaSize(24);
        console.log('buttonPressed: alerted and set font size to 24px');
    }

    const button = document.getElementById('biggerButton');
    if (button) {
        button.addEventListener('click', buttonPressed);
    } else {
        console.warn('Could not find #biggerButton at script run time');
    }

    // Radio buttons handlers
    const fancyRadio = document.getElementById('fancy');
    const boringRadio = document.getElementById('boring');

    function onStyleChange() {
        if (fancyRadio && fancyRadio.checked) applyFancy(true);
        else applyFancy(false);
    }

    if (fancyRadio) fancyRadio.addEventListener('change', onStyleChange);
    if (boringRadio) boringRadio.addEventListener('change', onStyleChange);

    
    onStyleChange();

    // Moo button: uppercase text value and append "-Moo" to last word of each sentence
    const mooButton = document.getElementById('mooButton');
    if (mooButton) {
        mooButton.addEventListener('click', function () {
            const textArea = document.getElementById('text');
            if (!textArea) return;

            // Work with the value property as requested
            let text = textArea.value;

            // Uppercase the whole text first
            text = text.toUpperCase();

            // Determine if original text ended with a period so we can preserve trailing period
            const endsWithPeriod = text.trim().endsWith('.');

            // Split sentences on period. This removes the periods; we'll rejoin them.
            const parts = text.split('.');

            const processed = parts.map(function (part) {
                // Trim whitespace around the sentence
                const trimmed = part.trim();
                if (trimmed.length === 0) return '';

                // Split into words (space separator), remove any empty entries
                const words = trimmed.split(' ').filter(function (w) { return w.length > 0; });
                if (words.length === 0) return '';

                // Append the literal suffix "-Moo" to the last word
                words[words.length - 1] = words[words.length - 1] + '-Moo';

                // Rejoin words with a single space
                return words.join(' ');
            });

            // Reconstruct text. Use '. ' between sentences for readable spacing.
            let result = processed.join('. ');
            if (endsWithPeriod) {
                // Ensure a trailing period exists
                result = result.trim();
                if (!result.endsWith('.')) result = result + '.';
            }

            // Set the textarea value
            textArea.value = result;
            console.log('Moo button processed text.');
        });
    }
})();