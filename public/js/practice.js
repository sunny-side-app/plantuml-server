// Load Monaco Editor
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs' }});

// https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch
async function postPreviewData(url = "", data = {}) {
    // 既定のオプションには * が付いています
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "text/plain",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // 本体のデータ型は "Content-Type" ヘッダーと一致させる必要があります
    });
    return response; // JSON のレスポンスをネイティブの JavaScript オブジェクトに解釈せず返却
}
  
const getContentBlob = async (url) => {
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        return blob;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const getAscii = async (url) => {
  try {
      const response = await fetch(url);
      const data = await response.text();
      return data;
  } catch (error) {
      console.error(error);
  }
}

const getJson = async (url) => {
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
  }
}

require(['vs/editor/editor.main'], function() {
    // create(): https://microsoft.github.io/monaco-editor/typedoc/functions/editor.create.html
    let editor = monaco.editor.create(document.getElementById('editor-container'), {
        value: 'Please edit this area.\nFor example...\n(Please remove the line above this line.)\n\n@startuml\nBob --> Alice: hello\n@enduml',
        language: 'plaintext', // Change language to plaintext for PlantUML syntax highlighting
        automaticLayout: true,
    });

    let previewContentContainer = document.getElementById('preview-content-container');

    // Function to update the preview
    async function updatePreview() {
        //getValue(): https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.IStandaloneCodeEditor.html#getValue
        let editorValue = editor.getValue();
        // console.log(`editorValues:${editorValue}`);
        // let format = "svg";
        let format = document.getElementById('format-dropdown').value;
        let editData = {
          code: editorValue,
          format: format
        };

        let previewData = await postPreviewData(url="/api.php", data=editData);
        let imageUrl = await previewData.text(); // レスポンスからテキストデータを取得

        if (format === 'txt') {
            const asciiData = await getAscii(imageUrl);
            previewContentContainer.innerHTML = '<pre>' + asciiData + '</pre>';
        } else {
            // それ以外の場合は img 要素で表示
            previewContentContainer.innerHTML = '<img src="' + imageUrl + '" alt="Preview">';
        }
    }
  
    // ドロップダウン要素を取得
    const dropdown = document.getElementById('format-dropdown');
    // ドロップダウンの値が変更されたときに呼び出される関数
    dropdown.addEventListener('change', function() {
        // プレビューを更新
        updatePreview();
    });


    // ダウンロードボタン要素を取得
    const downloadBtn = document.getElementById('download-btn');
    // ダウンロードボタンがクリックされたときの処理
    downloadBtn.addEventListener('click', async () => {
        // formatとして選択されている値を取得
        const format = document.getElementById('format-dropdown').value;

        // APIに送信するデータを準備
        const editorValue = editor.getValue();
        const editData = {
            code: editorValue,
            format: format
        };

        // APIにPOSTリクエストを送信して、ダウンロード用のURLを取得
        const response = await postPreviewData('/api.php', editData);
        const downloadUrl = await response.text();
        console.log("downloadURL:", downloadUrl);
        
        const downloadBlob = await getContentBlob(downloadUrl);
        console.log("downloadBlob:", downloadBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.href = URL.createObjectURL(downloadBlob);      
        downloadLink.download = 'diagram.' + format;
        downloadLink.click();
    });

    // preview answer
    const answerContentContainer = document.getElementById('answer-content-container');
    // Function to preview the answer
    async function previewAnswer(practice) {
        // let editorValue = editor.getValue();
        
        let format = "svg";
        
        let answerData = {
          code: practice.uml,
          format: format
        };

        let answerPreviewData = await postPreviewData(url="/api.php", data=answerData);
        let answerImageUrl = await answerPreviewData.text(); // レスポンスからテキストデータを取得

        // それ以外の場合は img 要素で表示
        answerContentContainer.innerHTML = '<img src="' + answerImageUrl + '" alt="answerPreview">';
    };

    async function previewAnswerCode(practice) {
        let formattedText = practice.uml.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\/g, '\\\\').replace(/\n/g, '<br/>'); // <と>をエスケープし、改行コードを<br>に変換
        
        answerContentContainer.innerHTML =formattedText;
    };

    previewAnswer(practice);
    const answerUMLBtn = document.getElementById('answer-uml-btn');
    const answerCodeBtn = document.getElementById('answer-code-btn');

    answerUMLBtn.addEventListener('click', async () => {
        previewAnswer(practice);
    });

    answerCodeBtn.addEventListener('click', async () => {
        previewAnswerCode(practice);
    });

    // Initial update
    updatePreview();

    // Update the preview whenever the editor content changes
    editor.onDidChangeModelContent(() => {
        updatePreview();
        console.log("called updatePreview()");
    });
});


