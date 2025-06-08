class WhisperApp {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  /**
   * 音声Blobを渡して文字起こしを実行
   * @param {Blob} blob Google Apps ScriptのBlobオブジェクト
   * @returns {string} transcription text
   */
  transcription(blob) {
    if (!blob) throw new Error('音声Blobが無効です');

    // Whisper APIに渡すために、ファイル名を設定（重要）
    const namedBlob = blob.setName('audio.m4a'); // 拡張子は形式に応じて調整

    const formData = {
      file: namedBlob,
      model: 'whisper-1',
      response_format: 'text'
    };

    const response = UrlFetchApp.fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'post',
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        },
        payload: formData,
        muteHttpExceptions: true
      }
    );

    if (response.getResponseCode() !== 200) {
      const error = JSON.parse(response.getContentText());
      throw new Error(`Whisper Error: ${error.error?.message}`);
    }

    return response.getContentText().trim();
  }
}
