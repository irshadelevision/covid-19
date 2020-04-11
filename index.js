const PluginManager = require('./node_modules/covid19-api/src/api/index');
const fs = require('fs-extra');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('ejs');

// quit app after 10 minute to restart app.
setTimeout(() => {
  process.exit()
}, 24000000)

let situationsReportsData, report;

let getData = async () =>{
  try{
    const reports = await PluginManager.getReports();
    report = reports[0][0].table[0];
    //const reportsByCountries = await PluginManager.getReportsByCountries(['united-arab-emirates']);
    //const deaths = await PluginManager.getDeaths();
    const situationsReports = await PluginManager.getSituationReports();
    situationsReportsData = situationsReports[0]
    //const taskforce = await PluginManager.getTaskForceInfoUS();
    //const globalData = await PluginManager.getGlobalData();
    //const testsInUS = await PluginManager.getTestsInUS();
    //const fatalityRateByAge = await PluginManager.getFatalityRateByAge();
    //const fatalityRateBySex = await PluginManager.getFatalityRateBySex();
    //const fatalityRateByComorbidities = await PluginManager.getFatalityRateByComorbidities();
    //const countriesWhereCoronavirusHasSpread = await PluginManager.getCountriesWhereCoronavirusHasSpread();
    //const travelHealthNotices = await PluginManager.getTravelHealthNotices();
    //const getAllCasesInAmerica = await PluginManager.getAllCasesInAmerica();
    //const getAllCasesInEurope = await PluginManager.getAllCasesInEurope();
    //const caseStatusUndeEvalutationInPR = await PluginManager.getCaseStatusUndeEvalutationInPR();
    //const casesInAllUSStates = await PluginManager.getCasesInAllUSStates();
    //const capacityInfoUSHealthFacilities = await PluginManager.getCapacityInfoUSHealthFacilities();
    //const aggregatedFacilityCapacityCounty = await PluginManager.getAggregatedFacilityCapacityCounty();
    //const johnsHopkinsDataDailyReport = await PluginManager.getJohnsHopkinsDataDailyReport();
    //const prGeneralResults = await PluginManager.getPRGeneralResults();
    //const prDataByRegion = await PluginManager.getPRDataByRegion();
    //const prDataBySex = await PluginManager.getPRDataBySex();
    // await PluginManager.downloadReportsToCSV();
    console.log(new Date(), 'Data updated')
  } catch {
    console.log(new Date, 'unable to update')
  }
  setTimeout(async () => {
    await getData();
  }, 10000)
}

(async () => { await getData() })();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  return res.render('index');
});

app.get('/report-json', (req, res) => {
    return res.json(report);
});

app.get('/situation-report-json', (req, res) => {
    return res.json(situationsReportsData);
});




app.listen(6020, () => {
    console.log('Server Running at port 6020');
});