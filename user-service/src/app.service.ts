import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  getDocumentation(): string {
    const documentPath = join(__dirname, '..', 'documentation', 'index.html');
    try {
      console.log("path = ", documentPath);
      // Đọc nội dung file và trả về
      return readFileSync(documentPath, 'utf-8');
    } catch (error) {
      throw new Error('Documentation file not found.');
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
