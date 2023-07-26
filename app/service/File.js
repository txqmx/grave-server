'use strict';

const Service = require('egg').Service;
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const crypto = require('crypto');

class FileService extends Service {
  constructor(...arg) {
    super(...arg);
    this.delegate = 'model';
  }

  // 文件上传
  async upload(params) {
    const { data, md5, ext } = await this.checkFileInfo(params.file);
    const { dir } = this.createUploadPath(params.folder);
    const filename = `${md5}.${ext}`;
    const result = await fsPromises.writeFile(`${dir}/${filename}`, data);
    return result;
  }

  // 解析文件信息
  async checkFileInfo(file) {
    const fsHash = crypto.createHash('md5');
    const data = await fsPromises.readFile(file.filePath);
    // 获取文件md5
    const md5 = fsHash.update(data).digest('hex');
    // 获取文件大小
    const size = data.length;
    const ext = this.getFileExt(file);
    return {
      data,
      md5,
      size,
      ext,
    };
  }


  // 创建文件保存目录
  createUploadPath(folder) {
    // 获取配置中文件存放位置
    const disk = this.app.config.file.disk;
    const dir = folder ? `${disk}/${folder}` : `${disk}`;
    // const local = dayjs().format('YYYYMMDD');
    if (!fs.existsSync(dir)) { // 目录不存在就创建一个目录
      fs.mkdirSync(dir);
    }
    return { dir };
  }

  // 获取不带.的后缀名
  getFileExt(file) {
    const ext = path.extname(file.filename);
    if (ext.startsWith('.')) {
      return ext.substring(1);
    }
    return ext;
  }

}

module.exports = FileService;
