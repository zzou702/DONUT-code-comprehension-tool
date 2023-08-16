export default class Message {
  private _role: string;
  private _content: string;
  private _isUser: boolean;

  constructor(role: string, content: string, isUser?: boolean) {
    this._role = role;
    this._content = content;
    this._isUser = isUser || false;
  }

  get role() {
    return this._role;
  }

  get content() {
    return this._content;
  }

  get isUser() {
    return this._isUser;
  }
}
