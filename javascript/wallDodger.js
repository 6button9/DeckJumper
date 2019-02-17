const record = {
  _records: [],
  _last: null,
  log: function() {
     console.log(record._records)
  },
  record: function() {
    if( !this._records.hasOwnProperty( arguments[0] ) ) {
      this._records[ arguments[0] ] = [];
    }
    this._records[ arguments[0] ].push({
      ts: Date.now(),
      ...arguments,
    });
    [...this._last] = [...arguments];
    return this;
  },
  toConsole() {
    const [title, ...rest] = this._last;
    console.log(title, rest, Date.now());
  }
}

class Avatar {
  constructor() {
    this.x = 100;
    this.y = 350;
    this.height = 100;
    this.acceleration = 0.045;
    this.velocity = -1;
    this.jumpPower = 3;
    this.count = 0;
    this.pos = 0;
  }
  setAcceleration(newAcc) {
    console.log(typeof newAcc, newAcc);
    if( typeof newAcc === 'string' ) {
      switch( newAcc ) {
        case 'maga':
          this.acceleration = 0.045;
          break;
        case 'fast':
          this.acceleration = 0.015;
          break;
        case 'medium':
          this.acceleration = 0.01;
          break;
        case 'slow':
          this.acceleration = 0.0075;
          break;
        default:
          this.acceleration = 0.045;
          break;
  
      }
    } else if ( typeof newAcc === 'number' ){
      this.accelateration = newAcc;
    }
    record.record('avatar_setAccelertion', this.acceleration );
  }
  setJumpPower(newJumpPower) {
    console.log(typeof newJumpPower, newJumpPower);
    if( typeof newJumpPower === 'string' ) {
      switch( newJumpPower ) {
        case 'super':
          this.jumpPower = 3;
          break;
        case 'strong':
          this.jumpPower = 2;
          break;
        case 'normal':
          this.jumpPower = 1.5;
          break;
        case 'weak':
          this.jumpPower = 1;
          break;
        default:
          this.jumpPower = 1;
          break;
  
      }
    } else if ( typeof newAcc === 'number' ){
      this.jumpPower = newJumpPower;
    }
    record.record('avatar_setJumpPower', this.jumpPower );
  }
  calcPosition( dt = 2) {
     this.x += 2;
     if( this.x > game.width ) {
       this.x = 200;
       game.laps.inc();
     }
     if( this.x < 0 ) {
       this.x = 200;
       game.laps.dec();
     }
     this.y = this.y + this.velocity * dt;
     this.velocity += this.acceleration * dt;
     if( this.y < 0 ) {
       if( this.velocity < -0.2 )
         this.velocity = -0.2;
       this.y = 0;
     }
     else if( this.y > ( game.height - 100) ) {
       this.velocity = 0;
       this.y = game.height - 100;
     }
  }
  increaseVelocityUp( by ) {
     this.velocity -= by;
  }
  jump() {
    this.increaseVelocityUp( this.jumpPower );
    record.record('avatar_jump',this.jumpPower);
  }
  moveBy(x = 0,y = 0) {
    this.x +=x;
    this.y +=y;
  }
  checkCollisions(openings, skateboards, wallX) {
    let collision = true;
    let offset = [];
    let localDamage = 0;
    game.damage.setCurrent(0);
    const topSpace = Math.floor(( this.y + game.damage.sensetivity ) / 100);
    const bottomSpace = Math.floor(( this.y + ( 100 - game.damage.sensetivity )) / 100);
    if( openings.includes(topSpace )
      && openings.includes(bottomSpace) ) {
      collision = false;
    }
    const returnSkateboards = skateboards.map( (skateboard) => {
     if( skateboard.index === topSpace
       || skateboard.index === bottomSpace){
       if( skateboard.url.url !== 'blank') {
          game.hits.addUrl({
            alias: skateboard.url.alias,
            url: skateboard.url.url,
          });
       }
       return {
         url:{
           url: 'blank',
           alias: 'blank',
         },
         index: skateboard.index,
       };
     } else {
       return skateboard;
     }                              
    });
    if( collision ) {
      //openings.forEach( opening => {
        //if( this.y <= ((opening * 100) - game.damage.sensetivity ) ) {
          //localDamage = Math.ceil((opening * 100) - game.damage.sensetivity - this.y);
          //offset.push(localDamage);
        //} else if ( this.y >= ((opening * 100) + game.damage.sensetivity ) ){
          //localDamage = Math.ceil(this.y - (opening * 100) - game.damage.sensetivity);
          //offset.push(localDamage);
        //}
      //})
      //game.damage.setCurrent(Math.min(...offset));
      //game.damage.addToTotal(game.damage.current);
      if( (this.x + 10) < wallX ) {
        this.x = wallX - 100;
      } else {
        if( ( this.y < topSpace * game.rowHeight  &&
              !openings.includes[ topSpace -1 ] ) ||
            ( this.y > topSpace * game.rowHeight  &&
              !openings.includes[ bottomSpace +1 ] ) ) {
          this.velocity = - this.velocity;
        }
      }
    }
    return returnSkateboards;
  }
  get position() {
    this.count++;
    if( this.count === 20 ) {
      this.count = 0;
      this.pos++;
    }
    const returnPosition = this.pos % 4 + 1;

    return returnPosition;
  }
  draw(menu) {
    const urlString = './graphics/pos' + this.position + '.png';
    menu
      .icon('face', this.x + 20, this.y+5,null,'pink',30)
      .img(urlString,this.x, this.y + 37,null,100,60)
  }

}

