const { ccclass, property } = cc._decorator;

@ccclass
export default class RocketFloat extends cc.Component {
    @property(cc.Node)
    private rocket: cc.Node = null;

    @property(cc.Node)
    private rocketScaler: cc.Node = null;

    protected start(): void {
        let tweenInst = cc
            .tween(this.rocket)
            .to(1, { y: -50 }, { easing: 'sineOut' })
            .to(1, { y: 0 }, { easing: 'sineIn' })
            .to(1, { y: 50 }, { easing: 'sineOut' })
            .to(1, { y: 0 }, { easing: 'sineIn' });

        cc.tween(this.rocket).repeatForever(tweenInst).start();

        let tweenInst2 = cc
            .tween(this.rocketScaler)
            .to(0.5, { scaleX: 0.95, scaleY: 1.05 }, { easing: 'sineOut' })
            .to(0.5, { scaleX: 1, scaleY: 1 }, { easing: 'sineIn' });

        cc.tween(this.rocketScaler).repeatForever(tweenInst2).start();
    }
}
