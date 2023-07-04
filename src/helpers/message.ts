import { fakeMessages, Message } from './fake-messages'

export const messageService = {
  createMessage,
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
