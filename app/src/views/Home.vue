<template>
  <b-container class="bv-example-row">
    <b-row class="text-center">
      <b-col  cols="8">
          <b-input-group size="lg" prepend="Or input GitHub Repo Link Here:">
            <b-form-input @change="OnLinkInput"></b-form-input>
          </b-input-group>
      </b-col>
      <b-col>
        <b-dropdown id="selectSampleRepo" :text="selectedRepo" :variant="selectedRepoColor" size="lg">
          <b-dropdown-item @click="OnSampleRepoSelected(0)">None</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(1)">commons-csv</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(2)">commons-cli</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(3)">commons-io</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(4)">commons-compress</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(5)">commons-lang</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(6)">commons-math</b-dropdown-item>
          <b-dropdown-item @click="OnSampleRepoSelected(7)">EvoMe-Demo-Repo</b-dropdown-item>
        </b-dropdown>
      </b-col>
      <b-col>          
        <b-button variant="success" size="lg" @click="OnUploadAndRun">Run</b-button>
      </b-col>
    </b-row>
    <table class="table table-hover" style="text-align: left">
    <thead>
      <tr>
        <th>You may try some sample queries available as below</th>
      </tr>
    </thead>
    <tbody>
      <tr @click="HandleClick(0)">
        <td>Regression test selection</td>
      </tr>
      <tr @click="HandleClick(1)">
        <td>Find new callee to any method </td>
      </tr>
      <tr @click="HandleClick(2)">
        <td>Find any calls to a method that exists in certain versions but do not exist in other </td>
      </tr>
    </tbody>
  </table>
    <div style="margin-bottom: 0rem"><codemirror class="mt-2"  v-model="model" :options="cmOptions" /></div>
    <div><b-table striped hover :items="results"></b-table></div>
    <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  </b-container>
</template>


