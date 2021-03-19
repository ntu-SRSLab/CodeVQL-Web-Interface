const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
const ServerResponse = "ServerResponse";
const SampleRepoResponse = "SampleRepoResponse";
const RepoLinkResponse = "RepoLinkResponse";
const mockData = [
  {caller: "a", callee: "b", version: "1"},
  {caller: "c", callee: "d", version: "2"},
  {caller: "e", callee: "f", version: "3"},
];
io.on('connection', (socket) => {
  socket.emit(ServerResponse);
  socket.on('sample repo', (repo, query) => {
    console.log("Sample repo: " + repo + "," + query);
    socket.emit(SampleRepoResponse, mockData);
  });
  socket.on('repo link', (repoLink, query) => {
    console.log("Repo link: " + repoLink + "," + query);
    socket.emit(RepoLinkResponse, mockData);
  });
});

http.listen(3000, () => {
  console.log('Listening on *:3000')
})