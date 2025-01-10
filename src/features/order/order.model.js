export default class OrderModel {
  constructor(userId, totalAmount, timestamp) {
    this.userId = userId;
    this.timestamp = timestamp;
    this.totalAmount = totalAmount;
  }
}