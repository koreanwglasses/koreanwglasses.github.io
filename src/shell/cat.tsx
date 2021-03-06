import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { ShellScript } from './shell-script';
import { readAll, fetchText } from '../utils/async';
import { Fs, Directory, File } from '../core/fs';
import { Shell } from './shell';

const fileExt = (filename: string) =>
  filename.slice(filename.lastIndexOf('.') + 1);

export class Cat extends ShellScript {
  tabCompletions(currentBuffer: string) {
    const args = currentBuffer.split(' ');
    const start = args[1] || '';

    const files = start.startsWith('/')
      ? this.shell.fs.root.tree({ filesOnly: true })
      : this.shell.cwd.tree({ filesOnly: true });
    return files
      .filter(file => file.startsWith(start))
      .map(file => args[0] + ' ' + file);
  }

  private handleError(message: string) {
    this.shell.terminal.buffer.push(`cat: ${message}\n`);
    this.shell.terminal.render();
  }

  async main(args: string[]) {
    if (args.length < 2) {
      this.handleError('missing filename\n');
      return;
    }

    if (args.length > 2) {
      this.handleError('too many arguments\n');
      return;
    }

    const fileName = args[1];
    const node = fileName.startsWith('/')
      ? this.shell.fs.get(fileName)
      : this.shell.cwd.get(fileName);

    if (node === null) {
      this.handleError(`${fileName}: no such file or directory\n`);
      return;
    }
    if (!(node instanceof File)) {
      this.handleError(`${fileName}: is a directory\n`);
      return;
    }

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
    this.shell.keepCommandInView();

    // @ts-ignore
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    // @ts-ignore
    Prism.highlightAll();
  }
}
