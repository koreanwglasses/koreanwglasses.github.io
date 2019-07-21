import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ShellScript } from './shell-script';
import { readAll, fetchText } from '../utils/async';
import { Fs, NotADirectoryError, Directory, File } from '../core/fs';

const fileExt = (filename: string) =>
  filename.slice(filename.lastIndexOf('.') + 1);

export class Cat extends ShellScript {
  destroy() {}

  private handleError(message: string) {
    this.shell.terminal.buffer.push(`cat: ${message}\n`);
    this.shell.terminal.render();
  }

  async main(args: string[]) {
    if (args.length < 2) {
      this.handleError('Missing filename\n');
      return;
    }

    if (args.length > 2) {
      this.handleError('Too many arguments\n');
      return;
    }

    const fileName = args[1];
    let node;
    try {
      node = (await Fs.getInstance()).get(fileName);
    } catch (e) {
      this.handleError(`${fileName}: No such file or directory\n`);
      return;
    }
    if (node instanceof Directory) {
      this.handleError(`${fileName}: Is a directory\n`);
      return;
    }
    node = node as File;

    let text: string;
    try {
      text = await node.readText();
    } catch (response) {
      this.handleError(`${response.status}: ${response.statusText}\n`);
      return;
    }

    switch (fileExt(fileName)) {
      case 'md':
        // filter out front-matter
        const markdown = text.replace(/---[^]*?---/, '');
        this.shell.terminal.buffer.push(<ReactMarkdown source={markdown} />);
        break;
      default:
        this.shell.terminal.buffer.push(text);
        break;
    }
    this.shell.terminal.render();

    // @ts-ignore
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    // @ts-ignore
    Prism.highlightAll();
  }
}
