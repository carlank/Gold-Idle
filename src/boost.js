function buildingCost(buildingID) {
    let baseCost = buildings[buildingID].baseCost;
    let growthRate = buildings[buildingID].costGrowthRate;
    let amount = data.buildingAmounts[buildingID];
    return baseCost * Math.pow(growthRate, amount);
} 

function buildingEffect(buildingID) {
    let baseEffect = buildings[buildingID].baseEffect;
    let amount = data.buildingAmounts[buildingID];
    return amount === 0 ? baseEffect : baseEffect * amount;
}

function updateBuildingPurchaseColor() {
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        if (data.gold < buildingCost(i)) {
            document.getElementById(`building${i}-button`).classList.add("notBuyable");
            document.getElementById(`building${i}-button`).classList.remove("buyable");
        } else {
            document.getElementById(`building${i}-button`).classList.add("buyable");
            document.getElementById(`building${i}-button`).classList.remove("notBuyable");
        }
    }
}

function updateBuildingInfo() {
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        let name = buildings[i].name;
        let amount = data.buildingAmounts[i];
        let effect = buildings[i].baseEffect;
        let cost = buildingCost(i);
        let boostID = data.buildingAmounts.length - 1;

        if (i < boostID) {
            document.getElementById(`building${i}-name`).innerHTML = name;
            document.getElementById(`building${i}-amount`).innerHTML = formatWithCommas(amount);
            document.getElementById(`building${i}-effect`).innerHTML = `+${format(effect)}/s`;
            document.getElementById(`building${i}-cost`).innerHTML = `${format((cost))}`;
        } else {
            document.getElementById(`building${i}-name`).innerHTML = name;
            document.getElementById(`building${i}-amount`).innerHTML = formatWithCommas(amount);
            document.getElementById(`building${i}-effect`).innerHTML = `x${format(boostEffect(boostID))}`;
            document.getElementById(`building${i}-cost`).innerHTML = `${format((cost))}`;
        }
    }
}

function updateGoldPerSecondText() {
    goldPerSecondTextElement.innerHTML = format(goldPerSecond());
}

function boostEffect(boostID) {
    let effect = buildings[boostID].baseEffect;
    let amount = data.buildingAmounts[boostID];
    return amount === 0 ? 1 : Math.pow(effect, amount);
}

function revealBuildings() {
    for (let i = 0; i < data.buildingAmounts.length; i++) {
        let element = document.getElementById(`building${i}-row`);
        element.style.display = data.buildingUnlocked[i] ? "table-row" : "none";
    }
}

function buyBuilding(buildingID) {
    if (data.gold < buildingCost(buildingID)) return;

    let boostID = data.buildingAmounts.length - 1;
    if (buildingID === boostID && confirm("Are you sure you want to boost? This will double your boost effect, but reset your other building amounts to 0.")) {
        data.gold = 10;
        data.buildingAmounts[boostID]++;
        for (let i = 0; i < boostID; i++) {
            data.buildingAmounts[i] = 0;
        }
        updateGoldPerSecondText();
        updateBuildingInfo();
        return;
    }

    // dont unlock the next building if the buildingID is below booster
    if (data.buildingAmounts[buildingID] === 0 && buildingID < data.buildingAmounts.length - 2) {
        data.buildingUnlocked[buildingID + 1] = true;
        revealBuildings();
    }

    data.gold -= buildingCost(buildingID);
    data.buildingAmounts[buildingID]++;

    let amount = data.buildingAmounts[buildingID];
    let cost = buildingCost(buildingID);
    document.getElementById(`building${buildingID}-amount`).innerHTML = formatWithCommas(amount);
    document.getElementById(`building${buildingID}-cost`).innerHTML = `${format((cost))}`;
    updateGoldPerSecondText();
}