export class CreateEbookDto {
  title: string;
  publisher: string;
  author: string;
  overview: string;
  price: number;
  stock: number;
  fileData?: string; //base64
}