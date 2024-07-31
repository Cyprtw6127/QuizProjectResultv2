const { ccclass, property } = cc._decorator;

interface CloudData {
    cloud: cc.Node;
    pool: cc.NodePool;
}

@ccclass
export default class CloudsSpawner extends cc.Component {
    @property(cc.Prefab)
    private cloud1: cc.Prefab = null;

    @property(cc.Prefab)
    private cloud2: cc.Prefab = null;

    @property(cc.Node)
    private frontParent: cc.Node = null;

    @property(cc.Node)
    private backParent: cc.Node = null;

    private cloudPool1: cc.NodePool = new cc.NodePool();

    private cloudPool2: cc.NodePool = new cc.NodePool();

    protected start(): void {
        this.spawnCloudLoop();
    }

    private spawnCloudLoop() {
        const random = Math.floor(Math.random() * 2);
        const cloudObj = this.getFromPoolOrCreate(random);

        const cloud = cloudObj.cloud;
        cloud.parent = this.getRandomParent();
        cloud.x = 300;
        cloud.y = this.getRandomNumber(-150, 150);
        cc.tween(cloud)
            .to(1, { x: -300 }, { easing: 'linear' })
            .call(() => {
                cloudObj.pool.put(cloud);
            })
            .start();

        setTimeout(() => {
            this.spawnCloudLoop();
        }, 500);
    }

    private getFromPoolOrCreate(choice: number): CloudData {
        let cloudObj: cc.Node = null;
        const poolRef = choice == 0 ? this.cloudPool1 : this.cloudPool2;
        cloudObj = poolRef.size() == 0 ? cc.instantiate(choice == 0 ? this.cloud1 : this.cloud2) : poolRef.get();

        return { cloud: cloudObj, pool: poolRef };
    }

    private getRandomParent() {
        const random = Math.floor(Math.random() * 2);
        return random == 0 ? this.backParent : this.frontParent;
    }

    private getRandomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}
