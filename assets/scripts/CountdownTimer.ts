const { ccclass, property } = cc._decorator;

@ccclass
export default class CountdownTimer extends cc.Component {
    @property(cc.Label)
    private timerText: cc.Label = null;

    private currentTimeValue: number = 10;

    protected start(): void {
        this.loopCountDown();
    }

    private loopCountDown() {
        this.currentTimeValue -= 1;
        if (this.currentTimeValue < 0) {
            this.currentTimeValue = 10;
        }
        this.timerText.string = this.currentTimeValue.toString();
        setTimeout(() => {
            this.loopCountDown();
        }, 1000);
    }
}