const skateboardUrls = {
  _skateboards: [
   { 
     url: './graphics/owl_board.png',
     alias: 'owl',
   },
   { 
     url: './graphics/flightDeck_board.png',
     alias: 'flightDeck',
   },
   { 
     url: './graphics/welcome_board.png',
     alias: 'welcome',
   },
   { 
     url: './graphics/martinezP2_board.png',
     alias: 'martinezP2',
   },
   { 
     url: './graphics/lion_board.png',
     alias: 'lion',
   },
   { 
     url: './graphics/zero_board.png',
     alias: 'zero',
   },
   { 
     url: './graphics/martinez_board.png',
     alias: 'marzinez',
   },
   { 
     url: './graphics/partyAnimal_board.png',
     alias: 'partyAnimal',
   },
  ],
  randomSkateboard: function() {
    return this._skateboards[ Math.floor(Math.random() * (this._skateboards.length)) ];
  },
}


class Wall {
  constructor() {
    this._x = game.width;// - 100;
    this.screenWidth = game.width;
    this.openings = [];
    this.skateboards = [];
    this.createOpenings(game.openings.max);
  }
  static createFromStateObject( stateObject ) {
    const newWall = new Wall();
    newWall._x = stateObject._x;
    newWall.openings = stateObject.openings;
    newWall.skateboards = stateObject.skateboards;
    return newWall;
  }
  createOpenings(maxOpenings) {
    const calcNewProspect = () => {
      const newProspect = Math.floor(Math.random()*game.rows);
      if( !this.openings.includes(newProspect) ) {
        this.openings.push(newProspect);
      } else {
        calcNewProspect();
      }
    }
    const numOpenings = Math.floor(Math.random()*(maxOpenings)) + 1;
    for(let i = 0; i < numOpenings; i++) {
      calcNewProspect();
    }
    this.openings.sort();
    for(let i = 0; i < numOpenings; i++) {
      this.skateboards.push({url:skateboardUrls.randomSkateboard(), index: -1});
    }
    let j = 0;
    for(let i = 0; i < game.rows; i++) {
      if( this.openings.includes(i) ) {
        this.skateboards[j++].index = i;
      }
    }
    record.record('walls', this.openings,this.skateboards).toConsole();
  }
  buildWall(menu, x){
    let j = 0;
    for(let i = 0; i < game.rows; i++) {
      if( !this.openings.includes(i) ) {
        menu.img('./graphics/concreteBlock1.png', x, i*100, null, 100,100);
      } else {
        if( this.skateboards[j].url.url !== 'blank' ) {
          menu.img(this.skateboards[j].url.url, x, i*100, null, 100,100);
        }
        j++;
      }
    }
    menu.text(x.toFixed(0), x + 25, 660)
  }
  calcPosition() {
    if( this._x >= ( game.avatar.x - 90 ) && this._x <= (game.avatar.x + 100)) { 
      this.skateboards = game.avatar.checkCollisions(this.openings, this.skateboards, this._x);
    } else {
      game.damage.setCurrent(0);
    }
    this._x -= game.frameRate / game.walls.speed;
    if( this._x < -100 ) {
      game.walls.incPassed();
      game.items.pop();
    } 
  }
  draw(menu) {
    this.buildWall(menu, this._x);
  }
}

