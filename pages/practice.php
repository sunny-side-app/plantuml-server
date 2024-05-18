<?php
$practiceId = $_GET['id'];
$practice = fetchPractice($practiceId);
$practiceJson = json_encode($practice);
function fetchPractice($id)
{
    $practices = file_get_contents("../public/json/practices.json");
    $practicesDecoded = json_decode($practices, true);
    // practices.jsonの問題idは0ではなく1からスタート
    return $practicesDecoded[$id - 1];
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="/public/css/style.css" /> 
    <title>Monaco Editor with Preview Pane</title>
    <!-- Load Monaco Editor -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.20.0/min/vs/loader.min.js"></script>
</head>
<body>
    
    <header>
        <h2><a href="/index.php">PlantUML Practices</a></h2>
        <nav>
        </nav>
    </header>
    <div id="title-container">
        ID:<?php echo $practice['id'];?>
        <?php echo $practice['title'];?>
    </div>
    <div id="parent-container" class='parent justify-content-between'>
        <div id="editor-container"></div>
        <div id="preview-container">
            <select id="format-dropdown">
                <option value="svg">SVG</option>
                <option value="png">PNG</option>
                <option value="txt">ASCII Art</option>
                <!-- 他のフォーマットも追加 -->
            </select>
            <button id="download-btn">Download</button>
            <a href="https://plantuml.com/ja/guide" target="_blank">Cheat Sheet</a>
            <div id="preview-content-container"></div>
        </div>
        <div id="answer-container">
            <button id="answer-uml-btn">Answer UML</button>
            <button id="answer-code-btn">Answer Code</button>
            <div id="answer-content-container">
        </div>
    </div>
    <script>
        let practice = <?php echo json_encode($practice); ?>;
    </script>
    <script src="/public/js/practice.js">
    </script>

</body>
</html>
