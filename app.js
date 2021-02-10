console.log("App.js has loaded");
let viz;
let isVizHidden = false;
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";

const vizContainer = document.getElementById("vizContainer");

const options = {
  device: "desktop",
  //Pre-filter on Category
  Category: ["Furniture", "Office Supplies"],
};
const pdfButton = document.getElementById("exportPDF");

const excelButton = document.getElementById("exportExcel");

//Click on the button to export to PDF
pdfButton.addEventListener("click", function () {
  console.log("You've clicked the button!");
  viz.showExportPDFDialog();
});

//click on the button to export to excel
excelButton.addEventListener("click", function () {
  viz.exportCrossTabToExcel("subcategory-view");
});

//grab the button
// when you click the button, hide the viz
// when you click the button, update the text to 'Show'

const showHideButton = document.getElementById("showHideViz");
showHideButton.addEventListener("click", showHideHandler);

function showHideHandler() {
  if (isVizHidden) {
    console.log("You clicked the show/hide button");
    viz.show();
    showHideButton.innerText = "Hide Viz";
    isVizHidden = false;
  } else {
    console.log("You clicked the show/hide button");
    viz.hide();
    showHideButton.innerText = "Show Viz";
    isVizHidden = true;
  }
}
//Filtering on sales
const applyFilterButton = document.getElementById("applyFilter");

applyFilterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  const sheetToFilter = sheets[1];
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", {
      min: minValue,
      max: maxValue,
    })
    .then(console.log("Filter has been applied"));
}

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

// TO DO LIST:
// create variables for url, container and options of the dashboard
//create a function that initalizes the dashboard
//execute this function when the page loads
