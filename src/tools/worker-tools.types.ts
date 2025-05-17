export type WorkerTools = {
  getBluredImageData(
    data: ImageData,
    topX: number,
    topY: number,
    width: number,
    height: number,
    radius: number
  ): Promise<ImageData>

   splitFile(
    fileData: ArrayBuffer,
    fileName: string,
    fileType: string,
    maxChunkSize: number
  ): Promise<{ name: string, data: ArrayBuffer, type: string }[]>;
  
}