class Loop {
  constructor() {
    this.isStarted = false;
    this.firstWall = true;
    this.interval = null;
    this.wallsInterval = null;
    this.wallsIntervalMS = 2000;
    this.startTime = Date.now();
    this.stopTime = null;
    this.holdTime = 0;
    this.holdTimeout = null;
    //this.screenWidth = 1000;
    this.walls = 0;
    this.menu = new MenuThis(null, 'JumpGame', 1,1);
  }
  static init() {
    const newLoop = new Loop();
    return newLoop;
    //newLoop.screenWidth = game.width;
  }
  start() {
    const startWall = () => {
      game.items.unshift(new Wall());
      this.wallsInterval = setInterval( () => 
        game.items.unshift(new Wall())
      , this.wallsIntervalMS );
      record.record('loop_startWall', 
        { wall: this.wall++ }, 
      ).toConsole();
    }
    if( !this.isStarted ){
      document.onkeydown = (e) => {
        console.log(e)
        switch( e.key ) {
          case 'w' :
          case 'W' :
            game.avatar.moveBy(0,-50);
            game.avatar.velocity = - game.avatar.jumpPower / 3;
            break;
          case 'a' :
          case 'A' :
            game.avatar.moveBy(-25,0);
            break;
          case 'd' :
          case 'D' :
            game.avatar.moveBy(25,0);
            break;
          case 'x' :
          case 'X' :
            game.avatar.moveBy(0,25);
            break;
          default:
            game.avatar.jump();
            break;
        }
      }
      document.onmousedown = () => game.avatar.jump();
      if( this.firstWall ) {
        this.firstWall = false;
        startWall();
      } else {
        this.holdTimeout = setTimeout( () => {
          if( this.isStarted ) {
            startWall();
          }
          record.record('loop_startWall_notFirst',
           { wall: this.walls }, 
           { holdTimeout: this.holdTime }
          ).toConsole();
        }, this.holdTime);
        record.record('loop_start_notFirst',
          { wall: this.walls }, 
          { holdTime: this.holdTime }, 
          { holdTimeout: this.holdTimeout }
        ).toConsole();
      }
      this.startTime = Date.now();
      this.interval = setInterval( () => this.calcPositions(), game.frameRate );
      //this.animationFrame = requestAnimationFrame( () => this.draw() ); //, game.frameRate );
      this.isStarted = true;
    }
  }
  stop() {
    this.isStarted = false;
    document.onkeydown = null;
    document.onmousedown = null;
    clearTimeout(this.holdTimeout);
    clearInterval(this.interval);
    clearInterval(this.wallsInterval);
    this.stopTime = Date.now();
    const runTime = this.stopTime - this.startTime;
    if(  runTime < this.holdTime ) {
      this.holdTime -= runTime;
    } else {
       this.holdTime = this.wallsIntervalMS - ( ( (runTime) % this.wallsIntervalMS ) );
    }
    record.record('loop_stop_holdTime', 
          { wall: this.walls }, 
          { holdTime: this.holdTime }, 
          { runTime_: runTime },
          { startTime: this.startTime },
          { stopTime_: this.stopTime }
        ).toConsole();
    return;
  }
  resetPipeInterval( interval ) {
    this.wallsIntervalMS = Number(interval);
    clearInterval(this.wallsInterval);
    if( this.isStarted ) { 
      this.wallsInterval = setInterval( () => game.items.unshift(new Wall(game)), interval );
    }
    record.record('loop_resetWallInterval:',this.wallsIntervalMS).toConsole();
  }
  get duration() {
    return (Date.now() - this.startTime);
  }
  postBackground() {
    this.menu
      .clear()
      .setTextSize(24)
      .img('./graphics/skatePark.JPG',0,0,null,game.width,game.height)
  }
  postData() {
    this.menu
      .setTextColor('yellow')
      .text('LAPS: ' + game.laps.total, 0,20)
      .text('Y: ' + (game.height - game.avatar.y - game.avatar.height).toFixed(0), 0,50)
      .text('VEL: ' + ( - game.avatar.velocity.toFixed(2) ), 0,80)
      .text('WALLS: ' + game.walls.passed, 0,110)
      .text('DECKS: ' + game.hits.total, 0,140)
      .text('DAMAGE: ' + game.damage.current, 0,170)
  }
  calcPositions() {
    game.items.forEach( item => item.calcPosition() );
    game.avatar.calcPosition();
    this.draw();
  }
  draw() {
    this.postBackground();
    game.items.forEach( item => item.draw(this.menu) );
    game.avatar.draw(this.menu);
    this.postData();
    //this.animationFrame = requestAnimationFrame( () => this.draw() );
  }
}

