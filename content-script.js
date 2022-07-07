function getSwimlaneHeaders() {
    return Array.from(document.querySelectorAll(".ghx-column-header-flex > div > h2"));
}

function getSwimlaneColumn(index) {
    // nth-child starts at 1 index
    return Array.from(document.querySelectorAll(`.ghx-columns li:nth-child(${index + 1}) .ghx-estimate`));
}

function calculateTotalColumnEstimate(nodes) {
    return nodes
        .map((node) => {
            if(Number.isNaN(node.innerText)) {
                return 0;
            }
            return parseFloat(node.innerText);
        })
        .reduce((previousValue, currentValue) =>  previousValue + currentValue, 0);
}

function collectObjectInsights() {
    const headers = getSwimlaneHeaders();
    console.log(headers);

    // { column_name: string, total_estimate: number }
    const arr = [];
    headers.forEach((header, index) => {
        console.log(header.innerText);
        const objectInsight = { column_name: header.innerText, total_estimate: calculateTotalColumnEstimate(getSwimlaneColumn(index))}
        arr.push(objectInsight)
    });

    return arr;
}

function main() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        sendResponse(collectObjectInsights())
    });
}

main();
