
const STORAGE_KEY = 'documents';

export const exportData = (targetId: string) => {
  let documents = localStorage.getItem(STORAGE_KEY);

  if (documents) {
    documents = JSON.parse(documents);

    if (documents && Array.isArray(documents)) {
      // documentsからtargetIdで指定された要素を取り出す
      const targetDocument = documents.find((document) => document.id === targetId);

      if (targetDocument && targetDocument.content) {
        // targetDocumentのcontentを取得
        const content = targetDocument.content;
        const title = targetDocument.title;

        // テキストファイルとして保存する
        saveTextToFile(content, title + ".md");
      } else {
        console.log("対象のドキュメントまたはcontentが無効です");
      }
    } else {
      console.log("localStorageデータが無効です");
    }
  } else {
    console.log("localStorageにデータがありません");
  }
};

// テキストをファイルとして保存する関数
function saveTextToFile(text: string, filename: string) {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
}
