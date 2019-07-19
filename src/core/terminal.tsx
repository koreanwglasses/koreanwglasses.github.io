import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Console } from '../components/console';
import { TerminalCursor, CursorWrapper } from './terminal-cursor';
import { TerminalReadonlyBuffer, TerminalBuffer } from './terminal-buffer';

type TerminalInputHandler = (
  event: React.FormEvent<HTMLInputElement>
) => boolean | void;

type RenderOptions = {
  autoMoveCursor?: boolean;
};

const defaultRenderOptions = {
  autoMoveCursor: true
};

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

const insertLineBreaks = (contents: React.ReactNodeArray) => {
  const result: React.ReactNodeArray = [];
  for (const node of contents) {
    if (typeof node === 'string') {
      const newNodes = node
        .split(/(\n)/g)
        .map(value => (value === '\n' ? <br /> : value));
      result.push(...newNodes);
    } else {
      result.push(node);
    }
  }
  return result;
};

export class Terminal {
  private container: Element;

  // TODO: Consistency with private variables
  public buffer: TerminalBuffer = new TerminalBuffer();

  private inputCallbacks: TerminalInputHandler[] = [];
  private keyDownCallbacks: React.KeyboardEventHandler<HTMLInputElement>[] = [];

  public cursor: TerminalCursor = new TerminalCursor();

  constructor({ container }: { container: Element }) {
    this.container = container;
  }

  private handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    let wasConsumed = false;
    for (const callback of this.inputCallbacks) {
      if (callback(e)) wasConsumed = true;
    }

    if (!wasConsumed) {
      this.buffer.push(e.currentTarget.value);
      this.render();
    }

    e.currentTarget.value = '';
  };

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    this.keyDownCallbacks.forEach(callback => callback(e));
  };

  private prepareContents() {
    return insertLineBreaks(
      replaceSpaces(injectCursor(this.buffer, this.cursor.position))
    );
  }

  render(opts: RenderOptions = {}) {
    const { autoMoveCursor } = { ...defaultRenderOptions, ...opts };
    if (autoMoveCursor) {
      this.cursor.position = this.buffer.length;
    }

    ReactDOM.render(
      <Console
        contents={this.prepareContents()}
        onInput={this.handleInput}
        onKeyDown={this.handleKeyDown}
      />,
      this.container
    );
  }

  onInput(callback: TerminalInputHandler) {
    this.inputCallbacks.push(callback);
  }

  onKeyDown(callback: React.KeyboardEventHandler<HTMLInputElement>) {
    this.keyDownCallbacks.push(callback);
  }
}
