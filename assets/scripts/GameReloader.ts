const { ccclass, property } = cc._decorator;

@ccclass
export default class GameReloader extends cc.Component {
    /**
     * reload game with ok button
     */
    reloadGame() {
        window.location.reload();
    }
}
