export class GeoLocation {
  constructor(public readonly latitude: number, public readonly longitude: number) {
    this.validate();
  }

  private validate() {
    if (this.latitude < -90 || this.latitude > 90) {
      throw new Error("Invalid latitude. Must be between -90 and 90.");
    }
    if (this.longitude < -180 || this.longitude > 180) {
      throw new Error("Invalid longitude. Must be between -180 and 180.");
    }
  }
}
