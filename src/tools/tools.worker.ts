import { expose } from 'comlink'
import { imageDataRGB } from 'stackblur-canvas'

const ToolsWorker = {
  getBluredImageData: (...params: Parameters<typeof imageDataRGB>) => imageDataRGB(...params),

  splitFile: (fileData: ArrayBuffer, fileName: string, fileType: string, maxChunkSize: number) => {
  const totalSize = fileData.byteLength;
  const totalChunks = Math.ceil(totalSize / maxChunkSize);
  const fileExtension = fileName.includes('.') 
    ? fileName.substring(fileName.lastIndexOf('.')) 
    : '';
  const baseFileName = fileName.includes('.')
    ? fileName.substring(0, fileName.lastIndexOf('.'))
    : fileName;
  
  const chunks: { name: string; data: ArrayBuffer; type: string }[] = [];
  
  for (let i = 0; i < totalChunks; i++) {
    const start = i * maxChunkSize;
    const end = Math.min(totalSize, start + maxChunkSize);
    const chunkData = fileData.slice(start, end);
    
    chunks.push({
      name: `${baseFileName}.part${i + 1}of${totalChunks}${fileExtension}`,
      data: chunkData,
      type: fileType
    });
  }
  
  return chunks;
}
}


expose(ToolsWorker)

