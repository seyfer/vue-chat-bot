import { fakeMessages } from './fake-messages'

export const messageService = {
  createMessage,
}

export interface Option {
  text: string;
  value: string;
  action: 'postback' | 'url';
}

export interface Message {
  agent?: string,
  type: 'text' | 'button';
  text: string;
  options?: Option[];
  disableInput?: boolean;
}

function createMessage (): Promise<Message> {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * fakeMessages.length)
      resolve(fakeMessages[randomNumber])
    }, 1000)
  })
}
