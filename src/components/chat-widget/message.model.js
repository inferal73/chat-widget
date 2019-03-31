export class Message {
  #schema = {
    author: 'user',
    time: +new Date(),
    text: '',
  };

  constructor(data) {
    return Object.keys(this.#schema)
      .reduce((res, key) => (res[key] = data[key] || this.#schema[key], res), {});
  }
}