<script>
  // language
  import 'codemirror/mode/vue/vue.js'
  import 'codemirror/mode/sql/sql.js'
  // active-line.js
  import 'codemirror/addon/selection/active-line.js'

  // styleSelectedText
  import 'codemirror/addon/selection/mark-selection.js'
  import 'codemirror/addon/search/searchcursor.js'

  // highlightSelectionMatches
  import 'codemirror/addon/scroll/annotatescrollbar.js'
  import 'codemirror/addon/search/matchesonscrollbar.js'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/match-highlighter.js'

  // keyMap
  import 'codemirror/mode/clike/clike.js'
  import 'codemirror/addon/edit/matchbrackets.js'
  import 'codemirror/addon/comment/comment.js'
  import 'codemirror/addon/dialog/dialog.js'
  import 'codemirror/addon/dialog/dialog.css'
  import 'codemirror/addon/search/searchcursor.js'
  import 'codemirror/addon/search/search.js'
  import 'codemirror/keymap/sublime.js'

  // foldGutter
  import 'codemirror/addon/fold/foldgutter.css'
  import 'codemirror/addon/fold/brace-fold.js'
  import 'codemirror/addon/fold/comment-fold.js'
  import 'codemirror/addon/fold/foldcode.js'
  import 'codemirror/addon/fold/foldgutter.js'
  import 'codemirror/addon/fold/indent-fold.js'
  import 'codemirror/addon/fold/markdown-fold.js'
  import 'codemirror/addon/fold/xml-fold.js'

  // loading
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';

  // constant
  import { RegressionTestSelectionQuery, CalleeChangedQuery, MethodUnusedQuery } from '../utils/constant.js'

  const ServerResponse = "ServerResponse";
  const SampleRepoResponse = "SampleRepoResponse";
  const RepoLinkResponse = "RepoLinkResponse";
  export default {
    name: "Home",
    data: function () {
      return {
       cmOptions: {
          mode: 'text/x-sql',
          viewportMargin: Infinity,
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          foldGutter: true,
          lineWrapping: true,
          styleSelectedText: true,
          keyMap: "sublime",
          matchBrackets: true,
          showCursorWhenSelecting: true,
          theme: "default",
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
          }
        },
        model : "",
        repoLink : "",
        repo : "",
        selectedRepo : "Or Select Sample Repo",
        selectedRepoColor : "",
        results: [],
        isLoading: false,
        fullPage: true
      };
    },
    components: {
      Loading,
    },
    created: function () {
      var self = this;
      this.$socket.on(ServerResponse, function() {
        alert(ServerResponse+ ": socket connected");
      }),
      this.$socket.on(SampleRepoResponse, function(data) {
        self.$data.results = data;
        self.$data.isLoading = false;
      }),
      this.$socket.on(RepoLinkResponse, function(data) {
        self.$data.results = data;
        self.$data.isLoading = false;
      })
    },
    methods: {
      HandleClick(index) {
        if (index == 0) {
          this.$data.model = RegressionTestSelectionQuery;
          this.$data.repo = "commons-math";
          this.$data.selectedRepo = "commons-math";
          this.$data.selectedRepoColor = "primary";
        } else if (index == 1) {
          this.$data.model = CalleeChangedQuery;
          this.$data.repo = "EvoMe-Demo-Repo";
          this.$data.selectedRepo = "EvoMe-Demo-Repo";
          this.$data.selectedRepoColor = "primary";
        } else {
          this.$data.model = MethodUnusedQuery;
          this.$data.repo = "EvoMe-Demo-Repo";
          this.$data.selectedRepo = "EvoMe-Demo-Repo";
          this.$data.selectedRepoColor = "primary";
        }
      },
      OnLinkInput(e) {
        this.$data.repoLink = e;
      },
      OnSampleRepoSelected(e) {
        switch (e) {
          case 0:
            this.$data.repo = "";
            this.$data.selectedRepo = "Or Select Sample Repo";
            this.$data.selectedRepoColor = "";
            break;
          case 1: 
            this.$data.repo = "commons-csv";
            this.$data.selectedRepo = "commons-csv";
            this.$data.selectedRepoColor = "primary";
            break; 
          case 2: 
            this.$data.repo = "commons-cli";
            this.$data.selectedRepo = "commons-cli";
            this.$data.selectedRepoColor = "primary";
            break;
          case 3: 
            this.$data.repo = "commons-io";
            this.$data.selectedRepo = "commons-io";
            this.$data.selectedRepoColor = "primary";
            break;
          case 4: 
            this.$data.repo = "commons-compress";
            this.$data.selectedRepo = "commons-compress";
            this.$data.selectedRepoColor = "primary";
            break;
          case 5: 
            this.$data.repo = "commons-lang";
            this.$data.selectedRepo = "commons-lang";
            this.$data.selectedRepoColor = "primary";
            break;
          case 6:
            this.$data.repo = "commons-math";
            this.$data.selectedRepo = "commons-math";
            this.$data.selectedRepoColor = "primary";
            break;
          case 7: 
            this.$data.repo = "EvoMe-Demo-Repo";
            this.$data.selectedRepo = "EvoMe-Demo-Repo";
            this.$data.selectedRepoColor = "primary";
        }
      },
      OnUploadAndRun() {
        if (this.$data.repo != "" && this.$data.repoLink != "") {
          alert("You can only input link or select a sample repo, not both");
        } else if (this.$data.repo != "") {
          if (this.$data.model == "") {
            alert("You haven't write any query yet");
          }
          this.$socket.emit("sample repo", this.$data.selectedRepo, this.$data.model);
          this.$data.isLoading = true;
          this.$data.repo = "";
        } else {
          if (this.$data.model == "") {
            alert("You haven't write any query yet");
          }
          this.$socket.emit("repo link", this.$data.repoLink, this.$data.model);
          this.$data.isLoading = true;
          this.$data.repoLink = "";
        }
      }
    }
  };
</script>


<style scoped lang="scss">
// base style
  @import '../assets/codemirror.css';
  // theme css
  
  .container /deep/ {
    @import "~bootstrap-vue/dist/bootstrap-vue";
    @import "~bootstrap/dist/css/bootstrap";
  }

  .normal{
             width:98%   !important; 
             height: 800px; border:thin
  }
  .large{
              width:300%  !important; 
              height: 800px; border:thin
  }
  div {
       z-index: 1; /* integer */
  }
</style>
