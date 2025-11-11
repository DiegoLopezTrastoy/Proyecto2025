'use server'

import ollama from "ollama"
import { LocalIndex } from 'vectra';

const index = new LocalIndex('index');

if (!(await index.isIndexCreated())) {
    await index.createIndex();
}

export async function generateEmbedding(text: string) {
  const response = await ollama.embed({ model: 'phi3:mini', input: text });
  const embeddings = response['embeddings'];
  index.insertItem({
    vector: embeddings[0],
    metadata: {text}
  });
}

export async function getEmbedding(text: string) {
  const response = await ollama.embed({ model: 'phi3:mini', input: text });
  const embeddings = response['embeddings'];
  const result = await index.queryItems(embeddings[0], text, 3);
  return result;
}

export async function getAllEmbeddings() {
  return index.listItems();
}