var game = {
  frameRate: 1000/60,
  height: 700,
  width: 1300,
  rowHeight: 100,
  rowWidth: 100,
  setGameWidth: function(newWidth) {
    if( Number(newWidth) ) {
      game.width = Number(newWidth);
    }
  },
  loop: Loop.init(),
  avatar: new Avatar(),
  items: [],
  hits: {
    hits: {},
    total: 0,
    addUrl: (url) => {
       if( game.hits.hits.hasOwnProperty(url.alias) ) {
          game.hits.hits[url.alias].hits = game.hits.hits[url.alias].hits + 1;
          game.hits.hits[url.alias].tsArray.push(Date.now());
       } else {
          game.hits.hits[url.alias] = {};
          game.hits.hits[url.alias].hits = 1;
          game.hits.hits[url.alias].alias = url.alias;
          game.hits.hits[url.alias].url = url.url;
          game.hits.hits[url.alias].tsArray = [Date.now()];
       }
       game.hits.total++;
       record.record('game_hits', game.hits.hits[url.alias]).toConsole();
       game.hits.post();
    },
    post: () => {
      const postMenu =new MenuThis(null, 'hitsMenu', 10, 200)
        .clear()
        .setTextSize(24)
        .setTextColor('yellow')
        .setZindex(29);
      let y = 0;
      for(const key in game.hits.hits) {
        postMenu
          .img(game.hits.hits[key].url, 0, y, null, 50,50) 
          .text(game.hits.hits[key].hits, 60, y + 10,null);
        y += 60;
      }
    },

  },
  laps: {
    total: 0,
    inc: function () {
      game.laps.total++;
    },
    dec: function () {
      game.laps.total--;
    },
  },
  scores: {
    reset: () => {
      game.laps.total = 0;
      game.damage.total = 0;
      game.walls.passed = 0;
      game.hits.total = 0;
      game.hits.hits = {};
      game.items = [];
      game.loop.draw();
      game.hits.post();
    },
  },
  damage: {
    sensetivity: 20,
    addToSensetivity: function(by) {
      game.damage.sensetivity += by;
    },
    current: 0,
    setCurrent: function(newDamage) {
      game.damage.current = newDamage;
    },
    total: 0,
    addToTotal: function(newDamage) {
      if( newDamage !== Infinity ) {
        game.damage.total += newDamage;
      }
      record.record('game_damage_addToTotal',game.damage.total, newDamage);
    },
  },
  file: {
    save: function(fileName = 'deck_jumper_game') {
      const gameState = {
        avatar: {
          x: game.avatar.x,
          y: game.avatar.y,
        },
        loop_holdTime: game.loop.holdTime,
        items: game.items,
        damage_total: game.damage.total,
        walls_passed: game.walls.passed,
        hits_hits: game.hits.hits,
        hits_total: game.hits.total,
      }
      const gameStateJSON = JSON.stringify(gameState, null, 2);
      localStorage.setItem(fileName, gameStateJSON);
      record.record('game_file_save',{gameStateJSON}).toConsole();
    },
    load: (fileName = 'deck_jumper_game') => {
      const gameStateJSON = localStorage.getItem(fileName);
      if( gameStateJSON !== null ) {
        const gameStateData = JSON.parse(gameStateJSON);
        game.avatar.x = gameStateData.avatar.x;
        game.avatar.y = gameStateData.avatar.y;
        game.loop.holdTime = gameStateData.loop_holdTime;
        gameStateData.items.forEach( (item,i) => {
          game.items[i] = Wall.createFromStateObject(item);
        });
        game.damage.total = gameStateData.damage_total;
        game.walls.passed = gameStateData.walls_passed;
        game.hits.hits = gameStateData.hits_hits;
        game.hits.total = gameStateData.hits_total;
        game.loop.firstWall = false;
        game.loop.draw();
        game.hits.post();
        record.record('game_file_load',{gameStateJSON},{gameStateData}).toConsole();
      }
    },
  },
  walls: {
    speed: 6,
    setSpeed: function(newSpeed) {
      game.walls.speed = Number(newSpeed);
      record.record('game_setSpeed', game.walls.speed);
    },
    passed: 0,
    incPassed: function() {
      game.walls.passed++;
      record.record('game_walls_passed', game.walls.passed);
    }
  },
  openings: {
    max: 6,
    setMax: function(newMax) {
      game.openings.max = Number(newMax);
      record.record('game_openings_setMax', game.openings.max);
    }
  },
  rows: 7,
};

