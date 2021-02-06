cc.Class({
  extends: cc.Component,

  properties: {
    areas: {
      type: cc.PolygonCollider,
      default: []
    }
  },

  handleOpacityAll(opacity) {
    this.areas.forEach((area) => (area.node.opacity = opacity));
  },

  handleTouchAll(touch, event) {
    let touchLoc = touch.getLocation();
    this.areas.forEach(({ node, world }) => {
      if (cc.Intersection.pointInPolygon(touchLoc, world.points)) {
        console.log("Touch: ", node.name);
      }
    });
  },

  handleHoverAll(touch, event) {
    let touchLoc = touch.getLocation();
    this.areas.forEach(({ node, world }) => {
      // 檢測 desk hover 區塊是否與 area 區塊交疊
      if (cc.Intersection.pointInPolygon(touchLoc, world.points)) {
        node.opacity = 255;
      } else {
        node.opacity = 0;
      }
    });
  },

  onListener() {
    // 開啟碰撞檢測系統
    cc.director.getCollisionManager().enabled = true;
    // cc.director.getCollisionManager().enabledDebugDraw = true;

    // 監聽 touch, hover
    this.node.on(cc.Node.EventType.MOUSE_MOVE, this.handleHoverAll, this);
    this.node.on(cc.Node.EventType.TOUCH_START, this.handleTouchAll, this);
  },

  init() {
    this.handleOpacityAll(0);
    this.onListener();
  },

  // onLoad () {},

  start() {
    this.init();
  }

  // update (dt) {},
});
