import { initialBlogContent } from './constant';
import { Command } from 'commander';
import { init } from './commands';
import { desc, tags, time, version } from './options';
import { cmdWithOpts, fileHandler } from './utils';
const program = new Command();

program.description('CLI to generate a blog template');

cmdWithOpts(program, {
  cmd: init,
  opts: [time, desc, tags],
}).action(
  /**
   * @param {string} value - 使用 doc init 命令后输入的参数，e.g. doc init hello，则 value 为 hello
   * @param {string} time - 使用 doc init 命令后输入的 -t, --time 参数，e.g. doc init hello -t 2020-01-01，则 time 为 2020-01-01
   * @param {string} desc - 使用 doc init 命令后输入的 -d, --desc 参数，e.g. doc init hello -d 'hello world'，则 desc 为 'hello world'
   * @param {string} tags - 使用 doc init 命令后输入的 -tg, --tags 参数，e.g. doc init hello -tg hello,world，则 tags 为 ['hello', 'world']
   */
  async (value, { time, desc, tags }) => {
    console.debug('🚀 ~ tags', tags);
    console.debug('🚀 ~ desc', desc);
    console.debug('🚀 ~ time', time);
    console.debug('🚀 ~ value', value);

    const blogTitle = `${value}`; // 文章的标题
    const blogFilename = `${time}-${value}`; // e.g. 2020-01-01-React18新特性，是 blog 目录下的文件名
    const blogTags = `[${tags.join(', ')}]`;
    const blogRootPath =
      '/Users/yukee798/Downloads/remain/Yukee-798.github.io/blog';
    const blogFilePath = `${blogRootPath}/${blogFilename}/index.md`;

    const typoraPath = '/Applications/Typora.app/Contents/MacOS/Typora';

    // const blogContent = await fileHandler.read(blogFilePath);
    // console.log(blogContent);

    // 1. 创建 blog/`${time}-${value}`/index.md 这个目录
    fileHandler
      .createPath(
        blogFilePath,
        'file',
        initialBlogContent(blogTitle, blogTags, desc)
      )
      .then(() => {
        console.log('123')
        fileHandler.exec(blogFilePath);
      });

    // 2. 使用 Typora 打开该 markdown
    // await
  }
);

program.parse();