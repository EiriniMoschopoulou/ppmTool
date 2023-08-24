//Report source
//https://github.com/TheBrainFamily/cypress-cucumber-preprocessor/issues/251
const report = require("multiple-cucumber-html-reporter");
const fs = require("fs-extra");
const path = require("path");

//'./path-to-your-json-output/'
const cucumberJsonDir = path.resolve(process.cwd(), "../cucumber-json");
const cucumberReportFileMap = {};
const cucumberReportMap = {};
const jsonIndentLevel = 2;
// './path-where-the-report-needs-to-be/'
const htmlReportDir = path.resolve(process.cwd(), "../report");
const screenshotsDir = path.resolve(process.cwd(), "../screenshots");

getCucumberReportMaps();
addScreenshots();
generateReport();

function getCucumberReportMaps() {
  const filenames = fs.readdirSync(cucumberJsonDir);
  const files = fs.readdirSync(cucumberJsonDir).filter((file) => {
    return file.indexOf(".json") > -1;
  });
  files.forEach((file) => {
    const json = JSON.parse(fs.readFileSync(path.join(cucumberJsonDir, file)));
    if (!json[0]) {
      return;
    }
    const [feature] = json[0].uri.split("/").reverse();
    cucumberReportFileMap[feature] = file;
    cucumberReportMap[feature] = json;
  });
}

function addScreenshots() {
  if (fs.existsSync(screenshotsDir)) {
    //only if screenshots exists
    const prependPathSegment = (pathSegment) => (location) =>
      path.join(pathSegment, location);

    const readdirPreserveRelativePath = (location) =>
      fs.readdirSync(location).map(prependPathSegment(location));

    const readdirRecursive = (location) =>
      readdirPreserveRelativePath(location).reduce(
        (result, currentValue) =>
          fs.statSync(currentValue).isDirectory()
            ? result.concat(readdirRecursive(currentValue))
            : result.concat(currentValue),
        []
      );

    const screenshots = readdirRecursive(path.resolve(screenshotsDir)).filter(
      (file) => {
        return file.indexOf(".png") > -1;
      }
    );

    const featuresList = Array.from(
      new Set(screenshots.map((x) => x.match(/[\w-_.]+.feature/g)[0]))
    );

    featuresList.forEach((feature) => {
      screenshots.forEach((screenshot) => {
        const regex = /(?<=--\ ).+?((?=\ (example\ #\d+))|(?=\ (failed))|(?=.\w{3}))/g;

        var filename = screenshot.replace(/^.*[\\\/]/, "");

        const featureSelected = cucumberReportMap[feature][0];

        const myScenarios = [];

        cucumberReportMap[feature][0].elements.forEach((item) => {
          const fullFileName = featureSelected.name + " -- " + item.name;
          if (filename.includes(fullFileName)) {
            myScenarios.push(item);
          }
        });

        if (myScenarios && !myScenarios.length) {
          return;
        } else {
          let foundFailedStep = false;
          myScenarios.forEach((myScenario) => {
            if (foundFailedStep) {
              return;
            }
            let myStep;
            if (screenshot.includes("(failed)")) {
              myStep = myScenario.steps.find(
                (step) => step.result.status === "failed"
              );
            } else {
              myStep = myScenario.steps.find(
                (step) => step.result.status === "passed"
              );
            }
            if (!myStep) {
              return;
            }
            const data = fs.readFileSync(path.resolve(screenshot));
            if (data) {
              const base64Image = Buffer.from(data, "binary").toString("base64");
              if (!myStep.embeddings) {
                myStep.embeddings = [];
                myStep.embeddings.push({
                  data: base64Image,
                  mime_type: "image/png",
                  name: myStep.name,
                });
                foundFailedStep = true;
              }
            }
          });
          //Write JSON with screenshot back to report file.
          fs.writeFileSync(
            path.join(cucumberJsonDir, cucumberReportFileMap[feature]),
            JSON.stringify(cucumberReportMap[feature], null, jsonIndentLevel)
          );
        }
      });
    });
  }
}

function generateReport() {
  if (!fs.existsSync(cucumberJsonDir)) {
    console.warn("REPORT CANNOT BE CREATED!");
  } else {
    report.generate({
      jsonDir: cucumberJsonDir,
      displayDuration: true,
      reportPath: htmlReportDir,
      displayReportTime: true,
      metadata: {
        browser: {
          name: 'chrome',
        },
        device: 'Local',
        platform: {
          name: 'windows',
        },
      },
    })
  }
}