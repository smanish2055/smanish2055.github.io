/* --------------------------- animastionLoop here -------------------------- */
let auto;
window.addEventListener("beforeunload", function () {
  localStorage.removeItem("auto");
  // this.alert("are you sure you want to exit game");
});



function animate() {
  auto = localStorage.getItem("auto");
  window.requestAnimationFrame(animate);
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  background.update();
  shop.update();
  player.update();
  enemy.update();

  if (auto) {
    enemy.enemyAI(enemy, player);
  }

  /* -------------------------- Player horizontal movement here -------------------------- */
  player.velocity.x = 0;
  if (keys.d.pressed && player.position.x <= 974) {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -5;
    player.switchSprite("runLeft");
  } else {
    player.switchSprite("idle");
      player.velocity.x = 0;
  }

  /* ------------------- player jump back to position(jump) ---------------------------------- */
  if (keys.w.pressed && player.position.y >= 195) {
    // if (player.position.y - player.velocity.y >= 0) {
    player.velocity.y = -10;
    player.switchSprite("jump");
    // }
  } else if ( player.velocity.y > 0 && player.position.y < canvas.height - player.height) {
    player.switchSprite("fall");
  }

  /* ------------------------- enemy horizontal movement here ------------------------- */

  enemy.velocity.x = 0;
  if (keys.ArrowRight.pressed && enemy.position.x <= 974) {
    enemy.velocity.x = 6;
    enemy.switchSprite("runRight");
  } else if (keys.ArrowLeft.pressed && enemy.position.x >= 0) {
    enemy.velocity.x = -6;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  /* -------------------- enemy jumpback to position(jump) ----------------------------------------- */
  if (keys.ArrowUp.pressed && enemy.position.y >= 195) {
    enemy.velocity.y = -10;
    enemy.switchSprite("jump");
  } else if (
    enemy.velocity.y > 0 &&
    enemy.position.y < canvas.height - enemy.height
  ) {
    enemy.switchSprite("fall");
  }

  /* ---------------------------- defending attack ---------------------------- */

  if (keys.Insert.pressed) {
    enemy.switchSprite("Defend");
  }
  if (keys.f.pressed) {
    player.switchSprite("Defend");
  }

  // Player collision logic
  /* ------------------------ detect collision by hero ------------------------ */
  if (
    Collision({ rectangle1: player, rectangle2: enemy }) &&
    player.isAttacking &&
    (player.framesCurrent === 2 ||
      (player.isPlayerControlPressed && player.framesCurrent === 3))
  ) {
    if (player.isPlayerControlPressed) {
      //enemy health decrease while defending in combo attack
      if (keys.Insert.pressed) {
        enemy.takeHit(4);
      } else {
        enemy.takeHit(8);
        // enemy health decrease without defending in combo attack
      }
    } else {
      //  //enemy health decrease while defending in Normal attack
      if (keys.Insert.pressed) {
        enemy.takeHit(2);
      } else {
        enemy.takeHit(4); // player health decrease while without defending in Normal attack
      }
    }

    player.isAttacking = false;

    /* ------------------------- Update enemy health UI -------------------------------------------*/
    const enemyHealthElement = document.querySelector("#enemyHealth");
    enemyHealthElement.style.width = enemy.health + "%";

    if (enemy.health <= 40) {
      enemyHealthElement.style.background = "red";
    }
  }

  /* ------------------------- If player misses enemy ------------------------- */
  if (player.isAttacking && player.framesCurrent === 2) {
    player.isAttacking = false;
  }

  /* -------------------------- enemy attacking score ------------------------- */
  if (
    Collision({ rectangle1: enemy, rectangle2: player }) &&
    enemy.isAttacking &&
    (enemy.framesCurrent === 2 ||
      (enemy.isEnemyControlPressed && enemy.framesCurrent === 3))
  ) {
    /* ----------------------- Collision detected by enemy --------------------------------------------------- */
    if (enemy.isEnemyControlPressed) {
      console.log(enemy.isEnemyControlPressed);
      // Combo attack hits
      if (keys.f.pressed) {
        player.takeHit(4);
      } else {
        player.takeHit(8); // Pass 15 as the damage for combo attack
      }
    } else {
      // Normal attack hits
      if (keys.f.pressed) {
        player.takeHit(2);
      } else {
        player.takeHit(4); // Pass 10 as the default damage
      }
    }

    enemy.isAttacking = false;

    /* ------------------------- Update player health UI ------------------------ */
    const playerHealthElement = document.querySelector("#playerHealth");
    playerHealthElement.style.width = player.health + "%";

    if (player.health <= 40) {
      playerHealthElement.style.background = "red";
    }
  }

  /* ------------------------- If enemy misses player ------------------------- */
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }

  /* ------------------ player and enemy defeat before timing --------------------------- */
  if (player.health <= 0 || enemy.health <= 0) {
    FinalWinner({ player, enemy });
  }
}
animate();
