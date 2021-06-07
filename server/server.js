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

const CliExecutablePath = path.join(BasePath, "codeqltosouffle/scripts/run.py");

const RepoPathFlag = "--repo_path";
const DemoRepoPath = path.join(BasePath, "FYP-Challenge-Demo-Repo");
const CommonsIoRepoPath = path.join(BasePath, "commons-io");
const CommonsCsvRepoPath = path.join(BasePath, "commons-csv");
const CommonsCompressRepoPath = path.join(BasePath, "commons-compress");
const PdfboxRepoPath = path.join(BasePath, "pdfbox");
const FlumeRepoPath = path.join(BasePath, "flume");

const GitfactsFlag = "--gitfacts_path";
const GitfactsPath = path.join(BasePath, "ext-gitfacts");

const OutputPathFlag = "--output_path";
const OutputPathPrefix = path.join(OutPath, "output");
const OutputPathResultPath = "/output/query.csv"

const QueryPathFlag = "--query_file_path";
const QueryPathPrefix = path.join(OutPath, "query/query");
const QuerypathSuffix = ".txt";

const CodeqltosouffleFlag = "--codeqltosouffle_path";
const CodeqltosoufflePath = path.join(BasePath, "codeqltosouffle");

const CslicerFlag = "--cslicer_path";
const CslicerPath = path.join(BasePath, "gitslice/target/cslicer-1.0.0-jar-with-dependencies.jar");

const mockData = [
  {caller: "a", callee: "b", version: "1"},
  {caller: "c", callee: "d", version: "2"},
  {caller: "e", callee: "f", version: "3"},
];
class Record {
  constructor(version, methodName) {
    this.version = version;
    this.methodName = methodName;
  }
}

io.on('connection', (socket) => {
  socket.emit(ServerResponse);

  socket.on('sample repo', (repo, query) => {
    socket.emit(SampleRepoResponse, mockData);
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
                  + CodeqltosouffleFlag + " " + CodeqltosoufflePath + " "
                  + CslicerFlag + " " + CslicerPath);
      // Step 3: Read result
      cmd.run(`cat ${OutputPathPrefix + requestCounter + OutputPathResultPath}`, function(err, data, stderr) {
        let result = [];
        let lines = data.split(/\n/);
        let fields;
        for (let i = 0; i < lines.length; i++) {
          fields = lines[i].split(/\t/);
          if (fields.length !== 2) {
            continue;
          }
          result.push(new Record(fields[0], fields[1]));
        }
        requestCounter++;
        socket.emit(RepoLinkResponse, result);
      })

      // Backup for demo: 
      // cmd.run(`cat ${OutputPathPrefix + 0 + OutputPathResultPath}`, function(err, data, stderr) {
      //   var result = [];
      //   lines = data.split(/\n/);
      //   for (var i = 0; i < lines.length; i++) {
      //     fields = lines[i].split(/\t/);
      //     if (fields.length != 2) {
      //       continue;
      //     }
      //     result.push(new Record(fields[0], fields[1]));
      //   }
      //   requestCounter++;
      //   socket.emit(RepoLinkResponse, result);
      // })
    })
  });
});

http.listen(3000, () => {
  console.log('Listening on *:3000')
})
