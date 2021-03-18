<template>
  <b-container >
    <b-row>
         <b-col>
          <div class="container">
                <b-form-file id="input-select-upload" v-model="files" 
                  placeholder="Choose projects" drop-placeholder="Drop file here..."
                  @change="onFileChange">
                </b-form-file>
          </div>
        </b-col>
        <b-col>          
          <b-button variant="success"  class=" col-sm-2 " size="lg" @click="OnUploadAndRun">Run</b-button>
         </b-col>
    </b-row>
    <codemirror class="mt-2"  v-model="model"  :options="cmOptions"  />
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

  const ServerResponse = "ServerResponse";
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
         
        object: {
          title: 'How to do lists in Vue',
          author: 'Jane Doe',
          publishedAt: '2016-04-10',
          hello: 'How to do lists in Vue',
          world: 'Jane Doe',
          int: '2016-04-10'
        },
        selected: [],
        files: [],
        // if upload complete
        status_upload: false,
        // if upload start
        status_upload_start : false,
        value : 0,

        model : "",
       
      };
    },
    created: function () {
      // lisent server event
     this.$socket.on(ServerResponse, function (data) {
        alert(ServerResponse+ ": "+ data);
     });
     this.$uploader.addEventListener("complete", function (event) {
        console.log(event.file.name, " has uploaded");
      });
      this.$uploader.addEventListener("progress", function(event){
        console.log(event, "upload in progress");
      });
       this.$uploader.addEventListener("error", function(event){
        console.log(event, "error");
      });
       this.$uploader.addEventListener("load", function(event){
        console.log(event, "load");
      });
    },

    methods: {
      onFileChange(e) {
        this.value = 0;
        var files = e.target.files || e.dataTransfer.files;
        console.log(files);
        let reader = new FileReader();
        reader.readAsText(files[0], "UTF-8");
        reader.onload =  evt => {
           this.model = evt.target.result;
            // console.log(evt);
        }
        reader.onerror = evt => {
            console.error(evt);
        }
        
        this.files = files;
        this.status_upload = false;
        this.status_upload_start = false;
      },
      OnUploadAndRun() {
        this.$uploader.submitFiles([this.files]);
      }
    },
    computed: {
   
    },
    props: {
      msg: String
    }
  };
</script>


<style scoped lang="scss">
// base style
  @import '../../assets/codemirror.css';
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