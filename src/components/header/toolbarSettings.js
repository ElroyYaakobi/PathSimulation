let drawingObjectType = 0;

module.exports = {
  drawingObjectType,
  getSafeDrawingType: () => {
    return this.drawingObjectType || "empty";
  },
  setDrawingType: value => {
    this.drawingObjectType = value;
  }
};
