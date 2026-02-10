export class Service {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string
  ) {
    this.validate();
  }

  private validate() {
    if (!this.id) throw new Error("Service ID is required.");
    if (!this.name || this.name.trim().length === 0) throw new Error("Service name is required.");
  }
}
