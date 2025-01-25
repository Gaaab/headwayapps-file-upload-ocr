<?php
header('Content-Type: application/json');

session_start();

// Session counter
$_SESSION['upload_count'] = ($_SESSION['upload_count'] ?? 0) + 1;

if ($_SESSION['upload_count'] > 5) {
  die(json_encode(['text' => 'Daily limit exceeded! You can only post 5 times daily']));
}

$apiKey = 'K89302343688957'; // Replace with actual API key
$language = $_POST['language'] ?? 'eng';
$outputFormat = $_POST['format'] ?? 'txt';

$results = [];
foreach ($_FILES['files']['tmp_name'] as $key => $tmpName) {
  $file = curl_file_create($tmpName, $_FILES['files']['type'][$key], $_FILES['files']['name'][$key]);

  $postFields = [
    'apikey' => $apiKey,
    'language' => $language,
    //'isOverlayRequired' => false,
    'filetype' => 'image',
    'OCREngine' => 2,
    'file' => $file
  ];

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, 'https://api.ocr.space/parse/image');
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $result = curl_exec($ch);
  curl_close($ch);

  $ocrResult = json_decode($result, true);

  //var_dump($ocrResult);

  $results[] = $ocrResult['ParsedResults'][0]['ParsedText'] ?? 'No text found';
}

$finalResult = $outputFormat == 'json'
  ? json_encode($results)
  : implode("\n\n", $results);

echo json_encode(['text' => $finalResult]);
