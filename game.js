    // setup canvas
    const game = document.getElementById('game');
    const ctx = game.getContext('2d');

    // setup nút bấm và trang
    //Trang
    const startMenu = document.getElementById('start') // menu chính
    const endMenu = document.getElementById('end') // menu end
    const endMenuBrick = document.getElementById('end-brick') // menu end brick game
    const tutorialMenu = document.getElementById('tutorial-menu'); // menu hướng dẫn game
    //Nút
    // chế độ game
    const botGameBtn = document.getElementById('bot-btn') // nút chỉnh chế độ game (đấu với bot)
    const playerGameBtn = document.getElementById('player-btn'); // nút chỉnh chế độ game (đấu với player)
    const brickBtn = document.getElementById('brick-btn') // nút chế độ game (phá gạch)
    // nút chức năng
    const tutorialBtn= document.getElementById('tutorial-btn');
    const exitBtn= document.getElementById('exit-tutorial');
    const restartBtn = document.getElementById("restart-btn"); // nút thiết lập lại game
    const returnBtn = document.getElementById('return-btn') // nút quay lại menu chính
    const restartBrickBtn = document.getElementById("restart-brick"); // nút thiết lập lại game
    const returnBrickBtn = document.getElementById('return-brick') // nút quay lại menu chính

    //START SETUP CHỈ SỐ
    // setup chiều dài chiều rộng của khung game
    game.width = 900;
    game.height = 600;

    // setup chỉ số của bóng
    const ball = {
        // bán kính bóng
        radius : 10,
        // màu bóng
        color : '#fff',
        // vị trí ban đầu của bóng
        x : game.width / 2,
        y : game.height / 2,
        //  gia tốc / tốc độ bóng
        speedX : 3,
        speedY : 3
    }

    // setup chỉ số của paddle
    const paddles = {
        //  kích thước paddle
        width : 10,
        height :100,
        //  màu paddle
        color : '#fff',
        //  vị trí paddle
        x : (game.width - 10),
        y1 : (game.height - 100) / 2,
        y2 : (game.height - 100) / 2
    }
    // setup chỉ số của barricade
    //  kích thước barricade
    const barricade = {
        width : 20,
        height : 200
    }
    // set up chỉ số cho barricade di chuyển từ trên xuống
    const movingBarricade = {
        x : 450, // vị trí x giữa khung game
        y : 200, // vị trí y giữa khung game
        direction : Math.random() < 0.5 ? -1 :1 , // hướng di chuyển của barricade
        speed : 1 // tốc độ di chuyển của barricade
    }

    // setup điểm người chơi và điểm thắng
    let player1Score = 0;
    let player2Score = 0;
    const maxScore = 5; // điểm thắng

    // setup trạng thái ban đầu của game
    let gameStarted = false;
    let gameMode;

    //END SETUP CHỈ SỐ

    // Vẽ bóng, paddle, bảng điểm
    function drawPingPongGame() {
        // vẽ bóng
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
        // VẼ PADDLE
        ctx.fillStyle = paddles.color;
        // vẽ paddle 1
        ctx.fillRect(0, paddles.y1, paddles.width, paddles.height);
        // vẽ paddle 2
        ctx.fillRect(paddles.x, paddles.y2, paddles.width, paddles.height);
        // vẽ bảng điểm số
        ctx.font = '30px Arial';
        ctx.fillText('Player 1: ' + player1Score, 100, 60);
        ctx.fillText('Player 2: ' + player2Score, game.width - 240, 60);
        ctx.font = '50px Arial';
    }

    // START SETTING POSITION
    // thiết lập lại vị trí và tốc độ bóng (random gia tốc y)
    function resetBallRandom() {
        ball.x = game.width / 2;
        ball.y = game.height / 2;
        ball.speedY = Math.random() < 0.5 ? -1 : 1;
        ball.speedX = -(ball.speedX);
    }
    // thiết lập dừng bóng
    function endBall(){
        ball.x =game.width /2;
        ball.y = game.height /2;
        ball.speedX = 0;
        ball.speedY = 0;
    }
    // thiết lập lại điểm người chơi
    function resetPlayerScore(){
        player1Score = 0;
        player2Score = 0;
    }
    // reset lại vị trí của paddles và bóng
    function resetPosition(){
        paddles.y1 = (game.height - paddles.height) / 2;
        paddles.y2 = (game.height - paddles.height) / 2;
        resetBallRandom();
        ball.speedX = 0;
        ball.speedY = 0;
    }
    // END SETTING POSITION

    // START BUTTONS FUNCTION
    // thêm chức năng của nút bắt đầu game (đấu với người)
    playerGameBtn.addEventListener('click', function (){
        gameStarted = true;
        gameMode = 'player'; // chỉnh game mode sang đấu với player
        startMenu.style.display = 'none';
        game.style.display = 'block';
        resetBallRandom();
        ball.speedX = -3;
        resetPlayerScore();
    });
    // thêm chức năng của nút bắt đầu game (đấu với bot)
    botGameBtn.addEventListener('click', function (){
        gameStarted = true;
        gameMode = 'bot'; // chỉnh game mode sang đấu với bot
        game.style.display = 'block';
        startMenu.style.display = 'none';
        resetBallRandom();
        ball.speedX= -3;
        resetPlayerScore();
    });
    // thêm chức năng của nút bắt đầu lại (restartBtn)
    restartBtn.addEventListener("click", function() {
        gameStarted = true;
        endMenu.style.display = "none";
        ball.speedX= -3;
        resetPlayerScore();
    });
    // thêm chức năng cho nút quay lại (returnBtn)
    returnBtn.addEventListener("click", function() {
        endMenu.style.display = "none";
        game.style.display = "none";
        startMenu.style.display = "block";
        endBall();
        cancelAnimationFrame(gameLevel);
    });
    tutorialBtn.addEventListener('click', function(){
        tutorialMenu.style.display = 'block';
    });
    exitBtn.addEventListener('click',function (){
       tutorialMenu.style.display ='none';
    });
    // END BUTTONS FUNCTION

    // chức năng kết thúc game
    function gameOver(winner) {
        gameStarted = false;
        endMenu.style.display = "block";
        document.getElementById("winner").textContent = winner + " wins!";
        resetPosition();
        resetPlayerScore();
        endBall();
        cancelAnimationFrame(gameLevel);
    }
    // xử lí va chạm của bóng
    function handleCollisions() {
    // bóng khi va chạm với paddle 1
        if (ball.x - ball.radius <= paddles.width && ball.y >= paddles.y1 && ball.y <= paddles.y1 + paddles.height) { // xét nếu bóng tương tác với paddle
            ball.speedX = -(ball.speedX); // trả về âm gia tốc X
            let deltaY = ball.y - (paddles.y1 + paddles.height / 2); // tính khoảng cách vị trí y và trung điểm của paddle
            ball.speedY = deltaY * 0.35;
        }
    // bóng khi va chạm với paddle 2
        if (ball.x + ball.radius >= game.width - paddles.width && ball.y >= paddles.y2 && ball.y <= paddles.y2 + paddles.height) { // xét nếu bóng tương tác với paddle
            ball.speedX = -(ball.speedX); // trả về âm gia tốc X
            let deltaY = ball.y - (paddles.y2 + paddles.height / 2); // tính khoảng cách vị trí y và trung điểm của paddle
            ball.speedY = deltaY * 0.35;
        }
    // bóng khi va chạm với tường trên và dưới
        if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= game.height) { // xét nếu bóng va chạm tường trên và dưới
            ball.speedY = -(ball.speedY); // trả về âm gia tốc Y
        }
    // bóng khi chạy ra khỏi border
        // tính điểm cho player 1
        if (ball.x + ball.radius >= game.width) { // nếu (vị trí X của bóng + bán kính bóng) >= chiều rộng của game (đi qua box canvas) => player 1 ghi điểm
            player1Score++;
            // nếu player 1 đủ điểm => thắng
            if (player1Score >= maxScore) {
                gameOver("Player 1");
            } else {
                resetBallRandom();
            }
        }
        // tính điểm cho player 2
        if (ball.x - ball.radius <= 0) { // nếu (vị trí X của bóng + bán kính bóng) <= 0 (đi qua box canvas) => player 2 ghi điểm
            player2Score++;
            // nếu player 1 đủ điểm => thắng
            if (player2Score >= maxScore) {
                gameOver("Player 2");
            } else {
                resetBallRandom();
            }
        }
        if (gameMode === 'bot') { // nếu game ở chế độ đấu với bot
            // xử lí di chuyển của bot
            if (ball.speedX > 0) { // khi bóng đang hướng về phía player 2 => bot di chuyển
                let paddleHalfHeight = paddles.height / 2;
                if (ball.y < paddles.y2 + paddleHalfHeight) { // check vị trí y của bóng có cao hơn hay thấp hơn vị trí y của tâm paddle
                    // di chuyển paddle
                    paddles.y2 -= Math.min(Math.abs(paddles.y2 + paddleHalfHeight - ball.y), 5) + 1.5;
                } else {
                    paddles.y2 += Math.min(Math.abs(paddles.y2 + paddleHalfHeight - ball.y), 5) + 1.5;
                }
            }
        }
    }
    // cập nhật vị trí bóng và tốc độ bóng
    function updateBall() {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
    }
    // setup các phím hoạt động của player 1 và player 2 và khoảng cách di chuyển của paddle
    function movePaddles(event) {
        // gắn giá trị của key với khoảng cách di chuyển của paddle
        const W = 87;
        const S = 83;
        const UP_ARROW = 38;
        const DOWN_ARROW = 40;
        const PADDLE_MOVE_AMOUNT = 50;
        if (gameMode === 'player' ) { // Nếu game ở chế độ đấu với người
            switch (event.keyCode) {
                // key của player 1
                case W:
                    if (paddles.y1 > 0) {
                        paddles.y1 -= PADDLE_MOVE_AMOUNT;
                    }
                    break;
                case S:
                    if (paddles.y1 < game.height - paddles.height) {
                        paddles.y1 += PADDLE_MOVE_AMOUNT;
                    }
                    break;
                //key của player 2
                case UP_ARROW:
                    if (paddles.y2 > 0) {
                        paddles.y2 -= PADDLE_MOVE_AMOUNT;
                    }
                    break;
                case DOWN_ARROW:
                    if (paddles.y2 < game.height - paddles.height) {
                        paddles.y2 += PADDLE_MOVE_AMOUNT;
                    }
                    break;
            }

        } else if (gameMode === 'bot') { // nếu game ở chế độ đấu với bot
            switch (event.keyCode) {
                // key của player 1
                case W:
                    if (paddles.y1 > 0) {
                        paddles.y1 -= PADDLE_MOVE_AMOUNT;
                    }
                    break;
                case S:
                    if (paddles.y1 < game.height - paddles.height) {
                        paddles.y1 += PADDLE_MOVE_AMOUNT;
                    }
                    break;
            }
        }
    }
    // thêm chức năng cho nút bấm di chuyển paddle
    document.addEventListener('keydown', movePaddles);
    document.addEventListener('keyup', movePaddles);

    // chức năng vẽ barricade
    function drawBarricade(x ,y , width, height){
        ctx.fillStyle = 'white';
        ctx.fillRect(x , y , width, height);
    }

    // xử lí va chạm barricade với bóng
    function barricadeCollision(barricadeX , barricadeY,height){
        if (ball.y + ball.radius >= barricadeY && ball.y <= barricadeY + height // xét nếu bóng đã có tương tác với viền ngoài của barricade chưa
            && ball.x + ball.radius >= barricadeX && ball.x <= barricadeX + barricade.width){ // xét nếu bóng đã có tương tác với viền ngoài của barricade chưa
            const ballCenterX =  ball.x + ball.radius / 2; // tính vị trí tâm của bóng (tâm X)
            const ballCenterY = ball.y + ball.radius / 2; // tính vị trí tâm của bóng (tâm Y)
            if(ballCenterX < barricadeX){ // xét nếu tâm X tương tác với barricade
                ball.speedX = -Math.abs(ball.speedX); // trả về âm tốc độ X tuyệt đối của bóng (chuyển hướng bóng)
            } else if(ballCenterX > barricadeX + barricade.width){ // xét nếu tâm X tương tác với barricade (vị trí x + chiều rộng của barricade)
                ball.speedX = Math.abs(ball.speedX);
            }
            if(ballCenterY < barricadeY){ // xét nếu tâm Y tương tác với barricade
                ball.speedY = -Math.abs(ball.speedY);// trả về âm tốc độ Y tuyệt đối của bóng (chuyển hướng bóng)
            } else if(ballCenterY > barricadeY + height){
                ball.speedY = Math.abs(ball.speedY); // xét nếu tâm Y tương tác với barricade (vị trí Y + chiều cao barricade)
            }
        }
    }
    // xử lí barricade di chuyển liên tục trên xuống
    function movingBarricadeA(x,limit1, limit2){
        // xử lí di chuyển của barricade
        movingBarricade.y += movingBarricade.direction * movingBarricade.speed; // vị trí y của barricade thay đổi liên tục theo ( hướng đi * tốc độ)
        if (movingBarricade.y <= limit1 || movingBarricade.y + barricade.height >= limit2){ // xét coi barricade có đi ra ngoài tầm của khung game không
            movingBarricade.direction *= -1; // thay đổi hướng đi của barricade khi đã chạm tưởng
        }
        drawBarricade(x , movingBarricade.y , barricade.width, barricade.height); //vẽ moving barricade
    }
    // xử lí barricade di chuyển liên tục trái phải
    function movingBarricadeB(y,limit1, limit2){
        // xử lí di chuyển của barricade
        movingBarricade.x += movingBarricade.direction * movingBarricade.speed; // vị trí x của barricade thay đổi liên tục theo ( hướng đi * tốc độ)
        if (movingBarricade.x <= limit1 || movingBarricade.x + barricade.width >= limit2){ // xét coi barricade có đi ra ngoài tầm của khung game không
            movingBarricade.direction *= -1; // thay đổi hướng đi của barricade khi đã chạm tưởng
        }
        drawBarricade(movingBarricade.x , y , barricade.width, barricade.height); //vẽ moving barricade
    }
    // LEVEL 2
    // xử lí barricade cho lv2 (width 20 height 200)
    function designLv2() {
        //  vị trí barricade lv2
        let barricadeX = 450;
        let barricadeY = 150;
        // vẽ barricade
        drawBarricade(barricadeX , barricadeY , barricade.width, barricade.height + 100);
        // xử lí va chạm barricade với bóng`
        barricadeCollision(barricadeX,barricadeY,barricade.height + 100);
    }
    // LEVEL 3
    // xử lí barricade cho lv3

    function designLv3() {
        // vị trí barricade cho lv3
        let barricadeX = 460;
        let barricadeY = 200;
        let barricade1Y = 0;
        let barricade2Y = 450;
        let barricadeHeight = barricade.height -50;
        // vẽ barricade 1
        drawBarricade(barricadeX , barricade1Y , barricade.width, barricadeHeight);
        drawBarricade(barricadeX , barricade2Y , barricade.width, barricadeHeight);
        drawBarricade(barricadeX + 150 , barricadeY , barricade.width, barricade.height);
        drawBarricade(barricadeX - 150 , barricadeY , barricade.width, barricade.height);
        // xử lí va chạm barricade với bóng
        barricadeCollision(barricadeX,barricade1Y,barricadeHeight);
        barricadeCollision(barricadeX,barricade2Y,barricadeHeight);
        barricadeCollision(barricadeX + 150,barricadeY,barricade.height);
        barricadeCollision(barricadeX - 150,barricadeY,barricade.height);

    }
    // LEVEL 4
    // xử lí barricade cho lv4
    function designLv4(){
        let x1 = movingBarricade.x - 200;
        let x2 = movingBarricade.x + 200;
        movingBarricadeA(x1, 0 ,game.height);
        movingBarricadeA(x2, 0 ,game.height);
        // xử lí va chạm barricade với bóng
        barricadeCollision(x1,movingBarricade.y,barricade.height);
        barricadeCollision(x2, movingBarricade.y,barricade.height);
    }

    // LEVEL 5
    // xử lí barricade cho lv5
    function designLv5(){
        let bx1 = movingBarricade.x - 200;
        let bx2 = movingBarricade.x + 200;
        let y = movingBarricade.y;
        movingBarricadeA(bx1, 0 ,game.height);
        movingBarricadeA(bx2, 0 ,game.height);
        movingBarricadeB(y,200,game.width - 200 );
        // xử lí va chạm barricade với bóng
        barricadeCollision(bx1,movingBarricade.y,barricade.height);
        barricadeCollision(bx2, movingBarricade.y,barricade.height);
        barricadeCollision(movingBarricade.x,y ,barricade.height);

    }
