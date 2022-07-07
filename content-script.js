/**
 * Algorithm:
 * Create empty hashmap
 * Get all headers in the swim lane
 * document.querySelectorAll(".ghx-column-header-flex > div > h2")
 * Get titles and add to hashmap { "h2 text value": 1000 }
 * Get all the columns in the swimlane
 * document.querySelectorAll(".ghx-columns li:nth-child(0)")
 * Sum the total points for each story in column X
 * Render in HTML table
 * Allow to filter unnecessary columns by column name in the UI
 */

/**
 * {
 *     column_name: string,
 *     total_estimate: number
 * }
 */

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

console.log('Hello from the content-script')
console.log(collectObjectInsights());