function main() {
  const boundData = {};
  const menu = new MenuThis(null, 'controller', 180,10)
    .clear()
    .setZindex(29)
    .button('start', 0,0, () => game.loop.start() )
    .button('reset', 100,0, () => game.scores.reset() )
    .button('stop', 50,0, () => game.loop.stop() )
    .button('log', 150,0, () => record.log() )
    .button('save', 100,25, () => game.file.save() )
    .button('load', 150,25, () => game.file.load() )

    .button('DW-UP', 190,0, () => {
        game.damage.addToSensetivity(5);
        boundData.sens('DM-DN ' + game.damage.sensetivity);
    })
    .button('DM-DN ' + game.damage.sensetivity, 250,0, () => {
        game.damage.addToSensetivity(-5);
        boundData.sens('DM-DN ' + game.damage.sensetivity);
    })
      .bindDataToKey(boundData,'sens')
    

    .select(game.loop.wallsIntervalMS, 350,0, (e) => {
        game.loop.resetPipeInterval(e.target.value);
      },
      [
        '8000',
        '4000',
        '3000',
        '2000',
        '1500',
        '1000',
        '800',
        '400',
      ]
     )
    .select(game.walls.speed, 402,0, (e) => {
        game.walls.setSpeed(e.target.value)
      },
      [
        '10',
        '8',
        '6',
        '4',
        '2',
        '1',
        '20',
      ]
     )
    .select(game.openings.max, 440,0, (e) => {
        game.openings.setMax(e.target.value);
      },
      [
        '6',
        '5',
        '4',
        '3',
        '2',
        '1',
      ]
     )
    .select('maga', 475,0, (e) => {
        game.avatar.setAcceleration(e.target.value);
      },
      [
        'maga',
        'fast',
        'medium',
        'slow',
      ]
     )
    .select('super', 545,0, (e) => {
        game.avatar.setJumpPower(e.target.value);
      },
      [
        'super',
        'strong',
        'normal',
        'weak',
      ]
     )
    .input('',640,0, (e) => {
        game.setGameWidth( e.target.value );
        game.loop.draw();
      },
      { deleteOnInput: false }
    )
    .text('SuperSlow', 850,0, () => {
      game.walls.setSpeed(102);
      game.loop.resetPipeInterval(30000);
     })
  game.loop.draw();
}

main();

document.body.onload = () => {
  game.width = window.innerWidth -4;
  game.file.load();
}

document.body.onresize = () => {
  game.width = window.innerWidth -4;
  game.loop.draw();
}

