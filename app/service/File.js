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
    if (!this.ctx.request.files || this.ctx.request.files.length === 0) {
      this.ctx.throw(400, '请选择文件');
    }
    const file = this.ctx.request.files[0];
    const { data, md5, ext } = await this.checkFileInfo(file);

    const filename = `${md5}.${ext}`;

    // 文件路径
    const { diskPath, path } = this.createUploadPath(params.folder, filename);

    await fsPromises.writeFile(diskPath, data);

    return { path };
  }

  // 解析文件信息
  async checkFileInfo(file) {
    const fsHash = crypto.createHash('md5');
    const data = await fsPromises.readFile(file.filepath);
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
  createUploadPath(folder, filename) {
    // 获取配置中文件存放位置
    const disk = this.app.config.file.disk;
    const dir = folder ? `${disk}/${folder}` : `${disk}`;
    // const local = dayjs().format('YYYYMMDD');
    if (!fs.existsSync(disk)) {
      fs.mkdirSync(disk);
    }
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const diskPath = `${dir}/${filename}`; // 物理路径
    const path = folder ? `${folder}/${filename}` : `${filename}`; // 存储路径
    return { diskPath, path };
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
