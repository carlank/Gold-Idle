function revealUnlockables() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let element = document.getElementById(`unlockable${i}-button`);
        if (element) element.style.display = data.upgradesUnlocked[i] ? "initial" : "none";
    }
}

function upgradeEffect(upgradeID, currentGps = goldPerSecond() + 1) {
    let buildingAmounts = 0;
    switch (upgradeID) {
        case 0:
            for (let i = 0; i < data.buildingAmounts.length; i++) {
                buildingAmounts += data.buildingAmounts[i];
            }
            return data.upgradesUnlocked[0] ? Math.sqrt(buildingAmounts + 1) + 1 : 1;
        case 1:
            return data.upgradesUnlocked[1] ? Math.log(data.gold + 1) + 1 : 1;
        case 2:
            return data.upgradesUnlocked[2] ? Math.log(currentGps + 1) + 1 : 1;
        case 3:
            return data.upgradesUnlocked[3] ? Math.sqrt(data.boostLevel + 1) + 1 : 1;
    }
}

function updateUpgradeInfO() {
    for (let i = 0; i < data.upgradesUnlocked.length; i++) {
        let description = upgrades[i].description;
        let cost = upgrades[i].unlockCost;

        if (upgrades[i].type === "Multiplier") {
            let effect = upgradeEffect(i);

            document.getElementById(`upgrade${i}-description`).textContent = description;
            document.getElementById(`upgrade${i}-effect`).textContent = `Currently: ${format(effect)}x`;
            document.getElementById(`upgrade${i}-cost`).textContent = `Cost: ${format((cost))} gold`;
        } else {
            let effect = data.upgradesUnlocked[i] ? "Currently: [UNLOCKED]" : "Currently: [LOCKED]"

            document.getElementById(`upgrade${i}-description`).textContent = description;
            document.getElementById(`upgrade${i}-effect`).textContent = effect;
            document.getElementById(`upgrade${i}-cost`).textContent = `Cost: ${format((cost))} gold`;
        }
    }
}