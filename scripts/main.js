const input = document.getElementById('jwt-input')
const formattedOutput = document.getElementById('formatted-output')
const rawOutput = document.getElementById('raw-output')
//Buttons
const btnClipboard = document.getElementById('btn-clipboard')
const btnFormatted = document.getElementById('btn-raw')
const btnHeader = document.getElementById('btn-header')
const btnRaw = document.getElementById('btn-formatted')
const errorMessage = document.getElementById('error-message')
const outputContainer = document.getElementById('output-container')
const events = ['keyup', 'propertychange', 'input', 'paste', 'change', 'keypress', 'keydown']
const jwtDecrypt = (e) => {
    if(e.target.value == "") return
    try {
        const header = JSON.parse(atob(e.target.value.split('.')[0]))
        const payload = JSON.parse(atob(e.target.value.split('.')[1]))
        let headerStr = ""
        for (var key in header)
            headerStr == "" ? headerStr += header[key] : headerStr += " " + header[key]
        btnHeader.innerHTML = headerStr
        errorMessage.classList.add('hidden');
        outputContainer.classList.remove('hidden')
        rawOutput.innerHTML = JSON.stringify(payload, null, 2);
        const formatter = new JSONFormatter(payload, {
            hoverPreviewEnabled: true,
            hoverPreviewArrayCount: 100,
            hoverPreviewFieldCount: 5,
            theme: 'dark',
            animateOpen: true,
            animateClose: true,
            useToJSON: true
        });
        formattedOutput.replaceChild(formatter.render(), formattedOutput.firstChild)
        hljs.highlightElement(rawOutput)

    }
    catch (e) {
        outputContainer.classList.add('hidden')
        errorMessage.classList.remove('hidden');
    }
}
events.forEach((e) => {
    input.addEventListener(e, jwtDecrypt)
})

btnFormatted.addEventListener('click', () => {
    btnRaw.classList.add('btn-solid')
    btnFormatted.classList.remove('btn-solid')
    formattedOutput.classList.add('hidden')
    rawOutput.classList.remove('hidden')
})
btnRaw.addEventListener('click', () => {
    btnFormatted.classList.remove('btn-solid')
    btnRaw.classList.add('btn-solid')
    formattedOutput.classList.remove('hidden')
    rawOutput.classList.add('hidden')
})

