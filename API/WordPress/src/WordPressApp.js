class WordPressApp {
    constructor(siteUrl,userName,appPassword) {
        this.apiUrl = siteUrl + '/wp-json/wp/v2/';
        this.userName = userName;
        this.appPassword = appPassword;
    }

    /**
     * 投稿データを作成する
     * @param {string} title - 投稿タイトル
     * @param {string} content - 投稿内容
     * @returns {Object} 投稿データ
     */
    postParameter(title, content) {
        return new PostParameter(title, content);
    }

    /**
     * 投稿する 
     * @param {PostParameter} postParameter - 投稿データ
     * @returns {Object} 投稿結果
     */
    post(postParameter) {
        try {
            const path = 'posts';
            const options = {
                method: 'post',
                contentType: 'application/json',
                headers: {
                    'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
                },
                payload: JSON.stringify(postParameter.build()),
                muteHttpExceptions: true
            };

            const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
            const responseCode = response.getResponseCode();
            
            if (responseCode !== 200 && responseCode !== 201) {
                throw new Error(`HTTP error! status: ${responseCode}: ${response.getContentText()}`);
            }

            return JSON.parse(response.getContentText());
        } catch (error) {
            console.error('投稿エラー:', error);
            throw error;
        }
    }

    updatePost(postId,postParameter){
        const path = `posts/${postId}`;
        const options = {
            method: 'put',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
            },
            payload: JSON.stringify(postParameter.build()),
            muteHttpExceptions: true
        };

        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
        if (responseCode !== 200) {
            throw new Error(`HTTP error! status: ${responseCode}: ${response.getContentText()}`);
        }
        return JSON.parse(response.getContentText());
    }

    getCategories(){
        const path = 'categories';
        const options = {
            method: 'get',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
            }
        }
        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
        if (responseCode !== 200) {
            throw new Error(`HTTP error! status: ${responseCode}`);
        }
        return JSON.parse(response.getContentText());
    }

    getTags(){
        const path = 'tags';
        const options = {
            method: 'get',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
            }
        }
        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
        if (responseCode !== 200) {
            throw new Error(`HTTP error! status: ${responseCode}`);
        }
        return JSON.parse(response.getContentText());
    }

    getAuthors(){
        const path = 'users';
        const options = {
            method: 'get',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
            }
        }
        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
        if (responseCode !== 200) {
            throw new Error(`HTTP error! status: ${responseCode}`);
        }
        return JSON.parse(response.getContentText());
    }

    getMedias(){
        const path = 'media';
        const options = {
            method: 'get',
            contentType: 'application/json',
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword)
            }
        }
        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
        if (responseCode !== 200) {
            throw new Error(`HTTP error! status: ${responseCode}`);
        }
        return JSON.parse(response.getContentText());
    }

    /**
     * メディアを作成する
     * @param {DriveApp.File} file - Google Drive のメディアファイル
     * @returns {Object} アップロード結果（ID や source_url を含む）
     */
    createMedia(file) {
        const path = 'media';
        const blob = file.getBlob();
    
        const options = {
            method: 'post',
            contentType: blob.getContentType(), // image/jpeg など
            payload: blob.getBytes(),
            headers: {
                'Authorization': 'Basic ' + Utilities.base64Encode(this.userName + ':' + this.appPassword),
                'Content-Disposition': 'attachment; filename="' + file.getName() + '"'
            },
            muteHttpExceptions: true
        };
    
        const response = UrlFetchApp.fetch(`${this.apiUrl}${path}`, options);
        const responseCode = response.getResponseCode();
    
        if (responseCode !== 201) {
        throw new Error(`HTTP error! status: ${responseCode}: ${response.getContentText()}`);
        }
    
        return JSON.parse(response.getContentText());
    }  
}