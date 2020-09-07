(function () {
    /**
     * 生成新的苹果位置，而且新的位置不能和蛇的位置重合
     * fixme: 这里如果棋盘是长方形，不是正方形，那么这里的逻辑是有问题的
     * @param {*} min 
     * @param {*} max 
     * @param {*} exclude 
     */
    function genRandomApple(min, max, exclude) {
        while (true) {
            let x = Math.floor(Math.random() * (max - min)) + min;
            let y = Math.floor(Math.random() * (max - min)) + min;
            if (exclude.every((grid) => grid[0] !== x && grid[1] !== y)) {
                return [x, y];
            }
        }
    }

    var Game = function (opts) {
        if (!opts || !opts.render) {
            console.error('init error');
            return;
        }
        this.render = opts.render;
        this.width = opts.width || 25;
        this.height = opts.height || 25;
        this.speed = opts.speed || 10;
        this.snakeLength = opts.snakeLength || 4;
        this.snakeGrids = [];  // snakeGrids[0]是蛇尾
        for (let i = 0; i < this.snakeLength; i++) {
            this.snakeGrids.push([0, i]);
        }
        this.appleGrid = genRandomApple(0, this.width, this.snakeGrids);
        this.dx = 1; this.dy = 0;  // 一开始向右移动
    }

    Game.prototype.start = function () {
        var self = this;
        var cnt = 0;
        function loop() {
            requestAnimationFrame(loop);
            // fixme: requestAnimationFrame() 不一定是60帧
            if (cnt < 60 / self.speed) {
                cnt += 1;
                return;
            }
            cnt = 0;

            // 移动一格
            self.snakeGrids.splice(0, 1); // 删除蛇尾的格子
            let [x, y] = self.snakeGrids[self.snakeGrids.length - 1];  // 取出蛇头的格子
            x += self.dx; y += self.dy;  // 蛇头前进一格
            // todo: 判断蛇头位置是不是咬到自己的身体，gameover
            self.snakeGrids.push([x, y]);  // 身体变长
            if (x === self.appleGrid[0] && y === self.appleGrid[1]) {  // 吃到苹果了
                this.appleGrid = genRandomApple(0, self.width, self.snakeGrids);
            }

            self.render(self.appleGrid, self.snakeGrids);
        }
        requestAnimationFrame(loop);
    }

    Game.prototype.pause = function () {

    }

    Game.prototype.up = function () {
        if (this.dy === 0) {
            this.dy = -1;
            this.dx = 0;
        }
    }

    Game.prototype.down = function () {
        if (this.dy === 0) {
            this.dy = 1;
            this.dx = 0;
        }
    }

    Game.prototype.left = function () {
        if (this.dx === 0) {
            this.dx = -1;
            this.dy = 0;
        }
    }

    Game.prototype.right = function () {
        if (this.dx === 0) {
            this.dx = 1;
            this.dy = 0;
        }
    }

    window.SnakeGame = Game;
})();
