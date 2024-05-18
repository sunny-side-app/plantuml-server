<?php
require __DIR__ . '/vendor/autoload.php';
use function Jawira\PlantUml\encodep;

$json_data = json_decode(file_get_contents('php://input'), true);

$uml_code = $json_data["code"];
$format = $json_data["format"];

// var_dump($json_data);

// $encoded = encodep($json_data);
$encoded = encodep($uml_code);

$plantUmlUrl = "http://www.plantuml.com/plantuml/{$format}/{$encoded}";

// // フォーマットがtxtの場合
// if ($format === 'txt') {
//     // ASCIIアートのテキストデータを含むHTML形式のレスポンスを生成
//     $asciiArt = file_get_contents($plantUmlUrl);
//     $htmlResponse = "<pre>{$asciiArt}</pre>";

//     // レスポンスのContent-Typeを設定
//     header('Content-Type: text/html');

//     // レスポンスを出力
//     echo $htmlResponse;
// } else {
//     // それ以外の場合は、PlantUMLのURLをそのまま出力
//     header('Content-Type: text/plain');
//     echo $plantUmlUrl;
// }

header('Content-Type: text/plain'); // レスポンスのContent-Typeを設定

echo "http://www.plantuml.com/plantuml/{$format}/{$encoded}";

?>
