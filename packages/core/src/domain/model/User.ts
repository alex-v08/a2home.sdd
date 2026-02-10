export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string
  ) {
    this.validate();
  }

  protected validate() {
    if (!this.id) throw new Error("User ID is required.");
    if (!this.email || !this.email.includes("@")) throw new Error("Valid email is required.");
    if (!this.name || this.name.trim().length === 0) throw new Error("Name is required.");
  }
}
