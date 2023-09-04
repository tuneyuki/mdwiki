import { Document } from "@/types/document";

const STORAGE_KEY = 'documents';

export const loadDocuments = () => {
  const documentsJson = localStorage.getItem(STORAGE_KEY);
  if(documentsJson) {
      try {
        let savedDocs = JSON.parse(documentsJson) as Document[];
        return savedDocs;
      } catch (e) {
        console.error(e);
      }
  } else {
    return []
  }
}

export const saveDocuments = (documents: Document[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents));
};