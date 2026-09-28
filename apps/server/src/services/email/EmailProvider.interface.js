export class EmailProviderInterface {
  /**
   * @param {string} to
   * @param {string} subject
   * @param {string} html
   */
  async send(to, subject, html) {
    throw new Error("send() not implemented");
  }
}
