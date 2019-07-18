import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Console } from '../components/console';
import { TerminalCursor, CursorWrapper } from './terminal-cursor';
import { TerminalReadonlyBuffer, TerminalBuffer } from './terminal-buffer';

const injectCursor = (buffer: TerminalBuffer, cursorPosition: number) => {
  if (cursorPosition >= buffer.length) {
    return [...buffer.contents, <CursorWrapper>{'\xa0'}</CursorWrapper>];
  }

  const nodeIndex = buffer.nodeIndexAtPos(cursorPosition);
  const node = buffer.contents[nodeIndex];

  if (typeof node === 'string') {
    const charIndex = cursorPosition - buffer.nodeStartPos(nodeIndex);
    return [
      ...buffer.contents.slice(0, nodeIndex),
      node.slice(0, charIndex),
      <CursorWrapper>{node[charIndex]}</CursorWrapper>,
      node.slice(charIndex + 1),
      ...buffer.contents.slice(nodeIndex + 1)
    ];
  } else {
    return [
      ...buffer.contents.slice(0, nodeIndex),
      <CursorWrapper>{node}</CursorWrapper>,
      ...buffer.contents.slice(nodeIndex + 1)
    ];
  }
};

const replaceSpaces = (contents: React.ReactNodeArray) =>
  contents.map(node =>
    typeof node === 'string'
      ? node.replace(/\t/g, '    ').replace(/ /g, '\u2003')
      : node
  );

export class Terminal {
  private container: Element;

  // TODO: Consistency with private variables
  public buffer: TerminalBuffer = new TerminalBuffer();

  private inputCallbacks: React.FormEventHandler<HTMLInputElement>[] = [];
  private keyDownCallbacks: React.KeyboardEventHandler<HTMLInputElement>[] = [];

  public cursor: TerminalCursor = new TerminalCursor();

  constructor({ container }: { container: Element }) {
    this.container = container;
  }

  private handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    this.inputCallbacks.forEach(callback => callback(e));
    e.currentTarget.value = '';
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.keyDownCallbacks.forEach(callback => callback(e));
  };

  private prepareContents() {
    return replaceSpaces(injectCursor(this.buffer, this.cursor.position));
  }

  render() {
    ReactDOM.render(
      <Console
        contents={this.prepareContents()}
        onInput={this.handleInput}
        onKeyDown={this.handleKeyDown}
      />,
      this.container
    );
  }

  onInput(callback: React.FormEventHandler<HTMLInputElement>) {
    this.inputCallbacks.push(callback);
  }

  onKeyDown(callback: React.KeyboardEventHandler<HTMLInputElement>) {
    this.keyDownCallbacks.push(callback);
  }
}