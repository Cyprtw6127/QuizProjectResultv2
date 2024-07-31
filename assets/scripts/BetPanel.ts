const { ccclass, property } = cc._decorator;

@ccclass
export default class BetPanel extends cc.Component {
    @property(cc.Label)
    private balanceText: cc.Label = null;

    @property(cc.Label)
    private betText: cc.Label = null;

    @property(cc.Button)
    private increaseBetButton: cc.Button = null;

    @property(cc.Button)
    private decreaseBetButton: cc.Button = null;

    @property(cc.Button)
    private placeBetButton: cc.Button = null;

    @property(cc.Node)
    private overlayBG: cc.Node = null;

    @property(cc.Node)
    private reloadPopup: cc.Node = null;

    private currentBalance: number = 1350.0;

    private currentBet: number = 10;

    private betGap1: number = 10; // for when current bet value below 100

    private betGap2: number = 100; // for when current bet value is same or above 100

    protected start(): void {
        this.setupBetPanel();
    }

    private setupBetPanel() {
        this.balanceText.string = this.currentBalance.toFixed(2);
        this.betText.string = this.currentBet.toFixed(2);
        this.decreaseBetButton.interactable = false; // starting cannot decrease bet because its already minimum
    }

    /**
     * Button function Increase bet
     */
    onIncreaseBet() {
        this.currentBet >= 100 ? (this.currentBet += this.betGap2) : (this.currentBet += this.betGap1);

        // update betText
        this.betText.string = this.currentBet.toFixed(2);

        // make sure when bet is maximum, disable increase bet button
        if (this.currentBet == 1000) {
            this.increaseBetButton.interactable = false;
        }

        this.decreaseBetButton.interactable = true;

        this.checkCanPlaceBet();
    }

    /**
     * Button function decrease bet
     */
    onDecreaseBet() {
        this.currentBet > 100 ? (this.currentBet -= this.betGap2) : (this.currentBet -= this.betGap1);

        // update betText
        this.betText.string = this.currentBet.toFixed(2);

        if (this.currentBet == 10) {
            this.decreaseBetButton.interactable = false;
        }

        this.increaseBetButton.interactable = true;

        this.checkCanPlaceBet();
    }

    onPlaceBet() {
        this.currentBalance -= this.currentBet;
        // update balance
        this.balanceText.string = this.currentBalance.toFixed(2);
        this.checkCanPlaceBet();
    }

    /**
     * utility function to check whether can place bet or not
     */
    private checkCanPlaceBet() {
        this.placeBetButton.interactable = this.currentBet <= this.currentBalance;
        if (this.currentBalance == 0) {
            this.showReloadPopUp();
        }
    }

    private showReloadPopUp() {
        cc.tween(this.overlayBG).to(0.25, { opacity: 125 }).start();
        this.reloadPopup.active = true;
        cc.tween(this.reloadPopup).to(0.5, { scale: 1, opacity: 255 }, { easing: 'backOut' }).start();
    }
}
