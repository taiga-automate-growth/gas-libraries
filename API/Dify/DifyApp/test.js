function testPostMessage_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const dify = new Dify(apikey);
  const res = dify.postMessage("学校は何をするところですか？");
  const answer = res.data.outputs.answer;
}

function testGetKnowledgeBases_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const knowledgeBases = dify.getKnowledgeBases();
  console.log(knowledgeBases);
}

function testDocuments_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const studyKnowledgeId = "8cd33530-6f35-47ab-ad8f-360fccc65427";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const documents = dify.getDocuments(studyKnowledgeId).getContentText();  
  const parsedDocuments = JSON.parse(documents);
  console.log(parsedDocuments);
}

function testUpdateDocuments_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const knowledgeId = "da23ca60-6076-4760-83cb-c93045fe35b2";
  const studyKnowledgeId = "8cd33530-6f35-47ab-ad8f-360fccc65427";
  const documentId = "aaef999a-1581-4fa6-89db-7a9fcc05bbc0";
  const studyDocumentId = "12c737ac-df6b-4578-969e-18221db065de";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const res = dify.updateDocuments(studyKnowledgeId, studyDocumentId, "学校は勉強するところです").getContentText();
  console.log(res);
}

function testGetSegments_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const knowledgeId = "da23ca60-6076-4760-83cb-c93045fe35b2";
  const documentId = "aaef999a-1581-4fa6-89db-7a9fcc05bbc0";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const res = dify.getSegments(knowledgeId,documentId).getContentText();
  const parsedRes = JSON.parse(res);
  console.log(parsedRes);
}

function testCreateKnowledge_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const knowledge = dify.createKnowledge("勉強","only_me");
  console.log(knowledge);
}

function testCreateDocument_(){
  const apikey = "app-Kj7ua5YSLxi48H7CSt5KnYTT";
  const knowledgeBaseApiKey = "dataset-ea6xY0pciFybKbWVqsgtRYeQ";
  const studyKnowledgeId = "8cd33530-6f35-47ab-ad8f-360fccc65427";
  const dify = new Dify(apikey,knowledgeBaseApiKey);
  const content = `「勉強」とは、知識やスキルを習得するための活動や努力を指します。具体的には、学校の授業や教科書を使って新しい情報を学んだり、自分で調べ物をしたり、問題を解いたりすることを含みます。また、勉強は単に暗記するだけでなく、考える力や理解力を深めることも目的としています。

「勉強」の内容は学ぶ分野によって異なり、学校では数学、科学、歴史、言語などさまざまな科目があります。さらに、社会に出てからも新しいスキルを学ぶことが必要な場合があり、その場合も「勉強」として捉えられます。

勉強の目的は、単に試験に合格することだけでなく、将来的に仕事や生活に役立つ知識やスキルを身につけるためでもあります。`

  const res = dify.createDocumentByText(studyKnowledgeId,"勉強.txt",content).getContentText();
  const parsedRes = JSON.parse(res);
  console.log(parsedRes);
}