// BRICK BREAKER GAME
    let paddlesBrick = {
        //  kích thước paddle
        width : 150,
        height : 20,
        //  màu paddle
        color : '#fff',
        //  vị trí paddle
        x : (game.width - 100) /2,
        y : (game.height - 10)
    }
    let player={
        score : 0,
        live : 4,
        winning  : 40,
        win: false
    }
    // setup giá trị cho  gạch
    let brick={
        rows : 5, // số hàng
        columns : 8, // số cột
        height: 30,
        width: 100,
        gap: 10, // khoảng cách giữa gạch
        offSetX: 15, //
        offSetY: 25, //
    }
    // setup giá trị cho mảng array để vẽ gạch
    let bricks =[];
    for (let col = 0 ; col < brick.columns ; col++){
        bricks[col]= [];
        for (let row = 0 ; row < brick.rows ; row++){
            bricks[col][row] = {
                bX: 0,
                bY: 0,
                status : 1,
                width: brick.width,
                height: brick.height
            }
        }
    }
    // nút chọn chế độ gạch
    brickBtn.addEventListener('click', function (){
        gameMode = 'brick'; // chỉnh game mode sang phá gạch
        game.style.display = 'block';
        ball.speedX= 0;
        ball.speedY = 2;
        startMenu.style.display = 'none';
    })
    // thêm chức năng của nút bắt đầu lại (restartBtn)
    restartBrickBtn.addEventListener("click", function() {
        gameStarted = true;
        endMenuBrick.style.display = "none";
        ball.speedX= Math.random() < 0.5 ? -1 : 1;
        ball.speedY = 2;
    });
    // thêm chức năng cho nút quay lại (returnBtn)
    returnBrickBtn.addEventListener("click", function() {
        endBall();
        endMenuBrick.style.display = "none";
        game.style.display = "none";
        startMenu.style.display = "block";
    });
    function resetBallBrick(){
        paddlesBrick.x = (game.width - paddlesBrick.width) / 2;
        ball.x = game.width / 2;
        ball.y = game.height / 2;
        ball.speedY = 2;
        ball.speedX = Math.random() < 0.5 ? -1 : 1;
    }
    function gameOverBrick() {
        gameStarted = false;
        endMenuBrick.style.display = "block";
        endBall();
        // reset paddle
        paddlesBrick.x = (game.width - paddlesBrick.width) / 2;
        // reset mạng và điểm
        player.live = 3;
        player.score = 0;
        // reset gạch
        for (let col = 0; col < brick.columns; col++) {
            for (let row = 0; row < brick.rows; row++) {
                bricks[col][row].status =1;
                bricks[col][row].fillStyle = 'white';
            }
        }
        if(player.win === false){ // player thua => hiện màn hình đã thua
            document.getElementById("result").textContent = "YOU LOSE!!!";
        } else if(player.win === true){ // player thắng => hiện màn hình đã thắng
            document.getElementById("result").textContent = "YOU WIN!!!";
        }
        cancelAnimationFrame(gameLevel); //kết thúc vòng lặp
    }

    // vẽ game
    function drawBrickGame(){
        // vẽ điểm và mạng
        ctx.fillStyle = 'white'
        ctx.font = '25px Arial';
        ctx.fillText('Score: ' + player.score, 40, game.height - 30);
        ctx.fillText('Lives: ' + player.live, game.width - 125, game.height - 30);
        // vẽ bóng
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
        //vẽ paddle người chơi
        ctx.fillRect(paddlesBrick.x, paddlesBrick.y, paddlesBrick.width, paddlesBrick.height);
    }
    function drawBrick(){
        for (let col = 0 ; col < brick.columns ; col++){
            for (let row = 0 ; row < brick.rows ; row++){
                let brickS = bricks[col][row];
                if(brickS.status === 1){ // nếu gạch đang hoạt động (status =1)
                    let brickX = col*(brickS.width + brick.gap) + brick.offSetX; //setup giá trị x của bricks
                    let brickY = row *(brickS.height + brick.gap) + brick.offSetY; // setup giá trị y của bricks
                    brickS.bX = brickX;
                    brickS.bY = brickY;
                    //vẽ bricks
                    ctx.fillStyle = 'white';
                    ctx.fillRect(brickX, brickY, brickS.width, brickS.height);
                }
            }
        }
        for (let col = 0; col < brick.columns; col++) {
            for (let row = 0; row < brick.rows; row++) {
                let brickS = bricks[col][row];
                if (brickS.status === 1 &&  // nếu gạch đang hoạt động (status =1)
                    ball.x > brickS.bX && ball.x < brickS.bX + brickS.width // xét nếu bóng đã có tương tác với viền ngoài của brick chưa
                        && ball.y > brickS.bY && ball.y < brickS.bY + brickS.height) { // xét nếu bóng đã có tương tác với viền ngoài của brick chưa
                        ball.speedY = -ball.speedY;
                        brickS.status = 0;
                        player.score++;
                        if (player.score === player.winning) { // nếu điểm player = điểm thắng (30đ) = > thắng game
                            player.win = true;
                            gameOverBrick();
                        }
                    }
                }
            }
    }
    function handleCollisionGame(){
        // bóng khi va chạm với paddle
        if (ball.y  > game.height- paddlesBrick.height - ball.radius
            && ball.x < paddlesBrick.x + paddlesBrick.width
            && ball.x > paddlesBrick.x) { // xét nếu bóng tương tác với paddle
            ball.speedY = -(ball.speedY); // trả về âm gia tốc Y
            let ballCenterX = ball.x + ball.radius;
            let paddleCenterX = paddlesBrick.x + paddlesBrick.width/2;
            let deltaX = ballCenterX - paddleCenterX; // tính khoảng cách vị trí y và trung điểm của paddle
            ball.speedX = deltaX / (paddles.width / 2) * 0.5;
        }
        // bóng khi va chạm với tường
        if (ball.y - ball.radius < 0) { // xét nếu bóng va chạm tường trên
            ball.speedY = -(ball.speedY); // trả về âm gia tốc Y
        }
        if (ball.x+ ball.radius > game.width || ball.x + ball.radius <= 0  ){ // xét nếu bóng va chạm với tường phải và tường trái
            ball.speedX = -(ball.speedX); // trả về âm gia tốc X
        }
        // bóng khi chạy ra khỏi border
        // tính điểm cho player
        if (ball.y + ball.radius > game.height) { // nếu vị trí bóng + bán kính bóng > chiều cao game => player mất mạng
            player.live -= 1; // player mất 1 mạng
            // nếu player hết mạng => thua (nếu không thì reset bóng)
            if (player.live === 0) {
                player.win= false;
                gameOverBrick();
            } else {
                resetBallBrick();
            }
        }
    }
    function movePaddle(event) {
        if(gameMode === 'brick'){
        // gắn giá trị của key với khoảng cách di chuyển của paddle
        const A = 65;
        const D = 68;
        const PADDLE_MOVE_AMOUNT = 75;

            switch (event.keyCode) {
                case A:
                    if (paddlesBrick.x > 0) {
                        paddlesBrick.x -= PADDLE_MOVE_AMOUNT;
                    }
                    break;
                case D:
                    if (paddlesBrick.x < game.width - paddles.width) {
                        paddlesBrick.x += PADDLE_MOVE_AMOUNT;
                    }
                    break;
            }
        }
    }
    // thêm chức năng cho nút bấm di chuyển paddle
    document.addEventListener('keydown', movePaddle);
    document.addEventListener('keyup', movePaddle);

    // cập nhật game và chế độ game (default lv1 cho game Pong)
    function gameLevel() {
        if(gameMode === 'brick'){ // nếu chế độ game là 'brick' => Game Brick Breaker
            updateBall();
            // brickCollision();
            handleCollisionGame();
            ctx.clearRect(0, 0, game.width, game.height);
            drawBrick();
            drawBrickGame();
        } else if(gameMode === 'player' || gameMode === 'bot' ){ // nếu chế độ game là 'player' hay 'bot' => Game Ping Pong
        let selectOption = document.getElementById('game-mode').value;
        updateBall();
        handleCollisions();
        ctx.clearRect(0, 0, game.width, game.height);
        drawPingPongGame();
        // Chọn level
        if(selectOption === "lvl1"){
            ctx.fillText('Level '+ selectOption.substring(3) ,game.width / 2 - 60 ,100)
        }
        if(selectOption === "lvl2"){
            designLv2();
            ctx.fillText('Level '+ selectOption.substring(3) ,game.width / 2 - 60 ,100)
        }
        if(selectOption === "lvl3"){
            designLv3();
            ctx.fillText('Level '+ selectOption.substring(3) ,game.width / 2 - 60 ,game.height/2)
        }
        if(selectOption === "lvl4"){
            designLv4();
            ctx.fillText('Level '+ selectOption.substring(3) ,game.width / 2 - 60 ,game.height/2)
        }
        if(selectOption === "lvl5"){
            designLv5();
            ctx.fillText('Level '+ selectOption.substring(3) ,game.width / 2 - 60 ,100)
        }
    }
    requestAnimationFrame(gameLevel);
}
    // bắt đầu vòng lặp game
    requestAnimationFrame(gameLevel);
