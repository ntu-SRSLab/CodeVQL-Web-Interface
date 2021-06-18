const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const cmd = require('node-cmd');
const csv = require('fast-csv');
const path = require("path");
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'evome.facta.xyz');
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
const OutPath = process.env.OUT_PATH ? process.env.OUT_PATH : "/Users/limengyang/Desktop"

const PythonScriptsPath = path.join(BasePath, "EvoMe/scripts");
const CliPartialRunBasename = "run_partial.py"
const CliExecutablePath = path.join(PythonScriptsPath, "run.py");
const ParitialCliExecutablePath = path.join(PythonScriptsPath, CliPartialRunBasename)

const RepoPathFlag = "--repo_path";
const DemoRepoPath = path.join(BasePath, "FYP-Challenge-Demo-Repo");
const RepoStorage = process.env.REPO_STORAGE || BasePath

const GitfactsFlag = "--gitfacts_path";
const GitfactsPath = path.join(BasePath, "ext-gitfacts");

const OutputPathFlag = "--output_path";
const OutputPathPrefix = path.join(OutPath, "output");
const OutputPathResultPath = "/output/query.csv";
const OutputPathResultTableHeaderPath = "/rules/resultTableHeader.txt";

const QueryPathFlag = "--query_file_path";
const QueryPathPrefix = path.join(OutPath, "query/query");
const QuerypathSuffix = ".txt";

const EvoMePathFlag = "--evome_path";
const EvoMePath = path.join(BasePath, "EvoMe");

const CslicerFlag = "--cslicer_path";
const CslicerPath = path.join(BasePath, "gitslice/target/cslicer-1.0.0-jar-with-dependencies.jar");

const ProgramFactPathFlag = "--program_fact_path";

function generateTableHeader(_callback) {
  cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultTableHeaderPath}`, function (err, data, stderr) {
    var headers = [];
    lines = data.split(/\n/);
    for (var i = 0; i < lines.length; i++) {
      if (lines[i] != "") {
        headers.push(lines[i]);
      }
    }
    _callback(headers);
  })
}

io.on('connection', (socket) => {
  socket.emit(ServerResponse);

  socket.on('sample repo', (repo, query) => {
    // Step 1: Write query locally
    fs.writeFile(QueryPathPrefix + requestCounter + QuerypathSuffix, query, function (err) {
      if (err) throw err;
      // Step 2: Upon write success, execute command
      cmd.runSync("LOG_LEVEL=" + process.env.LOG_LEVEL + " python3 " + ParitialCliExecutablePath + " "
          + RepoPathFlag + " " + path.join(RepoStorage, repo) + " "
          + GitfactsFlag + " " + GitfactsPath + " "
          + OutputPathFlag + " " + OutputPathPrefix + requestCounter + " "
          + QueryPathFlag + " " + QueryPathPrefix + requestCounter + QuerypathSuffix + " "
          + EvoMePathFlag + " " + EvoMePath + " "
          + CslicerFlag + " " + CslicerPath + " "
          + ProgramFactPathFlag + " " + path.join(RepoStorage, repo, ".facts/20-deps"),
          function(err, data, stderr) {console.log(stderr)}
      );
      // Step 3: Read result
      generateTableHeader(function (headers) {
        cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultPath}`, function (err, data, stderr) {
          var results = [];
          lines = data.split(/\n/);
          for (var i = 0; i < lines.length; i++) {
            if (lines[i] == "") {
              break;
            }
            fields = lines[i].split(/\t/);
            if (headers.length != fields.length) {
              return err;
            } else {
              var result = '{';
              for (var j = 0; j < fields.length; j++) {
                if (j == fields.length - 1) {
                  result += ('"' + headers[j] + '": "' + fields[j] + '"}');
                } else {
                  result += ('"' + headers[j] + '": "' + fields[j] + '", ');
                }
              }
              results.push(JSON.parse(result));
            }
          }
          requestCounter++;
          socket.emit(SampleRepoResponse, results);
        })
      });
    })
  });

  socket.on('repo link', (repoLink, query) => {
    // Step 1: Write query locally
    fs.writeFile(QueryPathPrefix + requestCounter + QuerypathSuffix, query, function (err) {
      if (err) throw err;
      // Step 2: Upon write success, execute command
      cmd.runSync("LOG_LEVEL=" + process.env.LOG_LEVEL + " python3 " + CliExecutablePath + " "
        + RepoPathFlag + " " + DemoRepoPath + " "
        + GitfactsFlag + " " + GitfactsPath + " "
        + OutputPathFlag + " " + OutputPathPrefix + requestCounter + " "
        + QueryPathFlag + " " + QueryPathPrefix + requestCounter + QuerypathSuffix + " "
        + EvoMePathFlag + " " + EvoMePath + " "
        + CslicerFlag + " " + CslicerPath);
      // Step 3: Read result
      generateTableHeader(function (headers) {
        cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultPath}`, function (err, data, stderr) {
          var results = [];
          lines = data.split(/\n/);
          for (var i = 0; i < lines.length; i++) {
            if (lines[i] == "") {
              break;
            }
            fields = lines[i].split(/\t/);
            if (headers.length != fields.length) {
              return err;
            } else {
              var result = '{';
              for (var j = 0; j < fields.length; j++) {
                if (j == fields.length - 1) {
                  result += ('"' + headers[j] + '": "' + fields[j] + '"}');
                } else {
                  result += ('"' + headers[j] + '": "' + fields[j] + '", ');
                }
              }
              results.push(JSON.parse(result));
            }
          }
          requestCounter++;
          socket.emit(RepoLinkResponse, results);
        })
      });
    })
  });
});

const socket_port = process.env.SOCKET_SRV_PORT || 3000;
http.listen(socket_port, () => {
  console.log(`Listening on *:${socket_port}`)
})
