import { points } from '../mock/point-mock.js';

export default class PointsModel {
  constructor() {
    this.points = points;
  }

  getPoints() {
    return this.points;
  }
}
