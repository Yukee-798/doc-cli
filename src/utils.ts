import { Command } from 'commander';
import { constants, promises } from 'fs';
import { execFile } from 'child_process';

export type CommandCreator = (program: Command) => Command;

// 获取当天的日期
export const today = () => new Date().toISOString().split('T')[0];

// 生成 command 与 options 的结合
export function cmdWithOpts(
  program: Command,
  {
    cmd: commandCreator,
    opts: optionCreators,
  }: { cmd: CommandCreator; opts: CommandCreator[] }
) {
  return optionCreators.reduce((acc, cur) => cur(acc), commandCreator(program));
}

// 文件操作
export const fileHandler = {
  // 创建一个路径
  async createPath(path: string, type: 'file' | 'dir', content: string = '') {
    const isExisted = await this.exists(path);
    if (!isExisted) {
      if (type === 'file') {
        const dirPath = path
          .split('/')
          .slice(0, -1)
          .join('/');
        await promises.mkdir(dirPath, { recursive: true });
        return promises.writeFile(path, content);
      } else {
        return promises.mkdir(path, { recursive: true });
      }
    } else {
      throw Error(`${path} is existed`);
    }
  },
  // 读取一个文件内容
  async read(path: string) {
    return promises.readFile(path, 'utf8');
  },
  // 判断一个路径是否存在
  async exists(path: string) {
    try {
      await promises.access(path, constants.F_OK);
      return true;
    } catch (err) {
      // console.log(err);
      return false;
    }
  },
  // 打开一个应用，且使用目标工作目录
  async exec(filePath: string) {
    execFile(filePath, {}, (err, stdout, stderr) => {
      if (err) {
        console.error(err);
      } else {
        console.log(stdout);
      }
    });
  },
};
