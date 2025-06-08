function scan(fileId, remove = true, title = 'OCR_TEST', language = 'ja') {
  const resource = {
    title: title
  };
  const option = {
    "ocr": true,
    "ocrLanguage": language
  };

  const maxRetries = 5;  // 最大再試行回数
  const maxBackoff = 64000;  // 最大バックオフ時間（ミリ秒）
  let retryCount = 0;

  // Drive API呼び出しを再試行するための関数
  function retryableDriveCall() {
    while (retryCount < maxRetries) {
      try {
        const file = Drive.Files.copy(resource, fileId, option);  // コピー処理
        return file;  // 成功した場合、結果を返す
      } catch (e) {
        Logger.log("エラーが発生しました: " + e.message);

        // リクエストが失敗した場合、再試行
        retryCount++;
        let backoffTime = Math.min(Math.pow(2, retryCount) * 1000 + Math.random() * 1000, maxBackoff);
        Logger.log("再試行までの待機時間: " + backoffTime + "ミリ秒");
        Utilities.sleep(backoffTime);  // バックオフ時間の待機
      }
    }

    throw new Error("最大再試行回数を超えました。");
  }

  // Drive API呼び出しを実行（再試行対応）
  const file = retryableDriveCall();
  const copiedFileId = file.id;
  const copiedFile = DocumentApp.openById(copiedFileId);

  if (!remove) return copiedFile;

  const text = copiedFile.getBody().getText();
  Drive.Files.remove(copiedFile);
  return text;
}

function scanFromBlob(blob,title){
  const resource = {
    title: title
  };
  const option = {
    "ocr": true,
    "ocrLanguage": 'ja',
    'uploadType': 'multipart'
  };

  const maxRetries = 5;  // 最大再試行回数
  const maxBackoff = 64000;  // 最大バックオフ時間（ミリ秒）
  let retryCount = 0;

  // Drive API呼び出しを再試行するための関数
  function retryableDriveCall() {
    while (retryCount < maxRetries) {
      try {
        // const file = Drive_v3.Files.create(resource,blob,option);
        const file = Drive.Files.insert(resource,blob,option);
        return file;  // 成功した場合、結果を返す
      } catch (e) {
        Logger.log("エラーが発生しました: " + e.message);

        // リクエストが失敗した場合、再試行
        retryCount++;
        let backoffTime = Math.min(Math.pow(2, retryCount) * 1000 + Math.random() * 1000, maxBackoff);
        Logger.log("再試行までの待機時間: " + backoffTime + "ミリ秒");
        Utilities.sleep(backoffTime);  // バックオフ時間の待機
      }
    }

    throw new Error("最大再試行回数を超えました。");
  }

  // Drive API呼び出しを実行（再試行対応）
  const file = retryableDriveCall();
  const fileId = file.id;
  const copiedFile = DocumentApp.openById(fileId);

  const text = copiedFile.getBody().getText();
  Drive.Files.remove(fileId);
  return text;
}

function scanFromBlobClient(){
  const file = DriveApp.getFileById('1FsHR-j1uH0qJHraj3roi5wE8pmzvcu0P');
  const fileId = file.getId();
  const blob = file.getBlob();
  const title = 'ばかちん';
  const text = scanFromBlob(blob,title);
  console.log(text);
  // const text = scan(fileId);
}