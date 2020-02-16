let drawingObjectType = 0;

module.exports = {
  drawingObjectType,
  getSafeDrawingType: () => {
    return this.drawingObjectType || 0;
  },
  setDrawingType: value => {
    this.drawingObjectType = value;
  }
};
