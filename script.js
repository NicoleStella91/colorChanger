const hexInput = document.getElementById("hexInput");
const inputColor = document.getElementById("inputColor");
const slider = document.getElementById("slider");
const sliderText = document.getElementById("sliderText");
const alteredColor = document.getElementById("alteredColor");
const alteredColorText = document.getElementById("alteredColorText");
const toggleBtn = document.getElementById("toggleBtn");
const lightenText = document.getElementById("lightenText");
const darkenText = document.getElementById("darkenText");

hexInput.addEventListener("keyup", function() {
    let hex = hexInput.value;
    if(!isValidHex(hex)) return;

    const strippedHex = hex.replace("#", ""); //???
    inputColor.style.backgroundColor = "#" + strippedHex;   
    reset() 
})

const isValidHex = function(hex) {
    if(!hex) return false;
    const regex = /^[0-9a-fA-F#]+$/;
    if(regex.test(hex)) {
        return true;
        const strippedHex = hex.replace("#", "");
        return strippedHex.length === 3 || strippedHex.length === 6
    } else {
        return false;
    }
}

const convertHexToRGB = function(hex) {
    if(!isValidHex(hex)) return null;
    let strippedHex = hex.replace("#", "");
    if(strippedHex.length === 3) {
        stripped = strippedHex[0] + strippedHex[0] + strippedHex[1] + strippedHex[1] + strippedHex[2] + strippedHex[2];
    }
    const r = parseInt(strippedHex.substring(0,2), 16);
    const g = parseInt(strippedHex.substring(2,4), 16);
    const b = parseInt(strippedHex.substring(4,6), 16);

    return {r,g,b};
}

const convertRGBToHex = function(r, g, b) {
    const firstPair = ("0" + r.toString(16)).slice(-2);
    const secondPair = ("0" + g.toString(16)).slice(-2);
    const thirdPair = ("0" + b.toString(16)).slice(-2);

    const hex = "#" + firstPair + secondPair + thirdPair;
    return hex;
}

const increaseWithin0to255 = function(hex, amount) {
    return Math.min(255, Math.max(0, hex + amount));
}

const alterColor = function(hex, percentage) {
    const {r,g,b} = convertHexToRGB(hex);
    const amount = Math.floor((percentage/100)*255);
    const newR = increaseWithin0to255(r, amount);
    const newG = increaseWithin0to255 (g, amount);
    const newB = increaseWithin0to255(b, amount);
    return convertRGBToHex(newR, newG, newB);
}

slider.addEventListener("input", function() {
    if(!isValidHex(hexInput.value)) return;
    sliderText.textContent = `${slider.value}%`
    const valueAddition = toggleBtn.classList.contains("toggled") ? -slider.value : slider.value;
    const alteredHex = alterColor(hexInput.value, valueAddition);
    alteredColor.style.backgroundColor = alteredHex;
    alteredColorText.innerText = `Altered Color: ${alteredHex}`;
})

toggleBtn.addEventListener("click", function() {
    if(toggleBtn.classList.contains("toggled")) {
        toggleBtn.classList.remove("toggled");
        lightenText.classList.remove("unselected");
        darkenText.classList.add("unselected");
    } else {
        toggleBtn.classList.add("toggled");
        lightenText.classList.add("unselected");
        darkenText.classList.remove("unselected");
    }
    reset()
})

function reset() {
    slider.value = 0;
    sliderText.innerText = `${slider.value}%`
    alteredColor.style.backgroundColor = hexInput.value;
    alteredColorText.innerText = `Altered Color: ${hexInput.value}`;
}