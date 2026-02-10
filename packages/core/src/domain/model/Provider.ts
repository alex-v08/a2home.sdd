import { User } from "./User";

export class Provider extends User {
  constructor(
    id: string,
    email: string,
    name: string,
    public readonly rating: number,
    public readonly enrollment: string
  ) {
    super(id, email, name);
    this.validateProvider();
  }

  private validateProvider() {
    if (this.rating < 0 || this.rating > 5) {
      throw new Error("Rating must be between 0 and 5.");
    }
    if (!this.enrollment || this.enrollment.trim().length === 0) {
      throw new Error("Provider enrollment (matrícula) is required.");
    }
  }
}
