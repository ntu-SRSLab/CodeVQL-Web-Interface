const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const cmd = require('node-cmd');
const csv = require('fast-csv');
const path = require("path");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
var requestCounter = 0;

const ServerResponse = "ServerResponse";
const SampleRepoResponse = "SampleRepoResponse";
const RepoLinkResponse = "RepoLinkResponse";

const BasePath = process.env.BASE_PATH ? process.env.BASE_PATH : "/Users/limengyang/Workspaces/FinalYearProject"
const OutPath =  process.env.OUT_PATH ? process.env.OUT_PATH : "/Users/limengyang/Desktop"

const CliExecutablePath = path.join(BasePath, "EvoMe/scripts/run.py");
const ParitialCliExecutablePath = path.join(BasePath, 'EvoMe/scripts/run-partial.py')

const RepoPathFlag = "--repo_path";
const DemoRepoPath = path.join(BasePath, "FYP-Challenge-Demo-Repo");

const GitfactsFlag = "--gitfacts_path";
const GitfactsPath = path.join(BasePath, "ext-gitfacts");

const OutputPathFlag = "--output_path";
const OutputPathPrefix = path.join(OutPath, "output");
const OutputPathResultPath = "/output/query.csv"

const QueryPathFlag = "--query_file_path";
const QueryPathPrefix = path.join(OutPath, "query/query");
const QuerypathSuffix = ".txt";

const EvoMePathFlag = "--evome_path";
const EvoMePath = path.join(BasePath, "EvoMe");

const CslicerFlag = "--cslicer_path";
const CslicerPath = path.join(BasePath, "gitslice/target/cslicer-1.0.0-jar-with-dependencies.jar");

const ProgramFactPathFlag = "--program_fact_path";

class Record {
  constructor(selectedTest, version) {
    this.selectedTest = selectedTest;
    this.version = version;
  }
}

io.on('connection', (socket) => {
  socket.emit(ServerResponse);

  socket.on('sample repo', (repo, query) => {
    // Step 1: Write query locally
    fs.writeFile(QueryPathPrefix + requestCounter + QuerypathSuffix, query, function(err) {
      if (err) throw err;
      // Step 2: Upon write success, execute command
      cmd.runSync("python3.7 " + ParitialCliExecutablePath + " "
                  + RepoPathFlag + " " + path.join(BasePath, repo) + " "
                  + GitfactsFlag + " " + GitfactsPath + " "
                  + OutputPathFlag + " " + OutputPathPrefix + requestCounter + " "
                  + QueryPathFlag + " " + QueryPathPrefix + requestCounter + QuerypathSuffix + " "
                  + EvoMePathFlag + " " + EvoMePath + " "
                  + CslicerFlag + " " + CslicerPath + " "
                  + ProgramFactPathFlag + " " + path.join(BasePath, repo, ".facts/20-deps"));
      // Step 3: Read result
      cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultPath}`, function(err, data, stderr) {
        var result = [];
        lines = data.split(/\n/);
        for (var i = 0; i < lines.length; i++) {
          fields = lines[i].split(/\t/);
          result.push(fields);
        }
        requestCounter++;
        socket.emit(SampleRepoResponse, result);
      })
    })
  });

  socket.on('repo link', (repoLink, query) => {
    // Step 1: Write query locally
    fs.writeFile(QueryPathPrefix + requestCounter + QuerypathSuffix, query, function(err) {
      if (err) throw err;
      // Step 2: Upon write success, execute command
      cmd.runSync("python3" + CliExecutablePath + " "
                  + RepoPathFlag + " " + DemoRepoPath + " "
                  + GitfactsFlag + " " + GitfactsPath + " "
                  + OutputPathFlag + " " + OutputPathPrefix + requestCounter + " "
                  + QueryPathFlag + " " + QueryPathPrefix + requestCounter + QuerypathSuffix + " "
                  + EvoMePathFlag + " " + EvoMePath + " "
                  + CslicerFlag + " " + CslicerPath);
      // Step 3: Read result
      cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultPath}`, function(err, data, stderr) {
        let result = [];
        lines = data.split(/\n/);
        for (let i = 0; i < lines.length; i++) {
          fields = lines[i].split(/\t/);
          result.push(fields);
        }
        requestCounter++;
        socket.emit(RepoLinkResponse, result);
      })
    })
  });
});

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
